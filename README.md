# 🇮🇳 Barrister AI (JurisAI Bharat) — Indian Constitutional & Legal AI Research Workspace
### Powered by Groq Llama-3.3-70B-Versatile (Enterprise Samvidhan Edition v6.0)
**Designed & Developed with ❤️ by sakshamfit**

## 🌐 Real-Time Web Intelligence

JurisAI now combines **three knowledge channels** behind an 8-way query router:

| Channel | Example | Behavior |
|---|---|---|
| CASUAL | "how's your day?" | Normal chat — **no search** |
| STATIC_GENERAL | "what is photosynthesis?" | Plain model answer, no evidence chrome |
| LEGAL_STATIC | "What is Article 21?" | Supabase legal RAG + verification |
| LEGAL_RESEARCH | "Ram Mandir case" | Case-law retrieval + citation gate |
| LEGAL_CURRENT | "latest SC judgment on bail" | **Hybrid: legal RAG + live web**, merged evidence |
| WEB_GENERAL | "who is Virat Kohli?" | Live web search |
| WEB_CURRENT | "who won yesterday's match?" | Live web search, freshness-aware |

- **Server-side only**: the browser never calls Groq's web search directly — `/api/chat` orchestrates `groq/compound` (with `search_settings.country: "india"`) using the server secret.
- **Real citations, never fabricated**: sources come from Groq's `executed_tools[].search_results` (real titles + URLs + relevance scores). A client-side link verifier strips any URL in the answer that doesn't exist in the actual search results.
- **Honest failure**: if web search fails, the answer is *"I couldn't verify this from current sources"* — never a confident guess from model memory.
- **UI**: "🌐 Searching the web…" indicator, `🌐 Web searched · N sources` badge, and a tappable web-sources panel under the answer. No "LIVE" label unless a real web request occurred.
- **No caching of current information** — live scores, news and prices are never served stale.

---
## 🔎 Legal Search Engine & Evidence-First Architecture

**SEARCH FIRST → VERIFY EVIDENCE → ANSWER SECOND.** The LLM is never the source of truth for Indian law.

**Implemented (verified by 150 automated tests):**
- **Query understanding** (`LegalSearchService`): entity extraction (courts, years, sections, citations), abbreviation expansion (IPC→IPC, art→article), synonym expansion (ram mandir→Ayodhya/Siddiq; triple talaq→talaq-e-biddat), verified IPC→BNS cross-referencing, and index-grounded spelling correction.
- **Relevance-gated injection**: only sources with an actual match are injected (never the whole corpus). Zero relevant evidence → honest refusal: *"I couldn't verify this sufficiently from the available legal sources. Try a case name, citation, Act, section or legal issue."*
- **Claim-level verification**: generated sentences carrying legal markers (case names, citations, section numbers) with zero overlap against retrieved passages are removed as unsupported, with a "Claim check" note.
- **Citation verification**: every SCC/AIR/SCR/MANU/CriLJ citation is checked against the 108-case verified index; unverified citations are stripped.
- **Adversarial defense**: "make up a case", "assume Section X exists", "ignore your sources" → LOW gate, refuses to fabricate.
- **Supabase search engine v3**: exact citation/section priority, phrase + word + trigram-fuzzy + authority + freshness scoring, court/year/type filters, dedicated `search_citations`, `search_by_court`, `search_statutes`, `fuzzy_search` functions.
- **Search UI**: Library now has court/year/type filters + "🌐 Search live corpus" — browse sources first, then "Ask AI about this". LIVE badges appear only for sources actually retrieved this request.
- **Audit log**: every legal answer stores query, intent, evidence level and source IDs locally (for hallucination debugging; no secrets).

**Honest status — NOT yet production-grade.** Real legal search requires far more than 88 authorities. Remaining roadmap: broad judgment corpus (full texts, not summaries), pgvector embeddings, case relationship graphs (overruled/followed), amendment timelines, judge data, and High Court coverage. Fine-tuning is **not** the fix for legal hallucinations — RAG + verification is, and that is the direction this codebase takes.

---
## 🗄️ Supabase Integration (ready)

