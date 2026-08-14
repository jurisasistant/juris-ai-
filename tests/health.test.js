const health = require('/home/user/api/health.js');
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(){ return { method:'GET', headers:{}, socket:{ remoteAddress:'1.1.1.1' } }; }
(async () => {
  // missing key
  const old = process.env.GROQ_API_KEY;
  delete process.env.GROQ_API_KEY;
  let res = makeRes();
  await health(makeReq(), res);
  t('missing key → ai:missing_key', JSON.parse(res.body).ai === 'missing_key');
  process.env.GROQ_API_KEY = 'test';

  // valid key WITH compound
  global.fetch = async () => ({ ok: true, json: async () => ({ data: [{ id: 'groq/compound' }, { id: 'llama-3.3-70b-versatile' }] }) });
  res = makeRes();
  await health(makeReq(), res);
  t('key + compound → connected', JSON.parse(res.body).ai === 'connected');

  // valid key WITHOUT compound
  global.fetch = async () => ({ ok: true, json: async () => ({ data: [{ id: 'llama-3.3-70b-versatile' }] }) });
  res = makeRes();
  await health(makeReq(), res);
  t('key but no compound → connected_no_compound', JSON.parse(res.body).ai === 'connected_no_compound');

  // invalid key
  global.fetch = async () => ({ ok: false, status: 401 });
  res = makeRes();
  await health(makeReq(), res);
  t('invalid key → invalid_key', JSON.parse(res.body).ai === 'invalid_key');

  // network failure → connected_unverified
  global.fetch = async () => { throw new Error('net'); };
  res = makeRes();
  await health(makeReq(), res);
  t('network fail → connected_unverified', JSON.parse(res.body).ai === 'connected_unverified');

  if (old) process.env.GROQ_API_KEY = old;
})().catch((e) => { console.error('ERR', e); process.exit(1); });
