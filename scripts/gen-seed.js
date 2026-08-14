// ============================================================================
// Supabase seed generator — derives seed.sql from KNOWLEDGE_BASE_ARTICLES
// in app.js. Run: node scripts/gen-seed.js
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
vm.runInContext('globalThis.__kb = KNOWLEDGE_BASE_ARTICLES;', sb);
const kb = sb.__kb;

const esc = (s) => String(s || '').replace(/'/g, "''");
const DOC_TYPE = {
  constitution: 'constitution', criminal: 'statute', contracts: 'statute', privacy: 'statute',
  realestate: 'statute', disputes: 'statute', employment: 'statute', caselaw: 'judgment',
  family: 'statute', civil: 'statute', consumer: 'statute', business: 'statute'
};
const SRC = {
  constitution: 'https://legislative.gov.in/constitution-of-india/',
  criminal: 'https://www.indiacode.nic.in',
  caselaw: 'https://main.sci.gov.in/judgments'
};
const MONTHS = { january:1, february:2, march:3, april:4, may:5, june:6, july:7, august:8, september:9, october:10, november:11, december:12 };

function extractDate(a) {
  const hay = [a.title, a.summary, a.executiveSummary, ...(a.statutes||[])].join(' | ');
  let m = hay.match(/\b(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})\b/i);
  if (m) {
    const d = String(m[1]).padStart(2,'0'); const mo = String(MONTHS[m[2].toLowerCase()]).padStart(2,'0');
    return m[3] + '-' + mo + '-' + d;
  }
  m = hay.match(/\b(\d{2})-(\d{2})-(\d{4})\b/);
  if (m) return m[3] + '-' + m[2] + '-' + m[1];
  m = hay.match(/\b(\d{4})\b/);
  if (a.categoryCode === 'caselaw' && m) return m[1] + '-01-01';
  return null;
}
function extractBench(a) {
  const hay = [a.title, a.summary, a.executiveSummary, ...(a.statutes||[])].join(' ');
  let m = hay.match(/(\d{1,2})-judge\s+(constitution\s+)?bench/i);
  if (m) return m[0].replace(/\s+/g,' ');
  m = hay.match(/\b(4:1|3:2|5-0|4-1|6:5|9-judge|11-judge|13-judge|7-judge|5-judge|2-judge)\b/i);
  if (m) return m[1];
  return null;
}
function extractKeywords(a) {
  const hay = (a.title + ' ' + a.summary + ' ' + (a.statutes||[]).join(' ')).toLowerCase();
  const kws = [];
  ['article 21','article 14','article 19','article 32','article 226','article 356','article 368','article 25','article 30','bail','arrest','fir','writ','privacy','reservation','dowry','divorce','maintenance','adoption','contract','cheque','consumer','rti','posh','pocso','ibc','companies','labour','bns','bnss','bsa','ipc','crpc','supreme court','judgment','constitution','property','succession','guardianship','cyber','it act','euthanasia','death penalty','defamation','kidnapping','theft','dacoity','talaq','ayodhya','sabarimala','aadhaar','section 377','transgender','delhi','election commission','land acquisition','larr','compensation'].forEach((k)=>{ if (hay.includes(k) && !kws.includes(k)) kws.push(k); });
  return kws.slice(0, 8);
}

let sql = `-- ============================================================================
-- JURISAI BHARAT — SEED DATA (auto-generated from the verified legal library)
-- ${kb.length} verified authorities: Constitution, BNS/BNSS/BSA, Central Acts, SC judgments
-- Run in Supabase SQL Editor (clears + reloads). Idempotent.
-- ============================================================================
begin;

do $$
declare doc_id uuid;
begin

  delete from public.legal_chunks;
  delete from public.legal_documents;

`;
kb.forEach((a) => {
  const dtype = DOC_TYPE[a.categoryCode] || 'statute';
  const src = SRC[a.categoryCode] || 'https://www.indiacode.nic.in';
  const court = dtype === 'judgment' ? 'Supreme Court of India' : null;
  const citation = dtype === 'judgment' ? (a.statutes && a.statutes[0]) : null;
  const section = dtype === 'judgment' ? null : ((a.statutes && a.statutes[0]) || null);
  const chunk = [a.summary, a.executiveSummary, a.governingStatutes, a.landmarkPrecedents].filter(Boolean).join('\n\n');
  const jd = dtype === 'judgment' ? extractDate(a) : null;
  const bench = dtype === 'judgment' ? extractBench(a) : null;
  const kws = extractKeywords(a);
  sql += `
  insert into public.legal_documents
    (title, document_type, court, jurisdiction, judgment_date, citation, bench, keywords, source_url, official_source, authority_level, verified)
  values
    ('${esc(a.title)}', '${dtype}', ${court ? "'" + esc(court) + "'" : 'null'}, 'IN', ${jd ? "'" + jd + "'" : 'null'}, ${citation ? "'" + esc(citation) + "'" : 'null'}, ${bench ? "'" + esc(bench) + "'" : 'null'}, ARRAY[${kws.map(k => "'" + esc(k) + "'").join(',') || 'NULL'}]::text[], '${esc(src)}', ${dtype === 'judgment' ? "'Supreme Court of India'" : "'India Code'"}, 'primary', true)
  returning id into doc_id;

  insert into public.legal_chunks (document_id, chunk_text, section_number, metadata)
  values (doc_id, '${esc(chunk)}', ${section ? "'" + esc(section) + "'" : 'null'}, '{"kb_id":"${a.id}","category":"${a.categoryCode}"}'::jsonb);
`;
});

sql += `
end $$;

commit;
-- Verify: select count(*) from legal_documents;  -- expect ${kb.length}
`;

fs.writeFileSync('supabase/seed.sql', sql);
console.log('seed.sql written:', sql.length, 'bytes,', kb.length, 'authorities');
