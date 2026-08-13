/* ==========================================================================
   JurisAI - AI Legal Assistant & Adviser
   Enterprise Legal Tech Engine (v5.0 Bharatiya Samvidhan & Law Trained Edition)
   ========================================================================== */

// --- Global Application State ---
const AppState = {
  currentView: 'knowledge-view', // Launch into Bharatiya Constitution & Law Library
  jurisdiction: 'IN', // Default: IN (India - Bharatiya Samvidhan, BNS/BNSS/BSA & Central Acts)
  theme: localStorage.getItem('jurisai_theme_bright') || 'light',
  groqModel: 'llama-3.3-70b-versatile',
  researchMode: 'instant', // 'instant' | 'deep'
  asOfDate: '2026-08-11', // '2026-08-11' | '2024-07-01' | '2023-08-11' | '2017-08-24'
  chatHistory: JSON.parse(localStorage.getItem('jurisai_chat_history') || '[]'),
  activeChatId: null,
  disclaimerAccepted: localStorage.getItem('jurisai_disclaimer') === 'true',
  analyzerSelectedSample: 'in_contract',
  kbCategory: 'all',
  kbJurisdictionFilter: 'IN',
  kbSearchTerm: ''
};

// --- Jurisdiction Display Metadata ---
const JURISDICTION_INFO = {
  IN: { name: 'India (Bharat — Samvidhan & Central Acts)', flag: '🇮🇳', code: 'IN' },
  US: { name: 'United States (Federal & State)', flag: '🇺🇸', code: 'US' },
  UK: { name: 'United Kingdom (English Law)', flag: '🇬🇧', code: 'UK' },
  EU: { name: 'European Union (EU/GDPR Law)', flag: '🇪🇺', code: 'EU' },
  CA: { name: 'Canada (Federal & Provincial)', flag: '🇨🇦', code: 'CA' },
  AU: { name: 'Australia (Commonwealth Law)', flag: '🇦🇺', code: 'AU' }
};

// --- 🇮🇳 BHARATIYA STATUTE CONVERTER & QUICK REFERENCE DICTIONARY ---
const BHARATIYA_STATUTE_MAP = {
  "420": {
    old: "IPC Section 420 (Cheating & Dishonestly Inducing Delivery)",
    newSection: "BNS 2023 Section 318(4)",
    title: "Cheating and dishonestly inducing delivery of property",
    summary: "Punishable with imprisonment up to 7 years and fine. BNS Section 318 simplifies economic deception and cheating offenses.",
    precedent: "Shri Ram v. State of UP (SC) — Requires fraudulent or dishonest intention at the time of making the promise."
  },
  "302": {
    old: "IPC Section 302 (Punishment for Murder)",
    newSection: "BNS 2023 Section 103",
    title: "Punishment for Murder (Homicide)",
    summary: "Punishable with death or imprisonment for life, and fine. Sub-section (2) introduces specific statutory punishment for mob lynching.",
    precedent: "Bachan Singh v. State of Punjab (SC 1980) — Rarest of rare doctrine for death penalty."
  },
  "307": {
    old: "IPC Section 307 (Attempt to Murder)",
    newSection: "BNS 2023 Section 109",
    title: "Attempt to Murder",
    summary: "Punishable with imprisonment up to 10 years and fine; if hurt is caused, liable to life imprisonment.",
    precedent: "State of Maharashtra v. Balram Bama Patil (SC 1983) — Intention is gathered from weapon used and body part targeted."
  },
  "124a": {
    old: "IPC Section 124A (Sedition - Colonial Law)",
    newSection: "BNS 2023 Section 152",
    title: "Act endangering sovereignty, unity and integrity of India",
    summary: "Colonial sedition (IPC 124A) is repealed. BNS Section 152 targets secessionist acts, armed rebellion, and subversive activities against Indian sovereignty.",
    precedent: "S.G. Vombatkere v. Union of India (SC 2022) — Supreme Court stayed colonial Section 124A pending legislative repeal."
  },
  "498a": {
    old: "IPC Section 498A (Cruelty by Husband or Relatives)",
    newSection: "BNS 2023 Section 85 & 86",
    title: "Cruelty to Woman by Husband or his Relatives",
    summary: "Punishable with imprisonment up to 3 years and fine. Protects women from willful conduct driving injury or dowry coercion.",
    precedent: "Arnesh Kumar v. State of Bihar (SC 2014) — Mandatory police check before automatic arrest in cruelty cases."
  },
  "376": {
    old: "IPC Section 376 (Punishment for Rape)",
    newSection: "BNS 2023 Section 63 & 64",
    title: "Rape & Sexual Offenses against Women",
    summary: "Punishable with rigorous imprisonment not less than 10 years up to life imprisonment. Section 69 separately penalizes sexual intercourse by deceitful promise of marriage.",
    precedent: "Mukesh & Anr v. State for NCT of Delhi (SC 2017) — Landmark gender justice and victim protection standards."
  },
  "111": {
    old: "New Statutory Provision in BNS 2023",
    newSection: "BNS 2023 Section 111",
    title: "Organized Crime & Economic Syndicates",
    summary: "First Central statutory codification of Organized Crime, targeting land grabbing, hawala, contract killing, and economic syndicates.",
    precedent: "State of Maharashtra v. Vishwanath Maranna Shetty (SC) — Organized crime requires continuing unlawful activity."
  },
  "154": {
    old: "CrPC Section 154 (FIR Registration)",
    newSection: "BNSS 2023 Section 173",
    title: "Information in Cognizable Offense (FIR & e-FIR)",
    summary: "Mandatory FIR registration. Introduces e-FIR (electronic FIR) and allows preliminary police inquiry within 14 days for offenses punishable between 3 and 7 years.",
    precedent: "Lalita Kumari v. Govt of UP (SC Constitution Bench 2014) — Registration of FIR is mandatory if information discloses cognizable offense."
  },
  "41a": {
    old: "CrPC Section 41A (Notice of Appearance before Police)",
    newSection: "BNSS 2023 Section 35",
    title: "Notice of Appearance & Arrest Restrictions",
    summary: "Police must issue written Notice of Appearance for offenses punishable up to 7 years instead of routine arrest.",
    precedent: "Arnesh Kumar v. State of Bihar (SC 2014) — Non-compliance with notice rules triggers contempt against police officers."
  },
  "438": {
    old: "CrPC Section 438 (Anticipatory Bail)",
    newSection: "BNSS 2023 Section 482",
    title: "Direction for Grant of Bail to Person Apprehending Arrest",
    summary: "High Court or Court of Session may direct that in the event of arrest, the applicant shall be released on bail.",
    precedent: "Sushila Aggarwal v. State (NCT of Delhi) (SC 5-Judge Bench 2020) — Anticipatory bail protection generally continues till end of trial."
  },
  "439": {
    old: "CrPC Section 439 (Regular Bail)",
    newSection: "BNSS 2023 Section 480 & 483",
    title: "Special Powers of High Court / Session Court regarding Bail",
    summary: "Empowers High Court and Sessions Court to release an accused in custody on regular bail upon appropriate surety conditions.",
    precedent: "Satender Kumar Antil v. CBI (SC 2022) — Supreme Court laid down structured bail categories avoiding unnecessary undertrial detention."
  },
  "65b": {
    old: "Indian Evidence Act Section 65B (Electronic Certificate)",
    newSection: "BSA 2023 Section 61 & 63",
    title: "Admissibility of Electronic & Digital Records",
    summary: "Electronic records (server logs, emails, CCTV, WhatsApp) are recognized as primary evidence. Section 63 simplifies digital custody hash certification.",
    precedent: "Arjun Panditrao Khotkar v. Kailash Kushanrao (SC 3-Judge Bench 2020) — Clarified mandatory nature of electronic certificates."
  },
  "14": {
    old: "Constitution of India Article 14",
    newSection: "Bharatiya Samvidhan Art. 14",
    title: "Equality Before Law & Non-Arbitrariness",
    summary: "The State shall not deny to any person equality before the law or equal protection of laws. Forbids class legislation; requires reasonable classification.",
    precedent: "E.P. Royappa v. State of Tamil Nadu (SC 1974) — Equality is dynamic; arbitrariness is the sworn enemy of equality."
  },
  "19": {
    old: "Constitution of India Article 19(1)(a) - (g)",
    newSection: "Bharatiya Samvidhan Art. 19",
    title: "Freedom of Speech, Assembly, Movement & Profession",
    summary: "Guarantees 6 fundamental freedoms to citizens, subject to reasonable statutory restrictions under Art. 19(2) to 19(6).",
    precedent: "Shreya Singhal v. Union of India (SC 2015) — Struck down Section 66A of IT Act for violating free speech under Art. 19(1)(a)."
  },
  "21": {
    old: "Constitution of India Article 21",
    newSection: "Bharatiya Samvidhan Art. 21",
    title: "Protection of Life, Personal Liberty & Right to Privacy",
    summary: "No person shall be deprived of life or personal liberty except according to procedure established by law.",
    precedent: "Justice K.S. Puttaswamy v. Union of India (SC 9-Judge Bench 2017) — Right to Privacy is an intrinsic Fundamental Right under Article 21."
  },
  "32": {
    old: "Constitution of India Article 32",
    newSection: "Bharatiya Samvidhan Art. 32",
    title: "Remedies for Enforcement of Fundamental Rights (Supreme Court)",
    summary: "The Fundamental Right to move the Supreme Court directly for enforcement of Part III rights via Writs (Habeas Corpus, Mandamus, Certiorari, etc.).",
    precedent: "Kesavananda Bharati v. State of Kerala (SC 13-Judge Bench 1973) — Basic Structure Doctrine; judicial review under Art. 32 cannot be abridged."
  },
  "226": {
    old: "Constitution of India Article 226",
    newSection: "Bharatiya Samvidhan Art. 226",
    title: "Power of High Courts to Issue Constitutional Writs",
    summary: "High Courts can issue writs both for enforcement of Fundamental Rights and for 'any other legal purpose' (administrative arbitrariness).",
    precedent: "L. Chandra Kumar v. Union of India (SC 7-Judge Bench 1997) — Writ jurisdiction of High Courts is a basic feature of the Constitution."
  },
  "27": {
    old: "Indian Contract Act 1872 Section 27",
    newSection: "Contract Act Section 27",
    title: "Agreement in Restraint of Trade Void",
    summary: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business is void. Bans post-resignation non-competes.",
    precedent: "Niranjan Shankar Golikari (SC 1967) & Percept D'Mark v. Zaheer Khan (SC 2006) — Post-exit employee non-competes are void in India."
  },
  "74": {
    old: "Indian Contract Act 1872 Section 74",
    newSection: "Contract Act Section 74",
    title: "Compensation for Breach of Contract (Liquidated Damages)",
    summary: "When a contract names a penalty sum, the aggrieved party is entitled to receive reasonable compensation not exceeding the amount named.",
    precedent: "Fateh Chand v. Balkishan Dass (SC 1963) — Stipulated damages act as a ceiling; court awards only reasonable actual loss proved."
  },
  "138": {
    old: "Negotiable Instruments Act 1881 Section 138",
    newSection: "NI Act Section 138",
    title: "Dishonour of Cheque for Insufficiency of Funds",
    summary: "Criminal offense punishable by 2 years imprisonment or fine up to twice the cheque amount. Requires 30-day legal notice after bank return.",
    precedent: "Dashrath Rupsingh Rathod (SC) & K. Bhaskaran (SC) — Strict adherence to 30-day statutory notice and bank branch jurisdiction."
  },
  "45": {
    old: "Prevention of Money Laundering Act (PMLA 2002) Section 45",
    newSection: "PMLA Section 45",
    title: "Twin Conditions for Bail in Money Laundering Offenses",
    summary: "Accused can be granted bail only if Public Prosecutor opposes and Court is satisfied there are reasonable grounds believing accused is not guilty.",
    precedent: "Vijay Madanlal Choudhary v. Union of India (SC 3-Judge Bench 2022) — Upheld constitutional validity of PMLA ED arrest and Section 45 bail rigor."
  },
  "304b": {
    old: "IPC Section 304B (Dowry Death)",
    newSection: "BNS 2023 Section 80",
    title: "Dowry Death of a Woman within 7 Years of Marriage",
    summary: "Where death of a woman is caused by burns or bodily injury within 7 years of marriage and she was subjected to dowry cruelty, husband or relative is guilty. Minimum 7 years to life imprisonment.",
    precedent: "Shanti v. State of Haryana (SC) — Codified presumption of dowry death under Section 113B Evidence Act / BSA 2023."
  },
  "354": {
    old: "IPC Section 354 (Assault or Modesty of Woman)",
    newSection: "BNS 2023 Section 74",
    title: "Assault or Criminal Force to Woman with Intent to Outrage Modesty",
    summary: "Punishable with imprisonment not less than 1 year up to 5 years, and fine. Protects women from physical molestation and harassment.",
    precedent: "Rupan Deol Bajaj v. K.P.S. Gill (SC 1995) — Modesty of a woman is an attribute associated with female decency."
  },
  "406": {
    old: "IPC Section 406 (Criminal Breach of Trust)",
    newSection: "BNS 2023 Section 316",
    title: "Criminal Breach of Trust",
    summary: "Whoever is entrusted with property and dishonestly misappropriates or converts it to his own use commits criminal breach of trust. Up to 5 years jail.",
    precedent: "Velji Raghavji Patel v. State of Maharashtra (SC) — Entrustment and dishonest conversion are essential ingredients."
  },
  "500": {
    old: "IPC Section 499 & 500 (Defamation / Maanhani)",
    newSection: "BNS 2023 Section 356",
    title: "Defamation (Maanhani)",
    summary: "Publishing false imputations harming a person's reputation. BNS Section 356 introduces Community Service as an alternative punishment.",
    precedent: "Subramanian Swamy v. Union of India (SC 2016) — Upheld criminal defamation as reasonable restriction under Art. 19(2)."
  },
  "506": {
    old: "IPC Section 506 (Criminal Intimidation / Dhamki)",
    newSection: "BNS 2023 Section 351",
    title: "Criminal Intimidation (Dhamki)",
    summary: "Threatening another person with injury to person, reputation, or property to alarm them. Punishable with up to 2 to 7 years jail.",
    precedent: "Manik Taneja v. State of Karnataka (SC) — Mere outburst of anger without intention to alarm is not criminal intimidation."
  },
  "144": {
    old: "CrPC Section 144 (Prohibitory Orders / Curfew)",
    newSection: "BNSS 2023 Section 163",
    title: "Power to Issue Order in Urgent Cases of Nuisance or Apprehended Danger",
    summary: "Empowers Executive Magistrate to issue immediate prohibitory orders restricting assembly of 4 or more persons to prevent public danger.",
    precedent: "Anuradha Bhasin v. Union of India (SC 2020) — Section 144 orders cannot be used to suppress legitimate expression or dissent."
  }
};

