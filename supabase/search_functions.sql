-- ============================================================================
-- JURISAI BHARAT — RETRIEVAL FUNCTIONS (run AFTER schema.sql)
-- 1. search_legal_docs()  — hybrid retrieval used by the app today
--    (Postgres full-text search + authority re-ranking; no API key needed)
-- 2. match_legal_docs()   — pgvector semantic search, activates when you
--    later generate embeddings (Phase: embeddings provider)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- FTS-based hybrid retrieval (query_text path is used by the live app now)
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
security definer
set search_path = public
as $$
declare
  result_count int := 0;
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
  end if;

  -- Path B: full-text search (keyword) — used by the app today
  -- Search over title + chunk. AND query first; if it matches nothing,
  -- retry with OR semantics so partial matches still return (e.g. "ram mandir").
  if query_text is not null and length(trim(query_text)) > 0 then
    begin
      return query
        with ranked as (
          select c.id as chunk_id, c.document_id, d.title, d.document_type, d.court,
                 d.judgment_date, d.citation, c.section_number, c.chunk_text,
                 d.authority_level, d.source_url, d.official_source, d.verified,
                 ts_rank(
                   to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(c.chunk_text,'')),
                   websearch_to_tsquery('english', query_text)
                 )
                 + case d.authority_level when 'primary' then 0.5 when 'secondary' then 0.2 else 0.0 end
                 as raw_score
          from public.legal_chunks c
          join public.legal_documents d on d.id = c.document_id
          where d.verified = true
            and to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(c.chunk_text,''))
                @@ websearch_to_tsquery('english', query_text)
        )
        select chunk_id, document_id, title, document_type, court, judgment_date, citation,
               section_number, chunk_text, authority_level, source_url, official_source, verified,
               round(raw_score::numeric, 4)::float as score
        from ranked
        order by raw_score desc
        limit match_count;

      -- AND matched nothing? Retry with OR semantics (partial keyword overlap).
      get diagnostics result_count = row_count;
      if result_count = 0 then
        return query
          with ranked as (
            select c.id as chunk_id, c.document_id, d.title, d.document_type, d.court,
                   d.judgment_date, d.citation, c.section_number, c.chunk_text,
                   d.authority_level, d.source_url, d.official_source, d.verified,
                   ts_rank(
                     to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(c.chunk_text,'')),
                     array_to_string(tsvector_to_array(to_tsvector('english', query_text)), ' | ')::tsquery
                   )
                   + case d.authority_level when 'primary' then 0.5 when 'secondary' then 0.2 else 0.0 end
                   as raw_score
            from public.legal_chunks c
            join public.legal_documents d on d.id = c.document_id
            where d.verified = true
              and to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(c.chunk_text,''))
                  @@ array_to_string(tsvector_to_array(to_tsvector('english', query_text)), ' | ')::tsquery
          )
          select chunk_id, document_id, title, document_type, court, judgment_date, citation,
                 section_number, chunk_text, authority_level, source_url, official_source, verified,
                 round(raw_score::numeric, 4)::float as score
          from ranked
          order by raw_score desc
          limit match_count;
      end if;
    exception when others then
      -- websearch_to_tsquery can throw on odd punctuation — degrade gracefully
      return query
        select c.id, c.document_id, d.title, d.document_type, d.court, d.judgment_date,
               d.citation, c.section_number, c.chunk_text, d.authority_level,
               d.source_url, d.official_source, d.verified,
               0.1::float as score
        from public.legal_chunks c
        join public.legal_documents d on d.id = c.document_id
        where d.verified = true
          and (d.title ilike '%' || query_text || '%' or c.section_number ilike '%' || query_text || '%')
        order by d.authority_level desc
        limit match_count;
    end;
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
