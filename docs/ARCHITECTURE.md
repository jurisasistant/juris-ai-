# JurisAI Bharat — Production Architecture

**Principle:** the LLM is never the source of truth. Retrieve evidence first, reason over it, verify every claim, then answer. No fine-tuning required — this is a RAG + verification architecture, not a "trained lawyer".

```
                          ┌──────────────┐
                          │     USER     │
                          └──────┬───────┘
                                 ▼
                          ┌──────────────┐
                          │  JURISAI UI  │   (static app + PWA, Vercel)
                          └──────┬───────┘
                                 ▼
                      ┌────────────────────┐
                      │  AI ORCHESTRATOR   │   (api/chat.js serverless)
                      └─────────┬──────────┘
                                ▼
                      ┌────────────────────┐
                      │   INTENT ROUTER    │   classifyQuery() — 9 channels
                      └─────────┬──────────┘
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
      ┌───────────┐       ┌───────────┐       ┌───────────┐
      │ LEGAL RAG │       │ WEB SEARCH│       │  MEMORY   │
      │ Supabase  │       │ LangSearch│       │ Supabase  │
      │ 97 auth.  │       │ + Wikipedia      │ devices   │
      └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
            └───────────────────┼───────────────────┘
                                ▼
                        ┌───────────────┐
                        │   EVIDENCE    │   relevance gate + authority
                        │   RANKING     │   ranking + dedupe
                        └───────┬───────┘
                                ▼
                      ┌──────────────────┐
                      │  AI MODEL CHAIN  │  Groq (primary) → NVIDIA NIM
                      │  (provider router│  fallback w/ 3-min cooldown,
                      │   + streaming)   │  timeouts, non-stream retry
                      └────────┬─────────┘
                               ▼
                      ┌──────────────────┐
                      │ CLAIM VERIFIER   │  citation gate (117 cases) +
                      └────────┬─────────┘  claim-to-evidence overlap +
                               ▼            zero-source refusal
                      ┌──────────────────┐
                      │  FINAL RESPONSE   │
                      │  + CITATIONS      │
                      └──────────────────┘
```

## Implemented vs. roadmap

| Layer | Status | Implementation |
|---|---|---|
| Intent router | ✅ | `classifyQuery()` — CASUAL, STATIC_GENERAL, LEGAL_STATIC, LEGAL_RESEARCH, LEGAL_CURRENT, WEB_GENERAL, WEB_CURRENT, MATH, TIME |
| Legal RAG | ✅ | Supabase PostgreSQL + pgvector-ready schema, 97 verified authorities, deterministic hybrid search (exact citation/section priority, trigram fuzzy, authority + freshness ranking) |
| Web search | ✅ | Provider cascade: Groq compound → LangSearch → Brave → Wikipedia; strictly grounded generation (facts only from results) |
| AI model router | ✅ | `getAIProvider()` — Groq primary, NVIDIA NIM (`z-ai/glm-5.2`) fallback, per-instance cooldown + self-healing re-try, 20s hard timeouts, streaming with non-stream fallback |
| Conversation memory | ✅ | localStorage (offline source of truth) + **Supabase sync** (`save_conversation` / `load_conversations` security-definer functions, device-scoped) |
| Evidence ranking | ✅ | Title-weighted retrieval, remote→local merge with dedupe, relevance gate (no irrelevant injections) |
| Claim verification | ✅ | Citation gate (117 verified citations), claim-to-evidence overlap check (unsupported claims stripped), zero-verified-source refusal |
| Verification layer | ✅ | "Why this answer?" panel, 🌐 LIVE/OFFICIAL/VERIFIED labels, audit log |
| Frontend/API | ✅ | Vercel static + PWA, REST `/api/chat` + `/api/health` |
| Vector embeddings | 🟡 Schema ready | pgvector columns + `match_legal_docs()` exist; embeddings provider can be added later |
| Multi-agent / LangGraph | 🔜 Later | Current lightweight orchestrator covers the needs; specialized legal sub-agents only if scale demands |
| AWS / Docker | 🔜 Later | Vercel + Supabase cover current scale |

## Golden rules

1. **Evidence first, reasoning second, answer third.**
2. Zero verified sources → refuse: *"I will provide you with the relevant information based on the verified legal sources…"* — never answer from memory.
3. No fabricated citations, ever — the model can only cite what the citation gate approves.
4. Casual chat never triggers legal machinery; legal questions never get casual deflection.
