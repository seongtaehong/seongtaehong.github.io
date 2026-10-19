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
const results=[];
const pause=()=>new Promise(r=>setTimeout(r,100));
async function waitFor(expression){for(let i=0;i<200;i++){if(await evaluate(expression))return;await pause();}throw Error('Timed out: '+expression);}
for(const [name,width,height] of [['desktop',1280,1000],['mobile',390,844]]){
 await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'http://127.0.0.1:3000/'});
 await waitFor(`!!document.querySelector('#research-panel .research-paper-title')`);
 await evaluate(`document.fonts.ready`);
 assert.equal(await evaluate(`document.querySelector('.research-philosophy').textContent.trim()`),fs.readFileSync('content/research.md','utf8').replaceAll('**','').trim());
 assert.equal(await evaluate(`document.querySelectorAll('#research-title').length`),1);
 assert.ok(await evaluate(`document.querySelectorAll('#research-panel .research-paper-title')[1].textContent.includes('Improving semantic proximity')`));
 assert.equal(await evaluate(`document.querySelector('#research-tab-transfer').textContent`),'Multilingual');
 assert.equal(await evaluate(`document.querySelectorAll('.research-directions-title').length`),0);
 assert.ok(await evaluate(`!!([...document.querySelectorAll('h2')].find(h=>h.textContent==='News').compareDocumentPosition(document.querySelector('#research')) & Node.DOCUMENT_POSITION_FOLLOWING)`));
 await new Promise(r=>setTimeout(r,1000));
 assert.equal(await evaluate(`document.querySelectorAll('#publications h3').length`),33);
 assert.ok(await evaluate(`!!document.querySelector('#publications input[type=search]')`));
 // A previous text search must not silently constrain a research-topic selection.
 await evaluate(`(()=>{const input=document.querySelector('#publications input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'SemBridge');input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
 await waitFor(`document.querySelectorAll('#publications h3').length===1`);
 for(const [topic,count] of Object.entries({retrieval:11,reranking:2,generation:7,transfer:12,evaluation:5,inference:5})){
  await evaluate(`document.querySelector('#research-tab-${topic}').click()`);
  await pause();
  assert.equal(await evaluate(`document.querySelectorAll('#research-panel li').length`),2);
  await evaluate(`document.querySelector('#research .research-papers-toggle').click()`);
  await waitFor(`document.querySelectorAll('#publications h3').length===${count}`);
  assert.equal(await evaluate(`document.querySelectorAll('#publications input[type=search]').length`),0);
  await waitFor(`document.activeElement.id==='home-publications-title'`);
  assert.deepEqual(await evaluate(`(()=>{const s=getComputedStyle(document.querySelector('#publications [role=status]'));return [s.backgroundColor,s.color]})()`),['rgb(66, 122, 168)','rgb(255, 255, 255)']);
  if(topic==='retrieval'){
    await new Promise(r=>setTimeout(r,500));
    const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    fs.writeFileSync(`.omx/evidence/research-integration/${name}-topic.png`,Buffer.from(shot.data,'base64'));
  }
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
  await evaluate(`[...document.querySelectorAll('#publications button')].find(b=>b.textContent==='All publications').click()`);
  await waitFor(`document.querySelectorAll('#publications h3').length===33`);
  assert.equal(await evaluate(`document.querySelector('#publications input[type=search]').value`),'');
 }
 await evaluate(`document.querySelector('#research-tab-retrieval').focus();document.querySelector('#research-tab-retrieval').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}))`);
 await pause();assert.equal(await evaluate(`document.activeElement.id`),'research-tab-reranking');
 await evaluate(`document.querySelector('#research-tab-retrieval').click();document.querySelector('#research').scrollIntoView({block:'start'})`);
 await new Promise(r=>setTimeout(r,500));
 let shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`.omx/evidence/research-integration/${name}.png`,Buffer.from(shot.data,'base64'));
 await evaluate(`document.querySelector('#publications').scrollIntoView({block:'start'})`);
 await new Promise(r=>setTimeout(r,500));
 shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`.omx/evidence/research-integration/${name}-publications.png`,Buffer.from(shot.data,'base64'));
 results.push({name,topics:6,search:'only all; works; resets',keyboard:'pass',overflow:false});
}
assert.equal(exceptions.length,0);console.log(results);fs.writeFileSync('.omx/evidence/research-integration/verification.json',JSON.stringify(results,null,2));ws.close();
