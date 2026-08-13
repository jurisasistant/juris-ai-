-- ============================================================================
-- JURISAI BHARAT — RETRIEVAL FUNCTIONS v2 (bulletproof, dictionary-independent)
-- 1. search_legal_docs()  — hybrid retrieval used by the app today
--    Deterministic word-overlap scoring (no FTS dictionary quirks, works with
--    Indian/Hinglish words like "mandir", "bail", "talaq").
-- 2. match_legal_docs()   — pgvector semantic search (activates with embeddings)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Deterministic ILIKE-based hybrid retrieval (query_text path)
-- ---------------------------------------------------------------------------
create or replace function public.search_legal_docs(
  query_text text default null,
  query_embedding vector(1536) default null,
  match_count int default 8
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
  title_bonus float;
  hit_count int;
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
      order by c.embedding <=> query_embedding
      limit match_count;
    return;
  end if;

  -- Path B: deterministic keyword scoring
  --   +3.0  full phrase appears in title (e.g. "ram mandir" in the Ayodhya title)
  --   +2.0  each query word appears in title
  --   +1.0  each query word appears in chunk text
  --   +0.5  authority = primary
  if length(q) > 0 then
    return query
      select s.chunk_id, s.document_id, s.title, s.document_type, s.court,
             s.judgment_date, s.citation, s.section_number, s.chunk_text,
             s.authority_level, s.source_url, s.official_source, s.verified,
             round((s.raw_score + s.auth_bonus)::numeric, 4)::float as score
      from (
        select c.id as chunk_id, c.document_id, d.title, d.document_type, d.court,
               d.judgment_date, d.citation, c.section_number, c.chunk_text,
               d.authority_level, d.source_url, d.official_source, d.verified,
               (case when lower(coalesce(d.title,'')) like '%' || q || '%' then 3.0 else 0.0 end)
               +
               (select count(*)::float
                  from unnest(string_to_array(q, ' ')) as w
                 where lower(coalesce(d.title,'')) like '%' || w || '%') * 2.0
               +
               (select count(*)::float
                  from unnest(string_to_array(q, ' ')) as w
                 where lower(coalesce(c.chunk_text,'')) like '%' || w || '%') * 1.0
               +
               (case when lower(coalesce(c.section_number,'')) like '%' || q || '%' then 2.0 else 0.0 end)
               as raw_score,
               (case d.authority_level when 'primary' then 0.5 when 'secondary' then 0.2 else 0.0 end) as auth_bonus
        from public.legal_chunks c
        join public.legal_documents d on d.id = c.document_id
        where d.verified = true
      ) s
      where s.raw_score > 0
      order by (s.raw_score + s.auth_bonus) desc, s.title
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
    order by d.updated_at desc
    limit match_count;
end $$;

-- ---------------------------------------------------------------------------
-- Citation verifier: is this citation in the approved corpus?
-- ---------------------------------------------------------------------------
create or replace function public.verify_citation(cite text)
returns table (
  case_name text,
  citation text,
  court text,
  judgment_date date,
  source_url text,
  verified boolean
)
language sql
security definer
set search_path = public
as $$
  select case_name, citation, court, judgment_date, source_url, verified
  from public.cases
  where lower(citation) = lower(trim(cite))
     or lower(case_name) = lower(trim(cite))
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Pure vector search (used later, when embeddings are generated server-side)
-- ---------------------------------------------------------------------------
create or replace function public.match_legal_docs(
  query_embedding vector(1536),
  match_count int default 8
)
returns table (
  chunk_id uuid,
  document_id uuid,
  title text,
  section_number text,
  chunk_text text,
  similarity float
)
language sql
security definer
set search_path = public
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
-- Grants: search functions run with definer rights (bypass RLS internally),
-- callable by the anonymous frontend key.
-- ---------------------------------------------------------------------------
revoke execute on function public.search_legal_docs(text, vector, int) from public;
grant execute on function public.search_legal_docs(text, vector, int) to anon, authenticated, service_role;
revoke execute on function public.verify_citation(text) from public;
grant execute on function public.verify_citation(text) to anon, authenticated, service_role;
revoke execute on function public.match_legal_docs(vector, int) from public;
grant execute on function public.match_legal_docs(vector, int) to anon, authenticated, service_role;
