// Provider cooldown: after NVIDIA times out once, subsequent requests skip
// straight to Groq (instant), and NVIDIA is re-tried after the cooldown.
const chat = require('/home/user/api/chat.js');
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method:'POST', body, headers:{}, socket:{ remoteAddress:'10.5.5.5' } }; }

(async () => {
  // Groq is PRIMARY. Cooldown protects the FALLBACK providers from repeat
  // timeouts: a failing NVIDIA is skipped for 3 minutes, then re-tried.
  process.env.NVIDIA_NIM_API_KEY = 'nvtest123';
  process.env.GROQ_API_KEY = 'grok123';
  let nvidiaCalls = 0, groqCalls = 0;

  // Scenario A: Groq healthy → NVIDIA (fallback) never even attempted
  global.fetch = async (url) => {
    url = String(url);
    if (url.includes('integrate.api.nvidia.com')) { nvidiaCalls++; throw new Error('unexpected'); }
    if (url.includes('api.groq.com')) {
      groqCalls++;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Groq answers fast' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const resA = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), resA);
  const outA = JSON.parse(resA.body);
  t('groq healthy → groq used, nvidia untouched', outA.provider === 'groq' && groqCalls === 1 && nvidiaCalls === 0);

  // Scenario B: Groq fails → NVIDIA fails once (timeout) → gets cooldown
  nvidiaCalls = 0; groqCalls = 0;
  global.fetch = async (url) => {
    url = String(url);
    if (url.includes('api.groq.com')) { groqCalls++; return { ok: false, status: 503, text: async () => 'down' }; }
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaCalls++;
      throw new Error('The operation was aborted due to timeout'); // simulated hang
    }
    throw new Error('unexpected: ' + url);
  };
  const resB = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), resB);
  t('groq down → nvidia attempted + fails', groqCalls === 1 && nvidiaCalls === 1 && resB.statusCode === 503);

  // Scenario C (same instance): both providers are now in cooldown
  // (Groq's 503 and NVIDIA's timeout both triggered it) → the request fails
  // FAST with 503 and neither provider is called again in this window.
  const resC = makeRes();
  await chat(makeReq({ message: 'hi again', intent: 'casual' }), resC);
  t('cooldown: both providers skipped, instant 503', nvidiaCalls === 1 && groqCalls === 1 && resC.statusCode === 503);

  delete process.env.NVIDIA_NIM_API_KEY;
  delete process.env.GROQ_API_KEY;
})().catch((e) => { console.error('ERR', e); process.exit(1); });
