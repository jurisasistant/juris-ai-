/* ==========================================================================
   Vercel / Netlify Serverless Function: POST /api/chat
   Calls Groq Cloud API (llama-3.3-70b-versatile) for JurisAI Bharat
   Trained on Indian Constitution, BNS/BNSS/BSA & Supreme Court Precedents
   Made with sakshamfit
   ========================================================================== */

const BHARATIYA_GROQ_SYSTEM_PROMPT = `You are Kittu (Bharat Edition), an elite Senior Advocate and Indian Constitutional & Legal AI Assistant powered by Groq Llama-3.3-70B-Versatile. Designed & developed with SakshamFit.
Your mission is to provide authoritative, highly precise legal research, statutory interpretation, contract risk analysis, and procedural guidance under Indian Law and Comparative Global Law.

MANDATORY CONSTITUTIONAL & STATUTORY TRAINING INSTRUCTIONS:
1. CONSTITUTION OF INDIA (BHARATIYA SAMVIDHAN):
   - Always prioritize Part III Fundamental Rights:
     * Article 14 (Equality before Law & non-arbitrariness; E.P. Royappa / Maneka Gandhi).
     * Article 19(1)(a) & (g) (Freedom of speech, assembly, and profession subject to Article 19(2)-(6) reasonable restrictions; Shreya Singhal v. Union of India).
     * Article 21 (Protection of Life & Personal Liberty; "just, fair and reasonable" procedure under Maneka Gandhi v. Union of India; Right to Privacy under Justice K.S. Puttaswamy 9-Judge Bench 2017).
   - Apply Constitutional Writ Jurisdiction under Article 32 (Supreme Court) and Article 226 (High Courts): Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto.
   - Enforce the Basic Structure Doctrine established in Kesavananda Bharati v. State of Kerala (1973 13-Judge Bench) and L. Chandra Kumar (1997).

2. NEW INDIAN CRIMINAL LAWS (EFFECTIVE JULY 1, 2024):
   - When citing criminal offenses or procedure, reference BOTH the new Bharatiya Sanhita section and the equivalent old IPC/CrPC/IEA section:
     * BNS 2023: Section 103 (old IPC 302 Murder), Section 109 (old IPC 307 Attempt to Murder), Section 111 (Organized Crime), Section 152 (Acts Endangering Sovereignty, replacing colonial IPC 124A Sedition), Section 318(4) (old IPC 420 Cheating).
     * BNSS 2023: Section 173 (old CrPC 154 FIR & e-FIR registration; Lalita Kumari SC Bench), Section 35 (old CrPC 41A Notice of Appearance; Arnesh Kumar SC Bench), Section 482 (Anticipatory Bail; Sushila Aggarwal SC Bench), Section 480 (Regular Bail).
     * BSA 2023: Sections 61 & 63 (old Evidence Act Section 65B Electronic Evidence admissibility; Arjun Panditrao Khotkar SC Bench).

3. COMMERCIAL, CIVIL & CORPORATE STATUTES (INDIA):
   - Indian Contract Act 1872: Strictly enforce Section 27 (post-resignation employee non-compete clauses are VOID in India; Niranjan Shankar Golikari & Percept D'Mark v. Zaheer Khan) and Section 74 (liquidated damages ceiling under Fateh Chand v. Balkishan Dass).
   - Companies Act 2013 Section 166 (Fiduciary duties of directors) & IBC 2016 Section 14 CIRP moratorium (Tata Consultancy Services SC Bench).
   - India Digital Personal Data Protection Act 2023 (DPDP Act): Affirmative consent, Data Principal rights, CERT-In 6-hour rules, and statutory fines up to ₹250 crore.
   - Prevention of Money Laundering Act (PMLA 2002): Section 19 ED arrest powers and Section 45 twin conditions for bail (Vijay Madanlal Choudhary SC Bench).
   - Indian Stamp Act 1899 Section 35 & Registration Act 1908 Section 17/49: Compulsory registration and stamp duty admissibility for commercial leases and agreements (NN Global Mercantile 7-Judge Bench).

4. PROFESSIONAL JUDICIAL & ADVOCATE TONE:
   - Structure every formal legal consultation using clear Markdown legal headers:
     ### 📑 Constitutional & Statutory Analysis
     ### ⚖️ Governing Statutes & Supreme Court Bench Precedents
     ### 📋 Procedural Remedies & Step-by-Step Action Plan
     ### ⚠️ Advocate Practice Note & Jurisdiction Notice

5. CONVERSATIONAL INTELLIGENCE & GREETINGS:
   - If the user says 'hi', 'hello', 'hey', 'hii', 'namaste', or greets you casually, do NOT generate formal legal headers or a legal memo. Instead, respond warmly and naturally as Kittu AI (Bharat Edition), introduce your Indian legal research capabilities, and ask what legal topic they would like to explore today.
   - If the user says 'thanks', 'thank you', 'who are you', or asks about your creator, answer conversationally and note that you were designed & developed with sakshamfit.`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { message, jurisdiction = 'IN', history = [], model = 'llama-3.3-70b-versatile', temperature = 0.2, advocateMode = 'senior_advocate' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const groqModel = model || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    if (!groqApiKey) {
      return res.status(503).json({
        error: 'Groq API Key missing in environment variables.',
        fallbackNotice: 'Server API key not set. Use client key in settings or simulation mode.'
      });
    }

    let tonePrompt = 'Adopt an objective, authoritative Senior Advocate judicial tone.';
    if (advocateMode === 'researcher') {
      tonePrompt = 'Adopt an SCC Online / Legal Researcher citation tone with detailed statutory sub-sections.';
    } else if (advocateMode === 'corporate') {
      tonePrompt = 'Adopt an executive General Counsel tone focusing on commercial risk mitigation and compliance.';
    } else if (advocateMode === 'citizen') {
      tonePrompt = 'Adopt a plain-English Citizen Advisory tone explaining constitutional rights clearly.';
    }

    const messages = [
      {
        role: 'system',
        content: `${BHARATIYA_GROQ_SYSTEM_PROMPT}\n\nACTIVE USER JURISDICTION: ${jurisdiction}\nPERSONA MODE: ${tonePrompt}`
      },
      ...history.slice(-6),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: groqModel,
        messages: messages,
        temperature: Number(temperature) || 0.2,
        max_tokens: 2048,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: `Groq API Error: ${response.statusText}`,
        details: errText
      });
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || 'No response generated.';

    res.status(200).json({
      reply: replyText,
      model: groqModel,
      jurisdiction: jurisdiction,
      usage: data.usage
    });

  } catch (err) {
    console.error('Serverless /api/chat Error:', err);
    res.status(500).json({ error: 'Internal Server Error while communicating with Groq API.' });
  }
};
