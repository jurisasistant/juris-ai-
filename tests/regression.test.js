// ============================================================================
// JURISAI BHARAT — CONSOLIDATED REGRESSION SUITE (persistent)
// Run: node tests/regression.test.js
// Covers: intent router, casual chat, legal RAG, citation gate, claim
// verification, Hinglish/Hindi/broken-English, web routing, deterministic
// math/date tools, general channel, hallucination resistance.
// ============================================================================
const fs = require('fs');
const vm = require('vm');
const sb = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  fetch: () => Promise.reject(new Error('no network')),
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  localStorage: { _d:{}, getItem(k){ return this._d[k] ?? null; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } },
  document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {},
    createElement: () => ({ style:{}, classList:{add(){},remove(){},toggle(){}}, appendChild(){}, setAttribute(){}, addEventListener(){}, innerHTML:'' }),
    body: { appendChild(){}, classList:{add(){},remove(){},toggle(){}} } },
  window: {}, navigator: {}, location: { href: 'http://localhost' }, speechSynthesis: { cancel(){}, getVoices: () => [] },
  alert: () => {}, confirm: () => true, TextDecoder,
};
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(fs.readFileSync('app.js', 'utf8'), sb);
vm.runInContext('globalThis.__api = { classifyIntent, classifyQuery, computeEvidencePack, applyEvidenceGate, verifyAndCleanCitations, verifyClaimsAgainstEvidence, formatLegalMarkdown, detectLanguage, LegalSearchService, getCasualAIResponse, getGeneralFallbackResponse, solveMathQuery, solveTimeQuery, verifyWebLinks, buildWebSourcesSection, buildAIBubbleHTML, BHARATIYA_STATUTE_MAP, CASE_NAME_TRIGGERS, isSupabaseConfigured, supabaseSearchLegal };', sb);
const api = sb.__api;
let pass = 0, fail = 0;
const t = (n, c) => { if (c) pass++; else { fail++; console.log('FAIL — ' + n); } };

// ---- INTENT ROUTER ----
t('casual: hows your day', api.classifyIntent("how's your day?") === 'casual');
t('casual: kya kar rhe ho', api.classifyIntent('kya kar rhe ho') === 'casual');
t('casual: aaj ka din kaisa tha', api.classifyIntent('aaj ka din kaisa tha') === 'casual');
t('casual: tell me a joke', api.classifyIntent('tell me a joke') === 'casual');
t('casual: who are you', api.classifyIntent('who are you?') === 'casual');
t('legal: article 21', api.classifyIntent('What is Article 21?') === 'legal');
t('legal: BNS section', api.classifyIntent('Explain Section 103 of BNS') === 'legal');
t('legal: police arrest', api.classifyIntent('Can police arrest someone without a warrant?') === 'legal');
t('legal: hinglish bail', api.classifyIntent('jamanat kaise milegi') === 'legal');
t('legal: hinglish property', api.classifyIntent('beti ko property mein haq hai') === 'legal');
t('legal_research: ram mandir', api.classifyIntent('tell me about ram mandir case') === 'legal_research');
t('legal_research: ayodhya', api.classifyIntent('what happened in ayodhya case?') === 'legal_research');
t('legal_research: triple talaq', api.classifyIntent('triple talaq judgment') === 'legal_research');
t('legal_research: case v. pattern', api.classifyIntent('Maneka Gandhi v. Union of India') === 'legal_research');
t('legal_research: bare v pattern', api.classifyIntent('XYZ v ABC, 2023 SCC 9999') === 'legal_research');
t('drafting: legal notice', api.classifyIntent('Draft a legal notice for breach of contract') === 'drafting');