The app is wired for a live legal corpus — setup takes ~10 minutes (`supabase/setup.md`):

1. Create a Supabase project (region: **Mumbai ap-south-1**) and enable the **vector** extension.
2. Run the SQL in order: `supabase/schema.sql` → `supabase/search_functions.sql` → `supabase/seed.sql` (seeds all 28 verified authorities).
3. Paste your Project URL + anon key into `SUPABASE_CONFIG` in `app.js`.

Retrieval then runs **two layers**: the live Supabase corpus (full-text hybrid search + authority ranking, RLS-protected, `verified`-only) first, then the curated in-app library. Live sources appear in "Why this answer?" with a **🌐 LIVE** badge and an external "Open ↗" link to the official source. The SQL includes a pgvector semantic-search function (`match_legal_docs`) that activates automatically once embeddings are added.

---
## 🗄️ Legal RAG Roadmap (Supabase + pgvector)

The app ships a **curated verified legal library of 88 authorities**: the Constitution of India (Fundamental Rights, DPSP, reservations, religious freedom, minority rights, amendments), BNS/BNSS/BSA 2023 (26 IPC→BNS mappings incl. dowry death, kidnapping, theft/dacoity, cybercrime, bail), Central Acts (Contract, TPA, Limitation, Consumer Protection, RTI, IBC, Companies, NI Act, Labour Codes), Family & Succession (HMA, HSA, SMA, Muslim personal law, adoption, guardianship), and 30+ Supreme Court landmarks (Ram Janmabhoomi–Ayodhya, Kesavananda, S.R. Bommai, NALSA, Common Cause euthanasia, Bachan Singh, NJAC, Delhi Services, Anoop Baranwal, Supriyo…) — retrieved at answer time and injected into the model as evidence.

Next milestone — **live legal corpus** (`supabase/schema.sql` included, ready to run):

1. **Supabase project** → run `supabase/schema.sql` (pgvector enabled).
2. **Phase 1 core**: Constitution + BNS/BNSS/BSA with per-section metadata (`document_type`, `section`, `effective_from`, `authority_level: primary`, `verified: true`).
3. **Phase 2**: Central Acts (Contract Act, Companies Act, Consumer Protection, Arbitration, CPC…).
4. **Phase 3**: Supreme Court judgments — Constitution Benches and landmark cases, chunked with `bench`, `citation`, `source_url`.
5. **Phase 4**: High Courts. **Phase 5**: Gazette notifications, rules, circulars.

Every chunk preserves provenance (`official_source`, `source_url`, `verified`), and the **Citation Verifier queries the `citations` table before any citation is displayed**. Retrieval = hybrid (pgvector cosine + full-text) + authority re-ranking. The LLM never generates citations from memory.

---
## 🧭 Conversation Intent Router

Being a legal AI does **not** mean every message is about law:

- **Casual chat** ("how's your day?", "tell me a joke", "what's the weather?") → natural 1–3 sentence reply. No RAG, no citations, no evidence panel, no legal disclaimers, no "Legal Analysis" header.
- **Legal intent** (Article 21, BNS sections, bail, writs, drafting) → full retrieval + citation verification + confidence gate + "Why this answer?" sources.
- **Context-aware**: "which cases expanded *it*?" after an Article 21 discussion resolves to legal; "anyway, how's your day?" flips back to casual.
- **Honest AI**: no fake human experiences ("I had coffee"), no forced legal framing of general questions, and the fixed "BARRISTER AI (BHARAT)" header is now conditional — casual messages show just "✦ Barrister", legal answers get the "⚖️ Legal Analysis" tag.
- Router lives in the app (`classifyIntent`) with a server-side fallback classifier, so the API stays correct even if a client omits intent.

---
## ⚡ Production Legal AI Engine

Real conversational legal AI — not a demo wrapper:

- **True streaming** — tokens render as they arrive from Groq (SSE through `/api/chat`), with a **⏹️ Stop generating** control and AbortController.
- **Conversation memory** — recent turns + an automatic summary of older messages (bounded window), so "which cases expanded *it*?" resolves correctly.
- **Regenerate / Save / Copy / Read Aloud** actions on every answer; retry UI on network failure.
- **Quick ⚡ / Deep ⚖️ Research modes** — Deep mode runs a wider source sweep with contrary-authority analysis.
- **Retrieval-first answers** — matched legal-library sources are injected into the model as evidence ("AUTHORITATIVE SOURCES"), not left to model memory.
- **Auto conversation titles** — "Article 21 Research", "BNS Section 103"…
- **Contextual follow-up chips** — related questions generated from the actual answer (English/Hindi).
- **Concise "cut to cut" answers** — direct first line, bullets, no filler openers; length scales with question complexity.
- **Persona modes** — Advocate, Law Student, Citizen, Business.
- **Rate limiting (30 req/min/IP), input validation, streaming error handling, and observability logs** (request ID, model, latency, tokens — never keys).
- **Prompt-injection defense** — retrieved/user documents are treated as DATA, never instructions.

---
## 🛡️ Anti-Hallucination Trust Engine

Barrister never answers from memory alone. Every reply passes a **trust pipeline**:

1. **Retrieve** — the question is matched against the verified legal library (Constitution, BNS/BNSS/BSA 2023, Central Acts, Supreme Court precedents).
2. **Verify** — every citation in the reply is checked against an approved case index. Unverifiable citations are **stripped** before display.
3. **Confidence gate** — each answer carries an evidence badge: 🛡️ HIGH (answer normally) · MEDIUM (qualified) · LOW (refuses to speculate, asks you to consult an advocate).
4. **Prove** — a "🔍 Why this answer?" panel lists the exact sources used, with one-click access to the library.

The AI is system-prompted to never invent cases, citations, sections, quotations, judges, or dates — and to say *"I do not have sufficient authoritative evidence to answer this reliably"* rather than guess.

---
**Barrister AI** (JurisAI Bharat) is a premium Indian legal-tech AI research platform trained on the **Constitution of India (Bharatiya Samvidhan)**, **Bharatiya Nyaya Sanhita (BNS 2023)**, **Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)**, **Bharatiya Sakshya Adhiniyam (BSA 2023)**, and Central Acts. Built strictly to the **JurisAI Bharat Design System**: ultra-minimal slate & muted champagne gold palette (`#C6A86B`), crisp SVG iconography, intelligent, trustworthy, visually refined with subtle glassmorphism, and 100% compatible across all mobile screens.

---

## 🔥 Recommended MVP (Top 10 Indian Legal Research Platform Features)

1. **AI Legal Assistant (`#chat-view`):** Natural language legal questions with structured Markdown answers, **"Explain Like I'm..." Mode Selector** (`👨‍⚖️ Advocate | 🎓 Student | 👤 Citizen | 🧑‍💼 Business`), and bilingual **English / हिन्दी / Hinglish** support.
2. **Global Legal Search (`⌘K` / `Ctrl+K` Command Center):** Search Constitution Articles, BNS/BNSS sections, case law, and research prompts from anywhere in the workspace.
3. **Citation Engine:** Important constitutional claims and Supreme Court benches render as interactive citation pills (`statute-pill`, `case-pill`) that open authoritative source drawers.
4. **Constitution Explorer (`#const-view`):** Interactive browsing of Part III Fundamental Rights (Art. 14, 19, 21), Writ Jurisdiction (Art. 32/226), DPSP, and the Basic Structure Doctrine.
5. **BNS / BNSS / BSA Explorer (`#sanhita-view`):** Side-by-side Comparative Law Table mapping old colonial codes (`IPC 302`, `IPC 420`, `IPC 124A`, `CrPC 154`, `CrPC 41A`, `IEA 65B`) to new Bharatiya Sanhitas (`BNS 103`, `BNS 318`, `BNS 152`, `BNSS 173`, `BNSS 35`, `BSA 63`).
6. **Case Law Search (`#knowledge-view`):** 32 verified Supreme Court and High Court constitutional, criminal, and commercial authorities.
7. **Case Summarization & Side-by-Side Comparison (`#case-compare-modal`):** Interactive matrix comparing facts, constitutional issues, and ratios across landmark benches (*Maneka Gandhi*, *Puttaswamy*, *Kesavananda Bharati*, *Shreya Singhal*).
8. **Document Upload + Analysis (`#analyzer-view`):** Risk detector highlighting Section 27 void restraints, Section 35 Stamp Act inadmissibility, and Section 74 damages ceilings.
9. **Research Workspaces (`#workspace-view`):** Organize research projects (`📁 Contract Dispute`, `📁 Constitutional Privacy`, `📁 Cheque Bounce`) and export formal legal memos to PDF/DOCX/Markdown.
10. **Save / History (`#saved-view`):** One-click **"⭐ Save Research"** bookmarking and consultation history dashboard.

