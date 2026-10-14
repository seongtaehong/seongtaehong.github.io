// Run from repo root with the site on :3000 and Chromium remote debugging on :9333.
import fs from 'node:fs';
import assert from 'node:assert/strict';
fs.mkdirSync('.omx/evidence/research-integration', { recursive: true });
const pages=await (await fetch('http://127.0.0.1:9333/json/list')).json();
const page=pages.find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let id=0;const pending=new Map();const exceptions=[];
ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params)};
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
await call('Page.enable');await call('Runtime.enable');
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'dark'}]});
await call('Page.addScriptToEvaluateOnNewDocument',{source:`localStorage.setItem('theme-storage',JSON.stringify({state:{theme:'dark'},version:0}));`});
for(const [name,width,height] of [['desktop',1280,900],['mobile',390,844]]){
 await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'http://127.0.0.1:3000/'});
 await new Promise(r=>setTimeout(r,2000));
 const result=await evaluate(`({dark:document.documentElement.classList.contains('dark'),theme:document.documentElement.dataset.theme,scheme:getComputedStyle(document.documentElement).colorScheme,background:getComputedStyle(document.body).backgroundColor,overflow:document.documentElement.scrollWidth>innerWidth,themeButtons:[...document.querySelectorAll('button')].filter(b=>/theme|light mode|dark mode/i.test(b.getAttribute('aria-label')||'')).length})`);
 assert.equal(result.dark,false);assert.equal(result.theme,'light');assert.equal(result.scheme,'light');assert.equal(result.overflow,false);assert.equal(result.themeButtons,0);
 const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 fs.writeFileSync(`.omx/evidence/research-integration/${name}-light.png`,Buffer.from(shot.data,'base64'));
 console.log(name,result);
}
assert.equal(exceptions.length,0);ws.close();