// ---- QUERY CHANNELS ----
const cq = api.classifyQuery;
t('channel: hi → CASUAL', cq('hi') === 'CASUAL');
t('channel: how are you → CASUAL', cq('how are you?') === 'CASUAL');
t('channel: article 21 → LEGAL_STATIC', cq('what is Article 21?') === 'LEGAL_STATIC');
t('channel: ram mandir → LEGAL_RESEARCH', cq('tell me about ram mandir case') === 'LEGAL_RESEARCH');
t('channel: latest bail → LEGAL_CURRENT', cq('what is the latest Supreme Court judgment on bail?') === 'LEGAL_CURRENT');
t('channel: Virat Kohli → WEB_GENERAL', cq('who is Virat Kohli?') === 'WEB_GENERAL');
t('channel: yesterday match → WEB_CURRENT', cq("who won yesterday's cricket match?") === 'WEB_CURRENT');
t('channel: latest news → WEB_CURRENT', cq('what is the latest news?') === 'WEB_CURRENT');
t('channel: photosynthesis → STATIC_GENERAL', cq('what is photosynthesis?') === 'STATIC_GENERAL');
t('channel: 15% math → MATH', cq('what is 15% of 8500') === 'MATH');
t('channel: today date → TIME', cq('what day is it today') === 'TIME');
t('channel: usd to inr → WEB_CURRENT', cq('100 usd to inr') === 'WEB_CURRENT');
t('channel: fake case → LEGAL_RESEARCH (no fabricate)', cq('Tell me about a case XYZ v ABC 2025 SCC 9999') === 'LEGAL_RESEARCH');

// ---- CITATION GATE ----
const f1 = api.verifyAndCleanCitations('XYZ v State, (2025) 7 SCC 999 held...');
t('gate: fake SCC removed', f1.removed.length === 1);
const f2 = api.verifyAndCleanCitations('See AIR 1999 SC 777 for details.');
t('gate: fake AIR removed', f2.removed.length === 1);
const r1 = api.verifyAndCleanCitations('Maneka Gandhi v. Union of India (1978) 1 SCC 248 expanded Article 21.');
t('gate: real citation kept', r1.verifiedCites.length === 1 && r1.removed.length === 0);
const r2 = api.verifyAndCleanCitations('M. Siddiq (D) Thr. Lrs. v. Mahant Suresh Das & Ors., (2020) 1 SCC 1');
t('gate: Ayodhya citation verified', r2.verifiedCites.length === 1);

// ---- EVIDENCE GATE + CLAIM VERIFICATION ----
const pk21 = api.computeEvidencePack('What is Article 21?');
t('evidence: article 21 HIGH', pk21.level === 'HIGH' && pk21.sourceCount > 0);
const pkFake = api.computeEvidencePack('Tell me about XYZ v ABC, 2023 SCC 9999');
t('evidence: fake case LOW', pkFake.level === 'LOW');
const gated = api.applyEvidenceGate('some text', pkFake);
t('gate: honest refusal', gated.includes("couldn't verify") && !gated.includes('some text'));
const pkFakeSec = api.computeEvidencePack('What is Section 777 BNS?');
t('evidence: fake section LOW', pkFakeSec.level === 'LOW');
const pkReal = api.computeEvidencePack('What is Section 103 BNS?');
t('evidence: real section matched', pkReal.level !== 'LOW');
const packOk = { level: 'HIGH', sources: [{ title: 'Maneka Gandhi v. Union of India', statutes: '(1978) 1 SCC 248', excerpt: 'Maneka Gandhi expanded Article 21 due process. Just, fair and reasonable procedure.' }] };
const vc = api.verifyClaimsAgainstEvidence('In XYZ v. State of Goa, AIR 1980 SC 555 the Court banned all strikes.\nManeka Gandhi (1978) 1 SCC 248 expanded Article 21.', packOk);
t('claims: unsupported removed', vc.unsupported === 1 && !vc.text.includes('XYZ v. State of Goa'));
t('claims: supported kept', vc.text.includes('Maneka Gandhi'));
t('adversarial: make up case gated', api.computeEvidencePack('Make up a Supreme Court case and give me its citation').level === 'LOW');
t('adversarial: assume section gated', api.computeEvidencePack('Assume Section 500 BNS exists').adversarial === true);

