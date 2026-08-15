// Conversation memory: device-id generation + Supabase RPC sync.
const fs = require('fs');
const vm = require('vm');
let src = fs.readFileSync('app.js', 'utf8');
const calls = [];
const sb = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  fetch: async (url, opts) => {
    calls.push({ url: String(url), body: JSON.parse(opts.body) });
    return { ok: true, status: 200, json: async () => ({}) };
  },
  localStorage: { _d:{}, getItem(k){ return this._d[k] ?? null; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } },
  document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {},
    createElement: () => ({ style:{}, classList:{add(){},remove(){},toggle(){}}, appendChild(){}, setAttribute(){}, addEventListener(){}, innerHTML:'' }),
    body: { appendChild(){}, classList:{add(){},remove(){},toggle(){}} } },
  window: {}, navigator: {}, location: { href: 'http://localhost' }, speechSynthesis: { cancel(){}, getVoices: () => [] },
  alert: () => {}, confirm: () => true, TextDecoder,
};
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(src, sb);
vm.runInContext('globalThis.__api = { getDeviceId, syncExchangeToSupabase, smartConversationTitle, isSupabaseConfigured };', sb);
const api = sb.__api;
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);

(async () => {
  t('device id: stable across calls', api.getDeviceId() === api.getDeviceId());
  t('device id: dev_ prefix + length >= 16', /^dev_.{12,}$/.test(api.getDeviceId()));
  t('supabase configured (real creds shipped)', api.isSupabaseConfigured() === true);

  calls.length = 0;
  await api.syncExchangeToSupabase('What is Article 21?', 'Article 21 protects life.', 'legal', 'HIGH');
  await new Promise((r) => setTimeout(r, 50));
  t('sync: two RPC calls (user + assistant)', calls.length === 2);
  t('sync: correct function', calls.every((c) => c.url.includes('/rpc/save_conversation')));
  t('sync: user role saved', calls[0].body.p_role === 'user');
  t('sync: assistant role + evidence saved', calls[1].body.p_role === 'assistant' && calls[1].body.p_evidence_level === 'HIGH');
  t('sync: title is smart title', calls[0].body.p_title === 'Article 21 Research');
  t('sync: content preserved', calls[1].body.p_content === 'Article 21 protects life.');
})().catch((e) => { console.error('ERR', e); process.exit(1); });