// --- Comprehensive Bharatiya Legal Knowledge Base (32 Exhaustive Research Authorities) ---
const KNOWLEDGE_BASE_ARTICLES = [
  // ==================== 1. CONSTITUTION OF INDIA (BHARATIYA SAMVIDHAN) ====================
  {
    id: 'kb-in-const-fundamental-rights',
    title: 'Constitution of India: Fundamental Rights (Articles 14, 19, 21)',
    category: 'Indian Constitution',
    categoryCode: 'constitution',
    jurisdiction: 'IN',
    statutes: ['Const. India Art. 14, 19, 21', 'Puttaswamy Privacy Ruling', 'Maneka Gandhi Due Process'],
    summary: 'The Golden Triangle of the Bharatiya Constitution: Equality before law, Freedom of speech & expression, and Right to life, liberty & privacy.',
    executiveSummary: 'Articles 14, 19, and 21 form the "Golden Triangle" of the Indian Constitution (Bharatiya Samvidhan). Article 14 prohibits state arbitrariness and guarantees equal protection of laws. Article 19(1)(a) protects freedom of speech and expression subject to reasonable restrictions under Art. 19(2). Article 21 guarantees that no person shall be deprived of life or personal liberty except according to just, fair, and reasonable procedure established by law.',
    governingStatutes: `
      * **Constitution of India Article 14:** The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.
      * **Constitution of India Article 19(1)(a) & (g):** Freedom of speech and expression; right to practice any profession, or to carry on any occupation, trade, or business.
      * **Constitution of India Article 21:** No person shall be deprived of his life or personal liberty except according to procedure established by law.
    `,
    landmarkPrecedents: `
      * **Justice K.S. Puttaswamy v. Union of India (SC 9-Judge Bench 2017):** Unanimously declared the Right to Privacy as an intrinsic Fundamental Right protected under Article 21 and Part III of the Constitution.
      * **Maneka Gandhi v. Union of India (SC 1978):** Expanded Article 21 to mandate that any statutory procedure depriving liberty must be "just, fair, and reasonable" and not arbitrary.
      * **Shreya Singhal v. Union of India (SC 2015):** Struck down Section 66A of the IT Act for violating freedom of speech under Article 19(1)(a).
    `,
    complianceChecklist: [
      'Verify that any executive or administrative action affecting citizen rights satisfies the doctrine of proportionality established in Puttaswamy.',
      'Ensure data collection by state or private fiduciaries complies with lawful necessity and consent mandates.',
      'In administrative decisions, observe the principles of Natural Justice (Audi Alteram Partem - right to be heard) to satisfy Article 14 non-arbitrariness.'
    ],
    askAIPrompt: 'Explain how the Golden Triangle of Articles 14, 19, and 21 of the Indian Constitution and the Supreme Court Puttaswamy ruling protect citizen privacy and freedom.'
  },
  {
    id: 'kb-in-const-writs-remedies',
    title: 'Constitutional Writs & Judicial Review (Articles 32 & 226)',
    category: 'Indian Constitution',
    categoryCode: 'constitution',
    jurisdiction: 'IN',
    statutes: ['Const. India Art. 32 & 226', 'Basic Structure Doctrine', 'Kesavananda Bharati Precedent'],
    summary: 'The heart and soul of the Constitution: Filing Writ Petitions (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) in Supreme Court & High Courts.',
    executiveSummary: 'Dr. B.R. Ambedkar termed Article 32 the "heart and soul" of the Constitution of India. It grants citizens the Fundamental Right to move the Supreme Court directly for the enforcement of Part III rights. Article 226 empowers High Courts to issue writs both for Fundamental Rights and any other legal purpose.',
    governingStatutes: `
      * **Constitution of India Article 32:** Remedies for enforcement of Fundamental Rights conferred by Part III.
      * **Constitution of India Article 226:** Empowering High Courts to issue directions, orders, or writs including Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.
      * **Article 13(2):** The State shall not make any law which takes away or abridges the rights conferred by Part III, and any law made in contravention shall be void.
    `,
    landmarkPrecedents: `
      * **Kesavananda Bharati v. State of Kerala (SC 13-Judge Bench 1973):** Established the "Basic Structure Doctrine"—Parliament's amending power under Article 368 cannot alter or destroy the fundamental basic structure of the Constitution (including judicial review, equality, and federalism).
      * **L. Chandra Kumar v. Union of India (SC 1997):** Ruled that the power of judicial review vested in High Courts under Art. 226 and Supreme Court under Art. 32 is an inviolable basic feature of the Constitution.
    `,
    complianceChecklist: [
      'Identify the specific Writ required: Mandamus (commanding official duty), Certiorari (quashing arbitrary tribunal order), Habeas Corpus (illegal detention), or Prohibition (exceeding jurisdiction).',
      'Verify whether alternative statutory remedies have been exhausted before filing under Article 226, unless fundamental rights are directly breached.',
      'Ensure the respondent entity qualifies as "State" or public authority under Article 12 of the Constitution.'
    ],
    askAIPrompt: 'What are the 5 Constitutional Writs under Articles 32 and 226 of the Indian Constitution, and when can a Mandamus or Certiorari writ petition be filed?'
  },

  // ==================== 2. CRIMINAL LAW: BNS 2023 / BNSS 2023 / BSA 2023 ====================
  {
    id: 'kb-in-bns-bnss-bsa-criminal-law',
    title: 'Bharatiya Nyaya Sanhita (BNS 2023) & Criminal Law Transition',
    category: 'Criminal Law (BNS/BNSS)',
    categoryCode: 'criminal',
    jurisdiction: 'IN',
    statutes: ['BNS 2023 (replaces IPC)', 'BNSS 2023 (replaces CrPC)', 'BSA 2023 (replaces Evidence Act)'],
    summary: 'Complete transition guide from IPC 1860, CrPC 1973, and Evidence Act 1872 to the new Bharatiya Nyaya Sanhita, Nagarik Suraksha Sanhita, and Sakshya Adhiniyam.',
    executiveSummary: 'Effective July 1, 2024, India replaced its colonial criminal law trilogy with three Bharatiya Sanhitas: Bharatiya Nyaya Sanhita (BNS 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), and Bharatiya Sakshya Adhiniyam (BSA 2023). The new laws modernize offenses, establish strict investigation timelines, and recognize electronic evidence as primary records.',
    governingStatutes: `
      * **BNS 2023 Section 111 (Organized Crime):** Introduces stringent statutory penalties for syndicates, economic offenses, and cybercrime.
      * **BNS 2023 Section 152 (Acts Endangering Sovereignty):** Replaces colonial Section 124A (Sedition) with specific offenses targeting secessionism and armed rebellion.
      * **BNSS 2023 Section 173 (e-FIR & Timeline):** Allows electronic FIR filing and mandates preliminary inquiry in specific offenses within 14 days.
      * **BSA 2023 Sections 61 & 63 (Electronic Evidence):** Recognizes digital server logs, hash values, and emails as primary evidence without requiring old Section 65B secondary certificates.
    `,
    landmarkPrecedents: `
      * **Anvar P.V. v. P.K. Basheer (SC 2014) & Arjun Panditrao Khotkar (SC 2020):** Standardized electronic record admissibility—now codified with streamlined digital verification under BSA 2023 Section 63.
      * **Arnesh Kumar v. State of Bihar (SC 2014):** Statutory notice of appearance under BNSS Section 35 required before police arrest for offenses under 7 years.
    `,
    complianceChecklist: [
      'Update all criminal complaints, FIR references, and compliance checklists from IPC/CrPC sections to equivalent BNS/BNSS statutory sections.',
      'For electronic evidence, maintain verifiable digital hash custody logs to ensure immediate admissibility under BSA 2023 Section 63.',
      'Observe mandatory videography requirements during police search, seizure, and forensic collection under BNSS 2023.'
    ],
    askAIPrompt: 'How does the Bharatiya Nyaya Sanhita (BNS 2023) and Bharatiya Sakshya Adhiniyam (BSA 2023) change criminal investigation and electronic evidence in India?'
  },
  {
    id: 'kb-in-pmla-money-laundering',
    title: 'Prevention of Money Laundering Act (PMLA 2002): Arrest & Bail Rigor',
    category: 'Criminal Law (BNS/BNSS)',
    categoryCode: 'criminal',
    jurisdiction: 'IN',
    statutes: ['PMLA 2002 Sec. 3, 19, 45', 'Vijay Madanlal SC Bench', 'BNSS 2023 Bail Rules'],
    summary: 'ED arrest powers under Section 19, attachment of proceeds of crime, and twin conditions for bail under Section 45.',
    executiveSummary: 'The Prevention of Money Laundering Act 2002 (PMLA) gives the Enforcement Directorate (ED) broad statutory powers to attach proceeds of crime and arrest individuals under Section 19. Under Section 45, bail is subject to rigorous "twin conditions"—the court must be satisfied there are reasonable grounds to believe the accused is not guilty.',
    governingStatutes: `
      * **PMLA Section 3 (Offense of Money Laundering):** Whosoever directly or indirectly attempts to indulge or knowingly assists in any process connected with proceeds of crime is guilty.
      * **PMLA Section 19 (Power to Arrest):** ED officer can arrest if they have reason to believe (recorded in writing) that a person is guilty of money laundering.
      * **PMLA Section 45 (Twin Conditions for Bail):** Public Prosecutor must be given opportunity to oppose bail; court must be satisfied there are reasonable grounds believing accused is not guilty and not likely to commit offense while on bail.
    `,
    landmarkPrecedents: `
      * **Vijay Madanlal Choudhary v. Union of India (SC 3-Judge Bench 2022):** Upheld the constitutional validity of PMLA ED arrest powers, attachment rules, and the Section 45 twin conditions for bail.
      * **Arvind Kejriwal v. Directorate of Enforcement (SC 2024):** Examined "necessity of arrest" and interim bail protections for public representatives during national elections.
    `,
    complianceChecklist: [
      'Verify whether the predicate offense qualifies as a "Scheduled Offense" under the PMLA Schedule.',
      'Ensure written Grounds of Arrest are formally supplied to the accused at the time of ED detention under Section 19.',
      'Prepare bail applications addressing both prongs of the Section 45 twin conditions.'
    ],
    askAIPrompt: 'What are the twin conditions for bail under Section 45 of the PMLA 2002, and what did the Supreme Court rule in Vijay Madanlal Choudhary?'
  },

  // ==================== 3. INDIAN CONTRACT ACT & COMPANIES ACT ====================
  {
    id: 'kb-in-contract-section-27',
    title: 'Indian Contract Act 1872: Section 27 Restraint of Trade & Non-Competes',
    category: 'Indian Contract & Corporate',
    categoryCode: 'contracts',
    jurisdiction: 'IN',
    statutes: ['Indian Contract Act Sec. 27', 'Indian Contract Act Sec. 73 & 74', 'Specific Relief Act 1963'],
    summary: 'Why post-termination employee non-competes are void under Section 27, and how to structure liquidated damages under Section 74.',
    executiveSummary: 'Section 27 of the Indian Contract Act 1872 embodies a strict statutory prohibition: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void." Indian courts consistently hold that post-termination restrictive covenants on employees are unenforceable.',
    governingStatutes: `
      * **Indian Contract Act 1872 Section 27:** Agreement in restraint of trade void. Exception: Sale of goodwill of a business within specified local limits.
      * **Indian Contract Act 1872 Section 74 (Liquidated Damages):** When a contract is broken and names a penalty/damages sum, the aggrieved party is entitled to receive reasonable compensation not exceeding the amount named.
      * **Specific Relief Act 1963 Section 10:** Specific performance of a contract *shall* be enforced by the court subject to statutory exceptions.
    `,
    landmarkPrecedents: `
      * **Niranjan Shankar Golikari v. Century Spinning (SC 1967):** Confirmed that negative covenants restricting competition *during* the active term of employment are valid, but post-termination bans are void.
      * **Percept D'Mark v. Zaheer Khan (SC 2006):** Reaffirmed that post-termination restrictive covenants are void under Section 27 regardless of how reasonable they seem.
      * **Fateh Chand v. Balkishan Dass (SC 1963):** Ruled that liquidated damages under Section 74 represent an upper cap; courts award only actual reasonable compensation proved.
    `,
    complianceChecklist: [
      'Do not rely on post-resignation non-competes in Indian employment contracts—they are void under Section 27.',
      'Protect business assets using enforceable Non-Disclosure of Confidential Information and Non-Solicitation of Employees/Clients clauses.',
      'When specifying liquidated damages, ensure the figure represents a genuine pre-estimate of loss rather than a punitive penalty under Section 74.',
      'Include clear Garden Leave or Notice Period clauses during active employment to restrict competitive transfer.'
    ],
    askAIPrompt: 'Why is a post-termination employee non-compete clause void under Section 27 of the Indian Contract Act 1872, and what clauses are enforceable?'
  },
  {
    id: 'kb-in-companies-act-directors',
    title: 'Companies Act 2013 & IBC 2016: Directors\' Duties & Corporate Insolvency',
    category: 'Indian Contract & Corporate',
    categoryCode: 'contracts',
    jurisdiction: 'IN',
    statutes: ['Companies Act 2013 Sec. 166, 188, 241', 'IBC 2016 Sec. 7, 9, 14', 'SEBI (LODR) Regulations'],
    summary: 'Fiduciary duties under Section 166, Related Party Transactions (RPT), CSR mandates, and IBC Corporate Insolvency Resolution Process (CIRP).',
    executiveSummary: 'Section 166 of the Companies Act 2013 codifies the statutory fiduciary duties of Indian company directors. Meanwhile, the Insolvency and Bankruptcy Code (IBC 2016) provides a time-bound Corporate Insolvency Resolution Process (CIRP) under Sections 7 and 9, imposing an immediate statutory moratorium under Section 14.',
    governingStatutes: `
      * **Companies Act 2013 Section 166 (Duties of Directors):** Requires acting with due and reasonable care, skill, and diligence; prohibits secret profits.
      * **Companies Act 2013 Section 188 (Related Party Transactions):** Prohibits entering into RPTs without prior Board or shareholder approval.
      * **IBC 2016 Section 7 & 9 (CIRP Initiation):** Financial or Operational creditors can initiate CIRP before NCLT upon corporate default exceeding ₹1 Crore.
      * **IBC 2016 Section 14 (Moratorium):** Prohibits institution of suits, continuation of proceedings, or foreclosure of corporate debtor assets during CIRP.
    `,
    landmarkPrecedents: `
      * **Tata Consultancy Services Ltd. v. Cyrus Investments P. Ltd. (SC 2021):** Landmark ruling clarifying directors' independence, executive dismissal standards, and oppression/mismanagement under Sections 241-242.
      * **Swiss Ribbons Pvt. Ltd. v. Union of India (SC 2019):** Upheld the constitutional validity of the IBC 2016, confirming its primary objective is corporate reorganization rather than recovery.
    `,
    complianceChecklist: [
      'Record formal declarations of interest by Directors in Form MBP-1 at the first Board meeting of every financial year.',
      'Obtain Audit Committee and Board approval prior to executing any Related Party Transaction (RPT) under Section 188.',
      'Ensure timely response to any operational creditor demand notice under IBC Section 8 within 10 days.',
      'For qualifying entities, constitute a CSR Committee and publish an annual CSR policy and expenditure statement.'
    ],
    askAIPrompt: 'What are the statutory fiduciary duties of a Director under Section 166 of the Companies Act 2013, and how does IBC 2016 moratorium work?'
  },

  // ==================== 4. DPDP ACT 2023 & PRIVACY LAW ====================
  {
    id: 'kb-in-dpdp-act-privacy',
    title: 'India Digital Personal Data Protection Act 2023 (DPDP Act)',
    category: 'Privacy & IT Act',
    categoryCode: 'privacy',
    jurisdiction: 'IN',
    statutes: ['DPDP Act 2023 Sec. 4, 6, 8', 'IT Act 2000 Section 43A & 79', 'CERT-In Cyber Security Rules 2022'],
    summary: 'Statutory compliance for Data Fiduciaries, affirmative consent, Data Principal rights, CERT-In 6-hour rules, and penalties up to ₹250 crore.',
    executiveSummary: 'The Digital Personal Data Protection Act (DPDP Act 2023) establishes India\'s modern statutory privacy framework. Organizations ("Data Fiduciaries") must obtain clear, affirmative consent before processing personal data of "Data Principals" (citizens) and must report data breaches immediately.',
    governingStatutes: `
      * **DPDP Act 2023 Section 6 (Consent):** Consent must be free, specific, informed, unconditional, and capable of withdrawal at any time.
      * **DPDP Act 2023 Section 8 (General Obligations):** Requires reasonable security safeguards to prevent personal data breaches.
      * **DPDP Act 2023 Schedule (Penalties):** Failure to take reasonable security safeguards triggers statutory penalties up to **₹250 crore** by the Data Protection Board of India.
      * **IT Act 2000 Section 79 (Intermediary Safe Harbour):** Exempts online platforms from third-party content liability if due diligence is observed (*Shreya Singhal* precedent).
      * **CERT-In Cyber Incident Rules (2022):** Requires reporting cybersecurity incidents to CERT-In within 6 hours of discovery.
    `,
    landmarkPrecedents: `
      * **Puttaswamy v. Union of India (SC 2017):** Constitutional bedrock mandating that personal data protection legislation satisfy legality, necessity, and proportionality.
      * **Shreya Singhal v. Union of India (SC 2015):** Intermediary blocking under Section 79 requires a court order or authorized government notification.
    `,
    complianceChecklist: [
      'Implement an affirmative, bilingual (English + Eighth Schedule language) Consent Notice explaining data usage purposes.',
      'Establish an automated mechanism for Data Principals to exercise the Right to Correction, Erasure, and Grievance Redressal.',
      'Execute written agreements with all Data Processors requiring stringent technical safeguards.',
      'Establish a 6-hour CERT-In breach reporting protocol and Data Protection Board breach notice procedure.'
    ],
    askAIPrompt: 'What are the core consent obligations and statutory fines for Data Fiduciaries under India\'s Digital Personal Data Protection Act (DPDP Act 2023)?'
  },

  // ==================== 5. REAL ESTATE, STAMP DUTY & LEASES ====================
  {
    id: 'kb-in-stamp-registration-leases',
    title: 'Indian Commercial Leases: Stamp Duty Act 1899 & Registration Act 1908',
    category: 'Real Estate & Leases',
    categoryCode: 'realestate',
    jurisdiction: 'IN',
    statutes: ['Indian Stamp Act 1899', 'Registration Act 1908 Sec. 17 & 49', 'Transfer of Property Act 1882 Sec. 106/107'],
    summary: 'Why unstamped or unregistered leave & license / lease agreements are inadmissible in Indian courts, and how to execute valid leases.',
    executiveSummary: 'Under Section 107 of the Transfer of Property Act 1882 and Section 17 of the Registration Act 1908, any lease of immovable property exceeding one year MUST be made by a registered instrument. Furthermore, under the Indian Stamp Act 1899, an unstamped or under-stamped agreement cannot be admitted in evidence.',
    governingStatutes: `
      * **Registration Act 1908 Section 17 & 49:** Compulsory registration for leases exceeding 11 months; unregistered leases cannot be received as evidence of any transaction affecting the property.
      * **Indian Stamp Act 1899 Section 35:** Instruments not duly stamped are inadmissible in evidence for any purpose, subject to impounding and payment of 10x penalty.
      * **Transfer of Property Act 1882 Section 106:** In the absence of a written contract, commercial leases are deemed month-to-month terminable by 15 days notice.
    `,
    landmarkPrecedents: `
      * **Anthony v. K.C. Ittoop & Sons (SC 2000):** Held that an unregistered lease deed for more than one year cannot create a multi-year tenancy; it defaults to a month-to-month tenancy.
      * **NN Global Mercantile v. Indo Unique Flame (SC 7-Judge Bench 2023):** Clarified arbitration admissibility in unstamped contracts—while arbitration agreements are separable, stamp duty defects must be cured before substantive enforcement.
    `,
    complianceChecklist: [
      'For tenancies exceeding 11 months, execute a formal Lease Deed and register it with the Sub-Registrar of Assurances.',
      'Pay state-specific Stamp Duty (e.g. Maharashtra Stamp Act / Delhi Stamp Rules) on the total lease rent plus security deposit.',
      'Distinguish clearly between a "Leave & License Agreement" (easementary permission without interest in property) and a formal "Lease Deed".',
      'Include a clear lock-in period and mutual notice period for commercial termination.'
    ],
    askAIPrompt: 'Why is an 11-month Leave & License Agreement common in India, and what happens under the Stamp Act and Registration Act if a multi-year lease is unregistered?'
  },

  // ==================== 6. DISPUTE RESOLUTION: ARBITRATION, CHEQUE BOUNCE, CPC ====================
  {
    id: 'kb-in-arbitration-act-1996',
    title: 'Arbitration & Conciliation Act 1996: Commercial Dispute Enforcement',
    category: 'Dispute Resolution',
    categoryCode: 'disputes',
    jurisdiction: 'IN',
    statutes: ['Arbitration Act 1996 Sec. 9, 11, 34, 36', 'Commercial Courts Act 2015', 'Indian Stamp Act 1899'],
    summary: 'Interim relief under Section 9, appointment of arbitrators under Section 11, and grounds for challenging awards under Section 34.',
    executiveSummary: 'The Arbitration and Conciliation Act 1996 governs domestic and international commercial arbitration in India. Section 34 provides narrow statutory grounds to challenge arbitral awards, prioritizing minimal judicial intervention and expeditious disposal.',
    governingStatutes: `
      * **Arbitration Act Section 9 (Interim Relief):** Empowers civil courts to grant interim protection before, during, or after arbitral proceedings.
      * **Arbitration Act Section 11 (Appointment of Arbitrator):** High Courts or Supreme Court appoint arbitrators if parties fail to agree within 30 days.
      * **Arbitration Act Section 34 (Setting Aside Award):** Awards can only be challenged on limited grounds such as incapacity, improper notice, excess of jurisdiction, or conflict with Public Policy of India.
    `,
    landmarkPrecedents: `
      * **BALCO v. Kaiser Aluminium Technical Services (SC Constitution Bench 2012):** Ruled that Indian courts cannot intervene in foreign-seated international arbitrations under Part I of the Act.
      * **PASL Wind Solutions v. GE Power India (SC 2021):** Confirmed that two Indian companies can choose a foreign seat of arbitration.
    `,
    complianceChecklist: [
      'Include a clear, self-contained Arbitration Clause specifying the Seat (e.g. New Delhi, India), Language (English), and number of Arbitrators.',
      'Ensure the main commercial agreement is duly stamped under state stamp laws to avoid delays during Section 11 appointment.',
      'Specify that arbitration shall be governed by institutional rules (e.g. MCIA, DIAC, or SIAC) for streamlined timelines.',
      'File any Section 34 challenge within the strict statutory limitation period of 3 months from award receipt.'
    ],
    askAIPrompt: 'What are the statutory grounds to challenge an arbitral award under Section 34 of the Indian Arbitration and Conciliation Act 1996?'
  },
  {
    id: 'kb-in-ni-act-cheque-bounce',
    title: 'Negotiable Instruments Act Section 138: Cheque Bounce & Debt Recovery',
    category: 'Dispute Resolution',
    categoryCode: 'disputes',
    jurisdiction: 'IN',
    statutes: ['NI Act 1881 Sec. 138, 141, 143A', 'BNSS 2023 Summary Trial', 'Insolvency & Bankruptcy Code 2016'],
    summary: 'Mandatory 30-day statutory demand notice, summary trial before Magistrate, interim compensation up to 20%, and director liability.',
    executiveSummary: 'Section 138 of the Negotiable Instruments Act 1881 makes the dishonour of a cheque for insufficiency of funds a criminal offense punishable by imprisonment up to 2 years or fine up to twice the cheque amount. Strict adherence to statutory notice timelines is mandatory.',
    governingStatutes: `
      * **NI Act Section 138 (Cheque Dishonour Offense):** Requires presenting cheque within validity (3 months), issuing a written demand notice within **30 calendar days** of bank return memo, and giving the drawer 15 days to pay.
      * **NI Act Section 141 (Company Offenses):** Every person who was in charge of and responsible to the company for the conduct of business at the time of the offense is jointly liable.
      * **NI Act Section 143A (Interim Compensation):** Magistrate can order the drawer to pay interim compensation up to **20%** of the cheque amount during trial.
    `,
    landmarkPrecedents: `
      * **K. Bhaskaran v. Sankaran Vaidhyan Balan (SC 1999) & Dashrath Rupsingh Rathod (SC 2014):** Clarified territorial jurisdiction—complaints must be filed where the payee/holder's bank branch is located.
    `,
    complianceChecklist: [
      'Obtain the official Bank Return Memo showing "Exceeds Arrangement / Insufficient Funds".',
      'Issue a formal Legal Demand Notice under Section 138 by Registered Post within exactly 30 calendar days of the Bank Return Memo date.',
      'Allow the debtor exactly 15 clear calendar days from receipt of notice to make payment.',
      'If unpaid, file the criminal complaint before the Judicial Magistrate within 30 days of expiry of the 15-day notice period.'
    ],
    askAIPrompt: 'What is the step-by-step statutory procedure and timeline to file a Cheque Bounce case under Section 138 of the Negotiable Instruments Act in India?'
  },
  {
    id: 'kb-in-cpc-injunctions-notice',
    title: 'Civil Procedure Code (CPC 1908): Injunctions, Summary Suits & Section 80',
    category: 'Dispute Resolution',
    categoryCode: 'disputes',
    jurisdiction: 'IN',
    statutes: ['CPC 1908 Section 80', 'CPC 1908 Order XXXIX Rules 1 & 2', 'CPC 1908 Order XXXVII Summary Suit', 'CPC Section 11 Res Judicata'],
    summary: 'Mandatory 60-day government notice under Section 80, temporary injunction three-prong test, summary suits for debt, and res judicata.',
    executiveSummary: 'The Code of Civil Procedure (CPC 1908) governs civil litigation in India. Under Order XXXIX Rules 1 & 2, obtaining a temporary injunction requires satisfying a strict three-prong test: (1) Prima Facie Case, (2) Balance of Convenience, and (3) Irreparable Injury.',
    governingStatutes: `
      * **CPC Section 80 (Notice to Government):** No suit shall be instituted against the Government or a public officer until the expiration of two months next after notice in writing has been delivered.
      * **CPC Order XXXIX Rules 1 & 2 (Temporary Injunctions):** Court may grant temporary injunction to restrain waste, alienation, or breach of contract.
      * **CPC Order XXXVII (Summary Suits):** Fast-track recovery procedure for liquidated debts arising from bills of exchange, hundies, or promissory notes.
      * **CPC Section 11 (Res Judicata):** No court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties.
    `,
    landmarkPrecedents: `
      * **Dalpat Kumar v. Prahlad Singh (SC 1992):** Laid down the authoritative three-prong test for temporary injunctions under Order XXXIX.
    `,
    complianceChecklist: [
      'Before suing any Central/State government entity, serve a mandatory 60-day Section 80 statutory notice.',
      'In injunction applications, plead clear facts proving irreparable financial or commercial injury that damages cannot compensate.',
      'For undisputed invoice/cheque debts, file an Order XXXVII Summary Suit to restrict defendant\'s right to defend without leave of court.'
    ],
    askAIPrompt: 'What is the three-prong test to obtain a Temporary Injunction under Order XXXIX Rules 1 & 2 of the Civil Procedure Code (CPC 1908)?'
  },

  // ==================== 7. LABOUR CODES & EMPLOYMENT LAWS ====================
  {
    id: 'kb-in-posh-workplace-equality',
    title: 'POSH Act 2013 & Gender Equality in Indian Workplaces',
    category: 'Employment & Labor',
    categoryCode: 'employment',
    jurisdiction: 'IN',
    statutes: ['POSH Act 2013 Sec. 4, 19, 26', 'Const. India Art. 14, 15, 21', 'Maternity Benefit Act 1961'],
    summary: 'Mandatory Internal Complaints Committee (ICC) constitution, sexual harassment redressal, and constitutional equality at work.',
    executiveSummary: 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) mandates that every organization with 10 or more employees MUST constitute an Internal Complaints Committee (ICC). Failure to constitute an ICC triggers statutory fines and cancellation of business licenses.',
    governingStatutes: `
      * **POSH Act 2013 Section 4 (Internal Complaints Committee):** Requires an ICC headed by a senior woman employee, with at least 50% women members and an external NGO/legal expert.
      * **POSH Act 2013 Section 26 (Penalties):** Failure to constitute an ICC triggers a fine up to **₹50,000** for first offense, and double fines/license revocation for repeated default.
      * **Constitution of India Articles 14, 15, & 21:** Guarantees gender equality, prohibition of discrimination on grounds of sex, and right to work with dignity.
    `,
    landmarkPrecedents: `
      * **Vishaka v. State of Rajasthan (SC 1997):** Supreme Court laid down landmark constitutional guidelines for workplace sexual harassment protection, forming the foundation of the POSH Act 2013.
      * **Aureliano Fernandes v. State of Goa (SC 2023):** Supreme Court issued strict directives requiring all public and private entities to verify and publish their ICC constitution details on their website.
    `,
    complianceChecklist: [
      'Constitute a compliant Internal Complaints Committee (ICC) with an external independent legal or NGO member.',
      'Conduct mandatory annual POSH training workshops for all employees and orientation for ICC members.',
      'Display penal consequences of sexual harassment prominently in office premises and digital intranets.',
      'Submit the mandatory annual POSH compliance report to the District Officer by January 31 each year.'
    ],
    askAIPrompt: 'What is the mandatory Internal Complaints Committee (ICC) requirement under the POSH Act 2013, and what was the Supreme Court Vishaka ruling?'
  },

  // ==================== GLOBAL COMPARATIVE LAW GUIDES ====================
  {
    id: 'kb-nda-trade-secrets-us',
    title: 'US & EU NDA & Trade Secret Protection Standard',
    category: 'Indian Contract & Corporate',
    categoryCode: 'contracts',
    jurisdiction: 'US',
    statutes: ['18 U.S.C. § 1836 (DTSA)', 'Uniform Trade Secrets Act (UTSA)', 'EU Directive 2016/943'],
    summary: 'Essential legal doctrines governing Non-Disclosure Agreements, trade secret misappropriation remedies, and statutory whistleblower carve-outs.',
    executiveSummary: 'Non-Disclosure Agreements (NDAs) protect non-public commercial assets. Under the Defend Trade Secrets Act (DTSA) in the US and the EU Trade Secrets Directive 2016/943, protection requires proof that information derives independent economic value from secrecy and that the owner took reasonable measures to maintain it.',
    governingStatutes: `
      * **18 U.S.C. § 1836 (Defend Trade Secrets Act - US):** Grants federal civil jurisdiction for trade secret misappropriation.
      * **EU Directive 2016/943 (Article 2):** Defines trade secrets and establishes uniform EU-wide remedies.
    `,
    landmarkPrecedents: `
      * **Waymo LLC v. Uber Technologies, Inc. (2018):** Reaffirming that downloading confidential CAD files prior to resignation triggers immediate injunctions.
    `,
    complianceChecklist: [
      'Include the mandatory DTSA Whistleblower Immunity notice (§ 1833(b)) in all employee/contractor NDAs.',
      'Explicitly separate finite "Commercial Confidential Information" from perpetual "Trade Secrets".'
    ],
    askAIPrompt: 'Explain how the Defend Trade Secrets Act (DTSA) and EU Directive 2016/943 apply to our Mutual NDA.'
  },
  {
    id: 'kb-gdpr-global-privacy-eu',
    title: 'GDPR, CCPA/CPRA & Global Privacy Compliance',
    category: 'Privacy & IT Act',
    categoryCode: 'privacy',
    jurisdiction: 'EU',
    statutes: ['GDPR Art. 6, 17, 28, & 44', 'CCPA / CPRA Cal. Civ. Code § 1798'],
    summary: 'Statutory requirements for Data Processing Agreements (DPAs), lawful processing bases, right to erasure, and cross-border data transfer safeguards.',
    executiveSummary: 'Data protection frameworks like EU GDPR and California CPRA impose strict operational mandates on companies processing personal data. Non-compliance risks statutory penalties of up to 4% of annual global turnover.',
    governingStatutes: `
      * **GDPR Article 28 (Processor Contracts):** Mandates an explicit Data Processing Agreement (DPA) whenever a vendor processes personal data.
      * **GDPR Article 17 (Right to Erasure / "Right to be Forgotten"):** Data subjects can compel permanent deletion of personal data within 30 days.
    `,
    landmarkPrecedents: `
      * **Schrems II (CJEU 2020):** Invalidated the EU-US Privacy Shield and required supplementary technical measures for cross-border data transfers.
    `,
    complianceChecklist: [
      'Execute GDPR Article 28 Data Processing Agreements (DPAs) with all cloud hosting and AI vendors.',
      'Implement an automated intake process to fulfill Data Subject Access Requests (DSARs) within 30 calendar days.'
    ],
    askAIPrompt: 'What are the mandatory clauses required in a GDPR Article 28 Data Processing Agreement (DPA)?'
  },

  // ==================== EXPANDED INDIAN RAG VAULT AUTHORITIES (30 NODES) ====================
  {
    id: 'kb-in-const-art12-state',
    title: 'Constitution of India Article 12: Definition of "State" under Part III',
    category: 'Indian Constitution',
    categoryCode: 'constitution',
    jurisdiction: 'IN',
    statutes: ['Const. India Art. 12', 'Ajay Hasia Test', 'Pradeep Kumar Biswas'],
    summary: 'What entities qualify as "State" or "other authorities" amenable to Writ Jurisdiction under Part III Fundamental Rights.',
    executiveSummary: 'Article 12 defines "the State" for Part III Fundamental Rights to include the Government and Parliament of India, State Legislatures, local authorities, and "other authorities". Under the Ajay Hasia (1981) and Pradeep Kumar Biswas (2002) tests, any instrumentality or agency under deep and pervasive state control is amenable to writ jurisdiction.',
    governingStatutes: `
      * **Constitution of India Article 12:** Definition of State including local or other authorities within the territory of India or under the control of the Government of India.
      * **Article 13(2):** Prohibition against State enacting laws abridging Part III rights.
    `,
    landmarkPrecedents: `
      * **Ajay Hasia v. Khalid Mujib (SC Constitution Bench 1981):** Established the 6-factor test for determining whether a corporation or society is an instrumentality of State.
      * **Pradeep Kumar Biswas v. Indian Institute of Chemical Biology (SC 7-Judge Bench 2002):** Reaffirmed that financial, functional, and administrative state dominance makes an entity "State".
    `,
    complianceChecklist: [
      'Evaluate whether the entity is financially supported by the government or performs a sovereign public duty.',
      'If an entity qualifies as State under Article 12, it cannot act arbitrarily and is bound by Article 14 equality rules.'
    ],
    askAIPrompt: 'What is the Ajay Hasia and Pradeep Kumar Biswas test for determining whether an entity is "State" under Article 12 of the Indian Constitution?'
  },
  {
    id: 'kb-in-const-art20-protection',
    title: 'Constitution of India Article 20: Protection in Conviction (Double Jeopardy & Self-Incrimination)',
    category: 'Indian Constitution',
    categoryCode: 'constitution',
    jurisdiction: 'IN',
    statutes: ['Const. India Art. 20(1), 20(2), 20(3)', 'Selvi v. State of Karnataka'],
    summary: 'Inviolable criminal safeguards: prohibition on ex-post facto laws, double jeopardy, and self-incrimination.',
    executiveSummary: 'Article 20 guarantees three inviolable criminal protections: (1) prohibition against retrospective criminal laws, (2) prohibition against double jeopardy (prosecuted and punished twice for the same offense), and (3) protection against self-incrimination. In Selvi v. State of Karnataka (2010), the Supreme Court ruled that involuntary narco-analysis and lie-detector tests violate Article 20(3) and Article 21.',
    governingStatutes: `
      * **Constitution of India Article 20(1):** No ex-post facto criminal law or enhanced retrospective punishment.
      * **Article 20(2):** No person shall be prosecuted and punished for the same offense more than once.
      * **Article 20(3):** No person accused of any offense shall be compelled to be a witness against himself.
    `,
    landmarkPrecedents: `
      * **Selvi v. State of Karnataka (SC 3-Judge Bench 2010):** Involuntary administration of narco-analysis, polygraph, and brain-mapping violates Article 20(3) and mental privacy under Article 21.
    `,
    complianceChecklist: [
      'Ensure no accused is compelled to testify against themselves during police interrogation.',
      'Verify that criminal penalties are not applied retrospectively to acts committed prior to statute enactment.'
    ],
    askAIPrompt: 'Explain the three protections under Article 20 of the Indian Constitution and the Supreme Court ruling in Selvi v. State of Karnataka (2010).'
  },
  {
    id: 'kb-in-const-art22-arrest',
    title: 'Constitution of India Article 22: Arrest Safeguards & 24-Hour Magistrate Remand',
    category: 'Indian Constitution',
    categoryCode: 'constitution',
    jurisdiction: 'IN',
    statutes: ['Const. India Art. 22(1) & 22(2)', 'D.K. Basu Guidelines', 'BNSS 2023 Sec. 58'],
    summary: 'Fundamental Rights upon arrest: right to be informed of grounds, right to counsel, and mandatory 24-hour Magistrate presentation.',
    executiveSummary: 'Article 22 protects arrested persons by requiring immediate notification of the grounds of arrest, the right to consult a lawyer of choice, and mandatory production before the nearest Judicial Magistrate within 24 hours of arrest. The D.K. Basu (1997) Supreme Court guidelines enforce these rights to prevent custodial torture.',
    governingStatutes: `
      * **Constitution of India Article 22(1):** Right to be informed of grounds of arrest and right to be defended by a legal practitioner.
      * **Constitution of India Article 22(2):** Mandatory production before Judicial Magistrate within 24 hours.
      * **BNSS 2023 Section 58:** Codified requirement of 24-hour presentation before Magistrate.
    `,
    landmarkPrecedents: `
      * **D.K. Basu v. State of West Bengal (SC 1997):** Laid down 11 mandatory arrest guidelines including name tags, memo of arrest, and station diary entries.
    `,
    complianceChecklist: [
      'Prepare a signed Memo of Arrest attested by a witness immediately upon taking an accused into custody.',
      'Ensure production before a Judicial Magistrate within 24 hours without fail.'
    ],
    askAIPrompt: 'What are the constitutional rights of an arrested person under Article 22 of the Constitution of India and the D.K. Basu guidelines?'
  },
  {
    id: 'kb-in-sc-lalita-kumari-fir',
    title: 'Lalita Kumari v. Govt. of U.P. (2014): Mandatory FIR & Zero FIR',
    category: 'Criminal Law (BNS/BNSS)',
    categoryCode: 'criminal',
    jurisdiction: 'IN',
    statutes: ['BNSS 2023 Section 173', 'CrPC Section 154', 'Zero FIR Rules'],
    summary: 'Constitution Bench ruling mandating compulsory FIR registration if a cognizable offense is disclosed, without police discretion.',
    executiveSummary: 'In Lalita Kumari v. Govt. of U.P. (2014), a 5-Judge Constitution Bench ruled unanimously that registration of a First Information Report (FIR) is mandatory under old CrPC 154 (now BNSS 2023 Section 173) if the complaint discloses a cognizable offense. Police cannot conduct a preliminary inquiry to test veracity before registering an FIR.',
    governingStatutes: `
      * **BNSS 2023 Section 173:** Compulsory registration of FIR and electronic e-FIR.
      * **Zero FIR Rule:** Police must register an FIR irrespective of territorial jurisdiction and transfer it to the concerned police station.
    `,
    landmarkPrecedents: `
      * **Lalita Kumari v. Govt. of U.P. (SC 5-Judge Constitution Bench 2014):** Authoritative precedent prohibiting police refusal in cognizable offenses.
    `,
    complianceChecklist: [
      'Demand immediate FIR registration under BNSS Section 173 whenever a cognizable offense occurs.',
      'If police refuse on jurisdictional grounds, invoke the Zero FIR mandate.'
    ],
    askAIPrompt: 'What did the 5-Judge Bench rule in Lalita Kumari v. Govt of UP (2014) regarding mandatory FIR registration and Zero FIR?'
  },
  {
    id: 'kb-in-sc-satender-antil-bail',
    title: 'Satender Kumar Antil v. CBI (2022): Bail Reform Guidelines',
    category: 'Criminal Law (BNS/BNSS)',
    categoryCode: 'criminal',
    jurisdiction: 'IN',
    statutes: ['BNSS 2023 Section 480', 'BNSS 2023 Section 479', 'Article 21 Right to Life'],
    summary: 'Authoritative Supreme Court ruling reinforcing that "Bail is the rule, jail is the exception" and categorizing offenses for speedy bail.',
    executiveSummary: 'In Satender Kumar Antil v. CBI (2022), the Supreme Court laid down structured guidelines for bail adjudication to combat undertrial overcrowding. It established Category A to D offenses, directing that for offenses punishable up to 7 years where the accused cooperated, bail applications must be decided without mechanical remand.',
    governingStatutes: `
      * **BNSS 2023 Section 480:** Special powers of High Court and Sessions Court regarding regular bail.
      * **BNSS 2023 Section 479:** Maximum undertrial detention; mandatory release of first-time offenders after serving one-third of maximum sentence.
    `,
    landmarkPrecedents: `
      * **Satender Kumar Antil v. CBI (SC 2022):** Landmark bail categorization benchmark.
      * **Gurbaksh Singh Sibbia (SC 1980):** Fundamental liberty principles governing bail discretion.
    `,
    complianceChecklist: [
      'Identify whether the offense falls under Category A (up to 7 years) to demand expeditious bail without remand.',
      'Verify whether undertrial detention has exceeded one-third of maximum sentence under BNSS Section 479.'
    ],
    askAIPrompt: 'What are the bail categories and guidelines laid down by the Supreme Court in Satender Kumar Antil v. CBI (2022)?'
  },
  {
    id: 'kb-in-bns-sec113-terrorist-act',
    title: 'BNS 2023 Section 113: Terrorist Act in General Penal Code',
    category: 'Criminal Law (BNS/BNSS)',
    categoryCode: 'criminal',
    jurisdiction: 'IN',
    statutes: ['BNS 2023 Section 113', 'BNS 2023 Section 111', 'UAPA Principles'],
    summary: 'First statutory codification of Terrorist Act in the general criminal code, punishable with death or life imprisonment.',
    executiveSummary: 'Section 113 of the Bharatiya Nyaya Sanhita (BNS 2023) defines a Terrorist Act as any act done with intent to threaten the unity, integrity, sovereignty, or security of India, or to strike terror in the people using explosives, biological/chemical weapons, or cyber warfare. Punishable with death or life imprisonment if death results.',
    governingStatutes: `
      * **BNS 2023 Section 113(1):** Comprehensive definition of terrorist acts including cyber warfare and economic disruption.
      * **BNS 2023 Section 113(2):** Punishable with death or imprisonment for life if death results; otherwise 5 years to life.
    `,
    landmarkPrecedents: `
      * **State of Maharashtra v. Vishwanath Maranna Shetty (SC):** Requires continuing unlawful syndicate activity or terror intent.
    `,
    complianceChecklist: [
      'Distinguish between ordinary public order offenses and statutory Terrorist Acts under Section 113.',
      'Observe specialized procedural remand and investigation rules.'
    ],
    askAIPrompt: 'How does BNS 2023 Section 113 define a Terrorist Act, and what are the statutory penalties?'
  },
  {
    id: 'kb-in-cpc-res-judicata-sec11',
    title: 'CPC 1908 Section 11: Res Judicata & Finality of Litigation',
    category: 'Dispute Resolution',
    categoryCode: 'disputes',
    jurisdiction: 'IN',
    statutes: ['CPC 1908 Section 11', 'Article 14 Equality', 'Daryao v. State of UP'],
    summary: 'A matter directly and substantially judged by a competent court cannot be relitigated between the same parties.',
    executiveSummary: 'Section 11 of the Code of Civil Procedure 1908 embodies the principle of Res Judicata: no court shall try any suit or issue which has already been directly and substantially decided in a former suit between the same parties. In Daryao v. State of UP (SC 1961), the Supreme Court held that Res Judicata applies equally to Writ Petitions under Articles 32 and 226.',
    governingStatutes: `
      * **CPC 1908 Section 11:** Statutory prohibition against second trial on decided issues.
      * **Public Policy:** Enforces interest reipublicae ut sit finis litium (there should be an end to litigation).
    `,
    landmarkPrecedents: `
      * **Daryao v. State of UP (SC Constitution Bench 1961):** Res Judicata bars subsequent writ petition on same cause of action after dismissal on merits.
    `,
    complianceChecklist: [
      'Verify whether the former judgment was delivered on merits by a court of competent jurisdiction.',
      'Ensure all grounds of attack or defense are raised in the first proceeding to avoid Constructive Res Judicata.'
    ],
    askAIPrompt: 'What is the doctrine of Res Judicata under Section 11 of the Civil Procedure Code (CPC 1908), and does it apply to Writ Petitions?'
  },
  {
    id: 'kb-in-stamp-act-sec35-nn-global',
    title: 'Indian Stamp Act Section 35: Inadmissibility & NN Global SC Bench',
    category: 'Real Estate & Leases',
    categoryCode: 'realestate',
    jurisdiction: 'IN',
    statutes: ['Indian Stamp Act 1899 Sec. 35', 'Registration Act 1908 Sec. 49', 'NN Global Mercantile SC Bench'],
    summary: 'Why unstamped or under-stamped agreements are inadmissible in evidence, and how the 7-Judge Bench resolved arbitration enforceability.',
    executiveSummary: 'Under Section 35 of the Indian Stamp Act 1899, no instrument chargeable with duty can be admitted in evidence for any purpose unless duly stamped. In N.N. Global Mercantile v. Indo Unique Flame (SC 7-Judge Bench 2023), the Supreme Court ruled that while an arbitration agreement is separable, stamp duty defects on the substantive agreement must be cured by impounding and payment of duty/penalty before enforcement.',
    governingStatutes: `
      * **Indian Stamp Act 1899 Section 35:** Inadmissibility of unstamped instruments; curable by payment of 10x penalty.
      * **Registration Act 1908 Section 49:** Unregistered documents inadmissible to affect immovable property.
    `,
    landmarkPrecedents: `
      * **NN Global Mercantile v. Indo Unique Flame (SC 7-Judge Constitution Bench 2023):** Harmonized Stamp Act inadmissibility with Arbitration Act separability.
    `,
    complianceChecklist: [
      'Ensure all commercial agreements and leases are printed on requisite Non-Judicial Stamp Paper.',
      'If an unstamped agreement is produced in court, cure the defect immediately via impounding under Section 33.'
    ],
    askAIPrompt: 'What did the 7-Judge Constitution Bench rule in N.N. Global Mercantile (2023) regarding unstamped arbitration agreements?'
  }
];

