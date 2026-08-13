-- ============================================================================
-- JURISAI BHARAT — LEGAL RAG DATABASE SCHEMA (Supabase + pgvector)
-- Phase roadmap: Phase 1 Core statutes → Phase 2 Central Acts →
-- Phase 3 Supreme Court → Phase 4 High Courts → Phase 5 Government material
-- Run in Supabase SQL Editor. Requires: create extension vector (pgvector)
-- ============================================================================

create extension if not exists vector;

-- ---------------------------------------------------------------------------
-- 1. legal_documents — the original authoritative document (provenance)
-- ---------------------------------------------------------------------------
create table if not exists public.legal_documents (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  document_type     text not null check (document_type in ('constitution','statute','judgment','rules','notification','circular','commentary')),
  court             text,                                  -- null for statutes
  jurisdiction      text not null default 'IN',            -- IN / state code
  bench             text,                                  -- e.g. '5-Judge Constitution Bench'
  judgment_date     date,                                  -- for judgments
  effective_from    date,                                  -- for statutes
  effective_until   date,                                  -- null = still in force
  citation          text,                                  -- official citation, e.g. (2020) 1 SCC 1
  source_url        text,                                  -- India Code / sci.gov.in / eCourts
  official_source   text,                                  -- e.g. 'India Code', 'Supreme Court of India'
  authority_level   text not null default 'primary'
                    check (authority_level in ('primary','secondary','persuasive')),
  verified          boolean not null default false,
  content           text,                                  -- full text where available
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_legal_documents_type on public.legal_documents(document_type);
create index if not exists idx_legal_documents_verified on public.legal_documents(verified);

-- ---------------------------------------------------------------------------
-- 2. legal_chunks — embeddable chunks with metadata (the RAG unit)
-- ---------------------------------------------------------------------------
create table if not exists public.legal_chunks (
  id                uuid primary key default gen_random_uuid(),
  document_id       uuid not null references public.legal_documents(id) on delete cascade,
  chunk_text        text not null,
  section_number    text,                                  -- 'Article 21' / 'Section 103 BNS' / 'para 42'
  page_number       int,
  metadata          jsonb not null default '{}'::jsonb,
  embedding         vector(1536),                          -- match your embedding dim
  created_at        timestamptz not null default now()
);

create index if not exists idx_legal_chunks_doc on public.legal_chunks(document_id);
-- Hybrid retrieval: BM25-style full text + vector similarity
create index if not exists idx_legal_chunks_fts on public.legal_chunks
  using gin (to_tsvector('english', chunk_text));
create index if not exists idx_legal_chunks_embedding on public.legal_chunks
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ---------------------------------------------------------------------------
-- 3. cases — structured judgment index for citation verification
-- ---------------------------------------------------------------------------
create table if not exists public.cases (
  id                uuid primary key default gen_random_uuid(),
  case_name         text not null,
  court             text not null,
  bench             text,
  judgment_date     date,
  citation          text unique,                           -- verified citation only
  citation_verified boolean not null default false,
  status            text not null default 'decided'
                    check (status in ('decided','pending','overruled','distinguished','referred')),
  source_url        text,
  verified          boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists idx_cases_name on public.cases(lower(case_name));
create index if not exists idx_cases_citation on public.cases(citation);

-- ---------------------------------------------------------------------------
-- 4. citations — every citation the AI is allowed to display
--    (Citation Verifier: query this table BEFORE showing any citation)
-- ---------------------------------------------------------------------------
create table if not exists public.citations (
  id                uuid primary key default gen_random_uuid(),
  case_id           uuid references public.cases(id) on delete cascade,
  document_id       uuid references public.legal_documents(id) on delete cascade,
  full_citation     text not null,
  verified          boolean not null default false,
  checked_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. conversations — chat persistence (title, mode, timestamps)
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid,                                  -- auth.users id when enabled
  title             text not null default 'New Chat',
  mode              text not null default 'instant',       -- instant | deep
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists public.conversation_messages (
  id                uuid primary key default gen_random_uuid(),
  conversation_id   uuid not null references public.conversations(id) on delete cascade,
  role              text not null check (role in ('user','assistant','system')),
  content           text not null,
  intent            text,                                  -- casual | legal | legal_research | drafting
  evidence_level    text,                                  -- HIGH | MEDIUM | LOW
  sources           jsonb not null default '[]'::jsonb,
  created_at        timestamptz not null default now()
);

create index if not exists idx_convo_msgs on public.conversation_messages(conversation_id);

-- ---------------------------------------------------------------------------
-- 6. Example hybrid retrieval query (semantic + keyword + authority rank)
-- ---------------------------------------------------------------------------
-- select
--   c.id, c.chunk_text, c.section_number, d.title, d.document_type, d.authority_level,
--   (1 - (c.embedding <=> query_embedding)) as similarity
-- from public.legal_chunks c
-- join public.legal_documents d on d.id = c.document_id
-- where d.verified = true
--   and (1 - (c.embedding <=> query_embedding)) > 0.55
-- order by
--   case d.authority_level
--     when 'primary'   then 5
--     when 'secondary' then 2
--     else 1
--   end desc,
--   similarity desc
-- limit 10;

-- ============================================================================
-- NOTE: This schema is the RAG roadmap. The client-side app currently ships a
-- curated verified library (Constitution, BNS/BNSS/BSA, Central Acts, Supreme
-- Court Constitution Bench judgments) with the same metadata discipline.
-- When Supabase credentials are added, this schema becomes the live corpus.
-- ============================================================================
