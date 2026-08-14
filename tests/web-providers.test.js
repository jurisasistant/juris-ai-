const chat = require('/home/user/api/chat.js');
process.env.GROQ_API_KEY = 'test_key_123';
delete process.env.BRAVE_API_KEY;
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method:'POST', body, headers:{}, socket:{ remoteAddress:'10.2.2.2' } }; }

(async () => {
  // ===== Scenario: compound 413 (plan gate) → mini 413 → brave skipped → WIKIPEDIA WORKS =====
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com') && JSON.parse(opts.body).model === 'groq/compound') {
      return { ok: false, status: 413, text: async () => JSON.stringify({ error: { message: 'Request Entity Too Large' } }) };
    }
    if (url.includes('api.groq.com') && JSON.parse(opts.body).model === 'groq/compound-mini') {
      return { ok: false, status: 413, text: async () => JSON.stringify({ error: { message: 'Request Entity Too Large' } }) };
    }
    if (url.includes('wikipedia.org/w/rest.php/v1/search/title')) {
      return { ok: true, json: async () => ({ pages: [{ id: 1, key: 'Virat_Kohli', title: 'Virat Kohli', excerpt: 'Indian cricketer...' }] }) };
    }
    if (url.includes('wikipedia.org/w/rest.php/v1/page/summary')) {
      return { ok: true, json: async () => ({ title: 'Virat Kohli', extract: 'Virat Kohli is an Indian international cricketer who plays for Royal Challengers Bengaluru.', content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Virat_Kohli' } } }) };
    }
    if (url.includes('api.groq.com')) {
      // grounded generation call (llama)
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Virat Kohli is an Indian international cricketer who plays for Royal Challengers Bengaluru.' } }] }) };
    }
    throw new Error('unexpected fetch: ' + url);
  };
  const res = makeRes();
  await chat(makeReq({ message: 'who is Virat Kohli?', webSearch: true, language: 'en' }), res);
  const out = JSON.parse(res.body);
  t('cascade: falls through to Wikipedia', out.webSearched === true);
  t('cascade: real Wikipedia source URL', out.webSources[0].url === 'https://en.wikipedia.org/wiki/Virat_Kohli');
  t('cascade: grounded reply', out.reply.includes('Royal Challengers'));
  t('cascade: provider = wikipedia', out.webProvider === 'wikipedia');

  // ===== Scenario: everything fails → honest refusal with last error =====
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com') && JSON.parse(opts.body).model === 'groq/compound') {
      return { ok: false, status: 413, text: async () => JSON.stringify({ error: { message: 'Request Entity Too Large' } }) };
    }
    if (url.includes('api.groq.com') && JSON.parse(opts.body).model === 'groq/compound-mini') {
      return { ok: false, status: 413, text: async () => JSON.stringify({ error: { message: 'Request Entity Too Large' } }) };
    }
    if (url.includes('wikipedia.org')) {
      return { ok: false, status: 503, text: async () => 'down' };
    }
    throw new Error('unexpected: ' + url);
  };
  const res2 = makeRes();
  await chat(makeReq({ message: 'who won yesterdays match?', webSearch: true }), res2);
  const out2 = JSON.parse(res2.body);
  t('all fail → webSearched false', out2.webSearched === false);
  t('all fail → error surfaced', out2.webError && out2.webError.includes('Wikipedia'));
  t('all fail → no fake reply', !out2.reply);
})().catch((e) => { console.error('ERR', e); process.exit(1); });