// ==========================================================================
// 🛡️ BARRISTER AI TRUST ENGINE v1.0
// Source grounding • Citation verification • Evidence confidence gate
// Principle: "Retrieve the law, reason over the law, prove the answer from the law."
// ==========================================================================

// Approved verified case index — the ONLY cases Barrister may cite with citation numbers.
const VERIFIED_CASE_INDEX = [
  { name: 'Kesavananda Bharati v. State of Kerala', cite: '(1973) 4 SCC 225', tokens: ['kesavananda', 'keshavananda', 'basic structure'] },
  { name: 'Maneka Gandhi v. Union of India', cite: '(1978) 1 SCC 248', tokens: ['maneka gandhi'] },
  { name: 'Justice K.S. Puttaswamy v. Union of India', cite: '(2017) 10 SCC 1', tokens: ['puttaswamy', 'right to privacy'] },
  { name: 'Shreya Singhal v. Union of India', cite: '(2015) 5 SCC 1', tokens: ['shreya singhal', '66a'] },
  { name: 'Vishaka v. State of Rajasthan', cite: '(1997) 6 SCC 241', tokens: ['vishaka', 'vishakha', 'posh'] },
  { name: 'Arnesh Kumar v. State of Bihar', cite: '(2014) 8 SCC 273', tokens: ['arnesh kumar', '41a'] },
  { name: 'Lalita Kumari v. Govt. of Uttar Pradesh', cite: '(2014) 2 SCC 1', tokens: ['lalita kumari'] },
  { name: 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal', cite: '(2020) 7 SCC 1', tokens: ['khotkar', '65b'] },
  { name: 'Anvar P.V. v. P.K. Basheer', cite: '(2014) 10 SCC 473', tokens: ['anvar p.v.', 'anvar pv'] },
  { name: 'Niranjan Shankar Golikari v. Century Spinning', cite: '(1967) 2 SCR 378', tokens: ['golikari'] },
  { name: 'Percept D\'Mark (India) v. Zaheer Khan', cite: '(2006) 4 SCC 227', tokens: ['zaheer khan', 'percept'] },
  { name: 'Fateh Chand v. Balkishan Dass', cite: 'AIR 1963 SC 1405', tokens: ['fateh chand'] },
  { name: 'E.P. Royappa v. State of Tamil Nadu', cite: '(1974) 4 SCC 3', tokens: ['royappa'] },
  { name: 'L. Chandra Kumar v. Union of India', cite: '(1997) 3 SCC 261', tokens: ['chandra kumar'] },
  { name: 'Sushila Aggarwal v. State (NCT of Delhi)', cite: '(2020) 5 SCC 1', tokens: ['sushila aggarwal'] },
  { name: 'Indra Sawhney v. Union of India', cite: '1992 Supp (3) SCC 217', tokens: ['indra sawhney', 'mandal'] },
  { name: 'Olga Tellis v. Bombay Municipal Corporation', cite: '(1985) 3 SCC 545', tokens: ['olga tellis', 'pavement dwellers'] },
  { name: 'A.K. Gopalan v. State of Madras', cite: 'AIR 1950 SC 27', tokens: ['gopalan', 'preventive detention'] },
  { name: 'Mohd. Ahmed Khan v. Shah Bano Begum', cite: '(1985) 2 SCC 556', tokens: ['shah bano'] },
  { name: 'M.C. Mehta v. Union of India', cite: '(1987) 1 SCC 395', tokens: ['mc mehta', 'oleum'] },
  { name: 'Minerva Mills v. Union of India', cite: '(1980) 3 SCC 625', tokens: ['minerva mills'] },
  { name: 'D.K. Basu v. State of West Bengal', cite: '(1997) 1 SCC 416', tokens: ['d.k. basu', 'dk basu'] }
];

// Indian legal citation patterns the verifier scans for.
const CITATION_PATTERNS = [
  { re: /\(\s*\d{4}\s*\)\s*\d+\s+SCC\s+\d+/g, label: 'SCC citation' },
  { re: /\d{4}\s+Supp\s*\(\s*\d+\s*\)\s+SCC\s+\d+/g, label: 'SCC Supp citation' },
  { re: /AIR\s+\d{4}\s+(SC|Del|Bom|Mad|Cal|All|Ker)\s+\d+/g, label: 'AIR citation' },
  { re: /\(\s*\d{4}\s*\)\s*\d+\s+SCR\s+\d+/g, label: 'SCR citation' },
  { re: /SCC\s+OnLine\s+SC\s+\d+/g, label: 'SCC OnLine citation' },
  { re: /MANU\/[A-Z]{2}\/\d{4}\/\d+/g, label: 'MANU citation' },
  { re: /\d{4}\s+Cri\s*LJ\s+\d+/g, label: 'CriLJ citation' }
];

function normCitation(s) {
  return s.toLowerCase().replace(/[\s().,\-–—]/g, '');
}

const VERIFIED_CITE_NORMS = VERIFIED_CASE_INDEX.map((c) => normCitation(c.cite));

// Pass 3 (Verification): every citation-like string must match the approved index,
// otherwise it is stripped before the answer is shown. Never trust the LLM's memory.
function verifyAndCleanCitations(text) {
  const removed = [];
  const verifiedCites = [];
  let cleaned = text;
  CITATION_PATTERNS.forEach(({ re }) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(cleaned)) !== null) {
      const citeStr = m[0].trim();
      const n = normCitation(citeStr);
      const windowText = cleaned.slice(Math.max(0, m.index - 90), m.index).toLowerCase();
      let hit = null;
      for (const c of VERIFIED_CASE_INDEX) {
        if (normCitation(c.cite) === n || c.tokens.some((t) => windowText.includes(t))) { hit = c; break; }
      }
      if (hit) {
        verifiedCites.push({ name: hit.name, cite: citeStr });
        re.lastIndex = m.index + citeStr.length;
      } else {
        removed.push(citeStr);
        cleaned = cleaned.slice(0, m.index) + cleaned.slice(m.index + citeStr.length);
        re.lastIndex = m.index;
      }
    }
  });
  return { cleanedText: cleaned, removed, verifiedCites };
}

function isSmallTalkPrompt(p) {
  const t = p.toLowerCase().trim();
  if (t.length < 3) return true;
  const smallTalk = ['hi', 'hii', 'hiii', 'hiiii', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'namaskaram', 'pranam', 'greetings', 'yo', 'sup', 'thanks', 'thank you', 'who are you', 'what is your name', 'your name', 'who created you', 'who made you', 'sakshamfit', 'who is barrister', 'what can you do', 'help', 'how to use', 'ok', 'okay', 'nice', 'great', 'bye', 'good night'];
  return smallTalk.includes(t) || /^(hi+|hello+|hey+)[\s!.?]*$/.test(t);
}

function tokenizeLegalQuery(q) {
  const STOP_WORDS = new Set(['what', 'the', 'for', 'and', 'how', 'does', 'with', 'this', 'that', 'from', 'your', 'can', 'will', 'section', 'act', 'law', 'legal', 'case', 'court', 'under', 'when', 'where', 'which', 'why', 'who', 'penalty', 'about', 'rights', 'right', 'means', 'mean', 'apply', 'applies', 'explain', 'india', 'indian', 'tell', 'give', 'please', 'need', 'want', 'know', 'happens', 'happen', 'there', 'here', 'into', 'them', 'they', 'have', 'has', 'had', 'should', 'could', 'would', 'between', 'fictional', 'example']);
  const out = [];
  q.replace(/[^a-z0-9\s]/g, ' ').toLowerCase().split(/\s+/).filter((w) => w.length >= 3 && !STOP_WORDS.has(w)).forEach((w) => out.push(w));
  (q.match(/article\s+\d+/g) || []).forEach((m) => out.push(m));
  (q.match(/section\s+\d+/g) || []).forEach((m) => out.push(m));
  (q.match(/\b(ipc|crpc)\s+\d+/g) || []).forEach((m) => out.push(m));
  const anchors = ['bns', 'bnss', 'bsa', 'ipc', 'crpc', 'evidence act', 'dpdp', 'posh', 'rti', 'ni act', 'contract act', 'constitution', 'samvidhan', 'fir', 'bail', 'writ', 'privacy', 'pmla', 'stamp act', 'arbitration', 'divorce', 'rape', 'murder', 'cheating', 'defamation', 'custody', 'maintenance', 'writ petition', 'fundamental rights'];
  anchors.forEach((k) => { if (q.includes(k)) out.push(k); });
  return [...new Set(out)];
}

function authorityWeight(art) {
  const code = (art.categoryCode || '').toLowerCase();
  if (code === 'constitution') return 1.0;
  if (code === 'criminal') return 1.0;
  if (art.jurisdiction === 'IN') return 0.9;
  return 0.7;
}

// Pass 1 (Retrieval): score the verified legal library against the question.
// Pass 4 (Confidence gate): HIGH → answer • MEDIUM → qualify • LOW → refuse to speculate.
function computeEvidencePack(queryText) {
  const q = queryText.toLowerCase();
  const isLegal = /\b(article|section|act|law|legal|court|supreme|bail|fir|police|writ|bns|bnss|bsa|ipc|crpc|constitution|rights|contract|judgment|case|offence|offense|arrest|sue|petition|divorce|property|cheque|criminal|civil|privacy|dpdp|posh|rti|lawyer|advocate)\b/.test(q) || /\b(article|section)\s+\d+/i.test(q);
  if (isSmallTalkPrompt(q) || !isLegal) {
    return { level: 'CONV', evidence: 1, sourceCount: 0, sources: [], verifiedCites: [], removedCites: [], gated: false };
  }
  const tokens = tokenizeLegalQuery(q);
  const matched = [];
  KNOWLEDGE_BASE_ARTICLES.forEach((art) => {
    const hay = ((art.title || '') + ' ' + (art.summary || '') + ' ' + (art.statutes || []).join(' ') + ' ' + (art.executiveSummary || '')).toLowerCase();
    let score = 0;
    tokens.forEach((t) => { if (hay.includes(t)) score += 1; });
    if (score > 0) matched.push({ art, score, weight: authorityWeight(art) });
  });
  matched.sort((a, b) => (b.score * b.weight) - (a.score * a.weight));
  let evidence = 0.12;
  matched.slice(0, 3).forEach((m) => { evidence += 0.22 * Math.min(1, m.score / 2); });
  const level = evidence >= 0.7 ? 'HIGH' : (evidence >= 0.4 ? 'MEDIUM' : 'LOW');
  return {
    level,
    evidence: Math.round(evidence * 100) / 100,
    sourceCount: matched.length,
    sources: matched.slice(0, 4).map((m) => ({ id: m.art.id, title: m.art.title, statutes: (m.art.statutes || []).join(' · '), category: m.art.category, weight: m.weight })),
    verifiedCites: [],
    removedCites: [],
    gated: false
  };
}

function applyEvidenceGate(answerText, pack) {
  if (!pack || pack.level === 'HIGH' || pack.level === 'CONV') return answerText;
  if (pack.level === 'MEDIUM') {
    return answerText + '\n\n_📊 Evidence level: MEDIUM — grounded in the verified library, but check how it applies to your specific facts before relying on it._';
  }
  const banner = '🛡️ **Evidence Gate (LOW):** I could not find sufficient authoritative sources in my verified library (Constitution of India, BNS/BNSS/BSA 2023, Supreme Court precedents) to establish a definitive position. The notes below are general guidance only — I will not speculate beyond them.\n\n';
  return banner + answerText + '\n\n_For a definitive position on this, please consult a qualified advocate._';
}

function barristerEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// "Why this answer?" — evidence panel proving every answer from retrieved sources.
function buildEvidencePanel(pack) {
  if (!pack || pack.level === 'CONV') return '';
  const parts = [];
  if (pack.sources && pack.sources.length) {
    const items = pack.sources.map((s) => `
      <div class="evidence-source-item">
        <span class="evidence-source-type">${s.weight >= 1 ? '📜 PRIMARY' : '📚 AUTHORITY'}</span>
        <div class="evidence-source-text">
          <div class="evidence-source-title">${barristerEscape(s.title)}</div>
          <div class="evidence-source-statutes">${barristerEscape(s.statutes)}</div>
        </div>
        <button class="evidence-source-open" onclick="openEvidenceSource('${s.id}')">Open ↗</button>
      </div>`).join('');
    parts.push(`<div class="evidence-panel-section"><div class="evidence-panel-label">Evidence used (retrieved from the verified legal library)</div>${items}</div>`);
  }
  if (pack.verifiedCites && pack.verifiedCites.length) {
    const cites = pack.verifiedCites.map((c) => `<div class="evidence-source-item evidence-cite"><span class="evidence-source-type">⚖️ VERIFIED</span><div class="evidence-source-text"><div class="evidence-source-title">${barristerEscape(c.name)}</div><div class="evidence-source-statutes">${barristerEscape(c.cite)}</div></div></div>`).join('');
    parts.push(`<div class="evidence-panel-section"><div class="evidence-panel-label">Citation check: passed</div>${cites}</div>`);
  }
  if (pack.removedCites && pack.removedCites.length) {
    const removed = pack.removedCites.map((c) => `<div class="evidence-source-item evidence-removed"><span class="evidence-source-type">🚫 REMOVED</span><div class="evidence-source-text"><div class="evidence-source-statutes">${barristerEscape(c)}</div></div></div>`).join('');
    parts.push(`<div class="evidence-panel-section"><div class="evidence-panel-label">Unverified citations removed</div>${removed}</div>`);
  }
  if (!parts.length) return '';
  return `<details class="evidence-panel"><summary>🔍 Why this answer? <span class="evidence-summary-note">${pack.sourceCount || 0} verified source${pack.sourceCount === 1 ? '' : 's'}</span></summary><div class="evidence-panel-body">${parts.join('')}</div></details>`;
}

function buildAIBubbleHTML(htmlContent, pack) {
  const badge = pack && pack.level && pack.level !== 'CONV'
    ? `<span class="evidence-badge evidence-${pack.level.toLowerCase()}">🛡️ ${pack.level}${pack.level !== 'LOW' && pack.sourceCount ? ' · ' + pack.sourceCount + ' sources' : ''}</span>`
    : '';
  return `<div class="ai-bubble-header"><span>✦ BARRISTER AI (BHARAT)</span>${badge}</div>` + htmlContent + buildEvidencePanel(pack);
}

window.openEvidenceSource = function (id) {
  const art = KNOWLEDGE_BASE_ARTICLES.find((a) => a.id === id);
  if (!art) return;
  switchView('knowledge-view');
  if (typeof openKnowledgeDrawer === 'function') openKnowledgeDrawer(art);
};

