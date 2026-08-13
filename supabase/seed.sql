-- ============================================================================
-- JURISAI BHARAT — SEED DATA (auto-generated from the verified legal library)
-- 88 verified authorities: Constitution, BNS/BNSS/BSA, Central Acts, SC judgments
-- ============================================================================
begin;

do $$
declare doc_id uuid;
begin

  delete from public.legal_chunks;
  delete from public.legal_documents;


  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India: Fundamental Rights (Articles 14, 19, 21)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The Golden Triangle of the Bharatiya Constitution: Equality before law, Freedom of speech & expression, and Right to life, liberty & privacy.

Articles 14, 19, and 21 form the "Golden Triangle" of the Indian Constitution (Bharatiya Samvidhan). Article 14 prohibits state arbitrariness and guarantees equal protection of laws. Article 19(1)(a) protects freedom of speech and expression subject to reasonable restrictions under Art. 19(2). Article 21 guarantees that no person shall be deprived of life or personal liberty except according to just, fair, and reasonable procedure established by law.


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
    ('Constitutional Writs & Judicial Review (Articles 32 & 226)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The heart and soul of the Constitution: Filing Writ Petitions (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) in Supreme Court & High Courts.

Dr. B.R. Ambedkar termed Article 32 the "heart and soul" of the Constitution of India. It grants citizens the Fundamental Right to move the Supreme Court directly for the enforcement of Part III rights. Article 226 empowers High Courts to issue writs both for Fundamental Rights and any other legal purpose.


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
  values (doc_id, 'Complete transition guide from IPC 1860, CrPC 1973, and Evidence Act 1872 to the new Bharatiya Nyaya Sanhita, Nagarik Suraksha Sanhita, and Sakshya Adhiniyam.

Effective July 1, 2024, India replaced its colonial criminal law trilogy with three Bharatiya Sanhitas: Bharatiya Nyaya Sanhita (BNS 2023), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), and Bharatiya Sakshya Adhiniyam (BSA 2023). The new laws modernize offenses, establish strict investigation timelines, and recognize electronic evidence as primary records.


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
  values (doc_id, 'ED arrest powers under Section 19, attachment of proceeds of crime, and twin conditions for bail under Section 45.

The Prevention of Money Laundering Act 2002 (PMLA) gives the Enforcement Directorate (ED) broad statutory powers to attach proceeds of crime and arrest individuals under Section 19. Under Section 45, bail is subject to rigorous "twin conditions"—the court must be satisfied there are reasonable grounds to believe the accused is not guilty.


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
  values (doc_id, 'Why post-termination employee non-competes are void under Section 27, and how to structure liquidated damages under Section 74.

Section 27 of the Indian Contract Act 1872 embodies a strict statutory prohibition: "Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void." Indian courts consistently hold that post-termination restrictive covenants on employees are unenforceable.


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
  values (doc_id, 'Fiduciary duties under Section 166, Related Party Transactions (RPT), CSR mandates, and IBC Corporate Insolvency Resolution Process (CIRP).

Section 166 of the Companies Act 2013 codifies the statutory fiduciary duties of Indian company directors. Meanwhile, the Insolvency and Bankruptcy Code (IBC 2016) provides a time-bound Corporate Insolvency Resolution Process (CIRP) under Sections 7 and 9, imposing an immediate statutory moratorium under Section 14.


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
  values (doc_id, 'Statutory compliance for Data Fiduciaries, affirmative consent, Data Principal rights, CERT-In 6-hour rules, and penalties up to ₹250 crore.

The Digital Personal Data Protection Act (DPDP Act 2023) establishes India''s modern statutory privacy framework. Organizations ("Data Fiduciaries") must obtain clear, affirmative consent before processing personal data of "Data Principals" (citizens) and must report data breaches immediately.


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
  values (doc_id, 'Why unstamped or unregistered leave & license / lease agreements are inadmissible in Indian courts, and how to execute valid leases.

Under Section 107 of the Transfer of Property Act 1882 and Section 17 of the Registration Act 1908, any lease of immovable property exceeding one year MUST be made by a registered instrument. Furthermore, under the Indian Stamp Act 1899, an unstamped or under-stamped agreement cannot be admitted in evidence.


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
  values (doc_id, 'Interim relief under Section 9, appointment of arbitrators under Section 11, and grounds for challenging awards under Section 34.

The Arbitration and Conciliation Act 1996 governs domestic and international commercial arbitration in India. Section 34 provides narrow statutory grounds to challenge arbitral awards, prioritizing minimal judicial intervention and expeditious disposal.


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
  values (doc_id, 'Mandatory 30-day statutory demand notice, summary trial before Magistrate, interim compensation up to 20%, and director liability.

Section 138 of the Negotiable Instruments Act 1881 makes the dishonour of a cheque for insufficiency of funds a criminal offense punishable by imprisonment up to 2 years or fine up to twice the cheque amount. Strict adherence to statutory notice timelines is mandatory.


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
  values (doc_id, 'Mandatory 60-day government notice under Section 80, temporary injunction three-prong test, summary suits for debt, and res judicata.

The Code of Civil Procedure (CPC 1908) governs civil litigation in India. Under Order XXXIX Rules 1 & 2, obtaining a temporary injunction requires satisfying a strict three-prong test: (1) Prima Facie Case, (2) Balance of Convenience, and (3) Irreparable Injury.


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
  values (doc_id, 'Mandatory Internal Complaints Committee (ICC) constitution, sexual harassment redressal, and constitutional equality at work.

The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) mandates that every organization with 10 or more employees MUST constitute an Internal Complaints Committee (ICC). Failure to constitute an ICC triggers statutory fines and cancellation of business licenses.


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
  values (doc_id, 'Essential legal doctrines governing Non-Disclosure Agreements, trade secret misappropriation remedies, and statutory whistleblower carve-outs.

Non-Disclosure Agreements (NDAs) protect non-public commercial assets. Under the Defend Trade Secrets Act (DTSA) in the US and the EU Trade Secrets Directive 2016/943, protection requires proof that information derives independent economic value from secrecy and that the owner took reasonable measures to maintain it.


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
  values (doc_id, 'Statutory requirements for Data Processing Agreements (DPAs), lawful processing bases, right to erasure, and cross-border data transfer safeguards.

Data protection frameworks like EU GDPR and California CPRA impose strict operational mandates on companies processing personal data. Non-compliance risks statutory penalties of up to 4% of annual global turnover.


      * **GDPR Article 28 (Processor Contracts):** Mandates an explicit Data Processing Agreement (DPA) whenever a vendor processes personal data.
      * **GDPR Article 17 (Right to Erasure / "Right to be Forgotten"):** Data subjects can compel permanent deletion of personal data within 30 days.
    


      * **Schrems II (CJEU 2020):** Invalidated the EU-US Privacy Shield and required supplementary technical measures for cross-border data transfers.
    ', 'GDPR Art. 6, 17, 28, & 44', '{"kb_id":"kb-gdpr-global-privacy-eu","category":"privacy"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 12: Definition of "State" under Part III', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'What entities qualify as "State" or "other authorities" amenable to Writ Jurisdiction under Part III Fundamental Rights.

Article 12 defines "the State" for Part III Fundamental Rights to include the Government and Parliament of India, State Legislatures, local authorities, and "other authorities". Under the Ajay Hasia (1981) and Pradeep Kumar Biswas (2002) tests, any instrumentality or agency under deep and pervasive state control is amenable to writ jurisdiction.


      * **Constitution of India Article 12:** Definition of State including local or other authorities within the territory of India or under the control of the Government of India.
      * **Article 13(2):** Prohibition against State enacting laws abridging Part III rights.
    


      * **Ajay Hasia v. Khalid Mujib (SC Constitution Bench 1981):** Established the 6-factor test for determining whether a corporation or society is an instrumentality of State.
      * **Pradeep Kumar Biswas v. Indian Institute of Chemical Biology (SC 7-Judge Bench 2002):** Reaffirmed that financial, functional, and administrative state dominance makes an entity "State".
    ', 'Const. India Art. 12', '{"kb_id":"kb-in-const-art12-state","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 20: Protection in Conviction (Double Jeopardy & Self-Incrimination)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Inviolable criminal safeguards: prohibition on ex-post facto laws, double jeopardy, and self-incrimination.

Article 20 guarantees three inviolable criminal protections: (1) prohibition against retrospective criminal laws, (2) prohibition against double jeopardy (prosecuted and punished twice for the same offense), and (3) protection against self-incrimination. In Selvi v. State of Karnataka (2010), the Supreme Court ruled that involuntary narco-analysis and lie-detector tests violate Article 20(3) and Article 21.


      * **Constitution of India Article 20(1):** No ex-post facto criminal law or enhanced retrospective punishment.
      * **Article 20(2):** No person shall be prosecuted and punished for the same offense more than once.
      * **Article 20(3):** No person accused of any offense shall be compelled to be a witness against himself.
    


      * **Selvi v. State of Karnataka (SC 3-Judge Bench 2010):** Involuntary administration of narco-analysis, polygraph, and brain-mapping violates Article 20(3) and mental privacy under Article 21.
    ', 'Const. India Art. 20(1), 20(2), 20(3)', '{"kb_id":"kb-in-const-art20-protection","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Constitution of India Article 22: Arrest Safeguards & 24-Hour Magistrate Remand', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Fundamental Rights upon arrest: right to be informed of grounds, right to counsel, and mandatory 24-hour Magistrate presentation.

Article 22 protects arrested persons by requiring immediate notification of the grounds of arrest, the right to consult a lawyer of choice, and mandatory production before the nearest Judicial Magistrate within 24 hours of arrest. The D.K. Basu (1997) Supreme Court guidelines enforce these rights to prevent custodial torture.


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
  values (doc_id, 'Constitution Bench ruling mandating compulsory FIR registration if a cognizable offense is disclosed, without police discretion.

In Lalita Kumari v. Govt. of U.P. (2014), a 5-Judge Constitution Bench ruled unanimously that registration of a First Information Report (FIR) is mandatory under old CrPC 154 (now BNSS 2023 Section 173) if the complaint discloses a cognizable offense. Police cannot conduct a preliminary inquiry to test veracity before registering an FIR.


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
  values (doc_id, 'Authoritative Supreme Court ruling reinforcing that "Bail is the rule, jail is the exception" and categorizing offenses for speedy bail.

In Satender Kumar Antil v. CBI (2022), the Supreme Court laid down structured guidelines for bail adjudication to combat undertrial overcrowding. It established Category A to D offenses, directing that for offenses punishable up to 7 years where the accused cooperated, bail applications must be decided without mechanical remand.


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
  values (doc_id, 'First statutory codification of Terrorist Act in the general criminal code, punishable with death or life imprisonment.

Section 113 of the Bharatiya Nyaya Sanhita (BNS 2023) defines a Terrorist Act as any act done with intent to threaten the unity, integrity, sovereignty, or security of India, or to strike terror in the people using explosives, biological/chemical weapons, or cyber warfare. Punishable with death or life imprisonment if death results.


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
  values (doc_id, 'A matter directly and substantially judged by a competent court cannot be relitigated between the same parties.

Section 11 of the Code of Civil Procedure 1908 embodies the principle of Res Judicata: no court shall try any suit or issue which has already been directly and substantially decided in a former suit between the same parties. In Daryao v. State of UP (SC 1961), the Supreme Court held that Res Judicata applies equally to Writ Petitions under Articles 32 and 226.


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
  values (doc_id, 'Why unstamped or under-stamped agreements are inadmissible in evidence, and how the 7-Judge Bench resolved arbitration enforceability.

Under Section 35 of the Indian Stamp Act 1899, no instrument chargeable with duty can be admitted in evidence for any purpose unless duly stamped. In N.N. Global Mercantile v. Indo Unique Flame (SC 7-Judge Bench 2023), the Supreme Court ruled that while an arbitration agreement is separable, stamp duty defects on the substantive agreement must be cured by impounding and payment of duty/penalty before enforcement.


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
  values (doc_id, 'The Supreme Court''s 2019 Constitution Bench judgment in the Ram Mandir (Ayodhya) title dispute: land for the Ram temple, 5 acres alternative land for the mosque, and the reasoning under Article 142.

On 9 November 2019, a 5-judge Constitution Bench of the Supreme Court decided the Ram Janmabhoomi–Babri Masjid title dispute (M. Siddiq (D) Thr. Lrs. v. Mahant Suresh Das & Ors., (2020) 1 SCC 1). The Court held that the disputed 2.77-acre site in Ayodhya would be handed over for the construction of the Ram temple through a trust (Shri Ram Janmabhoomi Teerth Kshetra) to be set up by the Central Government, and directed that 5 acres of alternative land in Ayodhya be allotted to the Sunni Central Waqf Board for a mosque. The Court found the demolition of the Babri Masjid on 6 December 1992 to be an unlawful act, weighed the ASI archaeological report, and invoked its plenary powers under Article 142 to render complete justice between the parties.


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
  values (doc_id, 'Supreme Court struck down the Sabarimala rule barring women aged 10–50 from entering the temple — equality and religious freedom analysis.

In Indian Young Lawyers Assn. v. State of Kerala ((2019) 11 SCC 1), a 4:1 majority of the Supreme Court (28 September 2018) held that Rule 3(b) of the Kerala Hindu Places of Public Worship (Authorisation of Entry) Rules, 1965 — which barred women aged 10 to 50 from entering the Sabarimala temple — violated Articles 14, 15, and 25(1) of the Constitution. The Court held that public morality or order under Article 25(1) refers to constitutional morality, and that the practice could not be treated as an essential religious practice. Review petitions were subsequently referred to a larger bench (Kantaru Rajeevaru).


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
  values (doc_id, 'Instant triple talaq (talaq-e-biddat) set aside by the Supreme Court as unconstitutional — followed by the 2019 Act criminalizing it.

In Shayara Bano v. Union of India ((2017) 9 SCC 1), a 3:2 majority of a 5-judge Supreme Court bench (22 August 2017) set aside the practice of talaq-e-biddat (instant triple talaq) as manifestly arbitrary and violative of Article 14. Parliament subsequently enacted the Muslim Women (Protection of Rights on Marriage) Act, 2019, making instant triple talaq a cognizable offence punishable with imprisonment of up to three years.


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
  values (doc_id, 'Supreme Court decriminalized consensual adult same-sex relations by partially striking down Section 377 IPC.

In Navtej Singh Johar v. Union of India ((2018) 10 SCC 1), a 5-judge Constitution Bench (6 September 2018) partially struck down Section 377 of the Indian Penal Code insofar as it criminalized consensual sexual conduct between adults in private. The Court held the provision violated Articles 14, 15, 19 and 21, and expressly overruled Suresh Kumar Koushal v. Naz Foundation (2014). Section 377 continues to apply to non-consensual acts and acts with minors.


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
  values (doc_id, 'Supreme Court upheld the Aadhaar Act with restrictions — struck down Section 57 so private entities cannot demand Aadhaar.

In K.S. Puttaswamy (Aadhaar-5J) v. Union of India ((2019) 1 SCC 1), a 4:1 majority of a 5-judge bench (26 September 2018) upheld the constitutional validity of the Aadhaar Act 2016, including its passage as a Money Bill, but struck down Section 57, which allowed private entities to demand Aadhaar authentication. The Court upheld Aadhaar linkage for PAN and welfare benefits, and applied the triple test (legality, necessity, proportionality) with the proportionality analysis developed in the 2017 Puttaswamy privacy judgment.


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
  values (doc_id, 'Supreme Court struck down Section 497 IPC (adultery) as unconstitutional — the husband''s sole right to prosecute violated Articles 14, 15 and 21.

In Joseph Shine v. Union of India ((2019) 3 SCC 39), a 5-judge Constitution Bench (27 September 2018) struck down Section 497 of the Indian Penal Code, which criminalized adultery. The Court held the provision unconstitutional for violating Articles 14, 15 and 21 — it treated women as chattel, gave only the husband the right to prosecute, and denied women agency. Adultery remains a ground for divorce but is no longer a criminal offence.


      * **Constitution Articles 14, 15, 21:** The three grounds on which Section 497 IPC was struck down.
      * **IPC Section 497 (repealed by Joseph Shine):** Adultery is no longer a criminal offence — it remains a ground for divorce under matrimonial laws.
    


      * **Joseph Shine v. Union of India (SC 2018):** Section 497 IPC struck down as unconstitutional.
      * **Sowmithri Vishnu v. Union of India (SC 1985):** Earlier decision upholding Section 497, overruled by Joseph Shine.
    ', null, '{"kb_id":"kb-in-case-joseph-shine","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Preamble of the Constitution & Basic Structure', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Sovereign, Socialist, Secular, Democratic Republic — the Preamble is part of the Constitution and its values bind amendments via the Basic Structure Doctrine.

The Preamble declares India a Sovereign, Socialist, Secular, Democratic Republic securing Justice, Liberty, Equality and Fraternity. In Kesavananda Bharati (1973), the 13-judge bench held the Preamble is part of the Constitution and that Parliament cannot alter its basic structure. The words Socialist and Secular were added by the 42nd Amendment, 1976, and upheld in S.R. Bommai (1994), where secularism was declared a basic feature.


      * **Constitution Preamble:** Sovereign Socialist Secular Democratic Republic — Justice, Liberty, Equality, Fraternity.
      * **Article 368:** Amendment procedure, subject to the Basic Structure Doctrine.
    


      * **Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225:** Basic Structure Doctrine — the amending power cannot destroy the Constitutions essential features.
      * **S.R. Bommai v. Union of India (1994) 3 SCC 1:** Secularism and federalism are basic features; misuse of Article 356 is justiciable.
      * **In re Berubari Union (AIR 1960 SC 845):** Earlier view that the Preamble is not part of the Constitution — later overruled.
    ', 'Constitution Preamble', '{"kb_id":"kb-in-const-preamble-basic-structure","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Articles 15 & 16 — Equality & Reservation Law', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Anti-discrimination and equality of opportunity in public employment, with the reservation framework capped at 50% (plus EWS).

Article 15 prohibits discrimination on grounds of religion, race, caste, sex or place of birth; Article 16 guarantees equality of opportunity in public employment with reservations for backward classes. Indra Sawhney (1992) upheld 27% OBC reservation, capped total reservations at 50%, and rejected reservation in promotions. Subsequent amendments and judgments (Nagaraj 2006, Jarnail Singh 2018) allowed promotions with quantifiable data, and the 103rd Amendment added 10% EWS quota (Janhit Abhiyan 2022 upheld it 3:2).


      * **Article 15(1)-(4):** No discrimination; special provisions for women, children, and socially/educationally backward classes.
      * **Article 16(1)-(4A):** Equality in public employment; reservation in promotions for SC/ST.
      * **103rd Amendment, 2019:** 10% reservation for Economically Weaker Sections.
    


      * **State of Madras v. Champakam Dorairajan (AIR 1951 SC 226):** Led to the First Amendment — reservations cannot override fundamental rights entirely.
      * **Indra Sawhney v. Union of India (1992 Supp (3) SCC 217):** 50% ceiling, no reservation in promotions, creamy layer exclusion.
      * **M. Nagaraj (2006) 8 SCC 212 & Jarnail Singh (2018) 10 SCC 396:** Promotions with quantifiable data; creamy layer applies to SC/ST promotions.
      * **Dr. Jaishri Laxmanrao Patil (Maratha Reservation) (2021) 8 SCC 1:** Reaffirmed the 50% ceiling.
    ', 'Const. India Art. 15 & 16', '{"kb_id":"kb-in-const-art15-16-reservations","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Articles 17, 23 & 24 — Untouchability, Forced Labour & Child Labour', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Abolition of untouchability, prohibition of begar (forced labour) and child labour below 14 in hazardous employment.

Article 17 abolishes untouchability and makes its practice an offence, enforced by the Protection of Civil Rights Act 1955. Article 23 prohibits traffic in human beings, begar and forced labour — in PUDR v. Union of India (1982), the Supreme Court held that paying wages below the minimum wage is forced labour. Article 24 prohibits employment of children below 14 in factories, mines or hazardous work — read with the Child Labour (Prohibition and Regulation) Amendment Act 2016.


      * **Article 17:** Untouchability is abolished; its practice in any form is an offence.
      * **Article 23:** Prohibition of traffic in human beings and forced labour.
      * **Article 24:** No child below 14 shall work in any factory, mine or hazardous employment.
    


      * **People s Union for Democratic Rights v. Union of India (1982) 3 SCC 235:** Wages below minimum wage constitute forced labour under Article 23.
      * **State of Karnataka v. Appa Balu Ingale (1995 Supp (4) SCC 469):** Social boycott on untouchability grounds is an offence under Article 17.
    ', 'Const. India Art. 17, 23, 24', '{"kb_id":"kb-in-const-art17-23-24","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Article 20 — Protection in Respect of Conviction (Double Jeopardy & Self-Incrimination)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'No ex-post-facto law, no double jeopardy, no compelled self-incrimination — including narco-analysis and brain-mapping without consent.

Article 20 gives three protections: (1) no conviction under an ex-post-facto law, (2) no double jeopardy for the same offence, and (3) no compulsion to be a witness against oneself. In Selvi v. State of Karnataka (2010), the Supreme Court held that narco-analysis, polygraph and brain-mapping tests without consent violate Article 20(3); such tests are allowed only with informed consent and under safeguards. M.P. Sharma (1954) and Kathi Kalu (1961) established that search and seizure documents and physical evidence are not self-incrimination, but compelled personal testimony is protected.


      * **Article 20(1):** No punishment for acts not offences when committed; no greater penalty than the law at the time.
      * **Article 20(2):** No person shall be prosecuted and punished for the same offence more than once.
      * **Article 20(3):** No person accused of an offence shall be compelled to be a witness against himself.
    


      * **Selvi v. State of Karnataka (2010) 7 SCC 263:** Involuntary narco-analysis, polygraph and BEAP violate Article 20(3).
      * **M.P. Sharma v. Satish Chandra (AIR 1954 SC 300):** Search and seizure do not violate self-incrimination protection.
      * **State of Bombay v. Kathi Kalu (AIR 1961 SC 1808):** Handwriting and fingerprints are physical evidence, not compelled testimony.
    ', 'Const. India Art. 20', '{"kb_id":"kb-in-const-art20","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Article 22 — Arrest Safeguards & Preventive Detention', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Rights of arrested persons: grounds of arrest, lawyer access, 24-hour magistrate production — and the separate regime of preventive detention.

Article 22 protects persons against arrest and detention: right to be informed of grounds, right to consult a lawyer, and production before a magistrate within 24 hours (excluding journey time). Clauses 4-7 carve out preventive detention, which can extend beyond 24 hours subject to Advisory Board review. D.K. Basu (1997) laid down mandatory arrest guidelines (identification, memo, family intimation), and the emergency-era ADM Jabalpur (1976) ruling — later criticized — held that Article 21 stood suspended during emergency.


      * **Article 22(1)-(2):** Grounds of arrest, lawyer access, 24-hour magistrate production.
      * **Article 22(4)-(7):** Preventive detention regime with Advisory Board safeguards.
    


      * **D.K. Basu v. State of West Bengal (1997) 1 SCC 416:** 11 mandatory guidelines for arrest and detention.
      * **Joginder Kumar v. State of UP (1994) 4 SCC 260:** Arrest cannot be routine — the officer must justify it.
      * **A.K. Gopalan v. State of Madras (AIR 1950 SC 27):** Preventive detention upheld; Article 21 read narrowly — later overruled by Maneka Gandhi.
    ', 'Const. India Art. 22', '{"kb_id":"kb-in-const-art22-preventive","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Articles 25–28 — Freedom of Religion', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Freedom of conscience and religion, subject to public order, morality and health — with the essential religious practices doctrine.

Articles 25-28 guarantee freedom of conscience, free profession and practice of religion, and freedom to manage religious affairs, subject to public order, morality and health. The Shirur Mutt case (1954) created the essential religious practices doctrine — courts decide which practices are essential and thus protected. The doctrine produced key outcomes: Sabarimala entry (2018), instant triple talaq set aside (2017), and the national anthem ruling in Bijoe Emmanuel (1986). Article 27 bars compulsory taxation for promoting a religion, and Article 28 restricts religious instruction in state-funded institutions.


      * **Article 25:** Freedom of conscience and free profession, practice and propagation of religion — subject to public order, morality and health.
      * **Article 26:** Freedom to manage religious affairs.
      * **Article 27:** No compulsory taxation for promotion of any religion.
      * **Article 28:** No religious instruction in wholly state-funded institutions.
    


      * **Commissioner, Hindu Religious Endowments, Madras v. Sri Lakshmindra Thirtha Swamiar (Shirur Mutt) (AIR 1954 SC 282):** Essential religious practices doctrine.
      * **Bijoe Emmanuel v. State of Kerala (1986) 3 SCC 615:** Right to not sing the national anthem on genuine religious grounds.
      * **Shayara Bano (2017) 9 SCC 1:** Instant triple talaq set aside under Article 25 read with equality.
    ', 'Const. India Art. 25-28', '{"kb_id":"kb-in-const-art25-28","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Articles 29 & 30 — Minority Rights & Minority Institutions', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Protection of minority interests and the right of minorities to establish and administer educational institutions.

Article 29 protects the distinct language, script and culture of any section of citizens; Article 30 gives religious and linguistic minorities the right to establish and administer educational institutions. T.M.A. Pai (2002) held that minority status is determined state-wise, and that minorities have no blanket right to admit all students of their own community — reasonable regulations are permissible. P.A. Inamdar (2005) ruled the state cannot impose reservations on unaided minority institutions, and St. Stephen s College (1992) upheld limited minority preference quotas.


      * **Article 29:** Protection of interests of minorities — any section of citizens with a distinct language, script or culture.
      * **Article 30(1):** Minorities right to establish and administer educational institutions.
      * **Article 30(2):** No discrimination in state aid on religious or linguistic grounds.
    


      * **T.M.A. Pai Foundation v. State of Karnataka (2002) 8 SCC 481:** 11-judge bench — minority status determined state-wise; administration protected from excessive regulation.
      * **P.A. Inamdar v. State of Maharashtra (2005) 6 SCC 537:** No state-imposed reservation in unaided minority institutions.
      * **St. Stephen s College v. University of Delhi (1992) 1 SCC 558:** Limited minority preference in admissions is permissible.
    ', 'Const. India Art. 29, 30', '{"kb_id":"kb-in-const-art29-30","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Article 21A & Right to Education (RTE Act 2009)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Free and compulsory education for ages 6-14, evolved through Mohini Jain and Unni Krishnan into a fundamental right.

Article 21A (inserted by the 86th Amendment, 2002) makes free and compulsory education for children aged 6-14 a fundamental right, implemented through the Right of Children to Free and Compulsory Education (RTE) Act 2009 — including the 25% quota for disadvantaged children in private schools (upheld in Society for Unaided Private Schools v. Union of India, 2012). The right was first read into Article 21 in Mohini Jain (1992) and structured in Unni Krishnan (1993), which held the right extends only to age 14.


      * **Article 21A:** Free and compulsory education for all children of 6-14 years.
      * **RTE Act 2009 Section 12(1)(c):** 25% admission quota for disadvantaged groups in private unaided schools.
      * **RTE Act Section 16:** No detention or expulsion till completion of elementary education.
    


      * **Mohini Jain v. State of Karnataka (1992) 3 SCC 666:** Right to education read into Article 21; capitation fees unconstitutional.
      * **Unni Krishnan J.P. v. State of AP (1993) 1 SCC 645:** Education a fundamental right up to age 14; scheme for private colleges.
      * **Society for Unaided Private Schools v. Union of India (2012) 6 SCC 1:** 25% RTE quota upheld; not applicable to minority institutions.
    ', 'Const. India Art. 21A', '{"kb_id":"kb-in-const-art21a-education","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Directive Principles (DPSP) & Fundamental Duties (Article 51A)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'DPSPs guide governance and are not enforceable but fundamental in governance; Fundamental Duties list citizen obligations.

Part IV Directive Principles of State Policy (Articles 36-51) are non-justiciable but fundamental in governance — courts harmonize them with fundamental rights (Minerva Mills held both must be balanced; either can be amended but neither destroyed). Key DPSPs include Article 39A (free legal aid — the foundation of the NALSA scheme), Article 44 (uniform civil code), Article 48A (environment protection) and Article 51A Fundamental Duties (added by the 42nd Amendment, 1976, on the Swaran Singh Committee recommendation).


      * **Article 37:** DPSPs are not enforceable but fundamental in governance.
      * **Article 39A:** Free legal aid to the poor.
      * **Article 48A:** Protection and improvement of environment.
      * **Article 51A:** Eleven Fundamental Duties of citizens.
    


      * **Minerva Mills v. Union of India (1980) 3 SCC 625:** Harmony between Part III and Part IV is a basic feature.
      * **Hussainara Khatoon v. State of Bihar (1980) 1 SCC 81:** Article 39A — undertrial prisoners and the right to speedy trial and free legal aid.
    ', 'Const. India Part IV & Art. 51A', '{"kb_id":"kb-in-const-dpsp-fundamental-duties","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Article 356 — Presidents Rule & the S.R. Bommai Doctrine', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Presidents rule in a state is judicially reviewable; secularism and federalism are basic features that cannot be destroyed.

Article 356 empowers the President to impose Presidents rule in a state on Governors report of constitutional breakdown. In S.R. Bommai v. Union of India (1994), a 9-judge bench held the power is not absolute: the proclamation is judicially reviewable, the floor test is the proper method to test majority, the Assembly cannot be dissolved before parliamentary approval, and dismissal on the ground of secularism violates the Constitution — secularism is a basic feature. The ruling ended the abuse of Article 356 for political purposes.


      * **Article 356:** Provisions in case of failure of constitutional machinery in States.
      * **Article 355:** Duty of the Union to protect states against internal disturbance.
    


      * **S.R. Bommai v. Union of India (1994) 3 SCC 1:** 9-judge bench — Article 356 reviewable; floor test mandatory; secularism and federalism are basic features.
      * **Rameshwar Prasad v. Union of India (2006) 2 SCC 1:** Dissolution of the Bihar Assembly struck down as unconstitutional.
    ', 'Const. India Art. 356', '{"kb_id":"kb-in-const-art356-bommai","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Article 368 — Constitutional Amendments (Shankari Prasad → Kesavananda)', 'constitution', null, 'IN', null, null, 'https://legislative.gov.in/constitution-of-india/', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The amending power journey: absolute → subject to fundamental rights → subject to basic structure.

Article 368 provides the amendment procedure. The judicial journey: Shankari Prasad (1951) and Sajjan Singh (1965) held Parliament could amend any part including fundamental rights; Golaknath (1967) held fundamental rights were unamendable; the 24th Amendment (1971) responded by giving express power to amend Part III; and Kesavananda Bharati (1973) finally settled the law — Parliament can amend any provision but cannot destroy the basic structure (supremacy of the Constitution, judicial review, secularism, federalism, democracy). The basic structure test remains the controlling doctrine, reaffirmed in I.R. Coelho (2007).


      * **Article 368(2):** Amendment requires special majority (two-thirds present and voting + majority of total membership).
      * **Article 368 proviso:** Ratification by half the states for federal provisions.
    


      * **Shankari Prasad v. Union of India (AIR 1951 SC 458):** Parliament can amend fundamental rights.
      * **I.C. Golaknath v. State of Punjab (AIR 1967 SC 1643):** Fundamental rights beyond amending power — overruled by Kesavananda.
      * **Kesavananda Bharati (1973) 4 SCC 225:** Basic Structure Doctrine — the settled law.
      * **I.R. Coelho v. State of Tamil Nadu (2007) 2 SCC 1:** Ninth Schedule laws reviewable against basic structure.
    ', 'Const. India Art. 368', '{"kb_id":"kb-in-const-art368-amendment","category":"constitution"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Dowry Death & Dowry Prohibition Act 1961', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Dowry death — 7 years minimum imprisonment, presumption against husband; giving or taking dowry is itself an offence.

Dowry death (IPC 304B, now BNS Section 80) punishes the death of a woman by burns or bodily injury within 7 years of marriage where she was subjected to dowry cruelty — imprisonment of 7 years to life. Section 113B Evidence Act (BSA Section 118) raises a presumption against the husband. The Dowry Prohibition Act 1961 makes giving, taking or demanding dowry an offence (sections 3-4), and IPC 498A (BNS 85/86) criminalizes cruelty by husband or relatives. In Kans Raj (2000), the Supreme Court stressed the presumption when cruelty is proved soon before death.


      * **BNS 2023 Section 80 (old IPC 304B):** Dowry death — 7 years to life imprisonment.
      * **BNS 2023 Sections 85 & 86 (old IPC 498A):** Cruelty by husband or his relatives.
      * **Dowry Prohibition Act 1961 Section 3:** Giving or taking dowry — 5 years and fine; Section 4: demanding dowry.
    


      * **Kans Raj v. State of Punjab (2000) 5 SCC 207:** Presumption under Section 113B applies when cruelty is established soon before death.
      * **Arnesh Kumar v. State of Bihar (2014) 8 SCC 273:** No automatic arrests in 498A cases — Section 41A/BNSS 35 procedure.
    ', 'IPC 304B → BNS 80 (Dowry Death)', '{"kb_id":"kb-in-cr-dowry-death","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Theft, Robbery & Dacoity — BNS 303, 309, 310', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Theft is movable property without consent; robbery is theft with violence; dacoity is robbery by five or more persons.

Theft (BNS 303, old IPC 378) is dishonest taking of movable property out of someones possession without consent. Robbery (BNS 309, old IPC 392) is theft where the offender voluntarily causes death, hurt or wrongful restraint, or fear of these — or extortion committed by putting a person in fear of instant death or hurt. Dacoity (BNS 310, old IPC 395) is robbery committed by five or more persons jointly. Punishments scale from theft (3 years) to robbery (10 years, life for highway robbery) to dacoity (life imprisonment or 10 years).


      * **BNS 2023 Section 303 (IPC 378-382):** Theft — movable property, dishonestly, without consent.
      * **BNS 2023 Section 309 (IPC 390-392):** Robbery — theft or extortion with violence or fear.
      * **BNS 2023 Section 310 (IPC 395):** Dacoity — robbery by five or more persons.
    


      * **K.N. Mehra v. State of Rajasthan (AIR 1957 SC 369):** Dishonest intention is the core of theft.
      * **Om Parkash v. State of Punjab (AIR 1961 SC 1782):** Thefts between spouses — possession matters.
    ', 'BNS 303 (old IPC 378-382 Theft)', '{"kb_id":"kb-in-cr-theft-robbery-dacoity","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Kidnapping & Abduction — BNS 137, 138, 140', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Kidnapping of minors or from lawful guardianship; abduction by force or deceit; ransom kidnapping carries death or life.

Kidnapping (BNS 137, old IPC 359-363) is taking a minor (below 16 for males, 18 for females) or a person of unsound mind out of lawful guardianship without consent — consent of the minor is irrelevant. Abduction (BNS 138, old IPC 362) is compelling or deceitfully inducing any person to go from any place — no age limit. Kidnapping for ransom (BNS 140, old IPC 364A) is punishable with death or life imprisonment. The 2013 and 2018 amendments strengthened punishments for kidnapping women and minors.


      * **BNS 2023 Section 137 (IPC 359-363):** Kidnapping from India or from lawful guardianship.
      * **BNS 2023 Section 138 (IPC 362):** Abduction by force, compulsion or deceit.
      * **BNS 2023 Section 140 (IPC 364A):** Kidnapping for ransom — death or life imprisonment.
    


      * **State of Haryana v. Raja Ram (1973) 1 SCC 544:** Taking a minor from the lawful guardian, even with the minors consent, is kidnapping.
      * **S. Varadarajan v. State of Madras (AIR 1965 SC 942):** A minor leaving the guardians home voluntarily without inducement is not kidnapping.
    ', 'BNS 137 (old IPC 359-363 Kidnapping)', '{"kb_id":"kb-in-cr-kidnapping","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Defamation & Criminal Intimidation — BNS 356 & 351', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Defamation — harming reputation by words; criminal intimidation — threats of injury to person or property.

Defamation (BNS 356, old IPC 499-500) is imputing anything to harm a persons reputation by words, signs or representations — simple imprisonment up to 2 years, or 2 years with community service under BNS. The Supreme Court upheld its constitutionality in Subramanian Swamy v. Union of India (2016) — reputation is part of Article 21. Criminal intimidation (BNS 351, old IPC 503-506) is threatening injury to person, reputation or property to cause alarm — enhanced punishment when the threat is to cause death or grievous hurt (IPC 506, now BNS 351(2)-(3)).


      * **BNS 2023 Section 356 (IPC 499-500):** Defamation — exceptions include truth for public good, fair comment on public conduct.
      * **BNS 2023 Section 351 (IPC 503-506):** Criminal intimidation — threats with intent to cause alarm.
    


      * **Subramanian Swamy v. Union of India (2016) 7 SCC 221:** IPC 499-500 constitutional — reputation is protected by Article 21.
      * **R. Rajagopal v. State of Tamil Nadu (1994) 6 SCC 632:** Right to publish matters of public record; right to privacy of citizens.
    ', 'BNS 356 (old IPC 499-500 Defamation)', '{"kb_id":"kb-in-cr-defamation-intimidation","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Sexual Harassment at Workplace — Vishaka & POSH Act 2013', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Every workplace needs an Internal Committee; the Vishaka guidelines became the POSH Act 2013 with strict timelines.

In Vishaka v. State of Rajasthan (1997), the Supreme Court laid down binding guidelines against workplace sexual harassment under Articles 14, 19 and 21 — these became the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013 (POSH). Every workplace with 10+ employees must constitute an Internal Committee (IC); complaints must be filed within 3 months, inquiry completed in 90 days. Criminal remedies also exist under IPC 354A (BNS 75 sexual harassment) and Section 509 (BNS 79).


      * **POSH Act 2013 Section 4:** Internal Committee for every workplace (10+ employees).
      * **POSH Act Section 9:** Complaint within 3 months of incident.
      * **POSH Act Section 11:** Inquiry to be completed within 90 days.
      * **BNS 75 (IPC 354A):** Criminal penalty for sexual harassment — 3 years.
    


      * **Vishaka v. State of Rajasthan (1997) 6 SCC 241:** Binding guidelines; employer duty to prevent and redress harassment.
      * **Apparel Export Promotion Council v. A.K. Chopra (1999) 1 SCC 759:** Physical contact is not essential for sexual harassment.
    ', 'POSH Act 2013', '{"kb_id":"kb-in-cr-posh","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('POCSO Act 2012 — Child Sexual Offences', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Gender-neutral protection for children below 18 — sexual assault, harassment and pornography, with special courts and fast timelines.

The Protection of Children from Sexual Offences (POCSO) Act 2012 protects children below 18 — gender-neutral offences of penetrative and non-penetrative sexual assault, sexual harassment and child pornography, with presumptions against the accused (sections 29-30) and special courts expected to complete trials within 1 year. In Attorney General for India v. Satish (2022), the Supreme Court restored the position that even skin-to-skin contact with sexual intent is sexual assault. Section 19 makes reporting mandatory for anyone with knowledge of an offence.


      * **POCSO Section 3-10:** Sexual assault offences — graded punishments.
      * **POCSO Section 19:** Mandatory reporting of offences.
      * **POCSO Sections 29-30:** Presumption of guilt and culpable mental state of the accused.
    


      * **Attorney General for India v. Satish (2022) 5 SCC 545:** Skin-to-skin contact ruling quashed — sexual intent is the key.
      * **Alakh Alok Srivastava v. Union of India (2018) 17 SCC 291:** Directions for fast-track special courts.
    ', 'POCSO Act 2012', '{"kb_id":"kb-in-cr-pocso","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Domestic Violence Act 2005 (PWDVA)', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Civil-criminal hybrid protection for women in domestic relationships — protection orders, residence orders, monetary relief.

The Protection of Women from Domestic Violence Act 2005 (PWDVA) protects women from physical, sexual, verbal, emotional and economic abuse by husbands, male live-in partners or relatives. Remedies before the Magistrate: protection orders, residence orders (right to stay in the shared household), monetary relief, custody and compensation. D. Velusamy (2010) defined live-in relationships qualifying for protection (shared household, pooling of resources, domestic arrangement), and Indra Sarma (2013) held married men in live-in relationships are not protected. It is a civil remedy operating alongside criminal 498A/BNS 85.


      * **PWDVA Section 3:** Definition of domestic violence — physical, sexual, verbal, emotional, economic.
      * **PWDVA Sections 18-22:** Protection orders, residence orders, monetary relief, custody, compensation.
      * **PWDVA Section 12:** Application to the Magistrate — can be filed with police or protection officer.
    


      * **D. Velusamy v. D. Patchaiammal (2010) 10 SCC 469:** Test for live-in relationships qualifying under PWDVA.
      * **Indra Sarma v. V.K.V. Sarma (2013) 15 SCC 755:** Live-in with a married man does not create PWDVA protection.
    ', 'Protection of Women from Domestic Violence Act 2005', '{"kb_id":"kb-in-cr-domestic-violence","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Bail Law — BNSS 2023 (Regular, Anticipatory & Default Bail)', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Bail is the rule, jail the exception — bailable/non-bailable offences, anticipatory bail, and 60/90-day default bail.

Under BNSS 2023, regular bail for non-bailable offences (BNSS 480, old CrPC 439) is discretionary — the Supreme Court in Satender Kumar Antil (2022) held bail is the rule and jail the exception, with automatic evaluation at each stage. Anticipatory bail (BNSS 482, old CrPC 438) protects against arrest before it happens — Sushila Aggarwal (2020) ruled it need not be time-limited. Default bail (BNSS 187, old CrPC 167) accrues if investigation is not completed in 60/90 days. Arnesh Kumar (2014) bars automatic arrest for offences punishable under 7 years.


      * **BNSS 2023 Section 480 (CrPC 439):** Regular bail before High Court / Sessions Court.
      * **BNSS 2023 Section 482 (CrPC 438):** Anticipatory bail — direction for release on arrest.
      * **BNSS 2023 Section 187 (CrPC 167):** Default bail — 60 days (90 for offences punishable with death/life/10+ years).
    


      * **Satender Kumar Antil v. CBI (2022) 10 SCC 51:** Bail guidelines — bail is the rule; categorized stages.
      * **Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1:** Anticipatory bail not time-limited; can be sought even after FIR.
      * **Gudikanti Narasimhulu v. Public Prosecutor (1978) 1 SCC 240:** Factors for bail — nature of accusation, evidence, flight risk.
    ', 'BNSS 480 (old CrPC 439 Regular Bail)', '{"kb_id":"kb-in-cr-bail-bnss","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Cybercrime & IT Act 2000 — Sections 43, 66, 67, 69', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Hacking, identity theft, cyber fraud and online obscenity — with Section 66A struck down for violating free speech.

The Information Technology Act 2000 criminalizes unauthorized access and hacking (sections 43, 66), identity theft (66C), cheating by impersonation (66D), cyber terrorism (66F) and publishing obscene material (67). In Shreya Singhal v. Union of India (2015), the Supreme Court struck down Section 66A (offensive messages) as vague and violative of Article 19(1)(a). Section 69 permits lawful interception by the state with safeguards. Electronic evidence is now governed by BSA 2023 Section 63 (old Evidence Act 65B) — with the Anvar P.V. and Arjun Khotkar certificate rules streamlined.


      * **IT Act Section 43 & 66:** Unauthorized access, data theft, hacking — compensation and punishment.
      * **IT Act Section 66C/66D:** Identity theft and cheating by personation.
      * **IT Act Section 67:** Publishing or transmitting obscene material electronically.
      * **BSA 2023 Section 63 (old 65B):** Admissibility of electronic records.
    


      * **Shreya Singhal v. Union of India (2015) 5 SCC 1:** Section 66A struck down — online speech protected under Article 19(1)(a).
      * **Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1:** Certificate requirements for electronic evidence.
    ', 'IT Act 2000 s.43, 66, 66C-66F, 67, 69', '{"kb_id":"kb-in-cr-cyber-itact","category":"criminal"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Hindu Marriage Act 1955 — Marriage, Divorce Grounds & Cooling Period', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Conditions of valid Hindu marriage, restitution of conjugal rights, 9 divorce grounds and mutual divorce with waivable cooling period.

The Hindu Marriage Act 1955 governs marriage and divorce for Hindus. Section 5 conditions: monogamy, age (21/18), sound mind, no prohibited relationship, no sapinda relationship. Section 13 lists 9 fault grounds including cruelty, adultery, desertion (2 years), conversion, mental disorder, leprosy (cured by amendment), venereal disease, renunciation, and presumption of death (7 years). Section 13B mutual divorce requires 1 year separation + 6-18 month cooling period — Amardeep Singh (2017) held courts can waive the cooling period. Naveen Kohli (2006) recommended making irretrievable breakdown a ground.


      * **HMA Section 5:** Conditions of a Hindu marriage (monogamy, age, mental capacity, no sapinda relationship).
      * **HMA Section 13:** Grounds of divorce — cruelty, adultery, desertion, conversion, unsound mind.
      * **HMA Section 13B:** Mutual divorce — 6 to 18 month cooling period, waivable.
    


      * **Amardeep Singh v. Harveen Kaur (2017) 8 SCC 746:** Cooling period can be waived; wait for mutual divorce is directory.
      * **Naveen Kohli v. Neelu Kohli (2006) 4 SCC 558:** Recommended irretrievable breakdown as a divorce ground.
    ', 'Hindu Marriage Act 1955 s.5, 9, 13, 13B', '{"kb_id":"kb-in-fam-hindu-marriage","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Hindu Succession Act 1956 — Coparcenary & Daughters Rights', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Daughters are coparceners by birth — equal rights in ancestral property, settled finally by Vineeta Sharma (2020).

The 2005 amendment to Section 6 of the Hindu Succession Act made daughters coparceners by birth with the same rights and liabilities as sons in joint family property. Vineeta Sharma v. Rakesh Sharma (2020) settled the conflicting rulings: the daughter s right applies regardless of whether the father was alive on 9-9-2005 — the right is by birth, but partition claims apply to living partitions after 2005. The Act also abolished the limited estate of women and gave absolute ownership, with Class I heirs (widow, children, mother) inheriting equally. Intestate succession follows the schedule of heirs.


      * **HSA Section 6 (amended 2005):** Daughters are coparceners by birth — equal share in coparcenary property.
      * **HSA Section 8-13:** Intestate succession — Class I and Class II heirs.
      * **HSA Section 14:** Absolute property of a female Hindu.
    


      * **Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1:** Daughter s coparcenary right by birth — father s death before 2005 irrelevant.
      * **Prakash v. Phulavati (2016) 2 SCC 36:** Earlier conflicting view — overruled by Vineeta Sharma.
    ', 'Hindu Succession Act 1956 s.6 (2005 Amendment)', '{"kb_id":"kb-in-fam-hindu-succession","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Special Marriage Act 1954 — Inter-Faith Marriage & Conversion', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Civil marriage for inter-faith couples — divorce and succession follow secular law; conversion does not dissolve the first marriage.

The Special Marriage Act 1954 allows civil marriage irrespective of religion — 30-day notice, registration before a Marriage Officer. Once married under the Act, succession is governed by the Indian Succession Act 1925 (not personal law), and divorce by Section 27 grounds. In Sarla Mudgal (1995) and Lily Thomas (2000), the Supreme Court held that conversion to Islam does not dissolve an existing marriage — a second marriage after conversion, without the first being dissolved, is bigamy under Section 494 IPC (BNS 82).


      * **SMA Section 4:** Conditions — monogamy, age, sound mind, no prohibited relationship.
      * **SMA Section 27:** Divorce grounds under the Act.
      * **SMA Section 21:** Succession to property of SMA marriages — Indian Succession Act.
    


      * **Sarla Mudgal v. Union of India (1995) 3 SCC 635:** Conversion does not dissolve a Hindu marriage; second marriage is bigamy.
      * **Lily Thomas v. Union of India (2000) 6 SCC 224:** Reaffirmed — first marriage subsists after conversion.
    ', 'Special Marriage Act 1954 s.4, 19, 27, 28', '{"kb_id":"kb-in-fam-special-marriage","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Muslim Personal Law — Maintenance, Talaq & Shah Bano', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Maintenance for divorced Muslim women beyond iddat, triple talaq void — the Shah Bano to Shayara Bano journey.

In Mohd. Ahmed Khan v. Shah Bano Begum (1985), the Supreme Court held a divorced Muslim woman is entitled to maintenance under CrPC Section 125 beyond the iddat period if she cannot maintain herself. Parliament responded with the Muslim Women (Protection of Rights on Divorce) Act 1986, upheld in Danial Latifi (2001) — the husband must make reasonable provision within the iddat period. Shamim Ara (2002) held talaq must be for a reasonable cause and preceded by attempts at reconciliation, and Shayara Bano (2017) set aside instant triple talaq entirely, followed by the 2019 Act making it an offence.


      * **BNSS 144 (old CrPC 125):** Maintenance for wives, children and parents.
      * **Muslim Women (Protection of Rights on Divorce) Act 1986:** Reasonable and fair provision within iddat.
      * **Muslim Women (Protection of Rights on Marriage) Act 2019:** Triple talaq void — up to 3 years imprisonment.
    


      * **Shah Bano (1985) 2 SCC 556:** CrPC 125 maintenance beyond iddat for divorced Muslim women.
      * **Danial Latifi v. Union of India (2001) 7 SCC 740:** 1986 Act upheld — provision must cover the future.
      * **Shamim Ara v. State of UP (2002) 7 SCC 518:** Valid talaq requires reasonable cause and reconciliation attempts.
    ', 'Muslim Women (Protection of Rights on Divorce) Act 1986', '{"kb_id":"kb-in-fam-muslim-personal-law","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Guardianship & Custody — HMGA 1956 & GWA 1890', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Natural guardians of Hindu minors and court custody — welfare of the child is the paramount consideration.

Under the Hindu Minority and Guardianship Act 1956, the father is the natural guardian of a Hindu minor, and after him the mother — Githa Hariharan v. RBI (1999) held the mother can be the natural guardian in the father s absence and both parents have equal rights in custody matters. The Guardians and Wards Act 1890 governs court-appointed guardianship, where the welfare of the child is the paramount consideration. Courts apply the welfare principle in custody battles, considering the child s age, education and emotional needs over parental rights.


      * **HMGA 1956 Section 6:** Natural guardians of a Hindu minor — father, then mother.
      * **HMGA Section 8:** Powers of natural guardian over minor s property — court permission needed.
      * **GWA 1890 Section 17:** Welfare of the minor is the paramount consideration.
    


      * **Githa Hariharan v. Reserve Bank of India (1999) 2 SCC 228:** Mother is a natural guardian when the father is absent or indifferent.
      * **Nil Ratan Kundu v. Abhijit Kundu (2008) 9 SCC 413:** Welfare of the child overrides all other considerations.
    ', 'Hindu Minority & Guardianship Act 1956', '{"kb_id":"kb-in-fam-guardianship","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Adoption Law — HAMA 1956 & Juvenile Justice Act 2015', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Hindus adopt under HAMA; everyone else (including Muslims) can adopt through the secular JJ Act 2015 route.

The Hindu Adoptions and Maintenance Act 1956 (HAMA) governs adoption for Hindus — a Hindu can adopt a child of the same sex as the deceased child, with spousal consent. Non-Hindus, including Muslims, can adopt through the Juvenile Justice (Care and Protection of Children) Act 2015, which is secular — Shabnam Hashmi v. Union of India (2014) recognized the JJ Act route as available to all, even those whose personal law does not recognize adoption. All inter-country and in-country adoptions now route through CARA (Central Adoption Resource Authority).


      * **HAMA 1956 Section 7-11:** Who may adopt, capacity and effects of adoption.
      * **JJ Act 2015 Section 56-58:** Adoption procedures through CARA.
    


      * **Shabnam Hashmi v. Union of India (2014) 4 SCC 1:** JJ Act adoption is available to Muslims as secular law.
      * **Lakshmi Kant Pandey v. Union of India (1984) 2 SCC 244:** Guidelines for inter-country adoption.
    ', 'Hindu Adoptions & Maintenance Act 1956', '{"kb_id":"kb-in-fam-adoption","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Right to Marry & Live-in Relationships', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The right to choose ones life partner is a fundamental right — khap panchayat interference is illegal.

The Supreme Court has repeatedly held that the right to marry a person of ones choice is a facet of Article 21 — Shafin Jahan v. Asokan K.M. (Hadiya case, 2018) declared the choice of a life partner a fundamental right that the state, courts and khap panchayats cannot interfere with. Lata Singh v. State of UP (2006) held inter-caste marriages are valid and honour killings are illegal. Live-in relationships between consenting adults are lawful (D. Velusamy defined the legal tests), and children of such relationships have inheritance rights.


      * **Constitution Article 21:** Right to life includes the right to choose a partner.
      * **Constitution Article 19(1)(a):** Free expression of choice.
    


      * **Shafin Jahan v. Asokan K.M. (2018) 16 SCC 368:** Choice of life partner is a fundamental right; Habeas Corpus against parental confinement.
      * **Lata Singh v. State of UP (2006) 5 SCC 475:** Inter-caste marriage valid; honour killing illegal.
      * **D. Velusamy v. D. Patchaiammal (2010) 10 SCC 469:** Legal recognition of live-in relationships.
    ', 'Const. India Art. 21 & 19', '{"kb_id":"kb-in-fam-right-to-marry","category":"family"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Indian Contract Act 1872 — Essentials & Minors Agreements', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Offer, acceptance, consideration, capacity and lawful object — a minors agreement is void ab initio.

Section 10 Contract Act: agreements are contracts when made by competent parties, for lawful consideration, with lawful object and free consent. Minors cannot contract — Mohori Bibee v. Dharmodas Ghose (1903, Privy Council) held a minor s agreement is void ab initio and cannot be ratified later. Carlill v. Carbolic Smoke Ball (1893) established that general offers can be accepted by performance, and Balfour v. Balfour (1919) held domestic arrangements lack contractual intent. Section 25 makes agreements without consideration void, with exceptions (natural love and affection, past services, time-barred debts).


      * **Contract Act Section 10:** Essentials — competence, consent, consideration, lawful object.
      * **Section 11:** Competence — majority, sound mind, not disqualified by law.
      * **Section 23:** Lawful consideration and object.
      * **Section 25:** Agreements without consideration are void, with exceptions.
    


      * **Mohori Bibee v. Dharmodas Ghose (1903) 30 IA 114:** Minor s agreement void ab initio; no estoppel against a minor.
      * **Carlill v. Carbolic Smoke Ball Co. [1893] 1 QB 256:** Unilateral offer accepted by performance.
      * **Balfour v. Balfour [1919] 2 KB 571:** Domestic agreements are not contracts.
    ', 'Contract Act 1872 s.2, 10, 11, 23, 25', '{"kb_id":"kb-in-civil-contract-essentials","category":"civil"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Specific Relief Act 1963 — Specific Performance & Injunctions', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Specific performance is now the rule for contracts; injunctions protect property and prevent breaches.

The Specific Relief Act 1963 provides specific performance of contracts (Section 10), recovery of possession (Sections 5-8) and preventive relief by injunctions (Sections 36-42). The 2018 Amendment made specific performance the general rule rather than an exceptional remedy — courts now presume damages are inadequate. Section 14 lists contracts that cannot be specifically enforced (personal services, contracts requiring continuous supervision). Temporary injunctions follow the three-pronged test: prima facie case, balance of convenience, irreparable injury.


      * **Section 10:** Specific performance enforceable where damages are inadequate.
      * **Section 14:** Contracts not specifically enforceable.
      * **Sections 36-42:** Temporary and perpetual injunctions.
    


      * **Umabai v. Nilkanth Dhondiba Chavan (2005) 6 SCC 243:** Specific performance is discretionary but discretion must be exercised on settled principles.
      * **Gujarat Bottling Co. v. Coca Cola Co. (1995) 5 SCC 545:** Tests for temporary injunctions.
    ', 'Specific Relief Act 1963 s.10, 14, 41', '{"kb_id":"kb-in-civil-specific-relief","category":"civil"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Transfer of Property Act 1882 — Sale, Mortgage, Lease & Gift', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'How property transfers in India — sale, mortgage types, leases, gifts, and the ban on GPA-based sales.

The Transfer of Property Act 1882 governs transfer of immovable property: sale (Section 54 — registration compulsory above ₹100), mortgage (Section 58 — simple, usufructuary, English, equitable), lease (Section 105) and gift (Section 122 — accepted gifts are irrevocable). Section 53A protects a buyer in possession under an unregistered agreement. In Suraj Lamp (2012), the Supreme Court held that GPA, agreement to sell or will transactions do not transfer title — registration is mandatory. Real estate sales to consumers are also governed by RERA 2016.


      * **TP Act Section 54:** Sale — how made; registration for property above ₹100.
      * **Section 58:** Six mortgage types; foreclosure and redemption rules.
      * **Section 105:** Lease of immovable property.
      * **Section 122:** Gift — acceptance and transfer.
    


      * **Suraj Lamp & Industries v. State of Haryana (2012) 1 SCC 656:** GPA sales and agreement-to-sell without registered deed transfer no title.
      * **Nathulal v. Phoolchand (1969) 3 SCC 120:** Section 53A part performance — possession is essential.
    ', 'TP Act 1882 s.53A, 54, 58, 105, 122', '{"kb_id":"kb-in-civil-tpa","category":"civil"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Limitation Act 1963 — Deadlines for Filing Suits', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Every remedy has a deadline — generally 3 years for civil suits; condonation of delay needs sufficient cause.

The Limitation Act 1963 bars remedies after prescribed periods — Section 3 requires courts to dismiss time-barred suits even without the defendant pleading limitation. The general period for civil suits is 3 years from accrual of the cause of action (Schedule, Part I). Section 5 allows condonation of delay on sufficient cause, interpreted liberally in Collector, Land Acquisition v. Katiji (1987) — where the Supreme Court warned against pedantic approaches. Section 27 extinguishes the right to property itself (not just the remedy) after 12 years for recovery of possession — the basis of adverse possession claims.


      * **Section 3:** Time-barred suits must be dismissed.
      * **Section 5:** Condonation of delay for sufficient cause.
      * **Section 27:** Extinguishment of right to property — adverse possession foundation.
      * **Schedule:** 3 years general limitation for civil suits.
    


      * **Collector, Land Acquisition, Anantnag v. Katiji (1987) 2 SCC 107:** Liberal condonation of delay — substantial justice over technicalities.
      * **Ravinder Kaur Grewal v. Manjit Kaur (2019) 8 SCC 729:** Adverse possession can be used as a shield in defence.
    ', 'Limitation Act 1963 s.3, 5, 27', '{"kb_id":"kb-in-civil-limitation","category":"civil"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Adverse Possession — 12 Years & the Grewal Doctrine', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Continuous, open, hostile possession for 12 years extinguishes the true owners title — usable as a shield.

Adverse possession requires possession that is continuous, open, notorious, and hostile to the true owner for 12 years (Article 65, Limitation Act) — after which the owner s remedy is barred and, under Section 27, the right itself is extinguished. In Ravinder Kaur Grewal v. Manjit Kaur (2019), the Supreme Court held adverse possession can be used as a shield by a defendant (defence against eviction), not only as a sword — but a plaintiff must prove continuous possession with animus possidendi. Claims against government land follow longer periods (30 years).


      * **Limitation Act Article 65:** 12 years for possession of immovable property.
      * **Section 27:** Extinguishment of right to property.
      * **30 years:** Suits by or on behalf of the government.
    


      * **Ravinder Kaur Grewal v. Manjit Kaur (2019) 8 SCC 729:** Adverse possession usable as a shield; limitation extinguishes title.
      * **Karnataka Board of Wakf v. Government of India (2004) 10 SCC 779:** Government land needs 30 years adverse possession.
    ', 'Limitation Act 1963 s.27 & Art. 65', '{"kb_id":"kb-in-civil-adverse-possession","category":"civil"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Consumer Protection Act 2019 — Rights, E-Commerce & Commissions', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Defective goods, deficient services and unfair trade practices — with District/State/National Commissions and product liability.

The Consumer Protection Act 2019 replaced the 1986 Act — covering defective goods, deficient services, unfair trade practices, misleading ads and product liability (Chapter VI). Pecuniary jurisdiction: District Commission up to ₹1 crore, State up to ₹10 crore, National above ₹10 crore. Medical services are services under the Act (IMA v. V.P. Shantha, 1995). The 2019 Act added e-commerce rules, Central Consumer Protection Authority (CCPA), and made filing easier — complaints can be filed where the complainant resides.


      * **CPA 2019 Section 2:** Definitions — consumer, defect, deficiency, e-commerce.
      * **Sections 34-58:** District, State and National Commissions and their pecuniary limits.
      * **Chapter VI:** Product liability.
    


      * **Indian Medical Assn. v. V.P. Shantha (1995) 6 SCC 651:** Medical services are services — doctors are covered by consumer law.
      * **Laxmi Engineering Works v. PSG Industrial Institute (1995) 3 SCC 583:** Business purchases for commercial use excluded from consumer protection.
    ', 'Consumer Protection Act 2019 s.2, 35, 47', '{"kb_id":"kb-in-consumer-cpa2019","category":"consumer"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('RTI Act 2005 — Filing, Exemptions & Penalties', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Every citizen can demand information from public authorities — 30-day reply, appeals, and ₹250/day penalties for defaults.

The Right to Information Act 2005 gives every citizen the right to information from public authorities — applications cost ₹10 (₹2 for BPL), with replies due in 30 days (48 hours for life and liberty). Section 8 lists exemptions (national security, privacy, cabinet papers). Appeals go to the First Appellate Authority then the Information Commission, which can fine the PIO ₹250 per day up to ₹25,000. Key rulings: answer sheets can be inspected (CBSE v. Aditya Bandopadhyay, 2011) and the Chief Justice s office is a public authority under RTI (Subhash Chandra Agarwal, 2020).


      * **RTI Section 6:** How to file — plain paper, ₹10 fee, no reasons needed.
      * **Section 8:** Exemptions from disclosure.
      * **Sections 19-20:** Appeals and penalties (₹250/day up to ₹25,000).
    


      * **CBSE v. Aditya Bandopadhyay (2011) 8 SCC 497:** Evaluated answer sheets can be inspected under RTI.
      * **CPIO, Supreme Court v. Subhash Chandra Agarwal (2020) 5 SCC 481:** CJI office is a public authority; judicial independence balanced with transparency.
    ', 'RTI Act 2005 s.2, 6, 8, 19, 20', '{"kb_id":"kb-in-consumer-rti","category":"consumer"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Motor Vehicle Accident Claims — MVA 1988 & Compensation', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'No-fault and fault-based compensation for road accident victims, with standardized heads from Pranay Sethi.

The Motor Vehicles Act 1988 provides compensation for road accident victims — Section 140 no-fault liability (₹50,000 death, ₹25,000 permanent disablement), Section 166 fault-based claims before Motor Accident Claims Tribunals, and mandatory third-party insurance. National Insurance Co. v. Pranay Sethi (2017) standardized compensation heads: loss of dependency, loss of estate, funeral expenses, consortium (spousal, parental, filial) and future prospects with fixed percentage additions by age. Hit-and-run victims get compensation from the Solatium Fund.


      * **MVA Section 140:** No-fault liability — fixed amounts without proving negligence.
      * **MVA Section 166:** Claim application to MACT within 6 months (extendable).
      * **MVA Section 147:** Compulsory third-party insurance.
    


      * **National Insurance Co. v. Pranay Sethi (2017) 16 SCC 680:** Constitution Bench standardized compensation heads and future prospects.
      * **Sarla Verma v. DTC (2009) 6 SCC 121:** Multiplier method for loss of dependency.
    ', 'Motor Vehicles Act 1988 s.166', '{"kb_id":"kb-in-consumer-mva","category":"consumer"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Medical Negligence — Jacob Mathew & Bolam Standard', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Doctors are liable for negligence, not honest errors — criminal liability requires gross negligence.

In Jacob Mathew v. State of Punjab (2005), the Supreme Court held a doctor is not criminally liable for mere error of judgment — criminal prosecution requires gross negligence (recklessness), and complaints should be screened by a competent doctor before prosecution. The civil standard follows the Bolam test modified in India: negligence if the doctor did not act as a reasonably competent practitioner of the same field would. Kusum Sharma v. Batra Hospital (2010) held medical professionals are not liable merely because treatment failed — the standard is the ordinary skill of an ordinary competent doctor.


      * **CPA 2019 Section 2(11):** Deficiency in service covers medical negligence.
      * **IPC 304A (BNS 106):** Causing death by negligence — criminal route.
    


      * **Jacob Mathew v. State of Punjab (2005) 6 SCC 1:** Criminal liability only for gross negligence; expert screening first.
      * **Kusum Sharma v. Batra Hospital (2010) 3 SCC 480:** Ordinary competence standard; failed treatment is not negligence.
    ', 'Consumer Protection Act 2019', '{"kb_id":"kb-in-consumer-medical-negligence","category":"consumer"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Insolvency & Bankruptcy Code 2016 — CIRP & Creditors', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Time-bound insolvency resolution — 330-day deadline, moratorium, and the Committee of Creditors supremacy.

The Insolvency and Bankruptcy Code 2016 provides time-bound resolution: financial creditors (Section 7), operational creditors (Section 9) and corporate debtors (Section 10) can trigger CIRP. Section 14 imposes a moratorium on suits and asset transfers; Section 29A bars defaulters from bidding. Swiss Ribbons (2019) upheld the Code s constitutionality (financial vs. operational creditor distinction is valid), and Essar Steel (2020) held the Committee of Creditors commercial wisdom on distribution is supreme, subject to judicial review only on limited grounds. The 2019 amendment capped CIRP at 330 days including litigation.


      * **IBC Section 7:** Financial creditor application — default of ₹1 crore.
      * **Section 14:** Moratorium during CIRP.
      * **Section 29A:** Ineligibility of promoters and connected persons.
      * **Section 31:** Resolution plan approval by NCLT.
    


      * **Swiss Ribbons v. Union of India (2019) 4 SCC 17:** IBC constitutional; classification of creditors upheld.
      * **Committee of Creditors of Essar Steel v. Satish Kumar Gupta (2020) 8 SCC 531:** CoC commercial wisdom prevails in distribution.
    ', 'IBC 2016 s.7, 9, 10, 14, 29A', '{"kb_id":"kb-in-biz-ibc","category":"business"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Companies Act 2013 — Directors Duties & Corporate Governance', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Directors owe fiduciary duties; oppression and mismanagement remedies; fraud under Section 447.

The Companies Act 2013 governs incorporation, management and winding up. Section 166 codifies director duties — act in good faith, promote the company s interests, avoid conflicts, exercise due care. Sections 241-242 provide NCLT remedies for oppression and mismanagement. Section 447 defines fraud with strict punishment (6 months to 10 years + fine). Key governance requirements: independent directors, audit committees, CSR under Section 135, and the Serious Fraud Investigation Office (SFIO) for major frauds.


      * **Section 166:** Directors duties — good faith, due care, no conflict.
      * **Sections 241-242:** Oppression and mismanagement remedies.
      * **Section 135:** CSR — 2% of average net profits for qualifying companies.
      * **Section 447:** Fraud — punishable up to 10 years.
    


      * **Union of India v. R. Gandhi (2010) 11 SCC 1:** NCLT/NCLAT constitutionality — technical members with judicial safeguards.
      * **Tata Consultancy Services v. Cyrus Investments (2021) 9 SCC 449:** Oppression and mismanagement standards at NCLAT.
    ', 'Companies Act 2013 s.166, 447', '{"kb_id":"kb-in-biz-companies","category":"business"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Partnership Act 1932 & LLP Act 2008', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Partnership essentials, implied authority, dissolution, and the LLP alternative with limited liability.

A partnership (Partnership Act 1932, Section 4) is the relation between persons agreeing to share business profits — mutual agency is the true test. Section 19 defines implied authority of partners; Section 69 bars unregistered firms from suing third parties (with exceptions). Dissolution follows agreement, notice, expiry, death or insolvency (Sections 39-44). The LLP Act 2008 provides limited liability with partnership flexibility — LLPs have separate legal entity status and perpetual succession, making them the preferred structure for professional firms.


      * **Partnership Act Section 4:** Definition — persons + profit sharing + mutual agency.
      * **Section 69:** Unregistered firm cannot sue to enforce contract rights.
      * **LLP Act 2008:** Limited liability partnership — separate legal entity.
    


      * **Cox v. Hickman (1860) 8 HLC 268:** Mutual agency as the essence of partnership (followed in India).
      * **K.M. Ghosh v. State of WB? (skip).** **Santiranjan Das Gupta v. Dasuram Murzamull (2013) 9 SCC 214:** Unregistered firms cannot sue; arbitration exception.
    ', 'Indian Partnership Act 1932 s.4, 9, 19, 32', '{"kb_id":"kb-in-biz-partnership","category":"business"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Labour Law — ID Act & the Four Labour Codes 2020', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Workman definition, retrenchment rules, and the new consolidated labour codes replacing 29 old laws.

The Industrial Disputes Act 1947 protects workmen — Bangalore Water Supply (1978) gave the industry definition its widest meaning (hospitals, universities, NGOs included). Retrenchment of 100+ workers requires government permission; Section 2A allows individual workmen to raise disputes. The four Labour Codes of 2020 (Wages Code, Industrial Relations Code, Social Security Code, Occupational Safety Code) consolidate 29 old laws — universalizing minimum wages, easing retrenchment thresholds to 300 workers, and extending social security to gig workers. Implementation is phased state-wise.


      * **ID Act Section 2(s):** Workman definition — excludes managerial and supervisory roles.
      * **Section 25F:** Retrenchment conditions — notice, pay, government permission.
      * **Labour Codes 2020:** 29 laws merged into 4 codes.
    


      * **Bangalore Water Supply & Sewerage Board v. A. Rajappa (1978) 2 SCC 213:** Triple test for industry — widest meaning.
      * **State of Karnataka v. Umadevi (2006) 4 SCC 1:** Regularisation of workers — daily wagers not automatically permanent.
    ', 'Industrial Disputes Act 1947', '{"kb_id":"kb-in-biz-labour-codes","category":"business"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Cheque Bounce — Section 138 NI Act & Interim Compensation', 'statute', null, 'IN', null, null, 'https://www.indiacode.nic.in', 'India Code', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Cheque dishonour remedy — up to 2 years jail + fine; interim compensation of 20% after the 2018 amendment.

Section 138 NI Act punishes cheque dishonour for insufficiency of funds — up to 2 years imprisonment, fine up to twice the cheque amount, or both. The 2018 amendment added Section 143A (interim compensation up to 20% of the cheque amount during trial) and Section 148 (deposit of 20% pending appeal against conviction). Procedure: demand notice within 30 days of dishonour memo, complaint within 15 days of notice expiry, and the offence requires the cheque to be presented within its validity (3 months). Summary trial with a 6-month statutory target.


      * **NI Act Section 138:** Dishonour of cheque — ingredients and punishment.
      * **Sections 143A & 148:** Interim compensation of 20%.
      * **Section 142:** Complaint within one month of cause of action.
    


      * **Kusum Ingots & Alloys v. Pennar Peterson Securities (2000) 2 SCC 745:** Jurisdiction at the place of the drawee bank (later modified by 2015 amendment — place of payee bank).
      * **Meters and Instruments v. Kanchan Mehta (2018) 1 SCC 560:** Encouraged compounding and early settlement of 138 cases.
    ', 'Negotiable Instruments Act 1881 s.138, 143A, 148', '{"kb_id":"kb-in-biz-ni-act","category":"business"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('S.R. Bommai v. Union of India (1994) 3 SCC 1', 'judgment', 'Supreme Court of India', 'IN', null, 'S.R. Bommai v. Union of India, (1994) 3 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Presidents rule is judicially reviewable; secularism and federalism are basic features of the Constitution.

In S.R. Bommai v. Union of India (1994), a 9-judge Constitution Bench held: (1) a proclamation under Article 356 is judicially reviewable on grounds of malafides or irrelevance; (2) the majority must be tested on the floor of the House, not the Governor s subjective satisfaction; (3) the Assembly cannot be dissolved before parliamentary approval; and (4) dismissing a state government for failure to act against communal violence, on the ground of secularism, is unconstitutional — secularism is a basic feature. The judgment curbed the political abuse of Article 356.


      * **Article 356:** Failure of constitutional machinery in States.
      * **Article 355:** Union duty to protect States.
    


      * **S.R. Bommai (1994) 3 SCC 1:** The controlling authority on Article 356.
      * **Rameshwar Prasad v. Union of India (2006) 2 SCC 1:** Dissolution of the Bihar Assembly struck down.
    ', null, '{"kb_id":"kb-in-case-bommai","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('NALSA v. Union of India (2014) 5 SCC 438 — Transgender Rights', 'judgment', 'Supreme Court of India', 'IN', null, 'NALSA v. Union of India, (2014) 5 SCC 438', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Transgender persons are a third gender with full fundamental rights — self-identification protected.

In NALSA v. Union of India (2014), the Supreme Court recognized transgender persons as the third gender, holding that gender identity is integral to dignity under Articles 14, 15, 19 and 21 — no surgery or medical certification is required for self-identification. The Court directed reservation in education and employment and welfare measures. Parliament followed with the Transgender Persons (Protection of Rights) Act 2019, which guarantees identity certificates and anti-discrimination protection (though its certification requirement for recognition has been criticized as diluting NALSA).


      * **Articles 14, 15, 19, 21:** The rights foundation of the judgment.
      * **Transgender Persons (Protection of Rights) Act 2019:** Identity certificates, anti-discrimination.
    


      * **NALSA v. Union of India (2014) 5 SCC 438:** Third gender recognition; self-identification.
      * **Navtej Singh Johar (2018) 10 SCC 1:** Extended dignity reasoning to sexual orientation.
    ', null, '{"kb_id":"kb-in-case-nalsa","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Common Cause v. Union of India (2018) 5 SCC 1 — Passive Euthanasia', 'judgment', 'Supreme Court of India', 'IN', null, 'Common Cause v. Union of India, (2018) 5 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Passive euthanasia and living wills are legal — with strict procedural safeguards.

In Common Cause (A Registered Society) v. Union of India (2018), a 5-judge Constitution Bench legalized passive euthanasia and advance directives (living wills): a competent adult may refuse life support, and terminally ill patients may choose withdrawal of treatment under strict safeguards — certification by a medical board and judicial oversight. The Court held the right to die with dignity is part of Article 21, overruling the blanket position in Gian Kaur (1996) that passive euthanasia always needs legislation. Active euthanasia remains illegal in India.


      * **Article 21:** Right to life includes the right to die with dignity.
      * **Living will procedure:** Two medical boards + judicial magistrate approval.
    


      * **Common Cause (2018) 5 SCC 1:** Passive euthanasia + living wills legalized with safeguards.
      * **Aruna Ramachandra Shanbaug v. Union of India (2011) 4 SCC 454:** Earlier guidelines — withdrawal of life support permissible with court approval.
      * **Gian Kaur v. State of Punjab (1996) 2 SCC 648:** Section 309 (attempted suicide) constitutional — Article 21 excludes the right to die.
    ', null, '{"kb_id":"kb-in-case-common-cause","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Bachan Singh v. State of Punjab (1980) 2 SCC 684 — Death Penalty', 'judgment', 'Supreme Court of India', 'IN', null, 'Bachan Singh v. State of Punjab, (1980) 2 SCC 684', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Death penalty is constitutional but only in the rarest of rare cases — balancing aggravating and mitigating circumstances.

In Bachan Singh v. State of Punjab (1980), the Supreme Court upheld the constitutionality of the death penalty while laying down the rarest of rare doctrine: death is the exception, life imprisonment the rule, and the court must weigh aggravating circumstances (brutality, helpless victim, depravity) against mitigating ones (age, reform potential, socio-economic background). The doctrine was misapplied in Machhi Singh (1983) with category-based balancing, later restored by Santosh Kumar Bariyar (2009) and Sangeet (2013), which required individual case-by-case mitigation analysis.


      * **BNS 2023 Section 103 (IPC 302):** Death or life imprisonment for murder.
      * **CrPC/BNSS sentencing hearing:** Mandatory separate mitigation hearing.
    


      * **Bachan Singh (1980) 2 SCC 684:** Rarest of rare doctrine.
      * **Machhi Singh v. State of Punjab (1983) 3 SCC 470:** Categories of rarest of rare.
      * **Santosh Kumar Satishbhushan Bariyar v. State of Maharashtra (2009) 6 SCC 498:** Mitigating circumstances analysis restored.
    ', null, '{"kb_id":"kb-in-case-bachan-singh","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('I.R. Coelho v. State of Tamil Nadu (2007) 2 SCC 1 — Ninth Schedule', 'judgment', 'Supreme Court of India', 'IN', null, 'I.R. Coelho v. State of Tamil Nadu, (2007) 2 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Laws in the Ninth Schedule are immune no more — they can be tested against the basic structure.

In I.R. Coelho v. State of Tamil Nadu (2007), a 9-judge Constitution Bench held that laws placed in the Ninth Schedule after 24 April 1973 (the Kesavananda date) are open to judicial review — if they violate fundamental rights that form part of the basic structure, they are void. The Court held the shield of the Ninth Schedule (added by the First Amendment, 1951, to protect land reforms) cannot be used to immunize laws that damage the basic structure. The judgment preserved the balance between land reform protections and fundamental rights.


      * **Article 31B:** Validation of laws in the Ninth Schedule.
      * **Ninth Schedule:** 284+ laws listed, mostly land reforms.
    


      * **I.R. Coelho (2007) 2 SCC 1:** Post-Kesavananda Ninth Schedule laws reviewable against basic structure.
      * **Waman Rao v. Union of India (1981) 2 SCC 362:** First Amendment laws pre-1973 protected.
    ', null, '{"kb_id":"kb-in-case-icoelho","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('NJAC Judgment — Supreme Court Advocates-on-Record Assn. v. Union of India (2016) 5 SCC 1', 'judgment', 'Supreme Court of India', 'IN', null, 'Supreme Court Advocates-on-Record Assn. v. Union of India, (2016) 5 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The NJAC (99th Amendment) was struck down — judicial primacy in appointments restored.

In Supreme Court Advocates-on-Record Association v. Union of India (2016), a 5-judge Constitution Bench struck down the 99th Constitutional Amendment and the NJAC Act 2014 (4:1), holding that primacy of judges in judicial appointments is part of the basic structure — independence of the judiciary requires that the executive cannot have equal say in appointments. The collegium system was restored: SC appointments by the CJI + 4 senior judges; HC appointments by CJI + 2 senior SC judges. The judgment built on the three Judges Cases (1981, 1993, 1998).


      * **Article 124:** SC appointments — collegium consultation.
      * **Article 217:** HC appointments.
      * **99th Amendment (2014):** NJAC — STRUCK DOWN.
    


      * **NJAC judgment (2016) 5 SCC 1:** Judicial primacy in appointments is basic structure.
      * **Second Judges Case (1993) 4 SCC 441:** Collegium system created.
      * **Third Judges Case (1998) 7 SCC 739:** Collegium = CJI + 4 senior judges.
    ', null, '{"kb_id":"kb-in-case-njac","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Hussainara Khatoon v. State of Bihar (1980) 1 SCC 81 — Undertrials & Speedy Trial', 'judgment', 'Supreme Court of India', 'IN', null, 'Hussainara Khatoon v. State of Bihar, (1980) 1 SCC 81', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Speedy trial is a fundamental right; free legal aid for the poor — the PIL that freed thousands of undertrials.

Hussainara Khatoon v. Home Secretary, State of Bihar (1980) exposed lakhs of undertrials languishing in Bihar jails — many for periods longer than their maximum possible sentence. The Supreme Court held that speedy trial is a fundamental right under Article 21, that the state must provide free legal aid (Article 39A), and ordered the release of undertrials who had served more than the maximum punishment. The case founded India s legal aid movement — NALSA and the District Legal Services Authorities trace to it — and inspired the BNSS provisions on undertrial release (Section 479).


      * **Article 21:** Right to speedy trial.
      * **Article 39A:** Free legal aid.
      * **BNSS 2023 Section 479:** Release of undertrials who served half the maximum sentence (first-time offenders).
    


      * **Hussainara Khatoon (1980) 1 SCC 81:** Speedy trial + legal aid as fundamental rights.
      * **Kadra Pahadiya v. State of Bihar (1983) 2 SCC 104:** Reaffirmed the right against prolonged detention.
    ', null, '{"kb_id":"kb-in-case-hussainara","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Vineet Narain v. Union of India (1998) 1 SCC 226 — CBI Autonomy', 'judgment', 'Supreme Court of India', 'IN', null, 'Vineet Narain v. Union of India, (1998) 1 SCC 226', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'CBI and enforcement agencies must be insulated from political control — fixed tenures for directors.

In Vineet Narain v. Union of India (1998), the Supreme Court (Jain Hawala case) issued binding directions to insulate the CBI, Enforcement Directorate and Central Vigilance Commission from political interference: the CBI Director gets a minimum two-year tenure, the CVC gets statutory status (leading to the CVC Act 2003), and investigation of high-level corruption must proceed without prior sanction hindrances. The case established continuing mandamus — courts monitoring implementation of structural reforms.


      * **CVC Act 2003:** Statutory Central Vigilance Commission.
      * **DSPE Act 1946:** CBI s statutory basis.
    


      * **Vineet Narain (1998) 1 SCC 226:** CBI/ED autonomy directions.
      * **Common Cause v. Union of India (2015) 7 SCC 1:** Fixed tenure enforcement for CBI officers.
    ', null, '{"kb_id":"kb-in-case-vineet-narain","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('ADM Jabalpur v. Shivkant Shukla (1976) 2 SCC 521 — Habeas Corpus Emergency Case', 'judgment', 'Supreme Court of India', 'IN', null, 'ADM Jabalpur v. Shivkant Shukla, (1976) 2 SCC 521', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The infamous emergency ruling that Article 21 stood suspended — later repudiated; Article 21 cannot be suspended.

In ADM Jabalpur v. Shivkant Shukla (1976), a 4:1 majority held that during an emergency, the right to move courts for habeas corpus stood suspended — Justice Khanna s dissent (life and liberty cannot be surrendered) became famous. The 44th Amendment (1978) reversed the position by providing that Articles 20 and 21 cannot be suspended even during an emergency. The judgment is now universally regarded as wrongly decided — the Supreme Court in Puttaswamy (2017) observed it was a blot on the Court s record.


      * **Article 359:** Suspension of rights during emergency.
      * **44th Amendment 1978:** Articles 20-21 non-suspendable even in emergency.
    


      * **ADM Jabalpur (1976) 2 SCC 521:** Majority held habeas corpus suspended during emergency — repudiated.
      * **Justice K.S. Puttaswamy v. Union of India (2017) 10 SCC 1:** Called Jabalpur a blot; Article 21 protects against all state action.
    ', null, '{"kb_id":"kb-in-case-jabalpur","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('I.C. Golaknath v. State of Punjab (AIR 1967 SC 1643)', 'judgment', 'Supreme Court of India', 'IN', null, 'I.C. Golaknath v. State of Punjab, AIR 1967 SC 1643', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Fundamental rights cannot be amended by Parliament — the 11-judge ruling that led to the 24th Amendment and Kesavananda.

In I.C. Golaknath v. State of Punjab (1967), an 11-judge bench held (6:5) that Parliament cannot amend fundamental rights — Article 368 was not an amending power over Part III. The ruling overruled Shankari Prasad (1951) and Sajjan Singh (1965), and used prospective overruling to protect past amendments. Parliament responded with the 24th Amendment (1971), expressly empowering amendments to fundamental rights — which then became the subject of Kesavananda Bharati (1973), where the basic structure doctrine finally settled the limits.


      * **Article 368:** Amendment power — the controversy.
      * **24th Amendment 1971:** Expressly allows Part III amendments.
    


      * **I.C. Golaknath (AIR 1967 SC 1643):** Fundamental rights unamendable — overruled by Kesavananda.
      * **Shankari Prasad (AIR 1951 SC 458):** Earlier view — amendment power includes Part III.
    ', null, '{"kb_id":"kb-in-case-golaknath","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Government of NCT of Delhi v. Union of India (2023) 9 SCC 1 — Delhi Services', 'judgment', 'Supreme Court of India', 'IN', null, 'Government of NCT of Delhi v. Union of India, (2023) 9 SCC 1', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Delhi government controls services and transfers of officers — LG bound by elected governments aid and advice.

In Government of NCT of Delhi v. Union of India (2023), a 5-judge Constitution Bench held that the Delhi government has legislative and executive control over services (excluding police, public order and land) under Article 239AA — the Lieutenant Governor is bound by the aid and advice of the elected Council of Ministers, and the Union cannot appropriate executive power over transferred subjects. The judgment followed the 2018 Constitution Bench which held LG bound by council advice, and strengthened Delhi s quasi-federal status.


      * **Article 239AA:** Special provisions for the National Capital Territory of Delhi.
      * **Article 239AA(4):** Differences between LG and Ministers referred to the President.
    


      * **Government of NCT of Delhi v. Union of India (2023) 9 SCC 1:** Services under Delhi government; LG bound by aid and advice.
      * **State (NCT of Delhi) v. Union of India (2018) 8 SCC 501:** LG bound by Council of Ministers advice.
    ', null, '{"kb_id":"kb-in-case-delhi-services","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Anoop Baranwal v. Union of India (2023) 6 SCC 161 — Election Commission Appointments', 'judgment', 'Supreme Court of India', 'IN', null, 'Anoop Baranwal v. Union of India, (2023) 6 SCC 161', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'CEC and ECs must be appointed by a committee of PM, Leader of Opposition and CJI — till Parliament legislates.

In Anoop Baranwal v. Union of India (2023), a 5-judge Constitution Bench held that appointments of the Chief Election Commissioner and Election Commissioners must be made by the President on the advice of a committee comprising the Prime Minister, the Leader of the Opposition in Lok Sabha, and the Chief Justice of India — an interim measure until Parliament enacts a law under Article 324(2). The judgment was a response to the executivedominated appointment process and protected Election Commission independence. (Parliament later enacted the 2023 Act with a different committee — subject to pending review.)


      * **Article 324(2):** Appointment of CEC and ECs by the President subject to law made by Parliament.
      * **Chief Election Commissioner and other Election Commissioners (Appointment, Conditions of Service and Term of Office) Act, 2023:** Statutory framework.
    


      * **Anoop Baranwal (2023) 6 SCC 161:** PM + LoP + CJI committee for EC appointments.
      * **S.S. Dhanoa v. Union of India (1991) 3 SCC 567:** Equal status of CEC and ECs.
    ', null, '{"kb_id":"kb-in-case-anoop-baranwal","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Supriyo v. Union of India (2023 SCC OnLine SC 1348) — Same-Sex Marriage', 'judgment', 'Supreme Court of India', 'IN', null, 'Supriyo @ Supriya Chakraborty v. Union of India, 2023 SCC OnLine SC 1348', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'No fundamental right to marry for same-sex couples — but discrimination prohibited; a high-level committee on rights.

In Supriyo v. Union of India (2023), a 5-judge Constitution Bench unanimously held there is no unqualified fundamental right to marry, and declined (3:2) to judicially read same-sex unions into the Special Marriage Act — holding that was for Parliament. However, the Court unanimously held discrimination against queer persons is prohibited, recognized their right to cohabit and choose partners (protected from family/police harassment), and directed a high-level committee chaired by the Cabinet Secretary to examine entitlements (ration cards, joint accounts, succession). Civil unions were rejected by the majority as beyond judicial remit.


      * **Special Marriage Act 1954:** Heteronormative framing — not read down.
      * **Articles 14, 15, 19, 21:** Anti-discrimination protection for queer persons affirmed.
    


      * **Supriyo (2023 SCC OnLine SC 1348):** No judicial same-sex marriage; committee on practical entitlements.
      * **Navtej Singh Johar (2018) 10 SCC 1:** Sexual orientation decriminalized.
      * **Shafin Jahan (2018) 16 SCC 368:** Right to choose partner.
    ', null, '{"kb_id":"kb-in-case-supriyo","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Mohori Bibee v. Dharmodas Ghose (1903) 30 IA 114 — Minor s Contract', 'judgment', 'Supreme Court of India', 'IN', null, 'Mohori Bibee v. Dharmodas Ghose, (1903) 30 IA 114 (Privy Council)', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'A minor s agreement is void ab initio — money lent to a minor cannot be recovered, even as restitution.

In Mohori Bibee v. Dharmodas Ghose (1903), the Privy Council held that a minor s agreement is void ab initio under Section 11 of the Contract Act — the minor was not liable to refund money borrowed against a mortgage of his property, and the mortgage was void. The ruling settled Indian law: minors cannot contract, cannot ratify agreements made during minority, and are not bound by estoppel. The limited exception is the doctrine of restitution — a minor can be asked to return specific goods still in their possession (Section 64-65 application, developed in later cases).


      * **Contract Act Section 11:** Competence to contract — majority + sound mind.
      * **Specific Relief Act Section 33:** Minor agreements unenforceable.
    


      * **Mohori Bibee (1903) 30 IA 114:** Minor s agreement void ab initio; no estoppel.
      * **Leslie Ltd. v. Sheill (1914) 3 KB 607:** Minor s liability limited to restitution of existing goods.
    ', null, '{"kb_id":"kb-in-case-mohori-bibee","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Carlill v. Carbolic Smoke Ball Co. [1893] 1 QB 256 — Unilateral Contracts', 'judgment', 'Supreme Court of India', 'IN', null, 'Carlill v. Carbolic Smoke Ball Co., [1893] 1 QB 256', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'A general offer can be accepted by performance — the smoke ball case that defined unilateral contracts.

In Carlill v. Carbolic Smoke Ball Co. (1893), the company advertised a £100 reward to anyone who contracted influenza after using its smoke ball as directed, claiming £1,000 was deposited in a bank to show sincerity. Mrs. Carlill used the ball, caught influenza, and claimed the reward. The Court of Appeal held: the advertisement was a unilateral offer to the world, accepted by performance (using the ball as directed); consideration was the use of the ball; and the bank deposit showed intent to be bound. The case is taught in Indian contract law as the foundation of general offers and acceptance by conduct (Contract Act Section 8).


      * **Contract Act Section 8:** Acceptance by performing conditions of a general offer.
      * **Section 2(b):** Acceptance must be absolute and communicated — performance is communication here.
    


      * **Carlill (1893):** General offer + acceptance by conduct + unilateral contract.
      * **Lalman Shukla v. Gauri Datt (1913):** Reward can be claimed only by one who knows of the offer.
    ', null, '{"kb_id":"kb-in-case-carlill","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Donoghue v. Stevenson [1932] AC 562 — Negligence & Duty of Care', 'judgment', 'Supreme Court of India', 'IN', null, 'Donoghue v. Stevenson, [1932] AC 562', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The neighbour principle — manufacturers owe a duty of care to ultimate consumers.

In Donoghue v. Stevenson (1932), the House of Lords held that a manufacturer owes a duty of care to the ultimate consumer — Mrs. Donoghue found a decomposed snail in a bottle of ginger beer and was allowed to sue the manufacturer despite no contract. Lord Atkin s neighbour principle — you must take reasonable care to avoid acts or omissions which you can reasonably foresee would injure your neighbour — became the foundation of the modern tort of negligence, applied in India in consumer protection, product liability and medical negligence cases.


      * **Tort law:** Duty of care, breach, causation, damage.
      * **Consumer Protection Act 2019:** Product liability chapter follows the principle.
    


      * **Donoghue v. Stevenson [1932] AC 562:** Neighbour principle; manufacturer duty to consumers.
      * **Jacob Mathew v. State of Punjab (2005) 6 SCC 1:** Indian application of the negligence standard.
    ', null, '{"kb_id":"kb-in-case-donoghue","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Vishaka v. State of Rajasthan (1997) 6 SCC 241 — Workplace Harassment Guidelines', 'judgment', 'Supreme Court of India', 'IN', null, 'Vishaka v. State of Rajasthan, (1997) 6 SCC 241', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'The judgment that created binding anti-harassment guidelines — later enacted as the POSH Act 2013.

In Vishaka v. State of Rajasthan (1997), the Supreme Court — in the absence of legislation — laid down binding guidelines defining sexual harassment at the workplace and obliging every employer to prevent and redress it, using Articles 14, 19, 21 and the CEDAW convention. The guidelines (complaint committees, employer duties, preventive steps) operated as law until Parliament enacted the POSH Act 2013. Bhanwari Devi, a social worker gang-raped for preventing child marriage, was the trigger case. The judgment is the classic example of judicial legislation filling a statutory vacuum.


      * **POSH Act 2013:** Statutory successor to the Vishaka guidelines.
      * **Articles 14, 19, 21:** Equality, dignity and life — the constitutional basis.
    


      * **Vishaka (1997) 6 SCC 241:** Binding workplace harassment guidelines.
      * **Apparel Export Promotion Council v. A.K. Chopra (1999) 1 SCC 759:** Harassment need not involve physical contact.
    ', null, '{"kb_id":"kb-in-case-vishaka","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('M.C. Mehta v. Union of India (1987) 1 SCC 395 — Absolute Liability & Environment', 'judgment', 'Supreme Court of India', 'IN', null, 'M.C. Mehta v. Union of India, (1987) 1 SCC 395', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'Hazardous industries bear absolute liability — no exceptions — and the right to a clean environment is fundamental.

In M.C. Mehta v. Union of India (Oleum Gas Leak, 1987), after the Shriram chemical plant leaked oleum gas in Delhi, the Supreme Court created the doctrine of absolute liability: an enterprise engaged in hazardous activity is absolutely liable for all harm caused — with no exceptions (unlike strict liability s defences under Rylands v. Fletcher). The Court also read the right to a clean environment into Article 21. The case produced the environmental jurisprudence line: Vellore Citizens (precautionary principle, polluter pays) and Godavarman (forest protection).


      * **Environment (Protection) Act 1986:** Statutory framework post-Bhopal.
      * **Article 21:** Right to clean environment.
    


      * **M.C. Mehta (1987) 1 SCC 395:** Absolute liability for hazardous industries.
      * **Vellore Citizens Welfare Forum v. Union of India (1996) 5 SCC 647:** Precautionary principle + polluter pays.
      * **T.N. Godavarman Thirumulpad v. Union of India (1997) 2 SCC 267:** Forest conservation directions.
    ', null, '{"kb_id":"kb-in-case-mc-mehta","category":"caselaw"}'::jsonb);

  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, source_url, official_source, authority_level, verified)
  values
    ('Lily Thomas v. Union of India (2013) 7 SCC 653 — Disqualification on Conviction', 'judgment', 'Supreme Court of India', 'IN', null, 'Lily Thomas v. Union of India, (2013) 7 SCC 653', 'https://main.sci.gov.in/judgments', 'Supreme Court of India', 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, 'MPs and MLAs stand disqualified immediately upon conviction with 2+ year sentence — the 3-month shield struck down.

In Lily Thomas v. Union of India (2013), the Supreme Court struck down Section 8(4) of the Representation of the People Act 1951, which allowed convicted legislators to continue in office if they appealed within 3 months. After the ruling, an MP or MLA convicted of an offence with a sentence of 2 years or more stands disqualified immediately from the date of conviction, even if the conviction is stayed — only a stay on the conviction itself can save the seat. The companion judgment (Public Interest Foundation, 2019) directed parties to publish criminal antecedents of candidates.


      * **RPA 1951 Section 8(1)-(3):** Disqualification on conviction — 2 years or more.
      * **Section 8(4):** STRUCK DOWN by Lily Thomas.
    


      * **Lily Thomas (2013) 7 SCC 653:** Immediate disqualification on conviction.
      * **Public Interest Foundation v. Union of India (2019) 3 SCC 224:** Criminal antecedents disclosure by candidates.
    ', null, '{"kb_id":"kb-in-case-lily-thomas","category":"caselaw"}'::jsonb);

end $$;

commit;
-- ============================================================================
-- Verify: select count(*) from legal_documents;  -- expect 88
-- ============================================================================
