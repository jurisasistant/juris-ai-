# 🗄️ Supabase Legal Corpus — Setup Guide (10 minutes)

This turns the in-app legal library into a **live PostgreSQL + pgvector corpus**
with hybrid retrieval (full-text today, semantic search later).

## 1. Create the project

1. Go to **supabase.com → New project** (free tier works)
2. Name: `jurisai-bharat` · Database password: anything strong (save it)
3. Region: **Mumbai (ap-south-1)** for the best latency in India
4. Wait ~2 minutes for provisioning

## 2. Enable pgvector

- **Database → Extensions** → search `vector` → **Enable**

## 3. Run the SQL files (in this order)

In **SQL Editor → New query**, paste and run each file from this repo:

| Order | File | What it does |
|---|---|---|
| 1 | `supabase/schema.sql` | Tables: legal_documents, legal_chunks, cases, citations, conversations |
| 2 | `supabase/search_functions.sql` | Hybrid search + citation verifier functions + Row Level Security |
| 3 | `supabase/seed.sql` | Seeds all **28 verified authorities** (Constitution, BNS/BNSS/BSA, Central Acts, SC Constitution Bench judgments) |

**Verify it worked:**

```sql
select count(*) as documents from public.legal_documents;  -- expect 28

select title, score from public.search_legal_docs('ram mandir case', null, 3);
-- expect: Ram Janmabhoomi–Babri Masjid (Ayodhya) Case on top
```

## 4. Wire the app

✅ **Already done** — the app is wired to project `ekwvogebxbvkjojkqszt` using the
publishable key (`sb_publishable_...`), which is safe for browsers.

```js
const SUPABASE_CONFIG = {
  url: 'https://ekwvogebxbvkjojkqszt.supabase.co',
  anonKey: 'sb_publishable_O7OoXVbYHs-4hCQmr3Slrg_2QQbT0i3'
};
```

> Note: the publishable key authenticates the PostgREST RPC calls used by the app.
> Never paste a `sb_secret_...` or `service_role` key into frontend code.

The chat now runs **two-layer retrieval**: live Supabase corpus first,
curated in-app library second, and every live source shows a **🌐 LIVE** badge.

## 5. Security model (already handled)

- Row Level Security: anonymous users can only `SELECT` rows where `verified = true`
- Search functions run as `security definer` — no direct table access needed
- Writes (adding new judgments) happen in the SQL Editor or via service role — never from the browser

## 6. Roadmap — semantic search (optional, later)

Full-text search already powers the app. To add meaning-based search:

1. Get an embeddings API key (OpenAI `text-embedding-3-small` etc.)
2. Add an `/api/embed` serverless function that calls it server-side (key never in browser)
3. Generate `embedding` values for `legal_chunks` and store them in the `embedding` column
4. The app automatically upgrades: `search_legal_docs(query_text, query_embedding, n)` uses pgvector cosine search (already implemented in `search_functions.sql`)

## 7. Growing the corpus (Phase 2–5)

Add new authorities by inserting into `legal_documents` + `legal_chunks` with full metadata
(`document_type`, `authority_level`, `source_url`, `verified`). Recommended order:

1. Central Acts — Contract Act, Specific Relief, CPC, Companies, Consumer Protection
2. Supreme Court judgments — Constitution Benches, landmark cases (chunk by paragraph)
3. High Court judgments (Allahabad, Delhi, Bombay, Madras…)
4. Gazette notifications, rules, circulars

**Golden rule:** every chunk must preserve its original source URL and metadata —
the AI is never allowed to cite anything that isn't in the corpus.