// --- Sample Legal Documents for Analyzer (Including Realistic Indian Agreements!) ---
const SAMPLE_CONTRACTS = {
  in_contract: {
    title: "🇮🇳 Indian Executive Employment & Non-Compete Agreement (Contract Act Compliant)",
    content: `EXECUTIVE EMPLOYMENT AGREEMENT — BHARAT (INDIA)

This Executive Employment Agreement ("Agreement") is executed at New Delhi, India, as of August 2, 2026, by and between Alpha Technologies Private Limited (a company incorporated under the Companies Act 2013) and Rajesh Sharma ("Employee").

1. COMPLIANCE WITH INDIAN CONTRACT ACT & SECTION 27 RESTRAINT
Employee acknowledges that during the active term of employment, Employee shall devote full-time professional attention to Employer. However, in strict accordance with Section 27 of the Indian Contract Act 1872 and the Supreme Court precedent in Niranjan Shankar Golikari v. Century Spinning, no post-termination restraint of trade shall apply after the cessation of employment.

2. CONFIDENTIALITY & TRADE SECRET PROTECTION
Employee agrees to protect all proprietary business data, customer lists, and financial algorithms both during and indefinitely after employment. Employee shall not disclose confidential information to any third party without written consent.

3. WORK-MADE-FOR-HIRE & IP ASSIGNMENT UNDER INDIAN COPYRIGHT ACT
In accordance with Section 17 of the Indian Copyright Act 1957, Employee hereby irrevocably assigns and transfers to Employer all right, title, and interest in and to all software code, inventions, and creative works conceived during the term of employment.

4. LIQUIDATED DAMAGES UNDER SECTION 74
In the event of a breach of confidentiality, Employer shall be entitled to claim reasonable compensation not exceeding ₹15,00,000 (Rupees Fifteen Lakhs), which both parties agree represents a genuine pre-estimate of loss under Section 74 of the Indian Contract Act 1872.

5. GOVERNING LAW & ARBITRATION
This Agreement is governed by the laws of India. Any dispute arising hereunder shall be referred to sole arbitration in New Delhi under the Arbitration and Conciliation Act 1996.`
  },
  in_lease: {
    title: "🇮🇳 Indian Commercial Leave & License Agreement (Registered & Stamped)",
    content: `COMMERCIAL LEAVE & LICENSE AGREEMENT — BHARAT (INDIA)

This Leave and License Agreement is made at Mumbai, Maharashtra, on August 2, 2026, by and between Licensor (Landlord) and Licensee (Commercial Tenant) in compliance with the Maharashtra Rent Control Act 1999 and Indian Stamp Act 1899.

1. TERM AND COMPULSORY REGISTRATION
The Licensor hereby grants permission to use the commercial premises at Nariman Point, Mumbai, for a term of thirty-six (36) months. In accordance with Section 17 of the Registration Act 1908, this Agreement shall be compulsorily registered with the Sub-Registrar of Assurances.

2. STAMP DUTY COMPLIANCE (INDIAN STAMP ACT 1899)
Both parties agree that appropriate Stamp Duty under Article 36A of the Maharashtra Stamp Act has been paid. Both parties acknowledge that an unstamped agreement is inadmissible in evidence under Section 35 of the Indian Stamp Act 1899.

3. SECURITY DEPOSIT & REFUND TIMELINE
Licensee has deposited an interest-free security deposit of ₹10,00,000 (Rupees Ten Lakhs). Licensor agrees to refund the security deposit within fourteen (14) calendar days of move-out, subject only to deductions for actual unpaid utility bills or structural damage beyond normal wear and tear.

4. LOCK-IN PERIOD & TERMINATION NOTICE
Both parties agree to a mandatory lock-in period of twelve (12) months. After expiry of the lock-in period, either party may terminate this Agreement by giving ninety (90) days prior written notice.`
  },
  nda: {
    title: "Mutual Non-Disclosure Agreement (NDA)",
    content: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of January 15, 2026, by and between Alpha Technologies Inc. and Beta Venture Partners.

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" refers to any proprietary information, technical data, trade secrets, algorithms, customer lists, and financial records disclosed by one party to the other.

2. PERPETUAL INDEMNIFICATION & EXCLUSIVITY
Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party from and against any and all claims, damages, liabilities, and legal fees without limitation in duration or dollar cap, arising out of any alleged breach of confidentiality.

3. TERM AND PERPETUAL RESTRAINT
This Agreement shall remain in effect indefinitely. Receiving Party agrees never to engage in any commercial activity, software development, or investment within the same industry sector for a period of ten (10) years following termination.

4. GOVERNING LAW AND UNILATERAL ARBITRATION
This Agreement shall be governed by the laws of the state of Delaware. Any dispute arising hereunder shall be resolved by binding arbitration in Wilmington, Delaware. Only the Disclosing Party shall have the right to seek injunctive relief in any court of competent jurisdiction without posting a bond.`
  },
  software: {
    title: "Software & SaaS Master Service Agreement",
    content: `SOFTWARE SERVICES AGREEMENT

1. SERVICE LEVEL & AVAILABILITY
Provider will make reasonable commercial efforts to maintain SaaS uptime, but expressly disclaims any warranty of availability or fitness for a particular purpose.

2. UNILATERAL PRICE INCREASES
Provider reserves the right to increase monthly subscription pricing by up to 50% at any time upon three (3) calendar days notice by email.

3. LIMITATION OF LIABILITY
In no event shall Provider's total aggregate liability under this Agreement exceed the amount of Five U.S. Dollars ($5.00), even in cases of gross negligence, data loss, or security breach.

4. IP OWNERSHIP OF USER DATA
Customer hereby grants Provider a perpetual, irrevocable, worldwide, royalty-free license to use, sell, and commercialize all Customer Data entered into the SaaS platform.`
  }
};

// --- Legal Rights & FAQ Knowledge Base (Including Indian Constitutional & Everyday Rights!) ---
const RIGHTS_DATABASE = [
  {
    id: 'rti-act-india',
    category: 'consumer',
    title: '🇮🇳 Right to Information (RTI Act 2005): Transparency in Governance',
    desc: 'How every Indian citizen can legally demand public records, tenders, and administrative files from any Central or State government authority.',
    details: `
      <h4>1. Citizen Rights under the RTI Act 2005</h4>
      <p>The Right to Information Act 2005 operationalizes the Fundamental Right to Freedom of Speech under Article 19(1)(a) of the Constitution of India.</p>
      <ul>
        <li><strong>30-Day Mandatory Timeline (Section 7):</strong> Public Information Officers (PIOs) must provide requested information within **30 days** of receipt (or 48 hours if it concerns a citizen's life or liberty).</li>
        <li><strong>Statutory Penalties (Section 20):</strong> If a PIO unreasonably delays or rejects an RTI application, the Central or State Information Commission can levy a fine of ₹250 per day up to ₹25,000 on the officer personally.</li>
      </ul>
      <h4>2. How to File an RTI Application</h4>
      <p>1. Visit the online RTI portal (<code>rtionline.gov.in</code>) or submit a physical application with a ₹10 postal order/fee.<br>
      2. Keep questions specific and ask for certified copies of government files, tenders, or action taken reports.<br>
      3. If no reply is received within 30 days, file a First Appeal before the First Appellate Authority (FAA).</p>
    `
  },
  {
    id: 'police-arrest-rights-india',
    category: 'housing',
    title: '🇮🇳 Police Arrest & Interrogation Rights (Art. 22 & BNSS 2023)',
    desc: 'Know your Fundamental Rights under Article 22 of the Constitution, D.K. Basu guidelines, and the new Bharatiya Nagarik Suraksha Sanhita (BNSS 2023).',
    details: `
      <h4>1. Constitutional & BNSS Protections on Arrest</h4>
      <p>The Constitution of India and BNSS 2023 protect citizens against arbitrary detention or police harassment.</p>
      <ul>
        <li><strong>Right to be Informed of Grounds (Art. 22(1) & BNSS Sec. 47):</strong> Police must inform the arrested person of the full grounds of arrest immediately.</li>
        <li><strong>Mandatory Presentation before Magistrate (Art. 22(2) & BNSS Sec. 58):</strong> No arrested person can be held in custody for more than **24 hours** without being presented before a Judicial Magistrate.</li>
        <li><strong>Right to Legal Counsel (Art. 22(1)):</strong> Absolute right to consult and be defended by a legal practitioner of one's choice during interrogation.</li>
      </ul>
      <h4>2. What to do if Rights are Violated</h4>
      <p>1. Invoke the landmark Supreme Court **D.K. Basu Guidelines** requiring police to wear visible identification and prepare a signed Memo of Arrest.<br>
      2. If illegally detained beyond 24 hours without a Magistrate's remand, file an immediate **Writ of Habeas Corpus** under Article 32 (Supreme Court) or Article 226 (High Court).</p>
    `
  },
  {
    id: 'consumer-protection-india',
    category: 'consumer',
    title: '🇮🇳 Consumer Protection Act 2019: Defective Goods & E-Commerce',
    desc: 'How to file consumer grievances against defective products, unfair trade practices, and e-commerce platforms in Consumer Commissions.',
    details: `
      <h4>1. Rights of Consumers in India</h4>
      <p>The Consumer Protection Act 2019 empowers consumers with speedy redressal, product liability claims against manufacturers, and regulation of e-commerce platforms.</p>
      <ul>
        <li><strong>Three-Tier Consumer Disputes Redressal:</strong>
          <br>• <strong>District Commission:</strong> Claims up to ₹50 Lakhs.
          <br>• <strong>State Commission:</strong> Claims between ₹50 Lakhs and ₹2 Crore.
          <br>• <strong>National Commission (NCDRC):</strong> Claims exceeding ₹2 Crore.
        </li>
        <li><strong>E-Commerce Accountability:</strong> Platforms like Amazon/Flipkart cannot evade liability for counterfeit goods sold by third-party sellers on their platform.</li>
      </ul>
      <h4>2. Step-by-Step Filing Procedure</h4>
      <p>1. Issue a formal written complaint / legal notice to the seller/service provider giving 15 days to resolve.<br>
      2. If unresolved, file an electronic complaint on the government **E-Daakhil Portal** (<code>edaakhil.nic.in</code>) without needing a lawyer.<br>
      3. Claim full refund, replacement, plus compensation for mental agony and legal costs.</p>
    `
  },
  {
    id: 'cheque-bounce-ni-act',
    category: 'employment',
    title: '🇮🇳 Cheque Bounce Remedies (Section 138 NI Act)',
    desc: 'Mandatory 30-day statutory notice procedure and criminal trial remedies when a client or debtor cheque is dishonoured.',
    details: `
      <h4>1. Statutory Rules under Negotiable Instruments Act</h4>
      <p>Dishonour of a cheque for insufficiency of funds is a criminal offense under Section 138 of the NI Act, punishable by imprisonment up to 2 years or fine up to 2x the cheque amount.</p>
      <ul>
        <li><strong>30-Day Mandatory Notice Timeline:</strong> You must send a written legal demand notice by Registered Post within exactly **30 calendar days** of receiving the Bank Return Memo.</li>
        <li><strong>15-Day Payment Window:</strong> The drawer has 15 clear days from notice receipt to pay the funds.</li>
        <li><strong>Interim Compensation (Section 143A):</strong> Courts can order the drawer to pay up to 20% interim compensation during the trial.</li>
      </ul>
      <h4>2. Checklist to File a Section 138 Case</h4>
      <p>1. Obtain original Dishonoured Cheque and Bank Return Memo.<br>
      2. Send Section 138 Legal Notice via Registered Post with Acknowledgement Due.<br>
      3. File criminal complaint before the Judicial Magistrate within 30 days after the 15-day notice period expires.</p>
    `
  }
];

// --- AI Chat Simulation Engine (Exhaustive Bharatiya Constitutional & Legal Intelligence) ---
function getAILegalResponse(prompt, jurisdictionCode) {
  const jurName = JURISDICTION_INFO[jurisdictionCode]?.name || 'India (Bharat)';
  const lower = prompt.toLowerCase().trim();
  const cleanPrompt = lower.replace(/[!.,?]/g, '');
  const currentLang = localStorage.getItem('jurisai_language') || 'en';
  const isHi = currentLang === 'hi';
  const isHinglish = currentLang === 'hinglish';

  // 0A. Conversational Greetings & Short Casual Inputs
  const isGreeting = ['hi', 'hii', 'hiii', 'hiiii', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'namaskaram', 'pranam', 'greetings', 'yo', 'sup', 'barrister', 'hi barrister', 'hello barrister', 'hey barrister', 'namaste barrister', 'hello there', 'hii barrister'].includes(cleanPrompt) ||
                     ((cleanPrompt.startsWith('hi ') || cleanPrompt.startsWith('hii') || cleanPrompt.startsWith('hello ') || cleanPrompt.startsWith('hey ') || cleanPrompt.startsWith('namaste')) && cleanPrompt.length < 30);
  if (isGreeting) {
    if (isHi) {
      return `नमस्ते! 🙏 मैं **बैरिस्टर एआई (Barrister AI)** हूँ, आपका भारतीय संविधान और कानूनी सहायक।\n\nमैं इन कानूनी विषयों में आपकी मदद कर सकता हूँ:\n* **📜 भारत का संविधान (Samvidhan):** मौलिक अधिकार (अनुच्छेद 14, 19, 21), याचिकाएं (Art. 32/226), और सुप्रीम कोर्ट के निर्णय।\n* **⚖️ नए भारतीय कानून (BNS/BNSS 2023):** BNS 2023 के तहत अपराध, ई-एफआईआर (e-FIR), और गिरफ्तारी नियम (BNSS 2023) ।\n* **💼 कमर्शियल और सिविल कानून:** भारतीय अनुबंध अधिनियम (Contract Act Section 27), कंपनी कानून 2013, DPDP Act 2023, और चेक बाउंस (Section 138 NI Act) ।\n\nआप आज किस कानूनी विषय या धारा के बारे में जानना चाहते हैं?`;
    }
    return `Namaste! 🙏 I am **Barrister AI**, your Indian Constitutional and Bharatiya Legal Assistant.\n\nI can help you research and navigate:\n* **📜 Constitution of India (Samvidhan):** Fundamental Rights (Articles 14, 19, 21), Writ Petitions (Art. 32/226), and Supreme Court Bench rulings.\n* **⚖️ New Bharatiya Criminal Sanhitas:** Offenses under BNS 2023, e-FIR and arrest procedures under BNSS 2023, and electronic evidence under BSA 2023.\n* **💼 Commercial & Civil Law:** Indian Contract Act Section 27 (void non-competes), Section 74 damages, Companies Act 2013, DPDP Act 2023, and Cheque Bounce remedies under Section 138 NI Act.\n\nWhat legal topic, statute, or case precedent would you like to explore today?`;
  }

  // 0B. Acknowledgments, Thanks, or Short confirmations
  const thanks = ['thanks', 'thank you', 'thx', 'ok', 'okay', 'got it', 'awesome', 'great', 'nice', 'understood', 'yes', 'no', 'cool', 'dhanyavad', 'shukriya', 'good'];
  if (thanks.includes(cleanPrompt)) {
    if (isHi) {
      return `आपका बहुत-बहुत स्वागत है! 😊\n\nयदि आपके पास **भारतीय संविधान**, **IPC और BNS 2023 कानूनों**, या किसी भी कानूनी समझौते के बारे में कोई और प्रश्न है, तो बेझिझक पूछें। मैं सहायता के लिए तैयार हूँ!`;
    }
    return `You're very welcome! 😊\n\nIf you have any more questions about **Indian Constitutional Law**, want to compare an old **IPC section with BNS 2023**, or need to analyze a commercial agreement, feel free to ask anytime. I am here to assist!`;
  }

  // 0C. Identity, Creator, & Help Queries
  if (cleanPrompt.includes('who are you') || cleanPrompt.includes('what is your name') || cleanPrompt.includes('who created you') || cleanPrompt.includes('who made you') || cleanPrompt.includes('sakshamfit') || cleanPrompt.includes('your name') || cleanPrompt.includes('who is barrister') || cleanPrompt === 'help' || cleanPrompt === 'what can you do' || cleanPrompt === 'how to use') {
    if (isHi) {
      return `मैं **बैरिस्टर एआई (Barrister AI Bharat)** हूँ, जिसे **sakshamfit** द्वारा भारतीय नागरिकों और अधिवक्ताओं के लिए डिज़ाइन और विकसित किया गया है।\n\nमैं भारत के संविधान, नए BNS/BNSS/BSA 2023 कानूनों, और सुप्रीम कोर्ट के निर्णयों का विशेषज्ञ हूँ।\n\nआज मैं आपके अनुसंधान में कैसे मदद कर सकता हूँ?`;
    }
    return `I am **Barrister AI (Bharat Edition)**, an Indian Constitutional & Legal Assistant designed and developed with ❤️ by **sakshamfit**.\n\nI am specialized in:\n* The **Constitution of India (Bharatiya Samvidhan)** and landmark Supreme Court benches\n* The new **BNS, BNSS, and BSA 2023** criminal codes\n* **Commercial & Privacy Law** including the Indian Contract Act 1872, Companies Act 2013, DPDP Act 2023, and PMLA 2002.\n\nHow may I assist your research today?`;
  }

  if (isHi) {
    return `### 💡 सरल हिंदी सारांश (What This Means for You)
भारतीय संविधान और नए कानूनों (BNS/BNSS 2023) के तहत आपके मौलिक अधिकार पूरी तरह सुरक्षित हैं। किसी भी सरकारी आदेश या अनुचित पुलिस कार्रवाई के खिलाफ आपको कानूनी सुरक्षा प्राप्त है।

### 📜 कानून क्या कहता है (Acts & Sections)
* **अनुच्छेद 21 (Article 21):** प्राण और दैहिक स्वतंत्रता का अधिकार। किसी भी व्यक्ति को न्यायसंगत और उचित प्रक्रिया के बिना वंचित नहीं किया जा सकता।
* **BNS 2023 / BNSS 2023:** नए आपराधिक कानून के तहत नागरिकों को विशेष सुरक्षा, ई-एफआईआर (e-FIR), और 24 घंटे के भीतर मजिस्ट्रेट प्रस्तुति का अधिकार है।

### 🏛️ सुप्रीम कोर्ट का ऐतिहासिक फैसला (Why This Case Matters)
* **जस्टिस पुट्टास्वामी (2017) / मनेका गांधी (1978):** सुप्रीम कोर्ट ने स्पष्ट किया कि कोई भी कानूनी प्रक्रिया निष्पक्ष, न्यायसंगत और गैर-मनमानी होनी चाहिए।

### ✅ आपको आगे क्या करना चाहिए (Action Plan)
1. **लिखित सूचना मांगें:** किसी भी कार्रवाई से पहले सरकारी आदेश या आधार की लिखित प्रति मांगें।
2. **सही धारा का उल्लेख करें:** शिकायतों में IPC के साथ BNS 2023 की धाराओं का प्रयोग करें।
3. **कानूनी सलाह लें:** हाईकोर्ट या सुप्रीम कोर्ट में याचिका दायर करने के लिए वरिष्ठ अधिवक्ता से संपर्क करें।

<div class="legal-caution-box">
  <strong>⚠️ बैरिस्टर एआई नोट:</strong> यह भारतीय कानून की सामान्य जानकारी है। किसी भी कानूनी कदम से पहले वरिष्ठ अधिवक्ता से परामर्श लें।
</div>`;
  }

  if (isHinglish) {
    return `### 💡 Plain-English & Hinglish Summary
Indian Constitution aur naye BNS/BNSS 2023 laws ke under aapke fundamental rights completely protected hain. Kisi bhi arbitrary police action ya unfair government order ke against aapko legal remedy available hai.

### 📜 What the Law Says (Acts & Sections)
* **Article 21 (Right to Life & Privacy):** Har citizen ko personal liberty aur privacy ka fundamental right hai.
* **BNS / BNSS 2023:** Naye criminal laws me e-FIR filing aur written arrest notice compulsory hai.

### 🏛️ Supreme Court Landmark Ruling
* **Puttaswamy (2017) & Maneka Gandhi (1978):** Supreme Court ne rule kiya ki koi bhi legal procedure just, fair, aur reasonable hona chahiye.

### ✅ Practical Action Plan (What You Should Do Next)
1. **Official written notice demand karein:** Police ya authority se written arrest memo ya order copy lein.
2. **Correct BNS section cite karein:** Apni complaint ya RTI application me naye code mention karein.
3. **High Court ya Supreme Court approach karein:** Article 226 ya Article 32 me Writ Petition file ki ja sakti hai.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> Yeh Indian law ka general legal explanation hai. Court filings ke liye hamesha Advocate on Record (AOR) se consult karein.
</div>`;
  }

  // Check if prompt references a known statute number in BHARATIYA_STATUTE_MAP
  for (const [key, val] of Object.entries(BHARATIYA_STATUTE_MAP)) {
    if (lower.includes(key) || lower.includes(val.old.toLowerCase()) || lower.includes(val.newSection.toLowerCase())) {
      return `### 📑 Bharatiya Legal Authority & Statute Mapping: ${val.title}
You asked about **${val.old}** / **${val.newSection}** under Indian Law.

### ⚖️ Statutory Mapping & Supreme Court Precedent (Bharat)
* **Old Statute Reference:** \`${val.old}\`
* **New Bharatiya Sanhita / Active Code:** \`${val.newSection}\`
* **Statutory Principle:** ${val.summary}
* **Supreme Court Benchmark:** *${val.precedent}*

### 📋 Procedural & Practical Legal Steps
1. **Cite Correct Statutory Section:** In all FIRs, notices, and court petitions filed after July 1, 2024, use the new **BNS/BNSS/BSA** sections alongside equivalent old sections.
2. **Observe Limitation & Notice Deadlines:** Verify whether statutory notice (such as 30 days under Section 138 NI Act or 60 days under Section 80 CPC) is a pre-condition to filing.

<div class="legal-caution-box">
  <strong>⚠️ Bharatiya Advocate Note:</strong> This AI response is trained on the Constitution of India and Central Acts. Consult an Advocate on Record (AOR) for formal court representation.
</div>`;
    }
  }

  // 1. Indian Constitution: Fundamental Rights, Articles 14, 19, 21, Basic Structure, Puttaswamy, Maneka Gandhi
  if (lower.includes('constitution') || lower.includes('fundamental right') || lower.includes('article 14') || lower.includes('article 19') || lower.includes('article 21') || lower.includes('puttaswamy') || lower.includes('maneka gandhi') || lower.includes('basic structure')) {
    return `### 💡 Plain-English Summary (What This Means for You)
Under the **Constitution of India (Bharatiya Samvidhan)**, you have fundamental rights that protect you from unfair or arbitrary actions by the government or public authorities. Your life, liberty, privacy, and freedom of speech cannot be taken away without a fair and just legal reason.

### 📜 What the Law Says (Acts & Sections)
* **Article 14 (Equality Before Law):** The government must treat everyone equally and cannot make arbitrary rules.
* **Article 19(1)(a) (Freedom of Speech):** You have the right to express your views freely, subject only to reasonable restrictions for national security or public order.
* **Article 21 (Right to Life & Privacy):** No one can deprive you of your personal liberty or privacy unless the legal procedure is **"just, fair, and reasonable"** (*Maneka Gandhi v. Union of India, 1978*).

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **Justice K.S. Puttaswamy v. Union of India (2017 9-Judge Bench):** The Supreme Court unanimously ruled that **Privacy is a Fundamental Right** under Article 21. Any government restriction on your privacy must be legal, necessary, and proportionate.

### ✅ What You Should Do Next (Action Plan)
1. **Check if a Government Body is Involved:** Constitutional fundamental rights apply primarily against government bodies or public authorities (Article 12).
2. **Request Information / File RTI:** Ask for official written orders or grounds before complying with arbitrary actions.
3. **Approach the High Court or Supreme Court:** If your fundamental rights are violated, you have the direct constitutional right to file a **Writ Petition** under Article 226 (High Court) or Article 32 (Supreme Court).

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> This is a simple explanation of Indian constitutional rights. Always consult a Senior Advocate for High Court or Supreme Court writ petitions.
</div>`;
  }

  // 2. Constitutional Writs: Article 32 & 226
  if (lower.includes('writ') || lower.includes('article 32') || lower.includes('article 226') || lower.includes('habeas corpus') || lower.includes('mandamus') || lower.includes('certiorari') || lower.includes('quo warranto')) {
    return `### 💡 Plain-English Summary (What This Means for You)
A **Writ Petition** is a direct constitutional remedy. If a government authority or police officer violates your rights, refuses to do their statutory duty, or detains someone illegally, you can ask a High Court or the Supreme Court to issue an immediate binding order against them.

### 📜 The 5 Constitutional Writs (In Simple Words)
* **1. Habeas Corpus ("Bring the person"):** Used when someone is illegally arrested or detained by police without legal grounds.
* **2. Mandamus ("We command"):** Orders a government officer or department to do their mandatory statutory duty that they have unlawfully refused to do.
* **3. Certiorari ("To cancel an order"):** Cancels an unfair or illegal order passed by a tribunal, administrative officer, or lower court.
* **4. Prohibition:** Stops a lower tribunal from handling a matter outside its legal authority.
* **5. Quo Warranto:** Challenges an unqualified person who is illegally occupying a public office.

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **L. Chandra Kumar v. Union of India (1997 7-Judge Bench):** The Supreme Court ruled that the right to approach High Courts (Article 226) and the Supreme Court (Article 32) is an **inviolable basic feature** of the Constitution that Parliament can never take away.

### ✅ What You Should Do Next (Action Plan)
1. **Choose the Right Court:** File under **Article 226 in your High Court** for both Fundamental Rights and general administrative arbitrariness, or **Article 32 in the Supreme Court** strictly for Fundamental Rights.
2. **Collect Official Evidence:** Attach copies of the illegal order, police memo, or correspondence.
3. **Engage an Advocate on Record (AOR):** Writ pleadings require verification and formal affidavits under High Court / Supreme Court rules.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> High Courts generally prefer that you try regular departmental appeals first unless there is a direct fundamental rights violation.
</div>`;
  }

  // 3. Bharatiya Nyaya Sanhita (BNS 2023), BNSS 2023, BSA 2023 vs. IPC/CrPC/Evidence Act
  if (lower.includes('bns') || lower.includes('bnss') || lower.includes('bsa') || lower.includes('bharatiya nyaya') || lower.includes('ipc') || lower.includes('crpc') || lower.includes('criminal law') || lower.includes('evidence') || lower.includes('fir')) {
    return `### 💡 Plain-English Summary (What This Means for You)
Effective **July 1, 2024**, India replaced its old colonial criminal laws (IPC 1860, CrPC 1973, and Evidence Act 1872) with three modern **Bharatiya Sanhitas**. These new laws introduce electronic FIR filing, strict investigation timelines, and new protections for victims.

### 📜 What the Law Says (Acts & Sections)
* **BNS 2023 Section 111 (Organized Crime):** Specific statutory penalties for organized syndicates, cybercrime, and economic offenses.
* **BNS 2023 Section 152 (Sovereignty Protection):** The old colonial sedition law (IPC 124A) is repealed. Section 152 penalizes acts endangering India's sovereignty or armed rebellion.
* **BNSS 2023 Section 173 (e-FIR & Registration):** You can now file an FIR electronically via portal or email. Police must conduct preliminary inquiries in specific offenses within 14 days.
* **BSA 2023 Section 63 (Electronic Evidence):** Digital records (emails, server logs, WhatsApp, CCTV) are now **primary evidence**, making digital proof much easier to submit in court.

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **Arnesh Kumar v. State of Bihar (2014):** Now statutory law under **BNSS Section 35**—police cannot automatically arrest you for offenses punishable up to 7 years without issuing a written **Notice of Appearance** first.

### ✅ What You Should Do Next (Action Plan)
1. **Use New BNS / BNSS Sections:** In all police complaints or notices filed after July 1, 2024, cite the new BNS/BNSS section numbers.
2. **Preserve Digital Evidence:** Save original email files, server hash values, or screenshots to satisfy BSA 2023 Section 63 requirements.
3. **Check Arrest Notice Rules:** If police contact you regarding a complaint under 7 years punishment, request an official BNSS Section 35 Notice of Appearance.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> Criminal procedure under BNSS 2023 involves strict deadlines. Retain a criminal defense advocate for police or court proceedings.
</div>`;
  }

  // 4. Indian Contract Act Section 27, Non-Competes, Liquidated Damages Section 74
  if (lower.includes('non-compete') || lower.includes('section 27') || lower.includes('contract act') || lower.includes('compete') || lower.includes('liquidated damages') || lower.includes('section 74')) {
    return `### 💡 Plain-English Summary (What This Means for You)
In India, an employer **cannot legally stop you from working for a competitor or starting your own business after you resign**. Any non-compete clause that tries to restrict your job after your employment ends is completely **void and illegal** under Indian law.

### 📜 What the Law Says (Acts & Sections)
* **Section 27 of Indian Contract Act 1872:** *"Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void."*
* **Section 74 (Liquidated Damages):** A penalty figure named in a contract is only a maximum ceiling; Indian courts will award only actual reasonable compensation proved.

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **Percept D'Mark v. Zaheer Khan (2006 Supreme Court):** The Supreme Court reaffirmed that **post-termination non-competes are void under Section 27**, no matter how reasonable the duration or geography appears.
* **Niranjan Shankar Golikari (1967):** Confirmed that non-competes are valid **only during** your active employment term, not after you leave.

### ✅ What You Should Do Next (Action Plan)
1. **Do Not Fear Post-Exit Non-Competes:** If an employer threatens an injunction over a post-resignation non-compete, Indian High Courts will dismiss it under Section 27.
2. **Respect Confidentiality & Trade Secrets:** Employers *can* legally enforce **Non-Disclosure of Trade Secrets** and **Non-Solicitation of Clients/Employees** clauses.
3. **Serve Notice Periods Legally:** Adhere to agreed Garden Leave or paid notice periods during your active employment contract.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> While non-competes are void after leaving, never download or take confidential company files prior to resignation.
</div>`;
  }

  // 5. India DPDP Act 2023, GDPR, Privacy
  if (lower.includes('dpdp') || lower.includes('privacy') || lower.includes('gdpr') || lower.includes('data protection') || lower.includes('consent') || lower.includes('cert-in')) {
    return `### 💡 Plain-English Summary (What This Means for You)
India's **Digital Personal Data Protection Act 2023 (DPDP Act)** gives you strong control over your personal information. Companies cannot collect, use, or share your personal data without your clear, affirmative consent, and you have the right to demand deletion of your data at any time.

### 📜 What the Law Says (Acts & Sections)
* **Affirmative Consent (Section 6):** Your consent must be free, specific, informed, and capable of withdrawal at any time in English or any Indian language.
* **Security Safeguards (Section 8):** Companies must protect personal data against breaches.
* **Statutory Fines (Schedule):** The Data Protection Board of India can impose penalties up to **₹250 crore** on companies that fail to protect user data.
* **CERT-In Cyber Rules (2022):** Companies must report cybersecurity breaches within **6 hours** of discovery.

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **Justice K.S. Puttaswamy v. Union of India (2017 9-Judge Bench):** Declared the **Right to Privacy** a Fundamental Right under Article 21, establishing that data collection must always be lawful and proportionate.

### ✅ What You Should Do Next (Action Plan)
1. **Provide Clear Opt-Outs:** If you run a business, ensure your website offers simple consent withdrawal links.
2. **Sign Vendor DPAs:** Require cloud and AI hosting vendors to sign explicit Data Processing Agreements.
3. **Submit Erasure Notices:** As a citizen, you can send a formal DPDP Act Right to Erasure notice to any company's Data Protection Officer to permanently delete your data.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> DPDP Act statutory fines apply per breach event. Regularly audit data security practices.
</div>`;
  }

  // 6. POSH Act 2013, Workplace Harassment, Vishaka Guidelines
  if (lower.includes('posh') || lower.includes('harassment') || lower.includes('vishaka') || lower.includes('icc') || lower.includes('internal complaints')) {
    return `### 💡 Plain-English Summary (What This Means for You)
India enforces **zero tolerance for sexual harassment in workplaces**. Under the **POSH Act 2013**, every organization with 10 or more employees must set up an **Internal Complaints Committee (ICC)** to investigate complaints quickly and fairly.

### 📜 What the Law Says (Acts & Sections)
* **Mandatory ICC (Section 4):** The committee must be headed by a senior woman employee, have at least 50% women members, and include 1 independent external legal or NGO expert.
* **Inquiry Timeline (Section 11 & 13):** The ICC inquiry must be completed within **90 calendar days**, and action taken within 60 days thereafter.
* **Penalties for Default (Section 26):** Failure to constitute an ICC triggers an immediate fine up to **₹50,000**, with double fines and business license cancellation for repeat offenses.

### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
* **Vishaka v. State of Rajasthan (1997 Supreme Court):** The Supreme Court laid down landmark constitutional guidelines declaring workplace harassment a direct violation of gender equality (Article 14) and dignity (Article 21).
* **Aureliano Fernandes v. State of Goa (2023):** Supreme Court ordered all public and private entities to verify and publish their ICC member names and contact details online.

### ✅ What You Should Do Next (Action Plan)
1. **Publish Your ICC Details:** Display ICC committee member names and emails prominently on notice boards and your website.
2. **Submit Annual Returns:** File the mandatory annual POSH compliance report to the District Officer by January 31 each year.
3. **Conduct Annual Training:** Hold annual awareness workshops for employees and orientation for ICC members.

<div class="legal-caution-box">
  <strong>⚠️ Barrister AI Note:</strong> Employers are strictly liable for statutory compliance under the POSH Act 2013 regardless of company size.
</div>`;
  }

  // 7. General Indian Legal & Constitutional Perspective (Original Working Assistant Response)
  let baseResp = `### 📑 Legal Analysis: "${prompt.slice(0, 65)}${prompt.length > 65 ? '...' : ''}"
Here is an analysis of your query under **${jurName}** constitutional and statutory jurisprudence (Law as of: **${AppState.asOfDate || '11 Aug 2026'}**).

### ⚖️ Governing Framework & Principles (Bharat)
* **Constitutional Protections (Article 14, 19 & 21):** Every citizen and individual within India is guaranteed equality before the law, freedom from arbitrary state action, and the right to life, personal liberty, and privacy (*Maneka Gandhi v. Union of India*; *Justice K.S. Puttaswamy v. Union of India*).
* **Statutory Compliance & Due Process:** Whether this matter falls under civil contracts (Indian Contract Act 1872), criminal procedure (BNSS 2023 / BNS 2023), or administrative law, actions must strictly comply with codified statutory timelines and the rules of Natural Justice (<span class="glossary-term" data-term="audi alteram partem">Audi Alteram Partem</span> — right to a fair hearing).
* **Evidentiary Standard (BSA 2023):** Under the Bharatiya Sakshya Adhiniyam 2023 (Section 63), keep verifiable records, written correspondence, and digital custody hash logs to establish admissibility.

### 📋 Recommended Procedural Plan
1. **Document All Facts & Timeline:** Organize all communications, notices, invoices, or official orders with dates and timestamps.
2. **Verify Statutory Notice & Limitation:** Check whether a statutory pre-action notice (such as 30 days under Section 138 NI Act or 60 days under Section 80 CPC) is required before initiating formal proceedings.
3. **Appropriate Forum:** Depending on the dispute, remedies may lie before a Civil Court, Commercial Court, Judicial Magistrate, or via a Constitutional Writ Petition under Article 226 (High Court) / Article 32 (Supreme Court).

<div class="legal-caution-box">
  <strong>⚠️ Important Advocate Note:</strong> Barrister is an AI legal research assistant providing preliminary legal information. Always consult a qualified Advocate on Record (AOR) for formal legal representation.
</div>`;

  const personaMode = localStorage.getItem('jurisai_advocate_mode') || 'senior_advocate';
  if (personaMode === 'student') {
    baseResp = isHi ? `### 🎓 विधि छात्र (Law Student) केस ब्रीफ व सार\nभारतीय संविधान और नए BNS/BNSS/BSA कानून के तहत इस विषय का परीक्षा विश्लेषण:\n\n### 📜 मुख्य बेयर एक्ट प्रावधान\n* संबंधित संवैधानिक अनुच्छेद व धाराएं।\n\n### 🏛️ रेशियो डेसीडेंडी (निर्णय का आधार)\n* सुप्रीम कोर्ट द्वारा स्थापित सिद्धांत।\n\n### 📝 परीक्षा और मौखिक परीक्षा (Viva) के प्रमुख प्रश्न\n1. इस सिद्धांत का मुख्य आधार क्या है?\n2. ऐतिहासिक केस कौन से हैं?` :
               isHinglish ? `### 🎓 Law Student Case Brief & Overview\nIndian Constitution aur naye BNS/BNSS/BSA laws ke under is topic ka exam notes analysis:\n\n### 📜 Core Bare Act Provisions\n* Applicable constitutional articles aur BNS sections.\n\n### 🏛️ Ratio Decidendi (Court Ne Aisa Kyun Rule Kiya)\n* Supreme Court ka binding ratio under Article 141.\n\n### 📝 Top 3 Exam & Viva Questions to Remember\n1. What is the ratio decidendi of this landmark case?\n2. How does the new Bharatiya Sanhita alter the old colonial code?` :
               `### 🎓 Law Student Case Brief & Overview\nExam notes and ratio analysis under the Constitution of India and BNS/BNSS 2023:\n\n### 📜 Core Bare Act Provisions\n* Governing constitutional articles and statutory sections.\n\n### 🏛️ Ratio Decidendi (Why the Court Ruled This Way)\n* Binding legal rationale established by the Supreme Court.\n\n### 📝 Top 3 Exam & Viva Questions to Remember\n1. What is the core ratio decidendi of this precedent?\n2. How do the new Bharatiya Sanhitas modify the colonial IPC/CrPC provisions?`;
  } else if (personaMode === 'business') {
    baseResp = isHi ? `### 💡 कमर्शियल जोखिम सारांश (Commercial Risk Summary)\nव्यापारिक अनुबंध, कंपनी कानून 2013, और DPDP Act 2023 के तहत जोखिम मूल्यांकन:\n\n### 📜 कॉर्पोरेट और अनुबंध कानून मानक\n* भारतीय अनुबंध अधिनियम (Section 27 & 74) व कंपनी कानून अनुपालन।\n\n### 🏛️ सुप्रीम कोर्ट प्रवर्तन निर्णय\n* न्यायालय द्वारा निर्धारित कमर्शियल और मध्यस्थता (Arbitration) मानक।\n\n### ✅ कार्यकारी कार्य योजना (Risk Mitigation Plan)\n1. लिखित अनुबंध और स्टाम्प ड्यूटी अनुपालन सुनिश्चित करें।\n2. धारा 27 के तहत अवैध प्रतिबंधों से बचें।` :
               isHinglish ? `### 💡 Commercial Risk Summary (Hinglish)\nCommercial contracts, Companies Act 2013, aur DPDP Act 2023 ke under corporate risk assessment:\n\n### 📜 Corporate & Contract Law Standards\n* Indian Contract Act (Sec 27 & 74) aur corporate governance rules.\n\n### 🏛️ Supreme Court Enforcement Precedents\n* Binding commercial arbitration aur liability standards.\n\n### ✅ Executive Action Plan & Mitigation Steps\n1. Proper stamp duty aur agreement registration check karein.\n2. Post-exit non-compete clauses (Sec 27) par depend na karein.` :
               `### 💡 Commercial Risk Summary\nExecutive risk assessment under commercial contracts, Companies Act 2013, and DPDP Act 2023:\n\n### 📜 Corporate & Contract Law Standards\n* Governing provisions under Indian Contract Act 1872 (Sec 27 & 74) and corporate compliance.\n\n### 🏛️ Supreme Court Enforcement Precedents\n* Authoritative benchmarks on arbitration and commercial liability.\n\n### ✅ Executive Action Plan & Mitigation Steps\n1. Verify stamp duty compliance under the Indian Stamp Act 1899.\n2. Restructure non-competes into enforceable trade secret NDA covenants.`;
  }

  if (AppState.researchMode === 'deep') {
    return `### ⚖️ DEEP RESEARCH MEMO • SOURCE-FIRST SYNTHESIS
<div style="margin-bottom:0.8rem;">
  <span class="verify-badge">✔ Verified Authority</span>
  <span class="authority-badge binding">★★★★★ Binding SC Bench</span>
</div>
<div class="contradiction-alert-box">
  <div class="contradiction-alert-title">⚠ Contradiction & Statutory Evolution Analysis</div>
  <div><strong>Old Regime vs. New Bharatiya Code:</strong> Colonial statutory provisions (such as automatic arrest under IPC 498A or colonial sedition under IPC 124A) are superseded by BNSS 2023 Section 35 notice of appearance and BNS 2023 Section 152 sovereignty rules.</div>
  <div style="margin-top:0.4rem; color:var(--accent-gold);"><strong>Barrister AI Analysis:</strong> Supreme Court constitutional benches in Arnesh Kumar (2014) and Puttaswamy (2017) strictly bind procedural enforcement.</div>
</div>

${baseResp}

### 📚 Verified Sources & Authorities Cited
<div class="ai-sources-container">
  <div class="sources-list">
    <span class="statute-pill">Constitution of India Part III</span>
    <span class="statute-pill">BNSS 2023 Section 35 & 173</span>
    <span class="statute-pill">BSA 2023 Section 63</span>
    <span class="case-pill">Puttaswamy (2017 9-Judge)</span>
    <span class="case-pill">Maneka Gandhi (1978 7-Judge)</span>
    <span class="case-pill">Kesavananda Bharati (1973 13-Judge)</span>
  </div>
</div>`;
  }

  return baseResp;
}

// --- Contract Analyzer Risk Engine ---
function analyzeLegalDocument(text) {
  const clauses = [];
  let riskScore = 0;

  const lowerText = text.toLowerCase();

  // 1. Indian Contract Act Section 27
  if (lowerText.includes('non-compete') || lowerText.includes('never to engage') || lowerText.includes('thirty-six (36) months thereafter') || lowerText.includes('post-termination') || lowerText.includes('restraint of trade')) {
    const isIndian = lowerText.includes('india') || lowerText.includes('bharat') || lowerText.includes('delhi') || lowerText.includes('mumbai') || lowerText.includes('section 27') || AppState.jurisdiction === 'IN';
    clauses.push({
      type: isIndian ? 'risk' : 'warning',
      title: isIndian ? '🇮🇳 Indian Contract Act Section 27: Void Restraint of Trade' : 'Post-Termination Non-Compete Covenant',
      original: 'Employee shall not directly or indirectly work for, consult with, or own any business globally... / Never to engage in any commercial activity...',
      explanation: isIndian
        ? 'HIGH RISK UNDER INDIAN LAW: Section 27 of the Indian Contract Act 1872 strictly voids any agreement restraining anyone from exercising a lawful profession, trade, or business after employment cessation (Niranjan Shankar Golikari SC precedent).'
        : 'MODERATE TO HIGH RISK: Overly broad non-competes face strict judicial scrutiny regarding duration and geographic scope.',
      recommendation: isIndian
        ? 'Do not rely on post-resignation non-competes in India. Replace with enforceable Non-Disclosure of Trade Secrets and Non-Solicitation of Clients/Employees clauses.'
        : 'Limit restrictive covenants to 6-12 months and restrict geographic scope to active business territories.'
    });
    riskScore += isIndian ? 4 : 2;
  }

  // 2. Indian Stamp Act 1899 & Registration Act 1908
  if (lowerText.includes('leave and license') || lowerText.includes('lease') || lowerText.includes('stamp duty') || lowerText.includes('registration act') || lowerText.includes('sub-registrar')) {
    const isUnstamped = lowerText.includes('unstamped') || lowerText.includes('without obligation to provide itemized');
    clauses.push({
      type: isUnstamped ? 'risk' : 'good',
      title: '🇮🇳 Stamp Duty & Registration Act Compliance (India)',
      original: 'This Agreement shall be compulsorily registered... / Stamp duty under Maharashtra Stamp Act has been paid...',
      explanation: isUnstamped
        ? 'HIGH RISK: Unstamped or unregistered lease/arbitration agreements are inadmissible in evidence under Section 35 of the Indian Stamp Act 1899 and Section 49 of Registration Act 1908.'
        : 'FAVORABLE / COMPLIANT CLAUSE: Express acknowledgment of Stamp Duty payment and compulsory registration with Sub-Registrar protects evidentiary admissibility.',
      recommendation: 'Ensure all multi-year commercial leases and high-value contracts are printed on requisite Non-Judicial Stamp Paper and registered with the Sub-Registrar.'
    });
    riskScore += isUnstamped ? 3 : 0;
  }

  // 3. Indemnification Check
  if (lowerText.includes('indemnify') || lowerText.includes('indemnification') || lowerText.includes('hold harmless')) {
    const isPerpetual = lowerText.includes('without limitation') || lowerText.includes('perpetual') || lowerText.includes('indefinitely');
    clauses.push({
      type: isPerpetual ? 'risk' : 'warning',
      title: 'Indemnification & Hold Harmless Clause',
      original: 'Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party without limitation...',
      explanation: isPerpetual 
        ? 'HIGH RISK: This clause imposes unlimited, perpetual financial liability on your organization for any third-party claims or breaches, with no dollar cap.'
        : 'MODERATE RISK: Standard indemnification clause, but you should verify that liability is mutual and capped at a reasonable financial threshold.',
      recommendation: 'Negotiate a liability cap (e.g., "capped at total fees paid in the trailing 12 months") and ensure indemnification applies mutually to both parties.'
    });
    riskScore += isPerpetual ? 4 : 2;
  }

  // 4. Perpetual Duration / Term
  if (lowerText.includes('indefinitely') || lowerText.includes('perpetual') || lowerText.includes('ten (10) years') || lowerText.includes('10 years')) {
    clauses.push({
      type: 'risk',
      title: 'Perpetual or Excessive Term Duration',
      original: 'This Agreement shall remain in effect indefinitely... or for a period of ten (10) years following termination.',
      explanation: 'HIGH RISK: Indefinite confidentiality or multi-year non-compete periods are frequently ruled unreasonable by courts and place an unfair burden on signatories.',
      recommendation: 'Request a standard commercial term of 2 to 3 years for confidentiality, and limit restrictive covenants to a maximum of 6 to 12 months.'
    });
    riskScore += 3;
  }

  // 5. Unilateral Arbitration or Jurisdiction
  if (lowerText.includes('unilateral') || lowerText.includes('only the disclosing party') || lowerText.includes('landlord reserves the absolute unilateral right') || lowerText.includes('without obligation to provide itemized')) {
    clauses.push({
      type: 'risk',
      title: 'Unilateral Rights & One-Sided Remedies',
      original: 'Only the Disclosing Party shall have the right to seek injunctive relief... / Landlord reserves the absolute unilateral right...',
      explanation: 'HIGH RISK: This provision grants exclusive legal remedies or discretionary power to one party while denying those same rights to you.',
      recommendation: 'Insist on mutual remedy clauses and require written itemized proof or mutual consent before any penalties or deductions are applied.'
    });
    riskScore += 4;
  }

  // 6. Liquidated Damages Cap (Section 74 Indian Contract Act)
  if (lowerText.includes('liquidated damages') || lowerText.includes('genuine pre-estimate') || lowerText.includes('rupees fifteen lakhs') || lowerText.includes('₹15,00,000')) {
    clauses.push({
      type: 'good',
      title: '🇮🇳 Liquidated Damages Cap (Section 74 Contract Act)',
      original: 'Employer shall be entitled to claim reasonable compensation not exceeding ₹15,00,000... genuine pre-estimate of loss under Section 74...',
      explanation: 'FAVORABLE / COMPLIANT CLAUSE: Aligns with Supreme Court precedent in Fateh Chand v. Balkishan Dass—stipulated damages act as an enforceable cap representing genuine loss rather than an arbitrary penalty.',
      recommendation: 'Ensure both parties maintain documentation supporting how the pre-estimated damages figure was calculated.'
    });
  }

  // 7. IP Ownership / Assignment
  if (lowerText.includes('ip ownership') || lowerText.includes('assigns to employer all rights') || lowerText.includes('section 17 of the indian copyright act') || lowerText.includes('royalty-free license to use, sell')) {
    clauses.push({
      type: 'good',
      title: 'Work-Made-For-Hire & Copyright Assignment',
      original: 'In accordance with Section 17 of the Indian Copyright Act 1957, Employee hereby irrevocably assigns...',
      explanation: 'FAVORABLE / STANDARD CLAUSE: Express present-tense assignment complies with statutory copyright transfer requirements in India and US.',
      recommendation: 'Verify that the assignment is limited to inventions or code developed during the course of employment or related to company business.'
    });
  }

  if (clauses.length === 0) {
    clauses.push({
      type: 'warning',
      title: 'General Legal Terms & Obligations',
      original: text.slice(0, 150) + '...',
      explanation: 'This document contains binding obligations and terms. We recommend verifying governing law, termination notice periods, and liability boundaries.',
      recommendation: 'Ensure all key deliverables, payment milestones, and termination rights are explicitly documented in plain language.'
    });
    riskScore = 2;
  }

  let riskLevel = 'low';
  let riskLabel = 'Low Risk - Standard Commercial Terms';
  if (riskScore >= 7) {
    riskLevel = 'high';
    riskLabel = 'High Risk - Critical Legal Attention Required';
  } else if (riskScore >= 3) {
    riskLevel = 'medium';
    riskLabel = 'Moderate Risk - Recommended Modifications';
  }

  return {
    riskLevel,
    riskLabel,
    clauses
  };
}

// --- Document Generator Template Engine ---
function generateDocumentText(templateId, data) {
  const dateStr = data.date || new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const partyA = data.partyA || 'Alpha Enterprises Private Limited';
  const partyB = data.partyB || 'Rajesh Sharma / Beta Solutions';
  const jur = data.jurisdiction || 'New Delhi, India (Supreme Court / High Court of Delhi)';
  const term = data.term || '2 Years / 36 Months';
  const fee = data.fee || '₹5,00,000 (Rupees Five Lakhs INR)';
  const includeArb = data.includeArbitration;
  const includeConf = data.includeConfidentiality;
  const includeIP = data.includeIP;

  if (templateId === 'writ') {
    return `<div class="doc-title">🇮🇳 Constitutional Writ Petition Notice (Article 226 / Article 32)</div>
<div class="doc-section">
  <div class="doc-section-title">Before the Hon'ble High Court of Judicature at ${jur} / Supreme Court of India</div>
  <p><strong>Writ Petition (Civil / Criminal) No. ______ of 2026</strong><br>
  <strong>Petitioner:</strong> ${partyA}<br>
  <strong>Respondent (State / Public Authority):</strong> ${partyB}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Jurisdiction & Constitutional Authority</div>
  <p>This Petition is filed under <strong>Article 226 / Article 32 of the Constitution of India</strong> seeking the issuance of an appropriate Writ, Order, or Direction in the nature of <strong>Mandamus / Certiorari / Habeas Corpus</strong> to protect the Fundamental Rights of the Petitioner guaranteed under <strong>Articles 14, 19(1)(g), and 21</strong> of the Bharatiya Samvidhan.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Brief Facts & State Arbitrariness (Violation of Article 14 & 21)</div>
  <p>The impugned action / order passed by the Respondent authority is wholly arbitrary, unreasonable, and violative of the principles of Natural Justice (<em>Audi Alteram Partem</em>), thereby breaching the equality protection under <strong>Article 14</strong> and personal liberty under <strong>Article 21</strong> as laid down by the Hon'ble Supreme Court in <em>Maneka Gandhi v. Union of India</em> and <em>Justice K.S. Puttaswamy v. Union of India</em>.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">3. Prayer & Relief Sought</div>
  <p>In light of the fundamental basic structure of judicial review (<em>Kesavananda Bharati v. State of Kerala</em>), the Petitioner humbly prays that this Hon'ble Court may be pleased to:<br>
  (a) Issue a Writ of Mandamus / Certiorari quashing the impugned arbitrary order;<br>
  (b) Direct the Respondent authority to restore status quo ante with costs.</p>
</div>
<div class="doc-signatures">
  <div>
    <p><strong>${partyA}</strong> (Petitioner)</p>
    <br><br>
    <div class="sig-line">Advocate on Record / Legal Counsel</div>
  </div>
  <div>
    <p><strong>Verification & Affidavit</strong></p>
    <br><br>
    <div class="sig-line">Solemnly Affirmed at ${jur}</div>
  </div>
</div>`;
  }

  if (templateId === 'in_offer') {
    return `<div class="doc-title">🇮🇳 Indian Executive Employment Offer & Restrictive Covenant (Contract Act Compliant)</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${dateStr} | Place: ${jur}</div>
  <p><strong>Employer:</strong> ${partyA} (Incorporated under Companies Act 2013)<br>
  <strong>Employee:</strong> ${partyB}<br>
  <strong>Annual CTC Compensation:</strong> ${fee}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Appointment & Compensation</div>
  <p>Employer is pleased to appoint Employee to the executive role with total annual compensation of <strong>${fee}</strong>, subject to statutory tax deductions (TDS) and provident fund contributions under Indian labour laws.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Compliance with Indian Contract Act Section 27 (No Post-Termination Restraint)</div>
  <p>In accordance with <strong>Section 27 of the Indian Contract Act 1872</strong> and Supreme Court jurisprudence (<em>Niranjan Shankar Golikari v. Century Spinning</em>), Employee agrees to devote full-time professional attention during active employment. No negative non-compete covenant shall apply after the cessation of employment.</p>
</div>
${includeConf ? `<div class="doc-section">
  <div class="doc-section-title">3. Perpetual Trade Secret & Confidentiality Protection</div>
  <p>Employee shall maintain absolute confidentiality over Employer's trade secrets, customer lists, and financial algorithms both during and after employment.</p>
</div>` : ''}
${includeIP ? `<div class="doc-section">
  <div class="doc-section-title">4. Statutory Copyright Assignment (Section 17 Indian Copyright Act 1957)</div>
  <p>In compliance with <strong>Section 17 of the Indian Copyright Act 1957</strong>, Employee hereby irrevocably assigns to Employer all present and future right, title, and interest in all software code, inventions, and work product developed during the term of employment.</p>
</div>` : ''}
${includeArb ? `<div class="doc-section">
  <div class="doc-section-title">5. Dispute Resolution & Arbitration (Arbitration Act 1996)</div>
  <p>All disputes arising out of this Agreement shall be referred to sole arbitration in <strong>${jur}</strong> in accordance with the <strong>Arbitration and Conciliation Act 1996</strong>.</p>
</div>` : ''}
<div class="doc-signatures">
  <div>
    <p><strong>${partyA}</strong></p>
    <br><br>
    <div class="sig-line">Authorized HR Officer / Director</div>
  </div>
  <div>
    <p><strong>${partyB}</strong></p>
    <br><br>
    <div class="sig-line">Employee Signature & Acceptance</div>
  </div>
</div>`;
  }

  if (templateId === 'in_notice') {
    return `<div class="doc-title">🇮🇳 Statutory Legal Notice (Section 138 NI Act / Section 80 CPC)</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${dateStr} | Sent via Registered Post with Acknowledgment Due (RPAD)</div>
  <p><strong>To:</strong> ${partyB}<br>
  <strong>From:</strong> ${partyA} (Advocate / Creditor)<br>
  <strong>Re:</strong> Statutory Notice for Dishonour of Cheque / Recovery of Amount: <strong>${fee}</strong></p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Notice of Statutory Default & Dishonour</div>
  <p>Under instructions from my client, <strong>${partyA}</strong>, notice is hereby given that the cheque issued by you towards discharge of existing commercial debt in the amount of <strong>${fee}</strong> has been returned unpaid by the bankers with the memo remark <em>"Funds Insufficient / Exceeds Arrangement"</em>.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Mandatory 15-Day Statutory Deadline (Section 138 NI Act)</div>
  <p>In accordance with the mandatory provisions of <strong>Section 138 of the Negotiable Instruments Act 1881</strong>, you are hereby called upon to pay the full cheque amount of <strong>${fee}</strong> to my client within <strong>fifteen (15) clear calendar days</strong> from the date of receipt of this notice.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">3. Legal Consequences of Non-Compliance</div>
  <p>Please take notice that failure to remit the full amount within the statutory 15-day period shall leave my client with no alternative but to initiate criminal prosecution against you before the Hon'ble Judicial Magistrate under <strong>Section 138 read with Section 141 and Section 143A of the Negotiable Instruments Act</strong>, claiming imprisonment up to 2 years, double cheque fines, and interim compensation up to 20%, entirely at your risk and cost.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Yours faithfully,<br><strong>${partyA}</strong></p>
    <br><br>
    <div class="sig-line">Advocate on Record / High Court Bar</div>
  </div>
</div>`;
  }

  if (templateId === 'nda') {
    return `<div class="doc-title">Mutual Non-Disclosure Agreement</div>
<div class="doc-section">
  <div class="doc-section-title">1. Parties & Effective Date</div>
  <p>This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of <strong>${dateStr}</strong>, by and between <strong>${partyA}</strong> ("Disclosing Party") and <strong>${partyB}</strong> ("Receiving Party"). Both parties may disclose and receive proprietary confidential information under this Agreement.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Definition of Confidential Information</div>
  <p>"Confidential Information" means any non-public technical data, business plans, trade secrets, software code, financial records, customer lists, and strategic concepts disclosed by either party, whether verbally, electronically, or in writing.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">3. Obligation of Non-Disclosure</div>
  <p>Each party agrees to maintain the Confidential Information in strict confidence and use at least the same degree of care it uses for its own proprietary information. Neither party shall disclose Confidential Information to any third party without express prior written consent.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">4. Term & Duration of Obligations</div>
  <p>This Agreement shall commence on the Effective Date and remain in effect for a period of <strong>${term}</strong>. The obligation to protect bona fide trade secrets shall continue indefinitely for so long as the information remains a trade secret under applicable law.</p>
</div>
${includeConf ? `<div class="doc-section">
  <div class="doc-section-title">5. Return or Destruction of Materials</div>
  <p>Upon written request by the Disclosing Party, the Receiving Party shall promptly return or permanently delete and destroy all copies of Confidential Information within ten (10) business days and certify such destruction in writing.</p>
</div>` : ''}
${includeArb ? `<div class="doc-section">
  <div class="doc-section-title">6. Dispute Resolution & Arbitration</div>
  <p>Any dispute, controversy, or claim arising out of or relating to this Agreement shall be settled by binding arbitration in accordance with commercial arbitration rules in <strong>${jur}</strong>. Judgment upon the award rendered by the arbitrator(s) may be entered in any court having competent jurisdiction.</p>
</div>` : ''}
<div class="doc-section">
  <div class="doc-section-title">7. Governing Law</div>
  <p>This Agreement shall be governed by, construed, and enforced in accordance with the laws of <strong>${jur}</strong>, without regard to its conflict of laws rules.</p>
</div>
<div class="doc-signatures">
  <div>
    <p><strong>${partyA}</strong></p>
    <br><br>
    <div class="sig-line">Authorized Signature & Title</div>
  </div>
  <div>
    <p><strong>${partyB}</strong></p>
    <br><br>
    <div class="sig-line">Authorized Signature & Title</div>
  </div>
</div>`;
  }

  if (templateId === 'contractor') {
    return `<div class="doc-title">Independent Contractor & IP Assignment Agreement</div>
<div class="doc-section">
  <div class="doc-section-title">1. Engagement of Services</div>
  <p>This Independent Contractor Agreement ("Agreement") is made effective as of <strong>${dateStr}</strong>, by and between <strong>${partyA}</strong> ("Client") and <strong>${partyB}</strong> ("Contractor"). Client hereby engages Contractor to perform professional consulting, development, or creative services as set forth in agreed statements of work.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Compensation & Payment Terms</div>
  <p>In consideration for the professional services rendered, Client agrees to pay Contractor the total sum of <strong>${fee}</strong>. Invoices shall be submitted upon milestone completion and are payable within fourteen (14) calendar days of receipt.</p>
</div>
${includeIP ? `<div class="doc-section">
  <div class="doc-section-title">3. Work-Made-For-Hire & Complete IP Assignment</div>
  <p>Contractor hereby irrevocably assigns, transfers, and conveys to Client all present and future right, title, and interest in and to all custom work product, software code, inventions, and deliverables created specifically for Client under this Agreement, free and clear of all encumbrances.</p>
</div>` : ''}
<div class="doc-section">
  <div class="doc-section-title">4. Independent Contractor Status</div>
  <p>Contractor is an independent contractor and not an employee, partner, or agent of Client. Contractor shall be solely responsible for all income taxes, self-employment taxes, and insurance benefits.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">5. Governing Law & Jurisdiction</div>
  <p>This Agreement shall be construed under and governed by the laws of <strong>${jur}</strong>.</p>
</div>
<div class="doc-signatures">
  <div>
    <p><strong>${partyA}</strong> (Client)</p>
    <br><br>
    <div class="sig-line">Authorized Signature & Date</div>
  </div>
  <div>
    <p><strong>${partyB}</strong> (Contractor)</p>
    <br><br>
    <div class="sig-line">Authorized Signature & Date</div>
  </div>
</div>`;
  }

  return `<div class="doc-title">Website Terms of Service & Privacy Notice</div>
<div class="doc-section">
  <div class="doc-section-title">Effective Date: ${dateStr}</div>
  <p>Welcome to <strong>${partyA}</strong>. By accessing our website, platform, or digital services, you agree to be bound by these Terms of Service governed by the laws of <strong>${jur}</strong>.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Use of Services & Account Security</div>
  <p>Users must provide accurate registration information and are responsible for maintaining the confidentiality of their login credentials. Any unauthorized use of the platform is strictly prohibited.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Privacy & Data Protection Compliance</div>
  <p>We process user data in accordance with applicable data protection laws (including India DPDP Act 2023 and GDPR). We do not sell personal data to unauthorized third-party brokers.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">3. Disclaimer of Warranties</div>
  <p>The platform is provided "AS IS" and "AS AVAILABLE" without express or implied warranties of any kind, including warranties of merchantability or fitness for a particular purpose.</p>
</div>
<div class="doc-signatures">
  <div>
    <p><strong>${partyA}</strong> - Legal & Privacy Department</p>
    <br><br>
    <div class="sig-line">Authorized Corporate Officer</div>
  </div>
</div>`;
}

// --- DOM Initialization & Event Wiring ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initKnowledgeBase();
  initChatEngine();
  initAnalyzer();
  initGenerator();
  initRightsExplorer();
  initModals();
  initJurisdictionSwitcher();
  initHeaderQuickSearch();
  initStatuteConverterBar();
  initCommandPalette();
  initSavedResearch();
  initCaseCompare();
  initLegalNodeGraph();
  initLegalDraftingSuite();
  initDeepResearchToggle();
  initFloatingCopilot();
  initLegalGlossary();

  if (!AppState.disclaimerAccepted) {
    openModal('disclaimer-modal');
  }

  renderChatHistoryList();
  renderKnowledgeBaseCards();
});

