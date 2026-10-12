import { spawn } from 'child_process';
import fs from 'fs';

const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const browserPath = candidates.find((p) => fs.existsSync(p));
if (!browserPath) throw new Error('no chrome/edge found');
const port = 9343;
const previewPort = 4173;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const preview = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--port', String(previewPort), '--strictPort', '--host', '127.0.0.1'],
  { cwd: process.cwd(), stdio: 'ignore' }
);

const edge = spawn(browserPath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,900',
  '--user-data-dir=' + process.cwd() + '\\scratch\\edge-profile-measure',
  `http://127.0.0.1:${previewPort}/`,
]);

async function waitFor(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (res.ok) return true;
    } catch {}
    await sleep(300);
  }
  return false;
}

async function run() {
  const up = await waitFor(`http://127.0.0.1:${previewPort}/`);
  if (!up) {
    console.error('preview server did not come up');
    return;
  }

  const ok = await waitFor(`http://127.0.0.1:${port}/json/version`);
  if (!ok) {
    console.error('CDP did not come up');
    return;
  }

  await sleep(2500);
  const pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  const page = pages.find((p) => p.type === 'page');
  if (!page?.webSocketDebuggerUrl) {
    console.error('no page', pages);
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  await new Promise((r) => (ws.onopen = r));
  await send('Page.enable');
  await send('Runtime.enable');

  await sleep(2500);

  const expr = `
    (async () => {
      try { await document.fonts.ready; } catch {}
      const vw = window.innerWidth, vh = window.innerHeight;
      const words = [...document.querySelectorAll('.word-layer')].map((el) => ({
        cls: el.className,
        w: el.offsetWidth,
        h: el.offsetHeight,
        fs: getComputedStyle(el).fontSize,
      }));
      const frogs = [...document.querySelectorAll('.word-frog')].map((el) => ({
        cls: el.className, w: el.offsetWidth, h: el.offsetHeight,
      }));
      return { vw, vh, words, frogs };
    })()
  `;
  const res = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  console.log(JSON.stringify(res?.result?.result?.value, null, 2));

  ws.close();
  edge.kill();
  preview.kill();
}

run()
  .catch((e) => {
    console.error(e);
    try { edge.kill(); } catch {}
    try { preview.kill(); } catch {}
  })
  .finally(() => {
    setTimeout(() => {
      try { edge.kill(); } catch {}
      try { preview.kill(); } catch {}
      process.exit(0);
    }, 500);
  });
