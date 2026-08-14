// NVIDIA NIM is now the PRIMARY provider (z-ai/glm-5.2), Groq is fallback.
const chat = require('/home/user/api/chat.js');
const health = require('/home/user/api/health.js');
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method: body ? 'POST' : 'GET', body, headers:{}, socket:{ remoteAddress:'10.4.4.4' } }; }

(async () => {
  delete process.env.GROQ_API_KEY;
  process.env.NVIDIA_NIM_API_KEY = 'nvtest123';

  // 1. NVIDIA-only: request hits NVIDIA with z-ai/glm-5.2 + seed 42
  let nvidiaPayload = null, groqCalled = false;
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('api.groq.com')) { groqCalled = true; return { ok: false, status: 500, text: async () => 'x' }; }
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaPayload = JSON.parse(opts.body);
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA primary answer' } }], usage: {} }) };
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

  // 2. Both keys → NVIDIA hit FIRST
  process.env.GROQ_API_KEY = 'test_groq_key';
  nvidiaPayload = null; groqCalled = false;
  const res2 = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), res2);
  const out2 = JSON.parse(res2.body);
  t('both keys: NVIDIA primary', nvidiaPayload !== null && groqCalled === false && out2.provider === 'nvidia');

  // 3. NVIDIA down → Groq fallback
  process.env.GROQ_API_KEY = 'test_groq_key';
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('integrate.api.nvidia.com')) return { ok: false, status: 503, text: async () => 'down' };
    if (url.includes('api.groq.com')) {
      groqCalled = true;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Groq fallback answer' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };
  const res3 = makeRes();
  await chat(makeReq({ message: 'hello', intent: 'casual' }), res3);
  const out3 = JSON.parse(res3.body);
  t('nvidia down → groq fallback', groqCalled === true && out3.reply === 'Groq fallback answer' && out3.provider === 'groq');

  // 4. Health endpoint reports NVIDIA as provider
  global.fetch = async (url) => {
    url = String(url);
    if (url.includes('integrate.api.nvidia.com/v1/models')) return { ok: true, json: async () => ({ data: [{ id: 'z-ai/glm-5.2' }] }) };
    throw new Error('unexpected: ' + url);
  };
  const res4 = makeRes();
  await health(makeReq(), res4);
  const out4 = JSON.parse(res4.body);
  t('health: provider nvidia + connected', out4.ai === 'connected' && out4.provider === 'nvidia');
  t('health: model z-ai/glm-5.2', out4.model === 'z-ai/glm-5.2');

  delete process.env.NVIDIA_NIM_API_KEY;
  delete process.env.GROQ_API_KEY;
})().catch((e) => { console.error('ERR', e); process.exit(1); });
