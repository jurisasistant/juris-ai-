// Provider cooldown: after NVIDIA times out once, subsequent requests skip
// straight to Groq (instant), and NVIDIA is re-tried after the cooldown.
const chat = require('/home/user/api/chat.js');
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method:'POST', body, headers:{}, socket:{ remoteAddress:'10.5.5.5' } }; }

(async () => {
  process.env.NVIDIA_NIM_API_KEY = 'nvtest123';
  process.env.GROQ_API_KEY = 'grok123';
  let nvidiaCalls = 0, groqCalls = 0;
  // NVIDIA always "hangs" (AbortSignal will fire since fetch never resolves — we simulate by hanging until signal)
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaCalls++;
      // Simulate a hang that only ends when the caller's signal aborts
      return new Promise((resolve, reject) => {
        const sig = opts && opts.signal;
        if (sig && sig.aborted) return reject(new Error('aborted'));
        const onAbort = () => { reject(new Error('The operation was aborted due to timeout')); };
        sig && sig.addEventListener('abort', onAbort, { once: true });
      });
    }
    if (url.includes('api.groq.com')) {
      groqCalls++;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Groq answers fast' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };

  // Request 1: NVIDIA hangs → timeout (2s in this test? no — uses 20s real).
  // To keep the test fast, we patch the timeout via env-free trick: skip.
  // Instead assert the cooldown logic by using a SHORT hang: reject immediately.
  global.fetch = async (url, opts) => {
    url = String(url);
    if (url.includes('integrate.api.nvidia.com')) {
      nvidiaCalls++;
      if (nvidiaCalls === 1) throw new Error('The operation was aborted due to timeout'); // first attempt fails fast
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'NVIDIA recovered' } }], usage: {} }) };
    }
    if (url.includes('api.groq.com')) {
      groqCalls++;
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'Groq answers fast' } }], usage: {} }) };
    }
    throw new Error('unexpected: ' + url);
  };

  const res1 = makeRes();
  await chat(makeReq({ message: 'hi', intent: 'casual' }), res1);
  const out1 = JSON.parse(res1.body);
  t('req1: nvidia fails → groq used', out1.provider === 'groq' && groqCalls === 1);

  // Request 2 (immediately): NVIDIA is in cooldown → Groq direct, NO nvidia call
  const res2 = makeRes();
  await chat(makeReq({ message: 'hi again', intent: 'casual' }), res2);
  const out2 = JSON.parse(res2.body);
  t('req2: nvidia skipped (cooldown)', nvidiaCalls === 1 && out2.provider === 'groq');
  t('req2: instant groq answer', out2.reply === 'Groq answers fast');

  delete process.env.NVIDIA_NIM_API_KEY;
  delete process.env.GROQ_API_KEY;
})().catch((e) => { console.error('ERR', e); process.exit(1); });
