-- ============================================================================
-- JURISAI BHARAT — SEED DATA (auto-generated from the verified legal library)
-- 28 verified authorities: Constitution, BNS/BNSS/BSA, Central Acts, SC judgments
-- ============================================================================

do $$
declare doc_id uuid;
begin


  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India: Fundamental Rights (Articles 14, 19, 21)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'Legislative Department, Govt. of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Articles 14, 19, and 21 form the "Golden Triangle" of the Indian Constitution (Bharatiya Samvidhan). Article 14 prohibits state arbitrariness and guarantees equal protection of laws. Article 19(1)(a) protects freedom of speech and expression subject to reasonable restrictions under Art. 19(2). Article 21 guarantees that no person shall be deprived of life or personal liberty except according to just, fair, and reasonable procedure established by law.


      * **Constitution of India Article 14:** The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.
      * **Constitution of India Article 19(1)(a) & (g):** Freedom of speech and expression; right to practice any profession, or to carry on any occupation, trade, or business.
      * **Constitution of India Article 21:** No person shall be deprived of his life or personal liberty except according to procedure established by law.
    


      * **Justice K.S. Puttaswamy v. Union of India (SC 9-Judge Bench 2017):** Unanimously declared the Right to Privacy as an intrinsic Fundamental Right protected under Article 21 and Part III of the Constitution.
      * **Maneka Gandhi v. Union of India (SC 1978):** Expanded Article 21 to mandate that any statutory procedure depriving liberty must be "just, fair, and reasonable" and not arbitrary.
      * **Shreya Singhal v. Union of India (SC 2015):** Struck down Section 66A of the IT Act for violating freedom of speech under Article 19(1)(a).
    ', 'Const. India Art. 14, 19, 21', '{"kb_id":"kb-in-const-fundamental-rights","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitutional Writs & Judicial Review (Articles 32 & 226)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'Legislative Department, Govt. of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Dr. B.R. Ambedkar termed Article 32 the "heart and soul" of the Constitution of India. It grants citizens the Fundamental Right to move the Supreme Court directly for the enforcement of Part III rights. Article 226 empowers High Courts to issue writs both for Fundamental Rights and any other legal purpose.


      * **Constitution of India Article 32:** Remedies for enforcement of Fundamental Rights conferred by Part III.
      * **Constitution of India Article 226:** Empowering High Courts to issue directions, orders, or writs including Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.
      * **Article 13(2):** The State shall not make any law which takes away or abridges the rights conferred by Part III, and any law made in contravention shall be void.
    


      * **Kesavananda Bharati v. State of Kerala (SC 13-Judge Bench 1973):** Established the "Basic Structure Doctrine"—Parliament''s amending power under Article 368 cannot alter or destroy the fundamental basic structure of the Constitution (including judicial review, equality, and federalism).
      * **L. Chandra Kumar v. Union of India (SC 1997):** Ruled that the power of judicial review vested in High Courts under Art. 226 and Supreme Court under Art. 32 is an inviolable basic feature of the Constitution.
    ', 'Const. India Art. 32 & 226', '{"kb_id":"kb-in-const-writs-remedies","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Bharatiya Nyaya Sanhita (BNS 2023) & Criminal Law Transition', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Effective July 1, 2024, India replaced its colonial criminal law trilogy with three Bharatiya Sanhitas: Bharatiya Nyaya Sanhita (BNS 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), and Bharatiya Sakshya Adhiniyam (BSA 2023). The new laws modernize offenses, establish strict investigation timelines, and recognize electronic evidence as primary records.


      * **BNS 2023 Section 111 (Organized Crime):** Introduces stringent statutory penalties for syndicates, economic offenses, and cybercrime.
      * **BNS 2023 Section 152 (Acts Endangering Sovereignty):** Replaces colonial Section 124A (Sedition) with specific offenses targeting secessionism and armed rebellion.
      * **BNSS 2023 Section 173 (e-FIR & Timeline):** Allows electronic FIR filing and mandates preliminary inquiry in specific offenses within 14 days.
      * **BSA 2023 Sections 61 & 63 (Electronic Evidence):** Recognizes digital server logs, hash values, and emails as primary evidence without requiring old Section 65B secondary certificates.
    


      * **Anvar P.V. v. P.K. Basheer (SC 2014) & Arjun Panditrao Khotkar (SC 2020):** Standardized electronic record admissibility—now codified with streamlined digital verification under BSA 2023 Section 63.
      * **Arnesh Kumar v. State of Bihar (SC 2014):** Statutory notice of appearance under BNSS Section 35 required before police arrest for offenses under 7 years.
    ', 'BNS 2023 (replaces IPC)', '{"kb_id":"kb-in-bns-bnss-bsa-criminal-law","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Prevention of Money Laundering Act (PMLA 2002): Arrest & Bail Rigor', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Prevention of Money Laundering Act 2002 (PMLA) gives the Enforcement Directorate (ED) broad statutory powers to attach proceeds of crime and arrest individuals under Section 19. Under Section 45, bail is subject to rigorous "twin conditions"—the court must be satisfied there are reasonable grounds to believe the accused is not guilty.


      * **PMLA Section 3 (Offense of Money Laundering):** Whosoever directly or indirectly attempts to indulge or knowingly assists in any process connected with proceeds of crime is guilty.
      * **PMLA Section 19 (Power to Arrest):** ED officer can arrest if they have reason to believe (recorded in writing) that a person is guilty of money laundering.
      * **PMLA Section 45 (Twin Conditions for Bail):** Public Prosecutor must be given opportunity to oppose bail; court must be satisfied there are reasonable grounds believing accused is not guilty and not likely to commit offense while on bail.
    


      * **Vijay Madanlal Choudhary v. Union of India (SC 3-Judge Bench 2022):** Upheld the constitutional validity of PMLA ED arrest powers, attachment rules, and the Section 45 twin conditions for bail.
      * **Arvind Kejriwal v. Directorate of Enforcement (SC 2024):** Examined "necessity of arrest" and interim bail protections for public representatives during national elections.
    ', 'PMLA 2002 Sec. 3, 19, 45', '{"kb_id":"kb-in-pmla-money-laundering","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Indian Contract Act 1872: Section 27 Restraint of Trade & Non-Competes', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Section 27 of the Indian Contract Act 1872 embodies a strict statutory prohibition: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void." Indian courts consistently hold that post-termination restrictive covenants on employees are unenforceable.


      * **Indian Contract Act 1872 Section 27:** Agreement in restraint of trade void. Exception: Sale of goodwill of a business within specified local limits.
      * **Indian Contract Act 1872 Section 74 (Liquidated Damages):** When a contract is broken and names a penalty/damages sum, the aggrieved party is entitled to receive reasonable compensation not exceeding the amount named.
      * **Specific Relief Act 1963 Section 10:** Specific performance of a contract *shall* be enforced by the court subject to statutory exceptions.
    


      * **Niranjan Shankar Golikari v. Century Spinning (SC 1967):** Confirmed that negative covenants restricting competition *during* the active term of employment are valid, but post-termination bans are void.
      * **Percept D''Mark v. Zaheer Khan (SC 2006):** Reaffirmed that post-termination restrictive covenants are void under Section 27 regardless of how reasonable they seem.
      * **Fateh Chand v. Balkishan Dass (SC 1963):** Ruled that liquidated damages under Section 74 represent an upper cap; courts award only actual reasonable compensation proved.
    ', 'Indian Contract Act Sec. 27', '{"kb_id":"kb-in-contract-section-27","category":"contracts"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Companies Act 2013 & IBC 2016: Directors'' Duties & Corporate Insolvency', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Section 166 of the Companies Act 2013 codifies the statutory fiduciary duties of Indian company directors. Meanwhile, the Insolvency and Bankruptcy Code (IBC 2016) provides a time-bound Corporate Insolvency Resolution Process (CIRP) under Sections 7 and 9, imposing an immediate statutory moratorium under Section 14.


      * **Companies Act 2013 Section 166 (Duties of Directors):** Requires acting with due and reasonable care, skill, and diligence; prohibits secret profits.
      * **Companies Act 2013 Section 188 (Related Party Transactions):** Prohibits entering into RPTs without prior Board or shareholder approval.
      * **IBC 2016 Section 7 & 9 (CIRP Initiation):** Financial or Operational creditors can initiate CIRP before NCLT upon corporate default exceeding ₹1 Crore.
      * **IBC 2016 Section 14 (Moratorium):** Prohibits institution of suits, continuation of proceedings, or foreclosure of corporate debtor assets during CIRP.
    


      * **Tata Consultancy Services Ltd. v. Cyrus Investments P. Ltd. (SC 2021):** Landmark ruling clarifying directors'' independence, executive dismissal standards, and oppression/mismanagement under Sections 241-242.
      * **Swiss Ribbons Pvt. Ltd. v. Union of India (SC 2019):** Upheld the constitutional validity of the IBC 2016, confirming its primary objective is corporate reorganization rather than recovery.
    ', 'Companies Act 2013 Sec. 166, 188, 241', '{"kb_id":"kb-in-companies-act-directors","category":"contracts"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('India Digital Personal Data Protection Act 2023 (DPDP Act)', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Digital Personal Data Protection Act (DPDP Act 2023) establishes India''s modern statutory privacy framework. Organizations ("Data Fiduciaries") must obtain clear, affirmative consent before processing personal data of "Data Principals" (citizens) and must report data breaches immediately.


      * **DPDP Act 2023 Section 6 (Consent):** Consent must be free, specific, informed, unconditional, and capable of withdrawal at any time.
      * **DPDP Act 2023 Section 8 (General Obligations):** Requires reasonable security safeguards to prevent personal data breaches.
      * **DPDP Act 2023 Schedule (Penalties):** Failure to take reasonable security safeguards triggers statutory penalties up to **₹250 crore** by the Data Protection Board of India.
      * **IT Act 2000 Section 79 (Intermediary Safe Harbour):** Exempts online platforms from third-party content liability if due diligence is observed (*Shreya Singhal* precedent).
      * **CERT-In Cyber Incident Rules (2022):** Requires reporting cybersecurity incidents to CERT-In within 6 hours of discovery.
    


      * **Puttaswamy v. Union of India (SC 2017):** Constitutional bedrock mandating that personal data protection legislation satisfy legality, necessity, and proportionality.
      * **Shreya Singhal v. Union of India (SC 2015):** Intermediary blocking under Section 79 requires a court order or authorized government notification.
    ', 'DPDP Act 2023 Sec. 4, 6, 8', '{"kb_id":"kb-in-dpdp-act-privacy","category":"privacy"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Indian Commercial Leases: Stamp Duty Act 1899 & Registration Act 1908', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Under Section 107 of the Transfer of Property Act 1882 and Section 17 of the Registration Act 1908, any lease of immovable property exceeding one year MUST be made by a registered instrument. Furthermore, under the Indian Stamp Act 1899, an unstamped or under-stamped agreement cannot be admitted in evidence.


      * **Registration Act 1908 Section 17 & 49:** Compulsory registration for leases exceeding 11 months; unregistered leases cannot be received as evidence of any transaction affecting the property.
      * **Indian Stamp Act 1899 Section 35:** Instruments not duly stamped are inadmissible in evidence for any purpose, subject to impounding and payment of 10x penalty.
      * **Transfer of Property Act 1882 Section 106:** In the absence of a written contract, commercial leases are deemed month-to-month terminable by 15 days notice.
    


      * **Anthony v. K.C. Ittoop & Sons (SC 2000):** Held that an unregistered lease deed for more than one year cannot create a multi-year tenancy; it defaults to a month-to-month tenancy.
      * **NN Global Mercantile v. Indo Unique Flame (SC 7-Judge Bench 2023):** Clarified arbitration admissibility in unstamped contracts—while arbitration agreements are separable, stamp duty defects must be cured before substantive enforcement.
    ', 'Indian Stamp Act 1899', '{"kb_id":"kb-in-stamp-registration-leases","category":"realestate"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Arbitration & Conciliation Act 1996: Commercial Dispute Enforcement', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Arbitration and Conciliation Act 1996 governs domestic and international commercial arbitration in India. Section 34 provides narrow statutory grounds to challenge arbitral awards, prioritizing minimal judicial intervention and expeditious disposal.


      * **Arbitration Act Section 9 (Interim Relief):** Empowers civil courts to grant interim protection before, during, or after arbitral proceedings.
      * **Arbitration Act Section 11 (Appointment of Arbitrator):** High Courts or Supreme Court appoint arbitrators if parties fail to agree within 30 days.
      * **Arbitration Act Section 34 (Setting Aside Award):** Awards can only be challenged on limited grounds such as incapacity, improper notice, excess of jurisdiction, or conflict with Public Policy of India.
    


      * **BALCO v. Kaiser Aluminium Technical Services (SC Constitution Bench 2012):** Ruled that Indian courts cannot intervene in foreign-seated international arbitrations under Part I of the Act.
      * **PASL Wind Solutions v. GE Power India (SC 2021):** Confirmed that two Indian companies can choose a foreign seat of arbitration.
    ', 'Arbitration Act 1996 Sec. 9, 11, 34, 36', '{"kb_id":"kb-in-arbitration-act-1996","category":"disputes"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Negotiable Instruments Act Section 138: Cheque Bounce & Debt Recovery', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Section 138 of the Negotiable Instruments Act 1881 makes the dishonour of a cheque for insufficiency of funds a criminal offense punishable by imprisonment up to 2 years or fine up to twice the cheque amount. Strict adherence to statutory notice timelines is mandatory.


      * **NI Act Section 138 (Cheque Dishonour Offense):** Requires presenting cheque within validity (3 months), issuing a written demand notice within **30 calendar days** of bank return memo, and giving the drawer 15 days to pay.
      * **NI Act Section 141 (Company Offenses):** Every person who was in charge of and responsible to the company for the conduct of business at the time of the offense is jointly liable.
      * **NI Act Section 143A (Interim Compensation):** Magistrate can order the drawer to pay interim compensation up to **20%** of the cheque amount during trial.
    


      * **K. Bhaskaran v. Sankaran Vaidhyan Balan (SC 1999) & Dashrath Rupsingh Rathod (SC 2014):** Clarified territorial jurisdiction—complaints must be filed where the payee/holder''s bank branch is located.
    ', 'NI Act 1881 Sec. 138, 141, 143A', '{"kb_id":"kb-in-ni-act-cheque-bounce","category":"disputes"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Civil Procedure Code (CPC 1908): Injunctions, Summary Suits & Section 80', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Code of Civil Procedure (CPC 1908) governs civil litigation in India. Under Order XXXIX Rules 1 & 2, obtaining a temporary injunction requires satisfying a strict three-prong test: (1) Prima Facie Case, (2) Balance of Convenience, and (3) Irreparable Injury.


      * **CPC Section 80 (Notice to Government):** No suit shall be instituted against the Government or a public officer until the expiration of two months next after notice in writing has been delivered.
      * **CPC Order XXXIX Rules 1 & 2 (Temporary Injunctions):** Court may grant temporary injunction to restrain waste, alienation, or breach of contract.
      * **CPC Order XXXVII (Summary Suits):** Fast-track recovery procedure for liquidated debts arising from bills of exchange, hundies, or promissory notes.
      * **CPC Section 11 (Res Judicata):** No court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties.
    


      * **Dalpat Kumar v. Prahlad Singh (SC 1992):** Laid down the authoritative three-prong test for temporary injunctions under Order XXXIX.
    ', 'CPC 1908 Section 80', '{"kb_id":"kb-in-cpc-injunctions-notice","category":"disputes"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('POSH Act 2013 & Gender Equality in Indian Workplaces', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) mandates that every organization with 10 or more employees MUST constitute an Internal Complaints Committee (ICC). Failure to constitute an ICC triggers statutory fines and cancellation of business licenses.


      * **POSH Act 2013 Section 4 (Internal Complaints Committee):** Requires an ICC headed by a senior woman employee, with at least 50% women members and an external NGO/legal expert.
      * **POSH Act 2013 Section 26 (Penalties):** Failure to constitute an ICC triggers a fine up to **₹50,000** for first offense, and double fines/license revocation for repeated default.
      * **Constitution of India Articles 14, 15, & 21:** Guarantees gender equality, prohibition of discrimination on grounds of sex, and right to work with dignity.
    


      * **Vishaka v. State of Rajasthan (SC 1997):** Supreme Court laid down landmark constitutional guidelines for workplace sexual harassment protection, forming the foundation of the POSH Act 2013.
      * **Aureliano Fernandes v. State of Goa (SC 2023):** Supreme Court issued strict directives requiring all public and private entities to verify and publish their ICC constitution details on their website.
    ', 'POSH Act 2013 Sec. 4, 19, 26', '{"kb_id":"kb-in-posh-workplace-equality","category":"employment"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('US & EU NDA & Trade Secret Protection Standard', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Non-Disclosure Agreements (NDAs) protect non-public commercial assets. Under the Defend Trade Secrets Act (DTSA) in the US and the EU Trade Secrets Directive 2016/943, protection requires proof that information derives independent economic value from secrecy and that the owner took reasonable measures to maintain it.


      * **18 U.S.C. § 1836 (Defend Trade Secrets Act - US):** Grants federal civil jurisdiction for trade secret misappropriation.
      * **EU Directive 2016/943 (Article 2):** Defines trade secrets and establishes uniform EU-wide remedies.
    


      * **Waymo LLC v. Uber Technologies, Inc. (2018):** Reaffirming that downloading confidential CAD files prior to resignation triggers immediate injunctions.
    ', '18 U.S.C. § 1836 (DTSA)', '{"kb_id":"kb-nda-trade-secrets-us","category":"contracts"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('GDPR, CCPA/CPRA & Global Privacy Compliance', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Data protection frameworks like EU GDPR and California CPRA impose strict operational mandates on companies processing personal data. Non-compliance risks statutory penalties of up to 4% of annual global turnover.


      * **GDPR Article 28 (Processor Contracts):** Mandates an explicit Data Processing Agreement (DPA) whenever a vendor processes personal data.
      * **GDPR Article 17 (Right to Erasure / "Right to be Forgotten"):** Data subjects can compel permanent deletion of personal data within 30 days.
    


      * **Schrems II (CJEU 2020):** Invalidated the EU-US Privacy Shield and required supplementary technical measures for cross-border data transfers.
    ', 'GDPR Art. 6, 17, 28, & 44', '{"kb_id":"kb-gdpr-global-privacy-eu","category":"privacy"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 12: Definition of "State" under Part III', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'Legislative Department, Govt. of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Article 12 defines "the State" for Part III Fundamental Rights to include the Government and Parliament of India, State Legislatures, local authorities, and "other authorities". Under the Ajay Hasia (1981) and Pradeep Kumar Biswas (2002) tests, any instrumentality or agency under deep and pervasive state control is amenable to writ jurisdiction.


      * **Constitution of India Article 12:** Definition of State including local or other authorities within the territory of India or under the control of the Government of India.
      * **Article 13(2):** Prohibition against State enacting laws abridging Part III rights.
    


      * **Ajay Hasia v. Khalid Mujib (SC Constitution Bench 1981):** Established the 6-factor test for determining whether a corporation or society is an instrumentality of State.
      * **Pradeep Kumar Biswas v. Indian Institute of Chemical Biology (SC 7-Judge Bench 2002):** Reaffirmed that financial, functional, and administrative state dominance makes an entity "State".
    ', 'Const. India Art. 12', '{"kb_id":"kb-in-const-art12-state","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 20: Protection in Conviction (Double Jeopardy & Self-Incrimination)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'Legislative Department, Govt. of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Article 20 guarantees three inviolable criminal protections: (1) prohibition against retrospective criminal laws, (2) prohibition against double jeopardy (prosecuted and punished twice for the same offense), and (3) protection against self-incrimination. In Selvi v. State of Karnataka (2010), the Supreme Court ruled that involuntary narco-analysis and lie-detector tests violate Article 20(3) and Article 21.


      * **Constitution of India Article 20(1):** No ex-post facto criminal law or enhanced retrospective punishment.
      * **Article 20(2):** No person shall be prosecuted and punished for the same offense more than once.
      * **Article 20(3):** No person accused of any offense shall be compelled to be a witness against himself.
    


      * **Selvi v. State of Karnataka (SC 3-Judge Bench 2010):** Involuntary administration of narco-analysis, polygraph, and brain-mapping violates Article 20(3) and mental privacy under Article 21.
    ', 'Const. India Art. 20(1), 20(2), 20(3)', '{"kb_id":"kb-in-const-art20-protection","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 22: Arrest Safeguards & 24-Hour Magistrate Remand', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'Legislative Department, Govt. of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Article 22 protects arrested persons by requiring immediate notification of the grounds of arrest, the right to consult a lawyer of choice, and mandatory production before the nearest Judicial Magistrate within 24 hours of arrest. The D.K. Basu (1997) Supreme Court guidelines enforce these rights to prevent custodial torture.


      * **Constitution of India Article 22(1):** Right to be informed of grounds of arrest and right to be defended by a legal practitioner.
      * **Constitution of India Article 22(2):** Mandatory production before Judicial Magistrate within 24 hours.
      * **BNSS 2023 Section 58:** Codified requirement of 24-hour presentation before Magistrate.
    


      * **D.K. Basu v. State of West Bengal (SC 1997):** Laid down 11 mandatory arrest guidelines including name tags, memo of arrest, and station diary entries.
    ', 'Const. India Art. 22(1) & 22(2)', '{"kb_id":"kb-in-const-art22-arrest","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Lalita Kumari v. Govt. of U.P. (2014): Mandatory FIR & Zero FIR', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Lalita Kumari v. Govt. of U.P. (2014), a 5-Judge Constitution Bench ruled unanimously that registration of a First Information Report (FIR) is mandatory under old CrPC 154 (now BNSS 2023 Section 173) if the complaint discloses a cognizable offense. Police cannot conduct a preliminary inquiry to test veracity before registering an FIR.


      * **BNSS 2023 Section 173:** Compulsory registration of FIR and electronic e-FIR.
      * **Zero FIR Rule:** Police must register an FIR irrespective of territorial jurisdiction and transfer it to the concerned police station.
    


      * **Lalita Kumari v. Govt. of U.P. (SC 5-Judge Constitution Bench 2014):** Authoritative precedent prohibiting police refusal in cognizable offenses.
    ', 'BNSS 2023 Section 173', '{"kb_id":"kb-in-sc-lalita-kumari-fir","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Satender Kumar Antil v. CBI (2022): Bail Reform Guidelines', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Satender Kumar Antil v. CBI (2022), the Supreme Court laid down structured guidelines for bail adjudication to combat undertrial overcrowding. It established Category A to D offenses, directing that for offenses punishable up to 7 years where the accused cooperated, bail applications must be decided without mechanical remand.


      * **BNSS 2023 Section 480:** Special powers of High Court and Sessions Court regarding regular bail.
      * **BNSS 2023 Section 479:** Maximum undertrial detention; mandatory release of first-time offenders after serving one-third of maximum sentence.
    


      * **Satender Kumar Antil v. CBI (SC 2022):** Landmark bail categorization benchmark.
      * **Gurbaksh Singh Sibbia (SC 1980):** Fundamental liberty principles governing bail discretion.
    ', 'BNSS 2023 Section 480', '{"kb_id":"kb-in-sc-satender-antil-bail","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('BNS 2023 Section 113: Terrorist Act in General Penal Code', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Section 113 of the Bharatiya Nyaya Sanhita (BNS 2023) defines a Terrorist Act as any act done with intent to threaten the unity, integrity, sovereignty, or security of India, or to strike terror in the people using explosives, biological/chemical weapons, or cyber warfare. Punishable with death or life imprisonment if death results.


      * **BNS 2023 Section 113(1):** Comprehensive definition of terrorist acts including cyber warfare and economic disruption.
      * **BNS 2023 Section 113(2):** Punishable with death or imprisonment for life if death results; otherwise 5 years to life.
    


      * **State of Maharashtra v. Vishwanath Maranna Shetty (SC):** Requires continuing unlawful syndicate activity or terror intent.
    ', 'BNS 2023 Section 113', '{"kb_id":"kb-in-bns-sec113-terrorist-act","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('CPC 1908 Section 11: Res Judicata & Finality of Litigation', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Section 11 of the Code of Civil Procedure 1908 embodies the principle of Res Judicata: no court shall try any suit or issue which has already been directly and substantially decided in a former suit between the same parties. In Daryao v. State of UP (SC 1961), the Supreme Court held that Res Judicata applies equally to Writ Petitions under Articles 32 and 226.


      * **CPC 1908 Section 11:** Statutory prohibition against second trial on decided issues.
      * **Public Policy:** Enforces interest reipublicae ut sit finis litium (there should be an end to litigation).
    


      * **Daryao v. State of UP (SC Constitution Bench 1961):** Res Judicata bars subsequent writ petition on same cause of action after dismissal on merits.
    ', 'CPC 1908 Section 11', '{"kb_id":"kb-in-cpc-res-judicata-sec11","category":"disputes"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Indian Stamp Act Section 35: Inadmissibility & NN Global SC Bench', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Under Section 35 of the Indian Stamp Act 1899, no instrument chargeable with duty can be admitted in evidence for any purpose unless duly stamped. In N.N. Global Mercantile v. Indo Unique Flame (SC 7-Judge Bench 2023), the Supreme Court ruled that while an arbitration agreement is separable, stamp duty defects on the substantive agreement must be cured by impounding and payment of duty/penalty before enforcement.


      * **Indian Stamp Act 1899 Section 35:** Inadmissibility of unstamped instruments; curable by payment of 10x penalty.
      * **Registration Act 1908 Section 49:** Unregistered documents inadmissible to affect immovable property.
    


      * **NN Global Mercantile v. Indo Unique Flame (SC 7-Judge Constitution Bench 2023):** Harmonized Stamp Act inadmissibility with Arbitration Act separability.
    ', 'Indian Stamp Act 1899 Sec. 35', '{"kb_id":"kb-in-stamp-act-sec35-nn-global","category":"realestate"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Ram Janmabhoomi–Babri Masjid (Ayodhya) Case — M. Siddiq v. Mahant Suresh Das', 'judgment', 'Supreme Court of India', 'IN', null, 'M. Siddiq (D) Thr. Lrs. v. Mahant Suresh Das & Ors., (2020) 1 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'On 9 November 2019, a 5-judge Constitution Bench of the Supreme Court decided the Ram Janmabhoomi–Babri Masjid title dispute (M. Siddiq (D) Thr. Lrs. v. Mahant Suresh Das & Ors., (2020) 1 SCC 1). The Court held that the disputed 2.77-acre site in Ayodhya would be handed over for the construction of the Ram temple through a trust (Shri Ram Janmabhoomi Teerth Kshetra) to be set up by the Central Government, and directed that 5 acres of alternative land in Ayodhya be allotted to the Sunni Central Waqf Board for a mosque. The Court found the demolition of the Babri Masjid on 6 December 1992 to be an unlawful act, weighed the ASI archaeological report, and invoked its plenary powers under Article 142 to render complete justice between the parties.


      * **Constitution of India Article 142:** The Supreme Court may pass such decree or order as is necessary for doing complete justice in any cause or matter pending before it.
      * **Acquisition of Ayodhya Act 1993:** The Parliament-enacted law acquiring the disputed area was upheld by the Constitution Bench.
    


      * **M. Siddiq v. Mahant Suresh Das (SC 2019):** Decided the title suit over the disputed site; directed land for the Ram temple and 5 acres of alternative land to the Sunni Central Waqf Board.
      * **M. Ismail Faruqui v. Union of India (SC 1994):** Earlier bench on acquisition of the Ayodhya site, discussed and distinguished by the 2019 Constitution Bench.
    ', null, '{"kb_id":"kb-in-case-ayodhya-ram-janmabhoomi","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Sabarimala Temple Entry Case — Indian Young Lawyers Assn. v. State of Kerala', 'judgment', 'Supreme Court of India', 'IN', null, 'Indian Young Lawyers Assn. v. State of Kerala, (2019) 11 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Indian Young Lawyers Assn. v. State of Kerala ((2019) 11 SCC 1), a 4:1 majority of the Supreme Court (28 September 2018) held that Rule 3(b) of the Kerala Hindu Places of Public Worship (Authorisation of Entry) Rules, 1965 — which barred women aged 10 to 50 from entering the Sabarimala temple — violated Articles 14, 15, and 25(1) of the Constitution. The Court held that public morality or order under Article 25(1) refers to constitutional morality, and that the practice could not be treated as an essential religious practice. Review petitions were subsequently referred to a larger bench (Kantaru Rajeevaru).


      * **Constitution Article 25(1):** Freedom of conscience and free profession, practice and propagation of religion, subject to public order, morality and health.
      * **Constitution Articles 14 & 15:** Equality and prohibition of discrimination, including discrimination on grounds of sex.
    


      * **Indian Young Lawyers Assn. v. State of Kerala (SC 2018):** Rule 3(b) of the 1965 Rules struck down as violative of Articles 14, 15 and 25(1).
      * **Kantaru Rajeevaru v. Indian Young Lawyers Assn. (SC 2019):** Review petitions referred to a larger (7-judge or more) bench.
    ', null, '{"kb_id":"kb-in-case-sabarimala","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Triple Talaq Case — Shayara Bano v. Union of India', 'judgment', 'Supreme Court of India', 'IN', null, 'Shayara Bano v. Union of India, (2017) 9 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Shayara Bano v. Union of India ((2017) 9 SCC 1), a 3:2 majority of a 5-judge Supreme Court bench (22 August 2017) set aside the practice of talaq-e-biddat (instant triple talaq) as manifestly arbitrary and violative of Article 14. Parliament subsequently enacted the Muslim Women (Protection of Rights on Marriage) Act, 2019, making instant triple talaq a cognizable offence punishable with imprisonment of up to three years.


      * **Constitution Article 14:** Equality before law — the majority found instant triple talaq manifestly arbitrary.
      * **Muslim Women (Protection of Rights on Marriage) Act, 2019:** Declares talaq-e-biddat void and illegal; provides subsistence allowance and custody provisions.
    


      * **Shayara Bano v. Union of India (SC 2017):** 3:2 majority set aside talaq-e-biddat as violative of Article 14.
      * **Muslim Women (Protection of Rights on Marriage) Act 2019:** Statutory codification making instant triple talaq an offence.
    ', null, '{"kb_id":"kb-in-case-triple-talaq","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Section 377 Case — Navtej Singh Johar v. Union of India', 'judgment', 'Supreme Court of India', 'IN', null, 'Navtej Singh Johar v. Union of India, (2018) 10 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Navtej Singh Johar v. Union of India ((2018) 10 SCC 1), a 5-judge Constitution Bench (6 September 2018) partially struck down Section 377 of the Indian Penal Code insofar as it criminalized consensual sexual conduct between adults in private. The Court held the provision violated Articles 14, 15, 19 and 21, and expressly overruled Suresh Kumar Koushal v. Naz Foundation (2014). Section 377 continues to apply to non-consensual acts and acts with minors.


      * **Constitution Articles 14, 15, 19, 21:** Equality, non-discrimination, free expression, and privacy/autonomy — the four grounds of the judgment.
      * **IPC Section 377 (now BNS 2023 Section 296):** Applies only to non-consensual acts, acts with minors, and bestiality after Navtej Singh Johar.
    


      * **Navtej Singh Johar v. Union of India (SC 2018):** Consensual adult same-sex conduct decriminalized.
      * **Suresh Kumar Koushal v. Naz Foundation (SC 2014):** Expressly overruled by the 2018 Constitution Bench.
    ', null, '{"kb_id":"kb-in-case-section377","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Aadhaar Case — K.S. Puttaswamy (Aadhaar-5J) v. Union of India', 'judgment', 'Supreme Court of India', 'IN', null, 'K.S. Puttaswamy (Aadhaar-5J) v. Union of India, (2019) 1 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In K.S. Puttaswamy (Aadhaar-5J) v. Union of India ((2019) 1 SCC 1), a 4:1 majority of a 5-judge bench (26 September 2018) upheld the constitutional validity of the Aadhaar Act 2016, including its passage as a Money Bill, but struck down Section 57, which allowed private entities to demand Aadhaar authentication. The Court upheld Aadhaar linkage for PAN and welfare benefits, and applied the triple test (legality, necessity, proportionality) with the proportionality analysis developed in the 2017 Puttaswamy privacy judgment.


      * **Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016:** Upheld with restrictions by the 2018 judgment.
      * **Section 57, Aadhaar Act:** STRUCK DOWN — private companies cannot compel Aadhaar authentication.
    


      * **Justice K.S. Puttaswamy v. Union of India (SC 2017):** The 9-judge privacy judgment — the foundation of the Aadhaar analysis.
      * **K.S. Puttaswamy (Aadhaar-5J) (SC 2018):** 4:1 upholding of the Aadhaar Act with Section 57 struck down.
    ', null, '{"kb_id":"kb-in-case-aadhaar","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Adultery Case — Joseph Shine v. Union of India', 'judgment', 'Supreme Court of India', 'IN', null, 'Joseph Shine v. Union of India, (2019) 3 SCC 39', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'In Joseph Shine v. Union of India ((2019) 3 SCC 39), a 5-judge Constitution Bench (27 September 2018) struck down Section 497 of the Indian Penal Code, which criminalized adultery. The Court held the provision unconstitutional for violating Articles 14, 15 and 21 — it treated women as chattel, gave only the husband the right to prosecute, and denied women agency. Adultery remains a ground for divorce but is no longer a criminal offence.


      * **Constitution Articles 14, 15, 21:** The three grounds on which Section 497 IPC was struck down.
      * **IPC Section 497 (repealed by Joseph Shine):** Adultery is no longer a criminal offence — it remains a ground for divorce under matrimonial laws.
    


      * **Joseph Shine v. Union of India (SC 2018):** Section 497 IPC struck down as unconstitutional.
      * **Sowmithri Vishnu v. Union of India (SC 1985):** Earlier decision upholding Section 497, overruled by Joseph Shine.
    ', null, '{"kb_id":"kb-in-case-joseph-shine","category":"caselaw"}'::jsonb);

end $$;

-- ============================================================================
-- Verify: select count(*) from legal_documents;  -- expect 28
-- ============================================================================
