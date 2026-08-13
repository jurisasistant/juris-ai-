-- ============================================================================
-- JURISAI BHARAT — ROW LEVEL SECURITY POLICIES (idempotent — safe to re-run)
-- Anonymous users may READ verified legal content only.
-- Run this ONCE, or any time you re-apply security.
-- ============================================================================
-- ---------------------------------------------------------------------------
-- Row Level Security: anonymous users may READ verified legal content only.
-- (The app calls search functions with the public anon key — safe by design.)
-- ---------------------------------------------------------------------------
alter table if exists public.legal_documents enable row level security;
alter table if exists public.legal_chunks enable row level security;
alter table if exists public.cases enable row level security;
alter table if exists public.citations enable row level security;
alter table if exists public.conversations enable row level security;
alter table if exists public.conversation_messages enable row level security;

drop policy if exists "anon read verified documents" on public.legal_documents;
create policy "anon read verified documents" on public.legal_documents
  for select using (verified = true);

drop policy if exists "anon read verified chunks" on public.legal_chunks;
create policy "anon read verified chunks" on public.legal_chunks
  for select using (
    exists (select 1 from public.legal_documents d where d.id = document_id and d.verified = true)
  );

drop policy if exists "anon read verified cases" on public.cases;
create policy "anon read verified cases" on public.cases
  for select using (verified = true);

drop policy if exists "anon read citations" on public.citations;
create policy "anon read citations" on public.citations
  for select using (verified = true);

drop policy if exists "anon read own conversations" on public.conversations;
create policy "anon read own conversations" on public.conversations
  for select using (user_id = auth.uid());
drop policy if exists "anon insert conversations" on public.conversations;
create policy "anon insert conversations" on public.conversations
  for insert with check (user_id = auth.uid());

drop policy if exists "anon read own messages" on public.conversation_messages;
create policy "anon read own messages" on public.conversation_messages
  for select using (
    exists (select 1 from public.conversations c where c.id = conversation_id and c.user_id = auth.uid())
  );
drop policy if exists "anon insert messages" on public.conversation_messages;
create policy "anon insert messages" on public.conversation_messages
  for insert with check (
    exists (select 1 from public.conversations c where c.id = conversation_id and c.user_id = auth.uid())
  );