---

## 🕸️ Obsidian Vault Brain (`juris-vault/`) & Legal Drafting Suite

* **Obsidian Knowledge Brain (`juris-vault-obsidian.zip`):** Downloadable folder containing 46 deeply interconnected Markdown (`.md`) files using Obsidian `[[WikiLinks]]` syntax across Constitutional Articles, Supreme Court Benches, BNS/BNSS/BSA codes, and Contract Act Section 27.
* **Interactive Constitutional Node Graph (`#graph-view` ➔ `🕸️ Legal Node Graph`):** Interactive visual node network inside the web app where you can click nodes (`Article 21`, `Puttaswamy`, `Maneka Gandhi`, `DPDP Act`, `Article 14`, `Vishaka`, `POSH`, `Article 19(1)(a)`, `Shreya Singhal`, `BNS 152`, `Contract Act Sec 27`, `Basic Structure`, `Kesavananda Bharati`) to view connected `[[WikiLinks]]` and open them in Barrister AI!
* **Automated Legal Drafting Suite (`#drafting-view` ➔ `🖋️ Legal Drafting Suite`):** Live-binding drafting wizard for statutory formats:
  * `🇮🇳 RTI Application under Section 6(1) of RTI Act 2005`
  * `🇮🇳 Section 138 Cheque Bounce Statutory Demand Notice`
  * `🇮🇳 Constitutional Writ Petition Notice (Article 226 / 32)`
  * `🇮🇳 POSH Act 2013 Internal Complaints Committee (ICC) Complaint`
  * `🇮🇳 DPDP Act 2023 Article 17 Right to Erasure Notice`
  * `🇮🇳 Section 80 CPC Notice against Government Authority`

---

## ⚡ Out-of-the-Box Operation
* **Zero User Configuration Needed:** Barrister AI works immediately out-of-the-box with built-in Groq Llama-3.3-70B-Versatile intelligence and our embedded Bharatiya Legal Engine.
* **User Customization (`⚙️ AI Engine Settings`):**
  * Select your **Advocate Bench Persona Mode** (*Senior Advocate Bench Mode*, *SCC Online Legal Researcher*, *General Counsel Corporate Mode*, or *Citizen RTI Plain-English Mode*).
  * Adjust the **Reasoning Precision Slider** (`0.2 — Strict Constitutional Accuracy`).
  * DPDP Act 2023 local storage privacy guarantee & one-click clear history button.

---

## 🐙 How to Push This Repository to GitHub

### Option A: Using Git Command Line
Open your terminal inside the project folder (`/home/user`) and run:
```bash
git init
git add .
git commit -m "feat: Barrister AI Bharat Enterprise v6.0 with Obsidian Legal Brain"
git branch -M main
git remote add origin https://github.com/sakshamfit/juris-ai-.git
git push -u origin main
```

### Option B: Upload Directly via GitHub Web Interface
1. Go to **[github.com/new](https://github.com/new)** and create a new repository named `juris-ai-`.
2. Click **"uploading an existing file"** on the quick setup page.
3. Drag and drop all project files (`index.html`, `styles.css`, `app.js`, `server.js`, `api/chat.js`, `package.json`, `.gitignore`, `README.md`, etc.).
4. Click **Commit changes**.

---

## ❤️ Credits & Attribution
* **Designed & Developed by:** `sakshamfit`
* **Version:** `6.0 Enterprise Bharatiya Samvidhan Edition`
