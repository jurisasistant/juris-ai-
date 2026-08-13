-- ============================================================================
-- JURISAI BHARAT — LEGAL SEARCH ENGINE v3 (idempotent — safe to re-run)
-- SEARCH FIRST → VERIFY EVIDENCE → ANSWER SECOND
--   • Exact section/citation match priority
--   • Phrase + word + fuzzy (pg_trgm) + authority + freshness scoring
--   • Court / year / document-type filters
--   • Citation search, court search, statute search, fuzzy search
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0. Schema migrations (add columns if missing — never destroys data)
-- ---------------------------------------------------------------------------
alter table public.legal_documents add column if not exists bench text;
alter table public.legal_documents add column if not exists judges text;
alter table public.legal_documents add column if not exists keywords text[];
alter table public.legal_documents add column if not exists cross_references jsonb default '[]'::jsonb;
alter table public.legal_documents add column if not exists related_sections jsonb default '[]'::jsonb;
alter table public.legal_documents add column if not exists is_current boolean default true;

create extension if not exists pg_trgm;
create index if not exists idx_docs_title_trgm on public.legal_documents using gin (title gin_trgm_ops);
create index if not exists idx_docs_citation_trgm on public.legal_documents using gin (citation gin_trgm_ops);
create index if not exists idx_chunks_section_trgm on public.legal_chunks using gin (section_number gin_trgm_ops);
create index if not exists idx_docs_court on public.legal_documents (court);
create index if not exists idx_docs_judgment_date on public.legal_documents (judgment_date);

