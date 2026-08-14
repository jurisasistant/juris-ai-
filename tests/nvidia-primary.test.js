// Groq is PRIMARY (instant), NVIDIA NIM (z-ai/glm-5.2) is the fallback.
const chat = require('/home/user/api/chat.js');
const health = require('/home/user/api/health.js');
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method: body ? 'POST' : 'GET', body, headers:{}, socket:{ remoteAddress:'10.4.4.4' } }; }

(async () => {
  delete process.env.GROQ_API_KEY;
  process.env.NVIDIA_NIM_API_KEY = 'nvtest123';

  // 1. NVIDIA-only setup (no Groq key): NVIDIA answers with z-ai/glm-5.2 + seed 42
  let nvidiaPayload = null, groqCalled = false;
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com')) { groqCalled = true; return { ok: false, status: 500, text: async () => 'x' }; }
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaPayload = JSON.parse(opts.body);
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA answer' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const res = makeRes();
  await chat(makeReq({ message: 'hello', intent: 'casual' }), res);
  const out = JSON.parse(res.body);
  t('nvidia-only: NVIDIA used, Groq untouched', nvidiaPayload !== null && groqCalled === false);
  t('nvidia-only: model z-ai/glm-5.2', nvidiaPayload.model === 'z-ai/glm-5.2');
  t('nvidia-only: seed 42 sent', nvidiaPayload.seed === 42);
  t('nvidia-only: provider reported', out.provider === 'nvidia');

  // 2. Both keys → GROQ hit FIRST (primary now), NVIDIA untouched
  process.env.GROQ_API_KEY = 'test_groq_key';
  nvidiaPayload = null; groqCalled = false;
  let groqPayload = null;
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com')) {
      groqCalled = true;
      groqPayload = JSON.parse(opts.body);
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Groq primary answer' } }], usage: {} }) };
    }
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaPayload = JSON.parse(opts.body);
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA answer' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const res2 = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), res2);
  const out2 = JSON.parse(res2.body);
  t('both keys: GROQ primary, NVIDIA untouched', groqCalled === true && nvidiaPayload === null && out2.provider === 'groq');
  t('both keys: groq model sent', groqPayload && groqPayload.model === 'llama-3.3-70b-versatile');

  // 3. Groq down → NVIDIA fallback
  process.env.GROQ_API_KEY = 'test_groq_key';
  let nvidiaFallbackCalled = false;
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com')) return { ok: false, status: 503, text: async () => 'down' };
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaFallbackCalled = true;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA fallback answer' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const res3 = makeRes();
  await chat(makeReq({ message: 'hello', intent: 'casual' }), res3);
  const out3 = JSON.parse(res3.body);
  t('groq down → nvidia fallback', nvidiaFallbackCalled === true && out3.reply === 'NVIDIA fallback answer' && out3.provider === 'nvidia');

  // 4. Health endpoint reports GROQ as primary provider
  global.fetch = async (url) => {
    url = String(url);
    if (url.includes('api.groq.com/openai/v1/models')) return { ok: true, json: async () => ({ data: [{ id: 'groq/compound' }, { id: 'llama-3.3-70b-versatile' }] }) };
    if (url.includes('api.groq.com/openai/v1/chat/completions')) return { ok: true, json: async () => ({ choices: [{ message: { content: 'ok' } }], usage: {} }) };
    throw new Error('unexpected: ' + url);
  };
  const res4 = makeRes();
  await health(makeReq(), res4);
  const out4 = JSON.parse(res4.body);
  t('health: provider groq + connected', out4.ai === 'connected' && out4.provider === 'groq');
  t('health: model llama-3.3-70b', out4.model === 'llama-3.3-70b-versatile');

  delete process.env.NVIDIA_NIM_API_KEY;
  delete process.env.GROQ_API_KEY;
})().catch((e) => { console.error('ERR', e); process.exit(1); });
