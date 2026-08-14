const fs = require('fs');
const vm = require('vm');

// ---- Realistic minimal DOM mock ----
function makeEl(id) {
  return {
    id, style: {}, classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    setAttribute(){}, getAttribute(){ return null; }, appendChild(){}, removeChild(){},
    addEventListener(){}, removeEventListener(){}, focus(){},
    innerHTML: '', textContent: '', value: '',
    querySelector(){ return makeEl(); }, querySelectorAll(){ return []; },
    closest(){ return makeEl('bubble'); },
    scrollTop: 0, scrollHeight: 0, clientHeight: 0,
    disabled: false, click(){},
    parentNode: null
  };
}
const elMap = {};
const byId = (id) => (elMap[id] || (elMap[id] = makeEl(id)));
const documentStub = {
  _listeners: {},
  documentElement: makeEl('html'),
  getElementById: byId,
  querySelector: (sel) => makeEl('q:' + sel),
  querySelectorAll: (sel) => [],
  addEventListener(t, cb) { this._listeners[t] = cb; },
  createElement(tag) { return makeEl('new-' + tag); },
  body: makeEl('body'),
  title: ''
};
const listeners = [];
documentStub.addEventListener = function (t, cb) { listeners.push({ t, cb }); };
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  fetch: async () => ({ ok: true, status: 200, json: async () => ({ reply: 'TEST REPLY OK' }), headers: { get: () => 'application/json' }, body: null }),
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  localStorage: { _d:{}, getItem(k){ return this._d[k] ?? null; }, setItem(k,v){ this._d[k]=String(v); }, removeItem(k){ delete this._d[k]; } },
  document: documentStub,
  window: {}, navigator: { clipboard: { writeText: async () => {} } }, location: { href: 'http://localhost' },
  speechSynthesis: { cancel(){}, getVoices: () => [] },
  alert: () => {}, confirm: () => true, TextDecoder, AbortController,
  MutationObserver: function(){ return { observe(){}, disconnect(){} }; }
};
sandbox.window = sandbox; sandbox.globalThis = sandbox;
vm.createContext(sandbox);
try {
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), sandbox, { filename: 'app.js' });
  console.log('PASS — app.js loads in DOM context');
} catch (e) {
  console.log('LOAD ERROR:', e.message);
  process.exit(1);
}

// ---- Fire DOMContentLoaded ----
try {
  listeners.forEach((l) => { if (l.t === 'DOMContentLoaded') l.cb(); });
  console.log('PASS — DOMContentLoaded init ran without throwing');
} catch (e) {
  console.log('INIT ERROR:', e.stack ? e.stack.split('\n').slice(0,4).join('\n') : e.message);
  process.exit(1);
}

// ---- Simulate sending a message ----
(async () => {
  try {
    vm.runInContext('globalThis.__sendP = sendChatMessage("What is Article 21?");', sandbox);
    await sandbox.__sendP;
    console.log('PASS — sendChatMessage(legal) resolved without throwing');
  } catch (e) {
    console.log('SEND ERROR (legal):', e.stack ? e.stack.split('\n').slice(0,5).join('\n') : e.message);
    process.exit(1);
  }
  try {
    vm.runInContext('globalThis.__sendP2 = sendChatMessage("hello there");', sandbox);
    await sandbox.__sendP2;
    console.log('PASS — sendChatMessage(casual) resolved');
  } catch (e) {
    console.log('SEND ERROR (casual):', e.message);
    process.exit(1);
  }
  try {
    vm.runInContext('globalThis.__sendP3 = sendChatMessage("who is Virat Kohli?");', sandbox);
    await sandbox.__sendP3;
    console.log('PASS — sendChatMessage(web) resolved');
  } catch (e) {
    console.log('SEND ERROR (web):', e.message);
    process.exit(1);
  }
  console.log('ALL DOM FLOW TESTS DONE');
})();