-- ---------------------------------------------------------------------------
-- 1. MAIN SEARCH — deterministic multi-signal ranking
--    query_text: the user's (possibly expanded) query
--    p_court / p_year / p_doc_type: optional filters
-- ---------------------------------------------------------------------------
create or replace function public.search_legal_docs(
  query_text text default null,
  query_embedding vector(1536) default null,
  match_count int default 8,
  p_court text default null,
  p_year int default null,
  p_doc_type text default null,
  prefer_latest boolean default false
)
returns table (
  chunk_id uuid,
  document_id uuid,
  title text,
  document_type text,
  court text,
  judgment_date date,
  citation text,
  section_number text,
  chunk_text text,
  authority_level text,
  source_url text,
  official_source text,
  verified boolean,
  score float
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  q text := lower(trim(coalesce(query_text, '')));
  norm_q text := regexp_replace(q, '[^a-z0-9 ]', '', 'g');
  sec_ref text := null;
  has_latest boolean := q ~ '\\mlatest\\M|\\mrecent\\M|\\mcurrent\\M';
begin
  -- Path A: semantic search (only when embeddings exist)
  if query_embedding is not null then
    return query
      select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
             d.citation, c.section_number, c.chunk_text, d.authority_level,
             d.source_url, d.official_source, d.verified,
             round((1 - (c.embedding <=> query_embedding))::numeric, 4)::float as score
      from public.legal_chunks c
      join public.legal_documents d on d.id = c.document_id
      where d.verified = true
        and c.embedding is not null
        and (p_court is null or lower(coalesce(d.court,'')) like '%' || lower(p_court) || '%')
        and (p_year is null or extract(year from d.judgment_date) = p_year)
        and (p_doc_type is null or d.document_type = p_doc_type)
      order by c.embedding <=> query_embedding
      limit match_count;
    return;
  end if;

  -- Extract a section/article reference from the query if present
  if q ~ '(section|sec\\.|s\\.|article|art\\.|order|rule)\\s+[0-9ivxlc]+[a-z]*(\\s*\\(\\s*[0-9ivxlc]+\\))?' then
    sec_ref := (regexp_matches(q, '(section|sec\\.|s\\.|article|art\\.|order|rule)\\s+[0-9ivxlc]+[a-z]*(\\s*\\(\\s*[0-9ivxlc]+\\))?'))[1]::text;
  end if;

  if length(q) > 0 then
    return query
      select s.chunk_id, s.document_id, s.title, s.document_type, s.court,
             s.judgment_date, s.citation, s.section_number, s.chunk_text,
             s.authority_level, s.source_url, s.official_source, s.verified,
             round((s.raw_score + s.auth_bonus + s.fresh_bonus)::numeric, 4)::float as score
      from (
        select c.id as chunk_id, c.document_id, d.title, d.document_type, d.court,
               d.judgment_date, d.citation, c.section_number, c.chunk_text,
               d.authority_level, d.source_url, d.official_source, d.verified,
               -- EXACT-MATCH PRIORITY: citation or section reference
               (case when lower(coalesce(d.citation,'')) = q then 12.0
                     when lower(coalesce(d.citation,'')) like '%' || q || '%' then 8.0
                     else 0.0 end)
               +
               (case when sec_ref is not null
                          and lower(coalesce(c.section_number,'')) like '%' || sec_ref || '%' then 8.0 else 0.0 end)
               +
               -- Exact case-name / phrase matches
               (case when lower(coalesce(d.title,'')) = q then 10.0
                     when lower(coalesce(d.title,'')) like '%' || q || '%' then 6.0
                     else 0.0 end)
               +
               -- Word overlap (title words weigh more)
               (select count(*)::float
                  from unnest(string_to_array(q, ' ')) as w
                 where length(w) >= 3
                   and lower(coalesce(d.title,'')) like '%' || w || '%') * 2.0
               +
               (select count(*)::float
                  from unnest(string_to_array(q, ' ')) as w
                 where length(w) >= 3
                   and lower(coalesce(c.chunk_text,'')) like '%' || w || '%') * 1.0
               +
               -- Fuzzy match (typos, partial names) via trigram similarity
               greatest(
                 similarity(lower(coalesce(d.title,'')), q) * 4.0,
                 similarity(lower(coalesce(d.citation,'')), q) * 4.0,
                 similarity(lower(coalesce(c.section_number,'')), q) * 3.0
               )
               as raw_score,
               (case d.authority_level when 'primary' then 0.5 when 'secondary' then 0.2 else 0.0 end) as auth_bonus,
               -- Freshness: boost recent judgments when the query asks for latest/current
               (case when (has_latest or prefer_latest)
                          and d.judgment_date is not null
                          and d.judgment_date >= (current_date - interval '3 years')
                     then 1.5
                     when has_latest and d.document_type = 'judgment' and d.judgment_date is null then 0.0
                     else 0.0 end) as fresh_bonus
        from public.legal_chunks c
        join public.legal_documents d on d.id = c.document_id
        where d.verified = true
          and (p_court is null or lower(coalesce(d.court,'')) like '%' || lower(coalesce(p_court,'')) || '%')
          and (p_year is null or extract(year from d.judgment_date) = p_year)
          and (p_doc_type is null or d.document_type = p_doc_type)
      ) s
      where s.raw_score > 0
      order by (s.raw_score + s.auth_bonus + s.fresh_bonus) desc,
               (case when has_latest or prefer_latest then s.judgment_date end) desc nulls last,
               s.title
      limit match_count;
    return;
  end if;

  -- Path C: no query — newest verified authorities
  return query
    select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
           d.citation, c.section_number, c.chunk_text, d.authority_level,
           d.source_url, d.official_source, d.verified,
           0.0::float as score
    from public.legal_chunks c
    join public.legal_documents d on d.id = c.document_id
    where d.verified = true
    order by d.judgment_date desc nulls last, d.updated_at desc
    limit match_count;
end $$;

-- ---------------------------------------------------------------------------
-- 2. CITATION SEARCH — citation metadata FIRST, never generic semantic search
-- ---------------------------------------------------------------------------
create or replace function public.search_citations(cite text, match_count int default 8)
returns table (
  chunk_id uuid, document_id uuid, title text, document_type text, court text,
  judgment_date date, citation text, section_number text, chunk_text text,
  authority_level text, source_url text, official_source text, verified boolean,
  score float
)
language plpgsql stable security definer set search_path = public
as $$
declare q text := lower(trim(coalesce(cite, '')));
begin
  return query
    select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
           d.citation, c.section_number, c.chunk_text, d.authority_level,
           d.source_url, d.official_source, d.verified,
           round((case when lower(coalesce(d.citation,'')) = q then 12.0
                       when lower(coalesce(d.citation,'')) like '%' || q || '%' then 8.0
                       else greatest(similarity(lower(coalesce(d.citation,'')), q), similarity(lower(coalesce(d.title,'')), q)) * 4.0 end)::numeric, 4)::float as score
    from public.legal_chunks c
    join public.legal_documents d on d.id = c.document_id
    where d.verified = true
      and (lower(coalesce(d.citation,'')) like '%' || q || '%'
           or similarity(lower(coalesce(d.citation,'')), q) > 0.35)
    order by score desc
    limit match_count;
end $$;

-- ---------------------------------------------------------------------------
-- 3. COURT SEARCH
-- ---------------------------------------------------------------------------
create or replace function public.search_by_court(court_name text, match_count int default 10)
returns table (
  chunk_id uuid, document_id uuid, title text, document_type text, court text,
  judgment_date date, citation text, section_number text, chunk_text text,
  authority_level text, source_url text, official_source text, verified boolean,
  score float
)
language sql stable security definer set search_path = public
as $$
  select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
         d.citation, c.section_number, c.chunk_text, d.authority_level,
         d.source_url, d.official_source, d.verified,
         1.0::float as score
  from public.legal_chunks c
  join public.legal_documents d on d.id = c.document_id
  where d.verified = true
    and lower(coalesce(d.court,'')) like '%' || lower(trim(coalesce(court_name,''))) || '%'
  order by d.judgment_date desc nulls last
  limit match_count;
$$;

-- ---------------------------------------------------------------------------
-- 4. STATUTE / ACT SEARCH
-- ---------------------------------------------------------------------------
create or replace function public.search_statutes(act_name text, match_count int default 10)
returns table (
  chunk_id uuid, document_id uuid, title text, document_type text, court text,
  judgment_date date, citation text, section_number text, chunk_text text,
  authority_level text, source_url text, official_source text, verified boolean,
  score float
)
language sql stable security definer set search_path = public
as $$
  select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
         d.citation, c.section_number, c.chunk_text, d.authority_level,
         d.source_url, d.official_source, d.verified,
         round(similarity(lower(coalesce(d.title,'')), lower(trim(coalesce(act_name,''))))::numeric, 4)::float as score
  from public.legal_chunks c
  join public.legal_documents d on d.id = c.document_id
  where d.verified = true
    and d.document_type in ('statute', 'constitution')
    and (lower(coalesce(d.title,'')) like '%' || lower(trim(coalesce(act_name,''))) || '%'
         or similarity(lower(coalesce(d.title,'')), lower(trim(coalesce(act_name,'')))) > 0.2)
  order by score desc
  limit match_count;
$$;

-- ---------------------------------------------------------------------------
-- 5. FUZZY SEARCH (spelling correction fallback)
-- ---------------------------------------------------------------------------
create or replace function public.fuzzy_search(query_text text, match_count int default 8)
returns table (
  chunk_id uuid, document_id uuid, title text, document_type text, court text,
  judgment_date date, citation text, section_number text, chunk_text text,
  authority_level text, source_url text, official_source text, verified boolean,
  score float
)
language sql stable security definer set search_path = public
as $$
  select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
         d.citation, c.section_number, c.chunk_text, d.authority_level,
         d.source_url, d.official_source, d.verified,
         round(greatest(similarity(lower(coalesce(d.title,'')), lower(trim(coalesce(query_text,'')))),
                        similarity(lower(coalesce(d.citation,'')), lower(trim(coalesce(query_text,'')))))::numeric, 4)::float as score
  from public.legal_chunks c
  join public.legal_documents d on d.id = c.document_id
  where d.verified = true
    and (similarity(lower(coalesce(d.title,'')), lower(trim(coalesce(query_text,'')))) > 0.15
         or similarity(lower(coalesce(d.citation,'')), lower(trim(coalesce(query_text,'')))) > 0.2)
  order by score desc
  limit match_count;
$$;

-- ---------------------------------------------------------------------------
-- 6. Citation verifier (used by the client-side claim verification)
-- ---------------------------------------------------------------------------
create or replace function public.verify_citation(cite text)
returns table (
  case_name text, citation text, court text, judgment_date date,
  source_url text, verified boolean
)
language sql security definer set search_path = public
as $$
  select case_name, citation, court, judgment_date, source_url, verified
  from public.cases
  where lower(citation) = lower(trim(cite))
     or lower(case_name) = lower(trim(cite))
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- 7. Pure vector search (activates when embeddings are added later)
-- ---------------------------------------------------------------------------
create or replace function public.match_legal_docs(
  query_embedding vector(1536),
  match_count int default 8
)
returns table (
  chunk_id uuid, document_id uuid, title text, section_number text,
  chunk_text text, similarity float
)
language sql security definer set search_path = public
as $$
  select c.id, c.document_id, d.title, c.section_number, c.chunk_text,
         round((1 - (c.embedding <=> query_embedding))::numeric, 4)::float as similarity
  from public.legal_chunks c
  join public.legal_documents d on d.id = c.document_id
  where d.verified = true
    and c.embedding is not null
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

-- Policies live in supabase/policies.sql (idempotent).

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
revoke execute on function public.search_legal_docs(text, vector, int, text, int, text, boolean) from public;
grant execute on function public.search_legal_docs(text, vector, int, text, int, text, boolean) to anon, authenticated, service_role;
revoke execute on function public.search_citations(text, int) from public;
grant execute on function public.search_citations(text, int) to anon, authenticated, service_role;
revoke execute on function public.search_by_court(text, int) from public;
grant execute on function public.search_by_court(text, int) to anon, authenticated, service_role;
revoke execute on function public.search_statutes(text, int) from public;
grant execute on function public.search_statutes(text, int) to anon, authenticated, service_role;
revoke execute on function public.fuzzy_search(text, int) from public;
grant execute on function public.fuzzy_search(text, int) to anon, authenticated, service_role;
revoke execute on function public.verify_citation(text) from public;
grant execute on function public.verify_citation(text) to anon, authenticated, service_role;
revoke execute on function public.match_legal_docs(vector, int) from public;
grant execute on function public.match_legal_docs(vector, int) to anon, authenticated, service_role;