// --- 🇮🇳 BHARATIYA STATUTE CONVERTER BAR WIRE-UP ---
function initStatuteConverterBar() {
  const input = document.getElementById('statute-converter-input');
  const popup = document.getElementById('converter-result-popup');
  if (!input || !popup) return;

  function lookupStatute(val) {
    const term = val.toLowerCase().trim();
    if (!term || term.length < 2) {
      popup.classList.remove('active');
      return;
    }

    let foundKey = null;
    for (const key of Object.keys(BHARATIYA_STATUTE_MAP)) {
      if (term === key || term.includes(key) || BHARATIYA_STATUTE_MAP[key].old.toLowerCase().includes(term) || BHARATIYA_STATUTE_MAP[key].newSection.toLowerCase().includes(term)) {
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      const data = BHARATIYA_STATUTE_MAP[foundKey];
      popup.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <span style="font-size:0.75rem; color:#ff9933; font-weight:700; text-transform:uppercase;">⚖️ INSTANT STATUTE MAPPING</span>
          <button id="close-converter-popup" style="background:none; border:none; color:var(--text-muted); cursor:pointer;">✕</button>
        </div>
        <div style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">${data.old} ➔ <span style="color:#fbbf24;">${data.newSection}</span></div>
        <div style="font-size:0.84rem; color:var(--text-secondary); margin:0.4rem 0;"><strong>${data.title}:</strong> ${data.summary}</div>
        <div style="font-size:0.78rem; color:#c4b5fd; background:rgba(139,92,246,0.15); padding:0.4rem 0.65rem; border-radius:6px; margin-top:0.5rem;">
          <strong>🏛️ Supreme Court Benchmark:</strong> ${data.precedent}
        </div>
        <button id="converter-ask-ai-btn" style="margin-top:0.65rem; background:linear-gradient(135deg, #ff9933, #f59e0b); color:#fff; border:none; padding:0.38rem 0.85rem; border-radius:6px; font-weight:600; font-size:0.78rem; cursor:pointer;">
          🤖 Ask AI About This Provision
        </button>
      `;
      popup.classList.add('active');

      const closeBtn = document.getElementById('close-converter-popup');
      if (closeBtn) {
        closeBtn.onclick = () => popup.classList.remove('active');
      }

      const askBtn = document.getElementById('converter-ask-ai-btn');
      if (askBtn) {
        askBtn.onclick = () => {
          popup.classList.remove('active');
          switchView('chat-view');
          sendChatMessage(`Explain ${data.old} and its new Bharatiya equivalent ${data.newSection} under Indian Law, and how the Supreme Court ruling in ${data.precedent} applies.`);
        };
      }
    } else {
      popup.classList.remove('active');
    }
  }

  input.addEventListener('input', (e) => lookupStatute(e.target.value));
  input.addEventListener('focus', (e) => lookupStatute(e.target.value));

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !popup.contains(e.target)) {
      popup.classList.remove('active');
    }
  });
}

// --- 1. Theme Management ---
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  document.documentElement.setAttribute('data-theme', AppState.theme);
  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('jurisai_theme_bright', AppState.theme);
      localStorage.setItem('jurisai_theme', AppState.theme);
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  const iconSpan = document.getElementById('theme-icon-display');
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.title = AppState.theme === 'dark' ? "Switch to Bright Mode" : "Switch to Dark Mode";
  }
  if (!iconSpan) return;
  iconSpan.innerHTML = AppState.theme === 'dark' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

// --- 2. Navigation & Sidebar Control ---
function initNavigation() {
  const sidebar = document.getElementById('app-sidebar');
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-btn');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
      } else {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (!targetView) return;

      switchView(targetView);

      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
}

function switchView(viewId) {
  AppState.currentView = viewId;

  document.querySelectorAll('.view-section').forEach((sec) => {
    sec.classList.remove('active');
  });

  const targetSection = document.getElementById(viewId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  document.querySelectorAll('.nav-link, .mobile-nav-btn').forEach((link) => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const titleDisplay = document.getElementById('navbar-page-title');
  if (titleDisplay) {
    const titleMap = {
      'knowledge-view': '🇮🇳 Indian Constitution & Law Library',
      'chat-view': 'AI Legal Adviser & Chat (Bharat)',
      'analyzer-view': 'Contract & Document Risk Analyzer',
      'generator-view': 'Legal Document Generator (INR / Bharat)',
      'rights-view': 'Statutory Rights & RTI FAQ'
    };
    titleDisplay.textContent = titleMap[viewId] || 'JurisAI Legal Tech';
  }
}

// --- 3. Professional Knowledge Base & Law Library Engine ---
function initKnowledgeBase() {
  const searchInput = document.getElementById('kb-search-input');
  const catTabs = document.querySelectorAll('.k-tab-btn');
  const jurPills = document.querySelectorAll('.jur-filter-pill');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.kbSearchTerm = e.target.value.toLowerCase().trim();
      renderKnowledgeBaseCards();
    });
  }

  catTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      catTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.kbCategory = tab.getAttribute('data-category') || 'all';
      renderKnowledgeBaseCards();
    });
  });

  jurPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      jurPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.kbJurisdictionFilter = pill.getAttribute('data-jur') || 'ALL';
      renderKnowledgeBaseCards();
    });
  });
}

function renderKnowledgeBaseCards() {
  const grid = document.getElementById('kb-articles-grid');
  const statsDisplay = document.getElementById('kb-active-count-display');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = KNOWLEDGE_BASE_ARTICLES.filter((article) => {
    const matchCategory = AppState.kbCategory === 'all' || article.categoryCode === AppState.kbCategory;
    const matchJur = AppState.kbJurisdictionFilter === 'ALL' || 
                     article.jurisdiction === 'GLOBAL' || 
                     article.jurisdiction === AppState.kbJurisdictionFilter;
    const matchSearch = AppState.kbSearchTerm === '' ||
                        article.title.toLowerCase().includes(AppState.kbSearchTerm) ||
                        article.summary.toLowerCase().includes(AppState.kbSearchTerm) ||
                        article.statutes.some((st) => st.toLowerCase().includes(AppState.kbSearchTerm));
    return matchCategory && matchJur && matchSearch;
  });

  if (statsDisplay) {
    statsDisplay.textContent = `${filtered.length} Verified Legal & Constitutional Authorities`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); background: var(--bg-tertiary); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏛️</div>
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">No legal authorities matched your filter</div>
        <div style="font-size: 0.88rem; margin-top: 0.25rem;">Try clearing your search terms or selecting 'ALL' jurisdictions.</div>
      </div>
    `;
    return;
  }

  filtered.forEach((article) => {
    const card = document.createElement('div');
    card.className = 'kb-article-card';

    const statutesHTML = article.statutes.map((st) => `<span class="statute-pill ${article.jurisdiction === 'IN' ? 'india-const' : ''}">${st}</span>`).join('');

    card.innerHTML = `
      <div class="kb-card-header">
        <span class="kb-category-badge">§ ${article.category}</span>
        <span class="kb-jurisdiction-badge">${article.jurisdiction === 'GLOBAL' ? 'IN • GLOBAL AUTHORITY' : 'IN • ' + article.jurisdiction + ' BHARAT'}</span>
      </div>
      <div class="kb-card-title">${article.title}</div>
      <div class="kb-card-summary">${article.summary}</div>
      <div class="kb-card-statutes">${statutesHTML}</div>
      <div class="kb-card-footer">
        <button class="btn-kb-read" data-read-id="${article.id}">
          <span>📖 Read Full Precedent</span>
        </button>
        <button class="btn-kb-ask-ai" data-ask-id="${article.id}">
          <span>🤖 Ask AI About This</span>
        </button>
      </div>
    `;

    const readBtn = card.querySelector('[data-read-id]');
    readBtn.addEventListener('click', () => {
      openKnowledgeDrawer(article);
    });

    const askBtn = card.querySelector('[data-ask-id]');
    askBtn.addEventListener('click', () => {
      triggerAskAIFromKB(article);
    });

    grid.appendChild(card);
  });
}

function openKnowledgeDrawer(article) {
  const titleEl = document.getElementById('kb-drawer-title');
  const bodyEl = document.getElementById('kb-drawer-body');
  const askBtn = document.getElementById('kb-drawer-ask-ai-btn');

  if (!titleEl || !bodyEl) return;

  titleEl.innerHTML = `§ ${article.title}`;

  const statutesPills = article.statutes.map((st) => `<span class="statute-pill ${article.jurisdiction === 'IN' ? 'india-const' : ''}" style="font-size:12px;">${st}</span>`).join(' ');

  const checklistHTML = article.complianceChecklist.map((item) => `<li>${item}</li>`).join('');

  bodyEl.innerHTML = `
    <div class="kb-detail-section">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        <span class="kb-category-badge" style="font-size:12px;">§ ${article.category}</span>
        <span class="kb-jurisdiction-badge" style="font-size:12px; padding:0.3rem 0.75rem;">${article.jurisdiction === 'GLOBAL' ? 'IN • GLOBAL AUTHORITY' : 'IN • ' + article.jurisdiction + ' BHARAT'}</span>
      </div>
      <div style="font-size:1.02rem; font-weight:600; color:var(--text-primary); line-height:1.7;">
        ${article.executiveSummary}
      </div>
      <div style="margin-top:0.75rem;">
        ${statutesPills}
      </div>
    </div>

    <div class="kb-detail-section">
      <div class="kb-section-header">⚖️ Governing Statutes & Constitutional References</div>
      <div class="kb-statute-box">
        ${article.governingStatutes}
      </div>
    </div>

    <div class="kb-detail-section">
      <div class="kb-section-header">📜 Supreme Court & Landmark Precedents</div>
      <div style="font-size:0.92rem; color:var(--text-secondary); line-height:1.7;">
        ${article.landmarkPrecedents}
      </div>
    </div>

    <div class="kb-detail-section">
      <div class="kb-section-header">✅ Practical Compliance & Drafting Checklist</div>
      <ul class="kb-checklist">
        ${checklistHTML}
      </ul>
    </div>
  `;

  if (askBtn) {
    askBtn.onclick = () => {
      closeModal('kb-detail-drawer');
      triggerAskAIFromKB(article);
    };
  }

  const whyBtn = document.getElementById('why-case-btn');
  if (whyBtn) {
    whyBtn.onclick = () => {
      const existWhy = bodyEl.querySelector('.why-case-box');
      if (existWhy) {
        existWhy.remove();
      } else {
        const box = document.createElement('div');
        box.className = 'why-case-box';
        box.innerHTML = `<div style="font-size:11px; font-weight:700; color:var(--accent-gold); text-transform:uppercase; margin-bottom:0.35rem;">💡 RELEVANCE TO YOUR RESEARCH • ARTICLE 141 BINDING AUTHORITY</div>
<div style="color:var(--text-primary);"><strong>Why is this case relevant?</strong> This Supreme Court Constitution Bench precedent is binding law under Article 141 of the Constitution of India. It establishes the governing statutory test and evidentiary standard for your active research question.</div>`;
        bodyEl.prepend(box);
      }
    };
  }

  openModal('kb-detail-drawer');
}

function triggerAskAIFromKB(article) {
  switchView('chat-view');
  const prompt = article.askAIPrompt || `Please analyze the constitutional and statutory requirements of ${article.title} (${article.statutes.join(', ')}) under Indian Law and Supreme Court precedents.`;
  sendChatMessage(prompt);
}

// --- Header Quick Legal Research Bar ---
function initHeaderQuickSearch() {
  const input = document.getElementById('header-quick-search-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = input.value.trim();
      if (!term) return;
      input.value = '';

      switchView('knowledge-view');
      AppState.kbSearchTerm = term.toLowerCase();
      const kbInput = document.getElementById('kb-search-input');
      if (kbInput) kbInput.value = term;
      renderKnowledgeBaseCards();
    }
  });
}

