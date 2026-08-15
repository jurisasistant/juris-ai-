-- ============================================================================
-- JURISAI BHARAT — CONVERSATION MEMORY FUNCTIONS (idempotent)
-- Device-based conversation persistence: the app syncs chat sessions to
-- Supabase so history survives across devices (localStorage stays the
-- offline source of truth; Supabase is the sync layer).
-- Security definer + device_id scoping: anon callers can only touch
-- conversations belonging to their own random device id.
-- ============================================================================

alter table public.conversations add column if not exists device_id text;
alter table public.conversation_messages add column if not exists device_id text;

create index if not exists idx_conversations_device on public.conversations (device_id, updated_at desc);

-- Save one exchange: creates/updates the conversation and appends a message.
-- Returns the conversation id so the client can link follow-ups.
create or replace function public.save_conversation(
  p_device_id text,
  p_title text,
  p_role text,
  p_content text,
  p_intent text default null,
  p_evidence_level text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_convo_id uuid;
begin
  if p_device_id is null or length(trim(p_device_id)) < 8 then
    raise exception 'invalid device_id';
  end if;

  -- Reuse the most recent conversation for this device (same session).
  select id into v_convo_id
  from public.conversations
  where device_id = p_device_id
  order by updated_at desc
  limit 1;

  if v_convo_id is null then
    insert into public.conversations (device_id, title)
    values (p_device_id, coalesce(nullif(left(p_title, 80), ''), 'New Chat'))
    returning id into v_convo_id;
  else
    update public.conversations
    set title = coalesce(nullif(left(p_title, 80), ''), title),
        updated_at = now()
    where id = v_convo_id;
  end if;

  insert into public.conversation_messages (conversation_id, device_id, role, content, intent, evidence_level)
  values (v_convo_id, p_device_id, p_role, left(p_content, 12000), p_intent, p_evidence_level);

  return v_convo_id;
end $$;

-- Load the latest conversations for a device (title + last message preview).
create or replace function public.load_conversations(p_device_id text)
returns table (
  conversation_id uuid,
  title text,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select c.id, c.title, c.updated_at
  from public.conversations c
  where c.device_id = p_device_id
  order by c.updated_at desc
  limit 20;
$$;

-- Load a full conversation's messages (for continuing a session).
create or replace function public.load_conversation_messages(p_conversation_id uuid, p_device_id text)
returns table (
  role text,
  content text,
  intent text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select m.role, m.content, m.intent, m.created_at
  from public.conversation_messages m
  join public.conversations c on c.id = m.conversation_id
  where m.conversation_id = p_conversation_id
    and c.device_id = p_device_id
  order by m.created_at asc;
$$;

-- Grants: memory functions are callable by the anonymous frontend key,
-- scoped to the caller's own device id (server-enforced, never trusted
-- from the client beyond the id itself).
revoke execute on function public.save_conversation(text, text, text, text, text, text) from public;
grant execute on function public.save_conversation(text, text, text, text, text, text) to anon, authenticated, service_role;
revoke execute on function public.load_conversations(text) from public;
grant execute on function public.load_conversations(text) to anon, authenticated, service_role;
revoke execute on function public.load_conversation_messages(uuid, text) from public;
grant execute on function public.load_conversation_messages(uuid, text) to anon, authenticated, service_role;
