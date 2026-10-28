import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9400 + Math.floor(Math.random() * 100);

const chrome = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--enable-webgl',
  '--window-size=1440,900',
  '--user-data-dir=/tmp/chrome-test-profile-' + Date.now(),
  'http://localhost:5173/'
]);

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  let res = null;
  for (let attempt = 0; attempt < 10; attempt++) {
    await sleep(600);
    try {
      res = await fetch(`http://127.0.0.1:${port}/json`);
      if (res.ok) break;
    } catch (e) {}
  }
  if (!res) {
    console.error('Could not connect to Chrome');
    chrome.kill();
    return;
  }
  const pages = await res.json();
  const page = pages.find((p) => p.type === 'page');

  if (!page || !page.webSocketDebuggerUrl) {
    console.error('No page found');
    chrome.kill();
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      const text = data.params.args.map(a => a.value !== undefined ? a.value : a.description).join(' ');
      console.log('[BROWSER]', text);
    }
    if (data.method === 'Runtime.exceptionThrown') {
      console.error('[EXCEPTION]', data.params.exceptionDetails);
    }
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  await send('Runtime.enable');
  await send('Page.enable');

  // Evaluate state in browser
  for (let i = 0; i < 15; i++) {
    await sleep(500);
    const evalRes = await send('Runtime.evaluate', {
      expression: '(() => {\n' +
        '  const frog = document.querySelector(".word-frog-haulo");\n' +
        '  const shadow = document.querySelector(".frog-floor-shadow");\n' +
        '  const canvas = document.querySelector("canvas");\n' +
        '  return {\n' +
        '    url: window.location.href,\n' +
        '    title: document.title,\n' +
        '    bodyLen: document.body ? document.body.innerHTML.length : -1,\n' +
        '    frog: frog ? { w: frog.offsetWidth, h: frog.offsetHeight, rect: frog.getBoundingClientRect() } : null,\n' +
        '    shadow: shadow ? { rect: shadow.getBoundingClientRect() } : null,\n' +
        '    canvas: canvas ? { w: canvas.offsetWidth, h: canvas.offsetHeight, rect: canvas.getBoundingClientRect() } : null\n' +
        '  };\n' +
        '})()',
      returnByValue: true
    });
    console.log(`Poll ${i}:`, JSON.stringify(evalRes));
    if (evalRes?.result?.value?.frog) {
      await sleep(1500);
      break;
    }
  }

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  if (shot.result && shot.result.data) {
    fs.writeFileSync('/Users/admin/HAULO-NOOMO-HERO-PAGE/scratch/actual_hero.png', Buffer.from(shot.result.data, 'base64'));
    console.log('SUCCESS_CAPTURED');
  }

  chrome.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  chrome.kill();
  process.exit(1);
});