// --- 4. Chat Engine & AI Simulation ---
function initChatEngine() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input-textarea');
  const promptCards = document.querySelectorAll('.prompt-card, .resource-pill');
  const newChatBtn = document.getElementById('new-chat-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const personaBtns = document.querySelectorAll('.persona-btn');
  const langBtns = document.querySelectorAll('.language-btn');

  // Explain Like I'm... Persona switcher
  personaBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      personaBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const persona = btn.getAttribute('data-persona');
      localStorage.setItem('jurisai_advocate_mode', persona || 'senior_advocate');
      applyPersonaAndLanguageUI();
    });
  });

  // Language switcher (English / हिन्दी / Hinglish)
  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      langBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      localStorage.setItem('jurisai_language', lang || 'en');
      applyPersonaAndLanguageUI();
    });
  });

  // Apply initial saved language & persona on load
  const savedLang = localStorage.getItem('jurisai_language') || 'en';
  const savedPersona = localStorage.getItem('jurisai_advocate_mode') || 'senior_advocate';
  langBtns.forEach((b) => {
    if (b.getAttribute('data-lang') === savedLang) b.classList.add('active');
    else b.classList.remove('active');
  });
  personaBtns.forEach((b) => {
    if (b.getAttribute('data-persona') === savedPersona || (savedPersona === 'senior_advocate' && b.getAttribute('data-persona') === 'advocate')) b.classList.add('active');
    else b.classList.remove('active');
  });
  applyPersonaAndLanguageUI();

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const prompt = chatInput.value.trim();
      if (!prompt) return;
      chatInput.value = '';
      sendChatMessage(prompt);
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const prompt = chatInput.value.trim();
        if (!prompt) return;
        chatInput.value = '';
        sendChatMessage(prompt);
      }
    });
  }

  promptCards.forEach((card) => {
    card.addEventListener('click', () => {
      const promptText = card.getAttribute('data-prompt') || card.getAttribute('data-query');
      if (promptText) {
        sendChatMessage(promptText);
      }
    });
  });

  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      startNewChatSession();
    });
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Clear all saved chat history sessions?')) {
        AppState.chatHistory = [];
        AppState.activeChatId = null;
        localStorage.setItem('jurisai_chat_history', '[]');
        renderChatHistoryList();
        startNewChatSession();
      }
    });
  }
}

// --- Bilingual I18N UI & Persona Customization Engine (English / हिन्दी / Hinglish + 4 Personas) ---
function applyPersonaAndLanguageUI() {
  const lang = localStorage.getItem('jurisai_language') || 'en';
  const persona = localStorage.getItem('jurisai_advocate_mode') || 'senior_advocate';
  const isHi = lang === 'hi';
  const isHinglish = lang === 'hinglish';

  const wTitle = document.querySelector('.welcome-title');
  const wSub = document.querySelector('.welcome-subtitle');
  const textarea = document.getElementById('chat-input-textarea');

  // Customize Welcome Title & Subtitle according to Persona and Language
  if (wTitle) {
    if (persona === 'student') {
      wTitle.textContent = isHi ? "बैरिस्टर AI • LLB और ज्यूडिशियरी स्टडी पार्टनर" :
                           isHinglish ? "Barrister AI • LLB aur Judiciary Exam Copilot" :
                           "Barrister AI • LLB & Judiciary Exam Partner";
    } else if (persona === 'citizen') {
      wTitle.textContent = isHi ? "बैरिस्टर AI से जानें अपने अधिकार" :
                           isHinglish ? "Barrister AI se Jaanein Apne Kanooni Adhikar" :
                           "Know Your Rights with Barrister AI";
    } else if (persona === 'business') {
      wTitle.textContent = isHi ? "बैरिस्टर AI • कॉर्पोरेट और कमर्शियल लीगल सलाहकार" :
                           isHinglish ? "Barrister AI • General Counsel aur Corporate Copilot" :
                           "Barrister AI • General Counsel & Corporate";
    } else {
      wTitle.textContent = isHi ? "बैरिस्टर से भारतीय कानून के बारे में पूछें।" : 
                           isHinglish ? "Barrister AI se Bharatiya Kanoon ke baare me puchein." : 
                           "Ask Barrister about Indian Law.";
    }
  }

  if (wSub) {
    if (persona === 'student') {
      wSub.textContent = isHi ? "भारतीय संविधान, BNS कानून, और केस ब्रीफ के लिए आपका स्टडी पार्टनर।" :
                         isHinglish ? "Samvidhan, BNS laws, aur landmark SC case briefs ka study copilot." :
                         "Study copilot for Indian Constitution, BNS/BNSS codes, and case briefs.";
    } else if (persona === 'citizen') {
      wSub.textContent = isHi ? "नागरिक अधिकार, पुलिस गिरफ्तारी से बचाव, और RTI के लिए आपका मार्गदर्शक।" :
                         isHinglish ? "Apne rights, police rules, aur RTI samjhne ka simple guide." :
                         "Plain-English guide to Indian citizen rights, police arrest rules, and RTI.";
    } else if (persona === 'business') {
      wSub.textContent = isHi ? "कमर्शियल अनुबंध, कंपनी कानून, और DPDP Act के लिए आपका कॉर्पोरेट सलाहकार।" :
                         isHinglish ? "Contracts, Companies Act, aur DPDP Act compliance ka corporate copilot." :
                         "Corporate copilot for commercial contracts, Companies Act, and DPDP Act compliance.";
    } else {
      wSub.textContent = isHi ? "भारतीय संविधान, BNS/BNSS 2023, और सुप्रीम कोर्ट के फैसलों के लिए आपका AI सहायक।" :
                         isHinglish ? "Indian Constitution, BNS/BNSS 2023, aur Supreme Court judgments ke liye AI assistant." :
                         "AI assistant for Indian Constitutional law, BNS/BNSS 2023, and Supreme Court research.";
    }
  }

  if (textarea) {
    textarea.placeholder = isHi ? "कुछ लिखें..." :
                           isHinglish ? "Kuch likhein..." :
                           "Type something...";
  }

  // Update 5 Quick Resource Pills according to Persona
  const pills = document.querySelectorAll('.quick-resource-pills .resource-pill');
  if (pills && pills.length >= 5) {
    if (persona === 'student') {
      pills[0].textContent = isHi ? "🎓 केस ब्रीफ: Puttaswamy" : isHinglish ? "🎓 Case Brief: Puttaswamy" : "🎓 Case Brief: Puttaswamy";
      pills[0].setAttribute('data-query', "Give me a complete law student case brief of Justice K.S. Puttaswamy v. Union of India (2017): Facts, Issues, Judgment, and Ratio Decidendi.");
      pills[1].textContent = isHi ? "🎓 परीक्षा टेबल: IPC vs BNS" : isHinglish ? "🎓 Exam Table: IPC vs BNS" : "🎓 Exam Table: IPC vs BNS";
      pills[1].setAttribute('data-query', "Create an exam revision table comparing old IPC 1860 sections with new BNS 2023 sections.");
      pills[2].textContent = isHi ? "🎓 केस ब्रीफ: Maneka Gandhi" : isHinglish ? "🎓 Case Brief: Maneka Gandhi" : "🎓 Case Brief: Maneka Gandhi";
      pills[2].setAttribute('data-query', "Give me a law student case brief of Maneka Gandhi v. Union of India (1978) on Article 21 due process.");
      pills[3].textContent = isHi ? "🎓 Viva Q&A: Basic Structure" : isHinglish ? "🎓 Viva Q&A: Basic Structure" : "🎓 Viva Q&A: Basic Structure";
      pills[3].setAttribute('data-query', "What are the top 5 exam and viva questions on the Basic Structure Doctrine in Kesavananda Bharati?");
      pills[4].textContent = isHi ? "🎓 केस ब्रीफ: Shreya Singhal" : isHinglish ? "🎓 Case Brief: Shreya Singhal" : "🎓 Case Brief: Shreya Singhal";
      pills[4].setAttribute('data-query', "Give me a law student case brief of Shreya Singhal v. Union of India (2015) on Article 19(1)(a) freedom of speech.");
    } else if (persona === 'citizen') {
      pills[0].textContent = isHi ? "👤 गिरफ्तारी में मेरे अधिकार" : isHinglish ? "👤 Arrest me Mere Rights" : "👤 My Arrest Rights (BNSS)";
      pills[0].setAttribute('data-query', "What are my fundamental rights if police stop or arrest me under Article 22 and BNSS 2023?");
      pills[1].textContent = isHi ? "👤 RTI कैसे लगाएं" : isHinglish ? "👤 RTI Kaise Lagayein" : "👤 How to File RTI";
      pills[1].setAttribute('data-query', "How do I file an RTI application under the Right to Information Act 2005 step by step?");
      pills[2].textContent = isHi ? "👤 चेक बाउंस मार्गदर्शक" : isHinglish ? "👤 Cheque Bounce Guide" : "👤 Cheque Bounce Guide";
      pills[2].setAttribute('data-query', "What should I do if someone gave me a cheque that bounced under Section 138 NI Act?");
      pills[3].textContent = isHi ? "👤 किरायेदार के अधिकार" : isHinglish ? "👤 Tenant ke Adhikar" : "👤 Landlord & Tenant Rights";
      pills[3].setAttribute('data-query', "What are my rights if a landlord refuses to return my security deposit?");
      pills[4].textContent = isHi ? "👤 उपभोक्ता शिकायत" : isHinglish ? "👤 Consumer Complaint" : "👤 Consumer Complaint Portal";
      pills[4].setAttribute('data-query', "How do I file a consumer complaint on the E-Daakhil portal for defective goods?");
    } else if (persona === 'business') {
      pills[0].textContent = isHi ? "🧑‍💼 नॉन-कंपीट वैधता (Sec 27)" : isHinglish ? "🧑‍💼 Non-Compete Validity" : "🧑‍💼 Non-Compete Enforceability";
      pills[0].setAttribute('data-query', "Why are post-termination employee non-compete clauses void under Section 27 of the Indian Contract Act?");
      pills[1].textContent = isHi ? "🧑‍💼 DPDP Act 2023 नियम" : isHinglish ? "🧑‍💼 DPDP Act 2023 Rules" : "🧑‍💼 DPDP Act 2023 Compliance";
      pills[1].setAttribute('data-query', "What are the mandatory consent rules and ₹250 crore penalty triggers under India's DPDP Act 2023?");
      pills[2].textContent = isHi ? "🧑‍💼 अनुबंध हर्जाना (Sec 74)" : isHinglish ? "🧑‍💼 Liquidated Damages (Sec 74)" : "🧑‍💼 Liquidated Damages (Sec 74)";
      pills[2].setAttribute('data-query', "How should we structure liquidated damages under Section 74 of the Indian Contract Act to ensure enforceability?");
      pills[3].textContent = isHi ? "🧑‍💼 डायरेक्टर के दायित्व" : isHinglish ? "🧑‍💼 Directors Fiduciary Duties" : "🧑‍💼 Companies Act Directors Duties";
      pills[3].setAttribute('data-query', "What are the statutory fiduciary duties of a Director under Section 166 of the Companies Act 2013?");
      pills[4].textContent = isHi ? "🧑‍💼 चेक रिकवरी (Sec 138)" : isHinglish ? "🧑‍💼 Cheque Bounce Recovery" : "🧑‍💼 Section 138 Cheque Recovery";
      pills[4].setAttribute('data-query', "What is the statutory 30-day notice timeline for recovering money under Section 138 of the Negotiable Instruments Act?");
    } else {
      pills[0].textContent = isHi ? "§ संविधान (Samvidhan)" : isHinglish ? "§ Samvidhan (Constitution)" : "§ Constitution (Samvidhan)";
      pills[0].setAttribute('data-query', "Explain Fundamental Rights under Articles 14, 19, and 21 of the Indian Constitution & Puttaswamy ruling.");
      pills[1].textContent = isHi ? "§ BNS 2023 (अपराध कानून)" : isHinglish ? "§ BNS 2023 (Offenses)" : "§ BNS 2023 (Offenses)";
      pills[1].setAttribute('data-query', "What are the key changes in Bharatiya Nyaya Sanhita (BNS 2023) replacing IPC 1860?");
      pills[2].textContent = isHi ? "§ BNSS 2023 (प्रक्रिया)" : isHinglish ? "§ BNSS 2023 (Procedure)" : "§ BNSS 2023 (Procedure)";
      pills[2].setAttribute('data-query', "Explain BNSS 2023 e-FIR registration and Arnesh Kumar police arrest notice rules.");
      pills[3].textContent = isHi ? "§ BSA 2023 (साक्ष्य कानून)" : isHinglish ? "§ BSA 2023 (Evidence)" : "§ BSA 2023 (Evidence)";
      pills[3].setAttribute('data-query', "How does Bharatiya Sakshya Adhiniyam (BSA 2023 Section 63) change electronic evidence?");
      pills[4].textContent = isHi ? "§ सुप्रीम कोर्ट केस लॉ" : isHinglish ? "§ Supreme Court Case Law" : "§ Supreme Court Case Law";
      pills[4].setAttribute('data-query', "Explain the Basic Structure Doctrine in Kesavananda Bharati v. State of Kerala (1973).");
    }
  }

  // Update sidebar links
  const navTexts = document.querySelectorAll('.sidebar-nav .nav-text');
  const hiNames = [
    "बैरिस्टर एआई सहायक", "संविधान एक्सप्लोरर", "बीएनएस / भारतीय कानून", "उच्चतम न्यायालय निर्णय", 
    "अनुसंधान वर्कस्पेस", "सुरक्षित निर्णय", "दस्तावेज़ विश्लेषक", "कानूनी दस्तावेज़ निर्माता", 
    "सूचना का अधिकार (RTI)", "एआई इंजन सेटिंग्स"
  ];
  const hinglishNames = [
    "Barrister AI Assistant", "Samvidhan Explorer", "Naye BNS / BNSS Laws", "Supreme Court Judgments", 
    "Research Workspaces", "Saved Bookmarks", "Document Risk Analyzer", "Agreement Builder", 
    "RTI & Kanooni Adhikar", "AI Engine Settings"
  ];
  const enNames = [
    "Barrister AI Assistant", "Constitution Explorer", "BNS / BNSS / BSA", "Case Law Precedents", 
    "Research Workspaces", "Saved & History", "Contract Analyzer", "Document Builder", 
    "RTI & Statutory FAQ", "AI Engine Settings"
  ];

  navTexts.forEach((el, idx) => {
    if (isHi && hiNames[idx]) el.textContent = hiNames[idx];
    else if (isHinglish && hinglishNames[idx]) el.textContent = hinglishNames[idx];
    else if (enNames[idx]) el.textContent = enNames[idx];
  });

  // Update mobile bottom nav
  const mobileNavs = document.querySelectorAll('.mobile-bottom-nav span:not([style])');
  const hiMobile = ["संविधान", "बैरिस्टर AI", "सुरक्षित", "विश्लेषक", "RTI"];
  const hinglishMobile = ["Samvidhan", "Barrister AI", "Saved", "Analyzer", "RTI"];
  const enMobile = ["Samvidhan", "Barrister AI", "Saved", "Analyzer", "RTI"];
  mobileNavs.forEach((el, idx) => {
    if (isHi && hiMobile[idx]) el.textContent = hiMobile[idx];
    else if (isHinglish && hinglishMobile[idx]) el.textContent = hinglishMobile[idx];
    else if (enMobile[idx]) el.textContent = enMobile[idx];
  });
}

async function sendChatMessage(userText) {
  const messagesArea = document.getElementById('chat-messages-area');
  const welcomeScreen = document.getElementById('chat-welcome-screen');
  if (!messagesArea) return;

  if (welcomeScreen) {
    welcomeScreen.style.display = 'none';
  }

  if (!AppState.activeChatId) {
    const newId = 'chat_' + Date.now();
    AppState.activeChatId = newId;
    AppState.chatHistory.unshift({
      id: newId,
      title: userText.slice(0, 36) + '...',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      messages: []
    });
  }

  const currentSession = AppState.chatHistory.find((c) => c.id === AppState.activeChatId);

  appendMessageUI('user', userText);
  if (currentSession) {
    currentSession.messages.push({ role: 'user', content: userText });
  }

  const aiBubbleId = 'ai_msg_' + Date.now();
  appendMessageUI('ai', '', aiBubbleId, true);

  // 1. Determine response via Groq Cloud API, Backend Server (/api/chat), or Smart Simulation Mode
  let aiText = '';
  const targetElement = document.getElementById(aiBubbleId);
  if (!targetElement) return;

  try {
    // Secure flow: browser → serverless /api/chat → Groq (API key never ships to the browser)
    aiText = await tryBackendServerChat(userText, AppState.jurisdiction, currentSession ? currentSession.messages : []);
  } catch (err) {
    aiText = '';
  }
  if (!aiText) {
    // Fallback: embedded Smart Bharatiya Legal Simulation Engine (curated & verified)
    aiText = getAILegalResponse(userText, AppState.jurisdiction);
  }

  // === 🛡️ BARRISTER AI TRUST PIPELINE ===
  // Citation verification → evidence confidence gate → source-grounded answer
  const citationCheck = verifyAndCleanCitations(aiText);
  const pack = computeEvidencePack(userText);
  pack.verifiedCites = citationCheck.verifiedCites;
  pack.removedCites = citationCheck.removed;
  let trustText = applyEvidenceGate(citationCheck.cleanedText, pack);
  if (citationCheck.removed.length) {
    trustText += '\n\n🔎 **Citation check:** removed ' + citationCheck.removed.length + ' unverified citation(s) — ' + citationCheck.removed.slice(0, 3).join('; ') + '. Barrister only cites sources it can verify against its legal library.';
  }

  const formattedHTML = formatLegalMarkdown(trustText);
  const finalHTML = buildAIBubbleHTML(formattedHTML, pack);

  setTimeout(() => {
    targetElement.innerHTML = finalHTML;
    messagesArea.scrollTop = messagesArea.scrollHeight;

    if (currentSession) {
      currentSession.messages.push({ role: 'ai', content: aiText });
      localStorage.setItem('jurisai_chat_history', JSON.stringify(AppState.chatHistory));
      renderChatHistoryList();
    }
  }, 350);
}

