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

const port = 9347;
const previewPort = 4179;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const preview = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--port', String(previewPort), '--strictPort', '--host', '127.0.0.1'],
  { cwd: process.cwd(), stdio: 'ignore' }
);

const browser = spawn(browserPath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,900',
  '--user-data-dir=' + process.cwd() + '\\scratch\\edge-profile-box',
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
  if (!(await waitFor(`http://127.0.0.1:${previewPort}/`))) throw new Error('preview down');
  if (!(await waitFor(`http://127.0.0.1:${port}/json/version`))) throw new Error('cdp down');

  await sleep(2500);
  const pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  const page = pages.find((p) => p.type === 'page');
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
  await sleep(2000);

  const res = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const box = document.querySelector('.next-portfolio-box');
        const scene = document.querySelector('.scene-right');
        if (!box || !scene) return { error: 'not found', box: !!box, scene: !!scene };
        const read = (label) => {
          const b = box.getBoundingClientRect();
          const s = scene.getBoundingClientRect();
          return {
            label,
            boxCy: Math.round(b.top + b.height / 2),
            sceneCy: Math.round(s.top + s.height / 2),
            delta: Math.round(b.top + b.height / 2 - (s.top + s.height / 2)),
          };
        };
        const before = read('gsap-y-set');
        const frog = document.querySelector('.next-frog-box');
        const fr = frog ? frog.getBoundingClientRect() : null;
        const inlineTransform = box.style.transform;
        const inlineTranslate = box.style.translate;
        box.style.transform = 'none';
        box.style.translate = '';
        const bare = read('inline-transform-cleared');
        box.style.transform = inlineTransform;
        box.style.translate = inlineTranslate;
        const b2 = box.getBoundingClientRect();
        const cs = getComputedStyle(box);
        return {
          vw: window.innerWidth, vh: window.innerHeight,
          before, bare,
          frog: fr ? { left: Math.round(fr.left), right: Math.round(fr.right), top: Math.round(fr.top), bottom: Math.round(fr.bottom), w: Math.round(fr.width), h: Math.round(fr.height) } : null,
          boxLeftNow: Math.round(b2.left),
          overlap: fr ? Math.round(fr.right - b2.left) : null,
          css: { top: cs.top, right: cs.right, translate: cs.translate, transform: cs.transform, position: cs.position },
        };
      })()
    `,
  });
  console.log(JSON.stringify(res?.result?.result?.value, null, 2));

  ws.close();
}

run()
  .catch((e) => console.error(e))
  .finally(() => {
    const killTree = (p) => {
      try { spawn('taskkill', ['/PID', String(p.pid), '/T', '/F'], { stdio: 'ignore' }); } catch {}
      try { p.kill(); } catch {}
    };
    setTimeout(() => {
      killTree(browser);
      killTree(preview);
      process.exit(0);
    }, 500);
  });