// ---- HINGLISH / HINDI / BROKEN ENGLISH ----
t('detect: hinglish', api.detectLanguage('jamanat kaise milegi') === 'hinglish');
t('detect: devanagari', api.detectLanguage('जमानत कैसे मिलेगी') === 'hi');
t('detect: english', api.detectLanguage('what is article 21') === 'en');
const nh = api.LegalSearchService.normalizeHinglish('beti ko property mein haq hai');
t('norm: beti → coparcenary', nh.includes('coparcenary') && nh.includes('hindu succession'));
const nh2 = api.LegalSearchService.normalizeHinglish('जमानत कैसे मिलेगी');
t('norm: जमानत → bail', nh2.includes('bail'));
const pBeti = api.computeEvidencePack(api.LegalSearchService.normalizeHinglish('beti ko property mein haq hai'));
t('retrieval: beti → hindu succession', /Hindu Succession|Coparcenary/i.test(pBeti.sources[0]?.title || ''));
const sp1 = api.LegalSearchService.correctSpelling('i want devorce from my husbend');
t('broken: devorce → divorce', sp1.text.includes('divorce') && sp1.text.includes('husband'));
const sp2 = api.LegalSearchService.correctSpelling('suprim cort judgment');
t('broken: suprim cort → supreme court', sp2.text.includes('supreme') && sp2.text.includes('court'));
const sp3 = api.LegalSearchService.correctSpelling('ram mandir case');
t('broken: clean query untouched', !sp3.changed);
const c1 = api.getCasualAIResponse('kya kar rhe ho', 'hinglish');
t('casual reply: hinglish human', c1.includes('baat kar raha') || c1.includes('baat kar rahi'));
const c2 = api.getCasualAIResponse('kaise ho', 'hinglish');
t('casual reply: kaise ho', c2.includes('theek'));
const e1 = api.LegalSearchService.extractEntities('what did Supreme Court say about Section 125 CrPC in 2024?');
t('entities: court+section+year', e1.courts.includes('Supreme Court of India') && e1.sections.includes('125') && e1.years.includes(2024));
const x1 = api.LegalSearchService.expandQuery('ram mandir case');
t('expansion: ram mandir → ayodhya', x1.some((x) => x.includes('ayodhya')));

// ---- DETERMINISTIC TOOLS ----
t('math: 15% of 8500', api.solveMathQuery('what is 15% of 8500')?.ans === 1275);
t('math: hinglish percent', api.solveMathQuery('8500 ka 15 percent kitna hoga')?.ans === 1275);
t('math: devanagari', api.solveMathQuery('८५०० का १५ प्रतिशत')?.ans === 1275);
t('math: interest', api.solveMathQuery('simple interest on 10000 at 10 percent for 2 years')?.ans === 2000);
t('math: word ops', api.solveMathQuery('6 times 7')?.ans === 42);
t('math: legal safe', api.solveMathQuery('what is article 21') === null);
t('time: today name', api.solveTimeQuery('what day is it today', 'en').includes(new Date().toLocaleDateString('en-US', { weekday: 'long' })));
t('time: hinglish', api.solveTimeQuery('aaj kaun sa din hai', 'hinglish').includes('Aaj'));

// ---- WEB SAFETY ----
const lv1 = api.verifyWebLinks('See https://main.sci.gov.in/x for details.', [{ title: 'SC', url: 'https://main.sci.gov.in/x' }]);
t('web: real link kept', lv1.removed.length === 0);
const lv2 = api.verifyWebLinks('See https://fake-site.xyz/more.', [{ title: 'SC', url: 'https://main.sci.gov.in/x' }]);
t('web: fake link stripped', lv2.removed.length === 1);
const lv3 = api.verifyWebLinks('Water is H2O see https://invented.xyz', []);
t('general: all links stripped (no search)', lv3.removed.length === 1 && !lv3.text.includes('invented'));
const wui = api.buildWebSourcesSection([{ title: '<script>x</script>', url: 'https://a.co' }]);
t('web ui: XSS escaped', !wui.includes('<script>x'));

// ---- GENERAL CHANNEL ----
t('general: capital of India', api.getGeneralFallbackResponse('what is the capital of India?').includes('New Delhi'));
t('general: unknown honest', api.getGeneralFallbackResponse('GDP of Bhutan').includes("can't answer"));

// ---- UI / RENDERING ----
const cb = api.buildAIBubbleHTML('<p>hi</p>', null, 'casual');
t('bubble: casual pure content', cb === '<p>hi</p>');
const lb = api.buildAIBubbleHTML('<p>x</p>', { level: 'HIGH', sourceCount: 2, sources: [], verifiedCites: [], removedCites: [] }, 'legal');
t('bubble: legal has tag', lb.includes('Legal Analysis'));
t('md: sanitize', !api.formatLegalMarkdown('<script>alert(1)</script>').includes('<script'));
t('md: bold+list', api.formatLegalMarkdown('**bold**\n- one').includes('<strong>bold</strong>') && api.formatLegalMarkdown('- one').includes('<li>one</li>'));

// ---- SUPABASE CONFIG ----
t('supabase: configured', api.isSupabaseConfigured() === true);

console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