// --- Direct Groq Cloud API Helper (llama-3.3-70b-versatile) ---
async function callGroqCloudAPI(prompt, jurisdictionCode, history = []) {
  // Self-hosted path only: requires a user-supplied key (never embedded in the bundle).
  if (!AppState.apiKey && !localStorage.getItem('jurisai_api_key')) {
    throw new Error('No self-hosted API key configured — using secure backend or simulation mode.');
  }
  const systemPrompt = `You are Barrister (Bharat Edition), an elite Senior Advocate and Indian Constitutional & Legal AI Assistant powered by Groq Llama-3.3-70B-Versatile. Designed & developed with SakshamFit.
Always explain Indian legal concepts in simple, easy-to-understand language so any normal citizen or user can understand their rights clearly. Avoid dense legalese or confusing Latin jargon without a plain-English translation.
When a user asks about any crime, police complaint, or IPC section (like 420, 302, 307, 376, 498A, 500, 354, 506, 406), always state BOTH the familiar old IPC section number AND the new BNS 2023 section number.
When answering legal questions, structure your reply cleanly:
### 💡 Plain-English Summary (What This Means for You)
### 📜 What the Law Says (Acts & Sections)
### 🏛️ Landmark Supreme Court Ruling (Why This Case Matters)
### ✅ Practical Action Plan (What You Should Do Next)
If the user says 'hi', 'hello', 'namaste', 'who are you', 'thanks', or greets you conversationally, respond warmly and naturally without generating legal Markdown headers.

=== ABSOLUTE INTEGRITY & ANTI-HALLUCINATION RULES (MANDATORY — NEVER VIOLATE) ===
1. NEVER invent cases, citations, section numbers, Articles, paragraphs, quotations, judge names, or dates. A fabricated citation is worse than no citation.
2. Clearly distinguish: (a) verified legal authority, (b) your own inference/reasoning, and (c) user-provided facts. Label inferences as inferences.
3. You may cite ONLY cases from this approved verified list:
   Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225 · Maneka Gandhi v. Union of India (1978) 1 SCC 248 · Justice K.S. Puttaswamy v. Union of India (2017) 10 SCC 1 · Shreya Singhal v. Union of India (2015) 5 SCC 1 · Vishaka v. State of Rajasthan (1997) 6 SCC 241 · Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 · Lalita Kumari v. Govt. of Uttar Pradesh (2014) 2 SCC 1 · Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1 · Anvar P.V. v. P.K. Basheer (2014) 10 SCC 473 · Niranjan Shankar Golikari v. Century Spinning (1967) 2 SCR 378 · Percept D'Mark (India) v. Zaheer Khan (2006) 4 SCC 227 · Fateh Chand v. Balkishan Dass AIR 1963 SC 1405 · E.P. Royappa v. State of Tamil Nadu (1974) 4 SCC 3 · L. Chandra Kumar v. Union of India (1997) 3 SCC 261 · Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1 · Indra Sawhney v. Union of India 1992 Supp (3) SCC 217 · Olga Tellis v. Bombay Municipal Corporation (1985) 3 SCC 545 · A.K. Gopalan v. State of Madras AIR 1950 SC 27 · Mohd. Ahmed Khan v. Shah Bano Begum (1985) 2 SCC 556 · M.C. Mehta v. Union of India (1987) 1 SCC 395 · Minerva Mills v. Union of India (1980) 3 SCC 625 · D.K. Basu v. State of West Bengal (1997) 1 SCC 416.
   If a relevant case is NOT in this list, refer to it by name only and NEVER invent a citation number.
4. If the verified material does not establish the answer, say exactly: "I do not have sufficient authoritative evidence to answer this reliably" — do not speculate.
5. For every significant legal proposition, name its supporting source (Constitution Article / BNS-BNSS-BSA Section / approved case).
6. Never present an inference as settled law, and never fill missing facts from memory.
LAW AS-OF DATE (CURRENT LAW CONTEXT): ${AppState.asOfDate || '2026-08-11'} — prefer the law in force on this date (BNS/BNSS/BSA 2023 effective 2024-07-01).`;

  const messages = [
    { role: 'system', content: `${systemPrompt}\n\nACTIVE USER JURISDICTION: ${jurisdictionCode}` },
    ...history.slice(-6),
    { role: 'user', content: prompt }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AppState.apiKey || localStorage.getItem('jurisai_api_key') || ''}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: AppState.groqModel || 'llama-3.3-70b-versatile',
      messages: messages,
      temperature: Number(localStorage.getItem('jurisai_temperature')) || 0.2,
      max_tokens: 2048,
      top_p: 0.95
    })
  });

  if (!response.ok) {
    throw new Error(`Groq API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || getAILegalResponse(prompt, jurisdictionCode);
}

// --- Direct OpenAI API Helper ---
async function callOpenAICloudAPI(prompt, jurisdictionCode, history = []) {
  const systemPrompt = `You are Barrister (Bharat Edition), an elite Senior Advocate and Indian Constitutional & Legal AI Assistant. Designed & developed with SakshamFit. Prioritize Indian Constitution, BNS/BNSS 2023, Section 27 Contract Act, and Supreme Court precedents.`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AppState.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...history.slice(-4), { role: 'user', content: prompt }],
      temperature: 0.3
    })
  });
  if (!response.ok) throw new Error(`OpenAI API returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || getAILegalResponse(prompt, jurisdictionCode);
}

// --- Try Backend Server /api/chat Helper ---
async function tryBackendServerChat(prompt, jurisdictionCode, history = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt, jurisdiction: jurisdictionCode, history: history.slice(-4), asOfDate: AppState.asOfDate || '2026-08-11', temperature: Number(localStorage.getItem('jurisai_temperature')) || 0.2 })
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.reply || null;
  } catch (err) {
    return null;
  }
}

function appendMessageUI(role, contentText, elementId = null, isTyping = false) {
  const messagesArea = document.getElementById('chat-messages-area');
  if (!messagesArea) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${role}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = `avatar ${role === 'user' ? 'user-avatar' : 'ai-avatar'}`;
  avatarDiv.textContent = role === 'user' ? 'U' : 'K';
  avatarDiv.title = role === 'user' ? 'You' : 'Barrister AI (Bharat)';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'message-content-wrapper';

  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'message-bubble';

  if (isTyping && !contentText) {
    if (elementId) bubbleDiv.id = elementId;
    bubbleDiv.innerHTML = `<span style="opacity:0.6;font-style:italic;">⚖️ Barrister is analyzing Bharatiya Constitution & Supreme Court precedents...</span>`;
  } else if (role === 'user') {
    bubbleDiv.textContent = contentText;
  } else {
    bubbleDiv.className += ' ai-formatted-content';
    bubbleDiv.innerHTML = `<div style="font-size:11px; font-weight:700; color:var(--accent-gold); text-transform:uppercase; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;"><span>✦ BARRISTER AI (BHARAT)</span></div>` + formatLegalMarkdown(contentText);
  }

  contentWrapper.appendChild(bubbleDiv);

  if (role === 'ai') {
    const actionsBar = document.createElement('div');
    actionsBar.className = 'message-actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'msg-action-btn';
    copyBtn.innerHTML = `📋 Copy`;
    copyBtn.addEventListener('click', () => {
      const textToCopy = bubbleDiv.innerText;
      navigator.clipboard.writeText(textToCopy);
      copyBtn.innerHTML = `✅ Copied!`;
      setTimeout(() => (copyBtn.innerHTML = `📋 Copy`), 2000);
    });

    const speakBtn = document.createElement('button');
    speakBtn.className = 'msg-action-btn';
    speakBtn.innerHTML = `🔊 Read Aloud`;

    const stopBtn = document.createElement('button');
    stopBtn.className = 'msg-action-btn';
    stopBtn.innerHTML = `⏹️ Stop`;
    stopBtn.style.display = 'none';
    stopBtn.style.color = 'var(--error)';

    speakBtn.addEventListener('click', () => {
      speakText(bubbleDiv.innerText, speakBtn, stopBtn);
    });

    stopBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      speakBtn.innerHTML = `🔊 Read Aloud`;
      stopBtn.style.display = 'none';
    });

    const printOpinionBtn = document.createElement('button');
    printOpinionBtn.className = 'msg-action-btn';
    printOpinionBtn.innerHTML = `🖨️ Print Legal Opinion`;
    printOpinionBtn.addEventListener('click', () => {
      window.print();
    });

    const counterArgBtn = document.createElement('button');
    counterArgBtn.className = 'btn-ai-action-special';
    counterArgBtn.innerHTML = `⚖️ Find Counter-Argument`;
    counterArgBtn.addEventListener('click', () => {
      sendChatMessage(`Give me the strongest constitutional counter-argument against the legal position above, citing opposing Supreme Court of India benches and statutory exceptions.`);
    });

    const casesBtn = document.createElement('button');
    casesBtn.className = 'btn-ai-action-special';
    casesBtn.innerHTML = `🔍 Supporting / Contrary Judgments`;
    casesBtn.addEventListener('click', () => {
      sendChatMessage(`Identify landmark Supreme Court of India judgments supporting this proposition, and any contrary or distinguishing benches.`);
    });

    actionsBar.appendChild(copyBtn);
    actionsBar.appendChild(speakBtn);
    actionsBar.appendChild(stopBtn);
    actionsBar.appendChild(printOpinionBtn);
    actionsBar.appendChild(counterArgBtn);
    actionsBar.appendChild(casesBtn);
    contentWrapper.appendChild(actionsBar);
  }

  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(contentWrapper);
  messagesArea.appendChild(msgDiv);

  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function formatLegalMarkdown(text) {
  return text
    .replace(/### (.*?)\n/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br>')
    .replace(/\n/g, ' ');
}

// --- Indian English / Hindi Synthetic Voice Selector for Barrister AI ---
let cachedIndianVoice = null;
function getIndianVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;
  const currentLang = localStorage.getItem('jurisai_language') || 'en';

  // 1. First priority: Exact match for Indian English (en-IN) or Hindi (hi-IN)
  let voice = voices.find(v => v.lang === 'en-IN' || v.lang === 'en_IN' || v.lang === 'en-in' ||
                               v.lang === 'hi-IN' || v.lang === 'hi_IN' || v.lang === 'hi-in');
  
  // 2. Second priority: Match by popular Indian Voice names (Google India, Neerja, Prabhat, Rishi, Veena, Lekha, Swara)
  if (!voice) {
    voice = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('india') || name.includes('hindi') || name.includes('neerja') ||
             name.includes('prabhat') || name.includes('rishi') || name.includes('veena') ||
             name.includes('lekha') || name.includes('swara');
    });
  }
  return voice || null;
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedIndianVoice = getIndianVoice();
  };
}

function speakText(text, speakBtn = null, stopBtn = null) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  // Handle Pause / Resume toggle if speech is currently active
  if (window.speechSynthesis.speaking) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      if (speakBtn) speakBtn.innerHTML = `⏸️ Pause`;
      return;
    } else {
      window.speechSynthesis.pause();
      if (speakBtn) speakBtn.innerHTML = `▶️ Resume`;
      return;
    }
  }

  window.speechSynthesis.cancel();
  const cleanText = text.replace(/⚠️|📑|⚖️|📋|🏛️|🇮🇳|§|✦|●/g, '').slice(0, 1200);
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  // Enforce Indian English ('en-IN') or Hindi ('hi-IN') locale
  utterance.lang = (localStorage.getItem('jurisai_language') === 'hi') ? 'hi-IN' : 'en-IN';
  
  const indianVoice = getIndianVoice() || cachedIndianVoice;
  if (indianVoice) {
    utterance.voice = indianVoice;
    utterance.lang = indianVoice.lang;
  }
  
  utterance.rate = 0.95; // Slightly measured rate for clear Indian legal diction
  utterance.pitch = 1.0;

  if (speakBtn) speakBtn.innerHTML = `⏸️ Pause`;
  if (stopBtn) stopBtn.style.display = 'inline-flex';

  utterance.onend = () => {
    if (speakBtn) speakBtn.innerHTML = `🔊 Read Aloud`;
    if (stopBtn) stopBtn.style.display = 'none';
  };
  utterance.onerror = () => {
    if (speakBtn) speakBtn.innerHTML = `🔊 Read Aloud`;
    if (stopBtn) stopBtn.style.display = 'none';
  };

  window.speechSynthesis.speak(utterance);
}

function startNewChatSession() {
  AppState.activeChatId = null;
  const messagesArea = document.getElementById('chat-messages-area');
  const welcomeScreen = document.getElementById('chat-welcome-screen');
  if (messagesArea && welcomeScreen) {
    messagesArea.innerHTML = '';
    messagesArea.appendChild(welcomeScreen);
    welcomeScreen.style.display = 'flex';
  }
  renderChatHistoryList();
}

function renderChatHistoryList() {
  const historyContainer = document.getElementById('chat-history-list');
  if (!historyContainer) return;

  historyContainer.innerHTML = '';
  if (AppState.chatHistory.length === 0) {
    historyContainer.innerHTML = `<div style="font-size:0.82rem;color:var(--text-muted);text-align:center;padding:1rem;">No previous Bharatiya legal sessions</div>`;
    return;
  }

  AppState.chatHistory.forEach((session) => {
    const item = document.createElement('div');
    item.className = `history-item ${session.id === AppState.activeChatId ? 'active' : ''}`;
    item.innerHTML = `
      <div class="history-item-title">${session.title || 'Legal Consultation'}</div>
      <div class="history-item-meta">
        <span>${session.date || ''}</span>
        <span>${session.messages.length} msgs</span>
      </div>
    `;
    item.addEventListener('click', () => {
      loadChatSession(session.id);
    });
    historyContainer.appendChild(item);
  });
}

function loadChatSession(sessionId) {
  const session = AppState.chatHistory.find((c) => c.id === sessionId);
  if (!session) return;

  AppState.activeChatId = sessionId;
  const messagesArea = document.getElementById('chat-messages-area');
  const welcomeScreen = document.getElementById('chat-welcome-screen');
  if (!messagesArea) return;

  messagesArea.innerHTML = '';
  if (welcomeScreen) {
    welcomeScreen.style.display = 'none';
  }

  session.messages.forEach((m) => {
    appendMessageUI(m.role, m.content);
  });

  renderChatHistoryList();
}

// --- 5. Contract & Document Analyzer ---
function initAnalyzer() {
  const sampleChips = document.querySelectorAll('.sample-chip');
  const docTextarea = document.getElementById('analyzer-document-textarea');
  const analyzeBtn = document.getElementById('analyze-doc-btn');
  const resultsContainer = document.getElementById('analyzer-results-area');

  sampleChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      sampleChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const sampleKey = chip.getAttribute('data-sample');
      if (SAMPLE_CONTRACTS[sampleKey] && docTextarea) {
        docTextarea.value = SAMPLE_CONTRACTS[sampleKey].content;
        runDocumentAnalysis(docTextarea.value);
      }
    });
  });

  if (analyzeBtn && docTextarea) {
    analyzeBtn.addEventListener('click', () => {
      runDocumentAnalysis(docTextarea.value);
    });
  }

  if (docTextarea && SAMPLE_CONTRACTS.in_contract) {
    docTextarea.value = SAMPLE_CONTRACTS.in_contract.content;
    runDocumentAnalysis(docTextarea.value);
  }
}

function runDocumentAnalysis(text) {
  const resultsContainer = document.getElementById('analyzer-results-area');
  if (!resultsContainer) return;

  if (!text || text.trim().length < 20) {
    resultsContainer.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);">Please paste or select a valid legal document (minimum 20 characters).</div>`;
    return;
  }

  const analysis = analyzeLegalDocument(text);

  resultsContainer.innerHTML = `
    <div class="risk-summary-card">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:700;margin-bottom:0.25rem;">Bharatiya Legal Document Assessment</div>
        <div style="font-size:1.15rem;font-weight:700;color:var(--text-primary);">${analysis.riskLabel}</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.25rem;">Analyzed ${analysis.clauses.length} critical Indian & commercial provisions</div>
      </div>
      <div class="risk-gauge-container">
        <span class="risk-badge-large ${analysis.riskLevel}">
          ${analysis.riskLevel === 'high' ? '⚠️ High Risk' : analysis.riskLevel === 'medium' ? '🔶 Medium Risk' : '✅ Low Risk'}
        </span>
      </div>
    </div>
    <div style="font-size:0.85rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;margin-top:0.5rem;">Clause-by-Clause Indian Legal Review</div>
  `;

  analysis.clauses.forEach((clause) => {
    const card = document.createElement('div');
    card.className = 'clause-card';
    card.innerHTML = `
      <div class="clause-card-header">
        <strong style="font-size:0.95rem;color:var(--text-primary);">${clause.title}</strong>
        <span class="clause-type-badge ${clause.type}">
          ${clause.type === 'risk' ? 'High Risk' : clause.type === 'warning' ? 'Needs Caution' : 'Favorable'}
        </span>
      </div>
      <div class="clause-card-body">
        <div class="clause-original">"${clause.original}"</div>
        <div class="clause-explanation">${clause.explanation}</div>
        <div class="clause-recommendation">
          <strong>💡 Recommendation:</strong> ${clause.recommendation}
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

// --- 6. Legal Document Generator ---
function initGenerator() {
  const formInputs = document.querySelectorAll('.gen-input, .gen-select, .gen-checkbox');
  const templateSelect = document.getElementById('generator-template-select');
  const previewPaper = document.getElementById('document-preview-paper');
  const copyDocBtn = document.getElementById('copy-generated-doc-btn');
  const printDocBtn = document.getElementById('print-generated-doc-btn');

  function updatePreview() {
    if (!previewPaper) return;
    const templateId = templateSelect ? templateSelect.value : 'in_offer';

    const data = {
      partyA: document.getElementById('gen-party-a')?.value || 'Alpha Technologies Private Limited',
      partyB: document.getElementById('gen-party-b')?.value || 'Rajesh Sharma / Beta Solutions',
      date: document.getElementById('gen-date')?.value || new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      jurisdiction: document.getElementById('gen-jurisdiction')?.value || 'New Delhi, India (Supreme Court / High Court of Delhi)',
      term: document.getElementById('gen-term')?.value || 'Two (2) Years / 24 Months',
      fee: document.getElementById('gen-fee')?.value || '₹5,00,000 (Rupees Five Lakhs INR)',
      includeArbitration: document.getElementById('gen-check-arbitration')?.checked,
      includeConfidentiality: document.getElementById('gen-check-confidentiality')?.checked,
      includeIP: document.getElementById('gen-check-ip')?.checked
    };

    previewPaper.innerHTML = generateDocumentText(templateId, data);
  }

  formInputs.forEach((input) => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });

  if (templateSelect) {
    templateSelect.addEventListener('change', updatePreview);
  }

  if (copyDocBtn) {
    copyDocBtn.addEventListener('click', () => {
      const textToCopy = previewPaper ? previewPaper.innerText : '';
      navigator.clipboard.writeText(textToCopy);
      copyDocBtn.innerHTML = `✅ Copied Document!`;
      setTimeout(() => (copyDocBtn.innerHTML = `📋 Copy Text`), 2000);
    });
  }

  if (printDocBtn) {
    printDocBtn.addEventListener('click', () => {
      window.print();
    });
  }

  updatePreview();
}

// --- 7. Legal Rights & Statutory FAQ Explorer ---
function initRightsExplorer() {
  const gridContainer = document.getElementById('rights-cards-grid');
  const searchInput = document.getElementById('rights-search-input');
  const categoryTabs = document.querySelectorAll('.rights-tab-btn');

  let activeCategory = 'all';
  let searchTerm = '';

  function renderRightsCards() {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const filtered = RIGHTS_DATABASE.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">No matching Indian legal guides found for your search criteria.</div>`;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'right-card';
      card.innerHTML = `
        <div class="right-card-icon">🇮🇳</div>
        <div class="right-card-title">${item.title}</div>
        <div class="right-card-desc">${item.desc}</div>
        <div class="right-card-footer">
          <span>Read Statutory Guide</span>
          <span>→</span>
        </div>
      `;
      card.addEventListener('click', () => {
        openRightsModal(item);
      });
      gridContainer.appendChild(card);
    });
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category') || 'all';
      renderRightsCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderRightsCards();
    });
  }

  renderRightsCards();
}

function openRightsModal(guideItem) {
  const modalTitle = document.getElementById('detail-modal-title');
  const modalBody = document.getElementById('detail-modal-body');
  if (!modalTitle || !modalBody) return;

  modalTitle.innerHTML = `🇮🇳 ${guideItem.title}`;
  modalBody.innerHTML = guideItem.details;

  openModal('detail-modal');
}

// --- 8. Modals (Disclaimer, Guide Details, Settings, KB Drawer) ---
function initModals() {
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-close-action');

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      if (modalId) {
        closeModal(modalId);
      }
    });
  });

  const agreeBtn = document.getElementById('disclaimer-agree-btn');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      AppState.disclaimerAccepted = true;
      localStorage.setItem('jurisai_disclaimer', 'true');
      closeModal('disclaimer-modal');
    });
  }

  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const advocateSelect = document.getElementById('settings-advocate-mode');
  const tempSlider = document.getElementById('settings-temperature-slider');
  const tempDisplay = document.getElementById('temperature-value-display');
  const clearDataBtn = document.getElementById('clear-all-data-btn');

  // Load existing values into UI
  if (advocateSelect) advocateSelect.value = localStorage.getItem('jurisai_advocate_mode') || 'senior_advocate';
  if (tempSlider) {
    const storedTemp = localStorage.getItem('jurisai_temperature') || '0.2';
    tempSlider.value = storedTemp;
    if (tempDisplay) tempDisplay.textContent = `${storedTemp} — Strict Constitutional Accuracy`;
    tempSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      let label = 'Strict Constitutional Accuracy';
      if (val >= 0.5) label = 'Exploratory Comparative Law';
      else if (val >= 0.3) label = 'Balanced Legal Analysis';
      if (tempDisplay) tempDisplay.textContent = `${val} — ${label}`;
    });
  }

  // Clear all data button
  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all stored chat sessions, bookmarks, and preferences?')) {
        localStorage.clear();
        AppState.chatHistory = [];
        AppState.activeChatId = null;
        renderChatHistoryList();
        alert('🗑️ All saved history and bookmarks have been cleared.');
      }
    });
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const advMode = advocateSelect ? advocateSelect.value : 'senior_advocate';
      const tempVal = tempSlider ? tempSlider.value : '0.2';

      localStorage.setItem('jurisai_advocate_mode', advMode);
      localStorage.setItem('jurisai_temperature', tempVal);

      closeModal('settings-modal');
      alert('✅ Barrister AI Persona & Precision Preferences Saved Successfully!');
    });
  }

  const openSettingsBtn = document.getElementById('open-settings-btn');
  if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('settings-modal');
    });
  }

  const openDisclaimerLink = document.getElementById('open-disclaimer-link');
  if (openDisclaimerLink) {
    openDisclaimerLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('disclaimer-modal');
    });
  }

  const closeBannerBtn = document.getElementById('close-disclaimer-banner');
  if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
      const banner = document.getElementById('app-disclaimer-banner');
      if (banner) banner.style.display = 'none';
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// --- 9. Jurisdiction Switcher ---
function initJurisdictionSwitcher() {
  const switcherBox = document.getElementById('jurisdiction-switcher');
  const currentFlag = document.getElementById('current-jurisdiction-flag');
  const currentName = document.getElementById('current-jurisdiction-name');

  function updateJurisdictionUI() {
    const info = JURISDICTION_INFO[AppState.jurisdiction] || JURISDICTION_INFO.IN;
    if (currentFlag) currentFlag.textContent = info.flag;
    if (currentName) currentName.textContent = info.code + ' (' + info.name.split(' — ')[0].split(' (')[0] + ')';
  }

  if (switcherBox) {
    switcherBox.addEventListener('click', () => {
      const codes = Object.keys(JURISDICTION_INFO);
      const currentIdx = codes.indexOf(AppState.jurisdiction);
      const nextIdx = (currentIdx + 1) % codes.length;
      AppState.jurisdiction = codes[nextIdx];
      updateJurisdictionUI();
    });
  }

  updateJurisdictionUI();
}

// --- 10. Global Legal Command Palette (⌘K / Ctrl+K) ---
function initCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('cmd-search-input');
  const list = document.getElementById('cmd-results-list');
  const openBtn = document.getElementById('open-cmd-palette-btn');

  function toggleCommandPalette(show) {
    if (!modal) return;
    if (show) {
      modal.classList.add('active');
      if (input) {
        input.value = '';
        input.focus();
        renderCommandResults('');
      }
    } else {
      modal.classList.remove('active');
    }
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const isActive = modal && modal.classList.contains('active');
      toggleCommandPalette(!isActive);
    } else if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      toggleCommandPalette(false);
    }
  });

  if (openBtn) {
    openBtn.addEventListener('click', () => toggleCommandPalette(true));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggleCommandPalette(false);
    });
  }

  if (input) {
    input.addEventListener('input', (e) => renderCommandResults(e.target.value));
  }

  function renderCommandResults(query) {
    if (!list) return;
    list.innerHTML = '';
    const term = query.toLowerCase().trim();

    const matches = [];

    // Search KNOWLEDGE_BASE_ARTICLES
    KNOWLEDGE_BASE_ARTICLES.forEach((art) => {
      if (!term || art.title.toLowerCase().includes(term) || art.summary.toLowerCase().includes(term) || art.statutes.some((s) => s.toLowerCase().includes(term))) {
        matches.push({
          type: 'Precedent / Statute',
          title: art.title,
          sub: art.statutes.join(', '),
          action: () => {
            toggleCommandPalette(false);
            openKnowledgeDrawer(art);
          }
        });
      }
    });

    // Search BHARATIYA_STATUTE_MAP
    Object.entries(BHARATIYA_STATUTE_MAP).forEach(([key, val]) => {
      if (!term || key.includes(term) || val.old.toLowerCase().includes(term) || val.newSection.toLowerCase().includes(term)) {
        matches.push({
          type: 'Statute Conversion',
          title: `${val.old} ➔ ${val.newSection}`,
          sub: val.title,
          action: () => {
            toggleCommandPalette(false);
            switchView('knowledge-view');
            const converterInput = document.getElementById('statute-converter-input');
            if (converterInput) {
              converterInput.value = key;
              converterInput.focus();
            }
          }
        });
      }
    });

    if (matches.length === 0) {
      list.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted);">No legal research items matched "${query}"</div>`;
      return;
    }

    matches.slice(0, 10).forEach((item) => {
      const el = document.createElement('div');
      el.className = 'cmd-result-item';
      el.innerHTML = `
        <div>
          <div style="font-size:11px; font-weight:700; color:var(--accent-gold); text-transform:uppercase;">${item.type}</div>
          <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-top:2px;">${item.title}</div>
          <div style="font-size:12px; color:var(--text-secondary);">${item.sub}</div>
        </div>
        <span style="font-size:13px; font-weight:700; color:var(--accent-gold);">→ Open</span>
      `;
      el.addEventListener('click', item.action);
      list.appendChild(el);
    });
  }
}

