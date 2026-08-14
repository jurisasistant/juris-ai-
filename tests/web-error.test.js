const chat = require('/home/user/api/chat.js');
process.env.GROQ_API_KEY = 'test_key_123';
const t = (n, c) => console.log((c ? 'PASS' : 'FAIL') + ' — ' + n);
function makeRes(){ return { statusCode:200, headers:{}, body:'', status(c){this.statusCode=c;return this;}, setHeader(k,v){this.headers[k]=v;}, flushHeaders(){}, end(d){if(d)this.body+=d;}, write(d){this.body+=d;}, json(o){this.body=JSON.stringify(o);return this;} }; }
function makeReq(body){ return { method:'POST', body, headers:{}, socket:{ remoteAddress:'10.1.1.1' } }; }
(async () => {
  // Groq error mid-search → error passthrough with the real message
  global.fetch = async () => ({ ok: false, status: 404, text: async () => JSON.stringify({ error: { message: 'model not found' } }) });
  let res = makeRes();
  await chat(makeReq({ message: 'who is virat kohli?', webSearch: true }), res);
  let out = JSON.parse(res.body);
  t('error passthrough: webError has Groq message', out.webError && out.webError.includes('model not found') && out.webError.includes('404'));
  t('error passthrough: no fake reply', !out.reply);

  // compound fails (404), compound-mini succeeds with sources
  let calls = 0;
  global.fetch = async (url, opts) => {
    calls++;
    const body = JSON.parse(opts.body);
    if (calls === 1) return { ok: false, status: 404, text: async () => JSON.stringify({ error: { message: 'model not found' } }) };
    return { ok: true, json: async () => ({
      choices: [{ message: { content: 'Kohli is a cricketer.', executed_tools: [{ search_results: { results: [{ title: 'Kohli', url: 'https://news.example/kohli', content: 'x', score: 0.9 }] } }] } }]
    }) };
  };
  res = makeRes();
  await chat(makeReq({ message: 'who is virat kohli?', webSearch: true }), res);
  out = JSON.parse(res.body);
  t('compound-mini fallback works', out.webSearched === true && out.webSources.length === 1 && out.reply.includes('Kohli'));

  // compound answers but returns NO sources → searched=false (client will refuse)
  calls = 0;
  global.fetch = async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: 'I believe Kohli plays cricket.', executed_tools: [] } }] }) });
  res = makeRes();
  await chat(makeReq({ message: 'who is virat kohli?', webSearch: true }), res);
  out = JSON.parse(res.body);
  t('no sources → webSearched false', out.webSearched === false && out.webSources.length === 0);
})().catch((e) => { console.error('ERR', e); process.exit(1); });
