// Verifies: when streaming is requested but the provider returns no readable
// body, /api/chat falls through to a normal JSON completion (never an empty
// stream), and reports the provider used.
const chat = require('/home/user/api/chat.js');
process.env.GROQ_API_KEY = 'test_key_123';
delete process.env.NVIDIA_NIM_API_KEY;
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method:'POST', body, headers:{}, socket:{ remoteAddress:'10.3.3.3' } }; }

(async () => {
  // Scenario 1: stream:true but provider body missing → JSON fallback reply
  global.fetch = async (url, opts) => {
    const payload = JSON.parse(opts.body);
    if (payload.stream) {
      return { ok: true, body: null }; // no readable body (hosting quirk)
    }
    return { ok: true, json: async () => ({ choices: [{ message: { content: 'fallback JSON reply works' } }], usage: {} }) }; // fresh non-stream request
  };
  const res = makeRes();
  await chat(makeReq({ message: 'what is article 21?', intent: 'legal', stream: true }), res);
  const out = JSON.parse(res.body);
  t('stream body missing → JSON fallback reply', out.reply === 'fallback JSON reply works');
  t('stream body missing → provider reported', out.provider === 'groq');
  t('stream body missing → model reported', !!out.model);

  // Scenario 2: Groq 503 → all providers fail → 503 with friendly error
  global.fetch = async () => ({ ok: false, status: 503, text: async () => 'down' });
  const res2 = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), res2);
  t('all providers fail → 503 friendly', res2.statusCode === 503 && JSON.parse(res2.body).error === 'All AI providers failed');

  // Scenario 3: NVIDIA fallback when Groq fails and NVIDIA key present
  process.env.GROQ_API_KEY = 'bad_groq_key';
  process.env.NVIDIA_NIM_API_KEY = 'nvtest123';
  let nvidiaCalled = false;
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com')) return { ok: false, status: 401, text: async () => 'invalid' };
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaCalled = true;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA answer' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const res3 = makeRes();
  await chat(makeReq({ message: 'hello', intent: 'casual' }), res3);
  const out3 = JSON.parse(res3.body);
  t('groq fails → NVIDIA fallback used', nvidiaCalled === true && out3.reply === 'NVIDIA answer');
  t('provider reported as nvidia', out3.provider === 'nvidia');
  delete process.env.NVIDIA_NIM_API_KEY;
  process.env.GROQ_API_KEY = 'test_key_123';
})().catch((e) => { console.error('ERR', e); process.exit(1); });