// --- 11. Saved Research & History Dashboard (#saved-view) ---
function initSavedResearch() {
  const saveBtn = document.getElementById('save-precedent-btn');
  const savedGrid = document.getElementById('saved-items-grid');
  const totalDisplay = document.getElementById('saved-total-display');
  const badgeCount = document.getElementById('saved-count-badge');
  const statCases = document.getElementById('stat-saved-cases');
  const statChats = document.getElementById('stat-saved-chats');

  function getSavedItems() {
    return JSON.parse(localStorage.getItem('jurisai_saved_research') || '[]');
  }

  function saveItem(item) {
    const list = getSavedItems();
    if (!list.some((x) => x.id === item.id)) {
      list.unshift(item);
      localStorage.setItem('jurisai_saved_research', JSON.stringify(list));
      updateSavedUI();
      alert('⭐ Saved to your Research Bookmarks Dashboard!');
    } else {
      alert('ℹ️ This authority is already saved in your Research Bookmarks.');
    }
  }

  function updateSavedUI() {
    const list = getSavedItems();
    if (badgeCount) badgeCount.textContent = list.length;
    if (totalDisplay) totalDisplay.textContent = `${list.length} Saved Items`;
    if (statCases) statCases.textContent = list.length;
    if (statChats) statChats.textContent = AppState.chatHistory.length;

    if (!savedGrid) return;
    savedGrid.innerHTML = '';

    if (list.length === 0) {
      savedGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); background: var(--bg-surface-elevated); border-radius: var(--radius-lg); border: 1px dashed var(--border-glass);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">⭐</div>
          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary);">No saved legal research items yet</div>
          <div style="font-size: 13px; margin-top: 0.25rem;">Click '⭐ Save Research' on any precedent drawer or AI consultation to save it here.</div>
        </div>
      `;
      return;
    }

    list.forEach((art) => {
      const card = document.createElement('div');
      card.className = 'kb-article-card';
      card.innerHTML = `
        <div class="kb-card-header">
          <span class="kb-category-badge">🏛️ ${art.category || 'Indian Law'}</span>
          <span class="kb-jurisdiction-badge">⭐ SAVED BOOKMARK</span>
        </div>
        <div class="kb-card-title">${art.title}</div>
        <div class="kb-card-summary">${art.summary || 'Verified Constitutional Authority'}</div>
        <div class="kb-card-footer">
          <button class="btn-kb-read">📖 Reopen Authority</button>
          <button class="btn-danger" style="padding:0.35rem 0.65rem;">Remove</button>
        </div>
      `;
      const readBtn = card.querySelector('.btn-kb-read');
      readBtn.addEventListener('click', () => openKnowledgeDrawer(art));

      const removeBtn = card.querySelector('.btn-danger');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = list.filter((x) => x.id !== art.id);
        localStorage.setItem('jurisai_saved_research', JSON.stringify(updated));
        updateSavedUI();
      });

      savedGrid.appendChild(card);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const titleEl = document.getElementById('kb-drawer-title');
      if (!titleEl) return;
      const titleText = titleEl.textContent.replace('🏛️', '').trim();
      const article = KNOWLEDGE_BASE_ARTICLES.find((a) => a.title === titleText);
      if (article) {
        saveItem(article);
      }
    });
  }

  updateSavedUI();
}

// --- 12. Side-by-Side Supreme Court Case Comparison Modal (MVP Feature 7 & 9) ---
function initCaseCompare() {
  const openBtn = document.getElementById('open-case-compare-btn');
  const askAiBtn = document.getElementById('compare-ask-ai-btn');
  const selectB = document.getElementById('compare-case-b-select');
  const colB = document.getElementById('compare-col-b');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      closeModal('kb-detail-drawer');
      openModal('case-compare-modal');
    });
  }

  const CASE_B_DATA = {
    puttaswamy: {
      title: "Justice K.S. Puttaswamy v. Union of India",
      meta: "Supreme Court • 2017 (9-Judge Bench)",
      facts: "Constitutional challenge to Aadhaar biometric database and state surveillance on citizen privacy grounds.",
      issues: "Whether Right to Privacy is a Fundamental Right guaranteed under Article 21 and Part III.",
      ratio: "Privacy is an intrinsic Fundamental Right under Article 21. Any state restriction requires Legality, Legitimate State Aim, and Proportionality."
    },
    maneka: {
      title: "Maneka Gandhi v. Union of India",
      meta: "Supreme Court • 1978 (7-Judge Bench)",
      facts: "Impounding of petitioner's passport without providing prior hearing or reasons under Section 10(3)(c) of Passports Act 1967.",
      issues: "Whether Article 21 procedural law can be arbitrary, and relationship between Articles 14, 19, and 21.",
      ratio: "Any statutory procedure depriving personal liberty under Art. 21 must be 'just, fair, and reasonable' and satisfy Art. 14 equality."
    },
    kesavananda: {
      title: "Kesavananda Bharati v. State of Kerala",
      meta: "Supreme Court • 1973 (13-Judge Bench)",
      facts: "Challenge to Kerala Land Reforms Act and 24th, 25th, 29th Constitutional Amendment Acts altering fundamental property rights.",
      issues: "Whether Parliament's amending power under Article 368 is unlimited.",
      ratio: "Basic Structure Doctrine: Parliament cannot amend or destroy the fundamental basic structure of the Constitution."
    },
    shreya: {
      title: "Shreya Singhal v. Union of India",
      meta: "Supreme Court • 2015 (2-Judge Bench)",
      facts: "Public interest litigation challenging Section 66A of IT Act 2000 penalizing online speech and intermediary blocking rules.",
      issues: "Whether Section 66A violates Freedom of Speech under Article 19(1)(a).",
      ratio: "Struck down Section 66A as unconstitutional and vague. Intermediary blocking under Section 79 requires court order or formal government notification."
    }
  };

  if (selectB && colB) {
    selectB.addEventListener('change', (e) => {
      const key = e.target.value;
      const data = CASE_B_DATA[key] || CASE_B_DATA.puttaswamy;
      colB.innerHTML = `
        <span style="font-size:11px; font-weight:700; color:var(--accent-indigo);">CASE B • COMPARATIVE PRECEDENT</span>
        <div style="font-size:17px; font-weight:700; color:var(--text-primary);">${data.title}</div>
        <div style="font-size:12px; color:var(--text-muted);">${data.meta}</div>
        <hr style="border:0; border-top:1px solid var(--border-glass-light);">
        <div><strong>Key Facts:</strong> ${data.facts}</div>
        <div><strong>Constitutional Issues:</strong> ${data.issues}</div>
        <div><strong>Judgment Ratio:</strong> ${data.ratio}</div>
      `;
    });
  }

  if (askAiBtn) {
    askAiBtn.addEventListener('click', () => {
      closeModal('case-compare-modal');
      switchView('chat-view');
      const caseTitle = selectB ? (CASE_B_DATA[selectB.value]?.title || "Justice K.S. Puttaswamy v. Union of India") : "Justice K.S. Puttaswamy v. Union of India";
      sendChatMessage(`Please compare and distinguish Maneka Gandhi v. Union of India (1978) and ${caseTitle}, analyzing their constitutional ratios under Article 21 and Part III of the Constitution.`);
    });
  }
}

// --- 13. Interactive Constitutional & Precedent Node Graph (#graph-view) ---
function initLegalNodeGraph() {
  const nodes = document.querySelectorAll('.node-circle-card');
  const infoDisplay = document.getElementById('node-info-display');
  if (!nodes || !infoDisplay) return;

  const GRAPH_NODE_DATA = {
    art21: {
      title: "Article 21: Right to Life, Personal Liberty & Privacy",
      file: "[[Article-21-Right-to-Life-and-Privacy]]",
      summary: "No person shall be deprived of his life or personal liberty except according to procedure established by law. Reinterpreted in Maneka Gandhi (1978) to mandate just, fair, and reasonable procedure.",
      links: ["[[Puttaswamy-Right-to-Privacy-2017]]", "[[Maneka-Gandhi-v-Union-of-India-1978]]", "[[DPDP-Act-2023-Digital-Personal-Data-Protection]]", "[[BNSS-2023-Section-35-Arrest-Notice]]"],
      prompt: "Explain how Article 21 connects to Maneka Gandhi, Puttaswamy, and the DPDP Act 2023 under Indian constitutional law."
    },
    putt: {
      title: "Justice K.S. Puttaswamy v. Union of India (2017)",
      file: "[[Puttaswamy-Right-to-Privacy-2017]]",
      summary: "Historic 9-Judge Constitution Bench declaring the Right to Privacy as an intrinsic Fundamental Right protected under Article 21 and Part III. Established the three-prong Proportionality Test.",
      links: ["[[Article-21-Right-to-Life-and-Privacy]]", "[[DPDP-Act-2023-Digital-Personal-Data-Protection]]", "[[Article-14-Equality-Before-Law]]"],
      prompt: "Explain the three-prong Proportionality Test established in Justice K.S. Puttaswamy v. Union of India (2017)."
    },
    maneka: {
      title: "Maneka Gandhi v. Union of India (1978)",
      file: "[[Maneka-Gandhi-v-Union-of-India-1978]]",
      summary: "7-Judge Bench ruling that procedure depriving liberty under Article 21 must be just, fair, and reasonable. Articles 14, 19, and 21 form an interconnected 'Golden Triangle'.",
      links: ["[[Article-21-Right-to-Life-and-Privacy]]", "[[Article-14-Equality-Before-Law]]", "[[Article-19-1-a-Freedom-of-Speech]]"],
      prompt: "Explain the Golden Triangle of Articles 14, 19, and 21 established in Maneka Gandhi v. Union of India (1978)."
    },
    dpdp: {
      title: "India Digital Personal Data Protection Act 2023 (DPDP Act)",
      file: "[[DPDP-Act-2023-Digital-Personal-Data-Protection]]",
      summary: "Central Privacy Act mandating affirmative consent, Data Principal rights, and security safeguards, with fines up to ₹250 crore.",
      links: ["[[Puttaswamy-Right-to-Privacy-2017]]", "[[Article-21-Right-to-Life-and-Privacy]]", "[[BSA-2023-Section-63-Electronic-Evidence]]"],
      prompt: "What are the core consent obligations and statutory fines for Data Fiduciaries under the DPDP Act 2023?"
    },
    art14: {
      title: "Article 14: Equality Before Law & Non-Arbitrariness",
      file: "[[Article-14-Equality-Before-Law]]",
      summary: "Forbids class legislation and state arbitrariness. State actions must satisfy reasonable classification based on intelligible differentia.",
      links: ["[[Article-21-Right-to-Life-and-Privacy]]", "[[Vishaka-v-State-of-Rajasthan-1997]]", "[[POSH-Act-2013]]", "[[Basic-Structure-Doctrine]]"],
      prompt: "Explain the doctrine of reasonable classification and non-arbitrariness under Article 14 of the Indian Constitution."
    },
    vishaka: {
      title: "Vishaka v. State of Rajasthan (1997)",
      file: "[[Vishaka-v-State-of-Rajasthan-1997]]",
      summary: "Landmark SC guidelines protecting women from workplace sexual harassment under Articles 14, 15, and 21, forming the bedrock of the POSH Act 2013.",
      links: ["[[Article-14-Equality-Before-Law]]", "[[Article-21-Right-to-Life-and-Privacy]]", "[[POSH-Act-2013]]"],
      prompt: "What were the Vishaka Guidelines laid down by the Supreme Court of India in 1997?"
    },
    posh: {
      title: "POSH Act 2013 & Internal Complaints Committee (ICC)",
      file: "[[POSH-Act-2013]]",
      summary: "Mandates an Internal Complaints Committee (ICC) for every workplace with 10+ employees. Fines up to ₹50,000 for non-compliance.",
      links: ["[[Vishaka-v-State-of-Rajasthan-1997]]", "[[Article-14-Equality-Before-Law]]"],
      prompt: "What is the mandatory Internal Complaints Committee (ICC) requirement under the POSH Act 2013?"
    },
    art19: {
      title: "Article 19(1)(a): Freedom of Speech & Expression",
      file: "[[Article-19-1-a-Freedom-of-Speech]]",
      summary: "Guarantees fundamental freedom of speech and expression, subject only to reasonable restrictions under Article 19(2).",
      links: ["[[Shreya-Singhal-v-Union-of-India-2015]]", "[[Article-21-Right-to-Life-and-Privacy]]", "[[BNS-2023-Section-152-Sovereignty-Protection]]"],
      prompt: "Explain the 8 statutory grounds for reasonable restrictions on Freedom of Speech under Article 19(2)."
    },
    shreya: {
      title: "Shreya Singhal v. Union of India (2015)",
      file: "[[Shreya-Singhal-v-Union-of-India-2015]]",
      summary: "Struck down Section 66A of the IT Act 2000 as unconstitutional and vague. Clarified Section 79 intermediary safe harbour rules.",
      links: ["[[Article-19-1-a-Freedom-of-Speech]]", "[[IT-Act-2000-Section-79]]"],
      prompt: "Why did the Supreme Court strike down Section 66A of the IT Act in Shreya Singhal v. Union of India (2015)?"
    },
    bns152: {
      title: "BNS 2023 Section 152: Sovereignty & Territorial Integrity",
      file: "[[BNS-2023-Section-152-Sovereignty-Protection]]",
      summary: "Replaces colonial IPC 124A (Sedition). Targets secessionist acts, armed rebellion, and subversive activities against Indian sovereignty.",
      links: ["[[Article-19-1-a-Freedom-of-Speech]]", "[[Shreya-Singhal-v-Union-of-India-2015]]"],
      prompt: "How does BNS 2023 Section 152 replace colonial sedition (IPC 124A) in India?"
    },
    sec27: {
      title: "Indian Contract Act Section 27: Void Restraint of Trade",
      file: "[[Indian-Contract-Act-Section-27-Void-Non-Competes]]",
      summary: "Strict statutory ban on agreements restraining lawful profession, trade, or business. Voids post-resignation employee non-competes.",
      links: ["[[Niranjan-Shankar-Golikari-1967]]", "[[Percept-DMark-v-Zaheer-Khan-2006]]", "[[Indian-Contract-Act-Section-74-Liquidated-Damages]]"],
      prompt: "Why are post-termination non-compete clauses void under Section 27 of the Indian Contract Act 1872?"
    },
    golikari: {
      title: "Niranjan Shankar Golikari v. Century Spinning (1967)",
      file: "[[Niranjan-Shankar-Golikari-1967]]",
      summary: "Supreme Court confirmed that negative covenants during active employment are valid, but post-termination trade restraints are void.",
      links: ["[[Indian-Contract-Act-Section-27-Void-Non-Competes]]"],
      prompt: "What is the distinction between in-service non-competes and post-termination non-competes in Niranjan Shankar Golikari (1967)?"
    },
    basic: {
      title: "Basic Structure Doctrine",
      file: "[[Basic-Structure-Doctrine]]",
      summary: "Parliament cannot alter, abridge, or destroy the fundamental Basic Structure of the Constitution under Article 368.",
      links: ["[[Kesavananda-Bharati-v-State-of-Kerala-1973]]", "[[Article-368-Amending-Power]]", "[[Article-32-and-226-Constitutional-Writs]]"],
      prompt: "What are the inviolable basic features of the Indian Constitution under the Basic Structure Doctrine?"
    },
    kesavananda: {
      title: "Kesavananda Bharati v. State of Kerala (1973)",
      file: "[[Kesavananda-Bharati-v-State-of-Kerala-1973]]",
      summary: "13-Judge Constitution Bench ruling that Parliament's amending power under Article 368 is subject to the Basic Structure Doctrine.",
      links: ["[[Basic-Structure-Doctrine]]", "[[Article-368-Amending-Power]]"],
      prompt: "What was the majority holding of the 13-Judge Bench in Kesavananda Bharati v. State of Kerala (1973)?"
    }
  };

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');
      const key = node.getAttribute('data-node');
      const data = GRAPH_NODE_DATA[key] || GRAPH_NODE_DATA.art21;

      const linksHTML = data.links.map((lnk) => `<span class="statute-pill">${lnk}</span>`).join(' ');

      infoDisplay.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
          <span style="font-size:11px; font-weight:700; color:var(--accent-gold); text-transform:uppercase;">🕸️ ACTIVE NODE • ${data.file}</span>
          <span style="font-size:11px; color:var(--text-muted); font-family:'JetBrains Mono',monospace;">OBSIDIAN VAULT LINK</span>
        </div>
        <div style="font-size:18px; font-weight:700; color:var(--text-primary);">${data.title}</div>
        <p style="font-size:14px; color:var(--text-secondary); margin:0.6rem 0;">${data.summary}</p>
        <div style="margin-top:0.85rem; font-size:13px; color:var(--accent-gold);">
          <strong>🔗 Connected [[WikiLinks]]:</strong>
          ${linksHTML}
        </div>
        <div style="display:flex; gap:0.5rem; margin-top:1rem;">
          <button class="btn-kb-ask-ai" style="flex:1; justify-content:center;" id="graph-node-ask-ai-btn">🤖 Open Connected Nodes in Barrister AI</button>
        </div>
      `;

      const askBtn = document.getElementById('graph-node-ask-ai-btn');
      if (askBtn) {
        askBtn.addEventListener('click', () => {
          switchView('chat-view');
          sendChatMessage(data.prompt);
        });
      }
    });
  });
}

// --- 14. Automated Legal Drafting Suite (#drafting-view) ---
function initLegalDraftingSuite() {
  const select = document.getElementById('drafting-template-select');
  const sender = document.getElementById('draft-sender');
  const recipient = document.getElementById('draft-recipient');
  const subject = document.getElementById('draft-subject');
  const date = document.getElementById('draft-date');
  const preview = document.getElementById('drafting-preview-paper');
  const copyBtn = document.getElementById('copy-draft-btn');

  function getDraftText(type, s, r, sub, d) {
    if (type === 'rti') {
      return `<div class="doc-title">🇮🇳 Application under Section 6(1) of the Right to Information Act, 2005</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${d}</div>
  <p><strong>To,</strong><br>The Public Information Officer (PIO)<br>${r}</p>
  <p><strong>From:</strong><br>${s}</p>
  <p><strong>Subject:</strong> ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Particulars of Information Required</div>
  <p>Under Section 6(1) of the Right to Information Act 2005, please furnish certified true copies and action-taken reports regarding:<br>
  (a) Certified copies of public tenders, work orders, and administrative sanction files;<br>
  (b) Daily progress report and names of officials responsible for decision execution.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Statutory Fee & 30-Day Timeline</div>
  <p>An RTI application fee of ₹10 is enclosed herewith via Postal Order / Electronic Transfer. As mandated by Section 7(1) of the RTI Act 2005, please provide the information within 30 days of receipt.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Yours faithfully,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">Applicant Signature</div>
  </div>
</div>`;
    }

    if (type === 'ni138') {
      return `<div class="doc-title">🇮🇳 Statutory Demand Notice under Section 138 of Negotiable Instruments Act, 1881</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${d} | By Registered Post with Acknowledgment Due (RPAD)</div>
  <p><strong>To:</strong> ${r}<br>
  <strong>From:</strong> ${s}<br>
  <strong>Subject:</strong> Demand for full payment of dishonoured cheque — Reference: ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Notice of Cheque Dishonour</div>
  <p>Under instructions from my client, notice is hereby given that the cheque issued by you towards discharge of existing commercial liability was returned unpaid by the bankers with the remark "Funds Insufficient / Exceeds Arrangement".</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Mandatory 15-Day Statutory Window</div>
  <p>In strict compliance with Section 138 of the Negotiable Instruments Act 1881, you are hereby called upon to remit the full cheque amount within fifteen (15) clear calendar days of receiving this notice, failing which criminal proceedings shall be initiated before the Judicial Magistrate.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Yours faithfully,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">Advocate on Record / Legal Counsel</div>
  </div>
</div>`;
    }

    if (type === 'posh_comp') {
      return `<div class="doc-title">🇮🇳 Formal Complaint to Internal Complaints Committee (ICC) under POSH Act, 2013</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${d}</div>
  <p><strong>To,</strong><br>The Presiding Officer, Internal Complaints Committee (ICC)<br>${r}</p>
  <p><strong>From:</strong> ${s}<br>
  <strong>Subject:</strong> Formal Complaint of Workplace Sexual Harassment under POSH Act 2013 — Reference: ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Particulars of Incident</div>
  <p>This complaint is submitted under Section 9 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, regarding unwelcome acts, verbal/electronic communication, and conduct violating my dignity under Article 21 and the Supreme Court Vishaka Guidelines.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Prayer for Inquiry & Interim Relief</div>
  <p>I request the Hon'ble ICC to initiate a time-bound statutory inquiry and grant appropriate interim protection under Section 12 of the POSH Act 2013.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Complainant,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">Signature & Date</div>
  </div>
</div>`;
    }

    if (type === 'dpdp_erase') {
      return `<div class="doc-title">🇮🇳 Notice for Right to Erasure under Section 12 of DPDP Act, 2023</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${d}</div>
  <p><strong>To,</strong><br>The Data Protection Officer / Grievance Officer<br>${r}</p>
  <p><strong>From:</strong> ${s}<br>
  <strong>Subject:</strong> Withdrawal of Consent and Demand for Permanent Erasure of Personal Data — Reference: ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Exercise of Data Principal Statutory Rights</div>
  <p>In accordance with Section 6(4) and Section 12 of the Digital Personal Data Protection Act (DPDP Act 2023), I hereby withdraw my consent and demand the immediate, permanent erasure of all personal data, behavioral logs, and profile records held by your organization.</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">2. Statutory Compliance & Fines</div>
  <p>Please confirm data deletion within 30 days. Failure to comply with Data Principal rights triggers statutory proceedings before the Data Protection Board of India under the DPDP Act Schedule.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Data Principal,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">Signature & Verified Email</div>
  </div>
</div>`;
    }

    if (type === 'cpc80') {
      return `<div class="doc-title">🇮🇳 Statutory Notice under Section 80 of Code of Civil Procedure (CPC 1908)</div>
<div class="doc-section">
  <div class="doc-section-title">Date: ${d} | Mandatory 60-Day Pre-Action Notice</div>
  <p><strong>To,</strong><br>The Secretary / Public Authority<br>${r}</p>
  <p><strong>From:</strong> ${s}<br>
  <strong>Subject:</strong> Section 80 CPC Notice regarding arbitrary administrative action — Reference: ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Statutory Requirement before Suing Government</div>
  <p>As required by Section 80 of the Code of Civil Procedure 1908, notice is hereby served giving two (2) months expiration time to rectify the unlawful administrative action causing irreparable commercial injury to my client.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Advocate for Applicant,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">High Court Bar / AOR</div>
  </div>
</div>`;
    }

    // Default: Constitutional writ draft
    return `<div class="doc-title">🇮🇳 Constitutional Writ Petition Notice (Article 226 / 32)</div>
<div class="doc-section">
  <div class="doc-section-title">Before the Hon'ble High Court / Supreme Court of India</div>
  <p><strong>To:</strong> ${r}<br>
  <strong>From:</strong> ${s}<br>
  <strong>Subject:</strong> Writ Petition Notice under Article 226 / 32 — Reference: ${sub}</p>
</div>
<div class="doc-section">
  <div class="doc-section-title">1. Infringement of Fundamental Rights (Art. 14, 19, 21)</div>
  <p>Notice is hereby given against arbitrary state action violating equality under Article 14 and personal liberty under Article 21 as established in Maneka Gandhi and Puttaswamy.</p>
</div>
<div class="doc-signatures">
  <div>
    <p>Petitioner,<br><strong>${s}</strong></p>
    <br><br>
    <div class="sig-line">Advocate on Record</div>
  </div>
</div>`;
  }

  function updateDraft() {
    if (!preview) return;
    const t = select ? select.value : 'rti';
    const s = sender ? sender.value : 'Rajesh Sharma, New Delhi';
    const r = recipient ? recipient.value : 'Public Information Officer (PIO)';
    const sub = subject ? subject.value : 'Request for Certified Copies';
    const d = date ? date.value : 'August 2, 2026';

    preview.innerHTML = getDraftText(t, s, r, sub, d);
  }

  const inputs = document.querySelectorAll('.draft-input, #drafting-template-select');
  inputs.forEach((inEl) => {
    inEl.addEventListener('input', updateDraft);
    inEl.addEventListener('change', updateDraft);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const txt = preview ? preview.innerText : '';
      navigator.clipboard.writeText(txt);
      copyBtn.innerHTML = `✅ Copied Statutory Draft!`;
      setTimeout(() => (copyBtn.innerHTML = `📋 Copy Draft`), 2000);
    });
  }

  updateDraft();
}

// --- 15. Deep Research Mode Toggle & As-Of Date Selector (MVP Feature 1 & 6) ---
function initDeepResearchToggle() {
  const btns = document.querySelectorAll('.mode-toggle-btn');
  const asOfSelect = document.getElementById('as-of-date-select');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.researchMode = btn.getAttribute('data-mode') || 'instant';
    });
  });

  if (asOfSelect) {
    asOfSelect.addEventListener('change', (e) => {
      AppState.asOfDate = e.target.value;
    });
  }
}

// --- 16. Persistent Floating Barrister Copilot Pill (MVP Feature 11) ---
function initFloatingCopilot() {
  const pill = document.getElementById('barrister-copilot-btn');
  const menu = document.getElementById('barrister-copilot-menu');
  if (!pill || !menu) return;

  pill.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!pill.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
    }
  });

  const items = menu.querySelectorAll('.copilot-menu-item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-copilot');
      menu.classList.remove('active');
      switchView('chat-view');
      if (action === 'explain') {
        sendChatMessage("Please explain the constitutional and statutory framework governing our active Indian legal jurisdiction.");
      } else if (action === 'cases') {
        sendChatMessage("Identify landmark Supreme Court of India judgments supporting our current legal position, and explain their ratios.");
      } else if (action === 'contrary') {
        sendChatMessage("Identify any contrary or opposing Supreme Court authorities that distinguish or challenge this proposition.");
      } else if (action === 'simplify') {
        sendChatMessage("Please explain this legal topic in simple plain English and Hindi (Hinglish) suitable for an Indian citizen.");
      } else if (action === 'draft') {
        sendChatMessage("Draft a formal statutory legal demand notice and argument outline based on this position.");
      }
    });
  });
}

// --- 17. Interactive Legal Glossary Glass Popovers (MVP Feature 9) ---
function initLegalGlossary() {
  const modal = document.getElementById('glossary-modal');
  const titleEl = document.getElementById('glossary-term-title');
  const bodyEl = document.getElementById('glossary-term-body');
  const askBtn = document.getElementById('glossary-ask-ai-btn');

  const LEGAL_GLOSSARY_MAP = {
    "res judicata": {
      term: "Res Judicata (CPC Section 11)",
      meaning: "A matter already judged by a competent court cannot be relitigated between the same parties.",
      basis: "Section 11 of Code of Civil Procedure 1908.",
      cases: "Daryao v. State of UP (SC 1961) — Res Judicata applies to Writ Petitions under Article 32 & 226."
    },
    "audi alteram partem": {
      term: "Audi Alteram Partem (Natural Justice)",
      meaning: "Hear the other side; no person should be judged or penalized without a fair opportunity of being heard.",
      basis: "Article 14 & Article 21 of the Constitution of India.",
      cases: "Maneka Gandhi v. Union of India (1978) — Due process requires a just, fair, and reasonable hearing."
    },
    "habeas corpus": {
      term: "Habeas Corpus ('To have the body')",
      meaning: "Constitutional writ directing police or detaining authority to produce a detained person before the court to test legality of detention.",
      basis: "Article 32 (Supreme Court) & Article 226 (High Court).",
      cases: "ADM Jabalpur v. Shivkant Shukla (1976) & Puttaswamy (2017)."
    },
    "mandamus": {
      term: "Mandamus ('We Command')",
      meaning: "Writ commanding a public official or government body to perform a mandatory statutory duty.",
      basis: "Article 32 & Article 226 of the Constitution of India.",
      cases: "Comptroller and Auditor General v. K.S. Jagannathan (1987)."
    },
    "ratio decidendi": {
      term: "Ratio Decidendi",
      meaning: "The legal principle or rationale upon which a judicial decision is based; binding precedent under Article 141.",
      basis: "Article 141 of the Constitution of India.",
      cases: "State of Orissa v. Sudhansu Sekhar Misra (SC 1968)."
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('glossary-term')) {
      const key = e.target.getAttribute('data-term') || e.target.textContent.toLowerCase().trim();
      const data = LEGAL_GLOSSARY_MAP[key] || LEGAL_GLOSSARY_MAP["res judicata"];
      if (titleEl && bodyEl) {
        titleEl.innerHTML = `<span>📖</span><span>${data.term}</span>`;
        bodyEl.innerHTML = `
          <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">${data.meaning}</div>
          <div style="font-size:13px; color:var(--text-secondary); margin:0.4rem 0;"><strong>Statutory Basis:</strong> ${data.basis}</div>
          <div style="font-size:13px; color:var(--accent-gold); background:rgba(201,162,39,0.12); padding:0.6rem 0.85rem; border-radius:8px; margin-top:0.75rem;">
            <strong>🏛️ Landmark Benchmark:</strong> ${data.cases}
          </div>
        `;
        if (askBtn) {
          askBtn.onclick = () => {
            closeModal('glossary-modal');
            switchView('chat-view');
            sendChatMessage(`Please explain the legal doctrine of ${data.term}, its statutory basis in ${data.basis}, and how it applies in Indian courts.`);
          };
        }
        openModal('glossary-modal');
      }
    }
  });
}
