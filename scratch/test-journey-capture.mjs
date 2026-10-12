import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9342;
const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\0764c009-791b-44e4-ae05-698e64572f13';

const edge = spawn(edgePath, [
  `--remote-debugging-port=${port}`,
  '--headless=new',
  '--disable-gpu',
  '--window-size=1440,900',
  '--user-data-dir=C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\0764c009-791b-44e4-ae05-698e64572f13\\scratch\\edge-profile-journey3',
  'http://localhost:5173/'
]);

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  await sleep(2500);

  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const pages = await res.json();
  const page = pages.find((p) => p.type === 'page');

  if (!page || !page.webSocketDebuggerUrl) {
    console.error('No page or ws url found', pages);
    edge.kill();
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      const text = data.params.args.map(a => a.value !== undefined ? a.value : a.description).join(' ');
      console.log('[BROWSER CONSOLE]', text);
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

  console.log('Connected to CDP');
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Input.enable');

  await send('Page.reload');

  // Poll until preloader reaches 100% and START button is ready
  console.log('Polling for preloader to reach 100%...');
  let ready = false;
  for (let i = 0; i < 50; i++) {
    const checkRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const num = document.querySelector('.splash-progress-number')?.textContent;
          const loaderRow = document.querySelector('.splash-loading-row');
          const loaderDisplay = loaderRow ? window.getComputedStyle(loaderRow).display : null;
          const btn = document.querySelector('.splash-start-btn');
          const isBtnVisible = btn ? window.getComputedStyle(btn).visibility === 'visible' : false;
          const rect = btn ? btn.getBoundingClientRect() : null;
          const isReady = isBtnVisible && rect && rect.width > 20 && loaderDisplay === 'none';
          return { num, loaderDisplay, isBtnVisible, width: rect?.width, isReady };
        })()
      `
    });
    const val = checkRes?.result?.result?.value;
    if (val?.isReady) {
      ready = true;
      break;
    }
    await sleep(600);
  }

  if (!ready) {
    console.error('Timeout waiting for START button');
    ws.close();
    edge.kill();
    return;
  }

  console.log('START button is ready and active!');
  await sleep(400);

  // Click START button directly
  console.log('Triggering START button click...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('.splash-start-btn');
        if (btn) btn.click();
      })()
    `
  });

  // CHECKPOINT 1 — ~1.0s: Small octopus visible far ahead, NO full hero yet, NO HUD, NO giant HAULO text
  await sleep(1000);
  let resCp1 = await send('Page.captureScreenshot', { format: 'png' });
  if (resCp1?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_1_small_octopus_ahead.png`, Buffer.from(resCp1.result.data, 'base64'));
    console.log('Saved checkpoint_1_small_octopus_ahead.png (~1.0s)');
  }

  // CHECKPOINT 2 — ~2.5s: Octopus clearly moving through curved path, camera following, fragments passing
  await sleep(1500);
  let resCp2 = await send('Page.captureScreenshot', { format: 'png' });
  if (resCp2?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_2_curved_swim_fragments.png`, Buffer.from(resCp2.result.data, 'base64'));
    console.log('Saved checkpoint_2_curved_swim_fragments.png (~2.5s)');
  }

  // CHECKPOINT 3 — ~4.0s: Camera deep in world, octopus bigger, HAULO text only starting to appear far away
  await sleep(1500);
  let resCp3 = await send('Page.captureScreenshot', { format: 'png' });
  if (resCp3?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_3_deep_travel_haulo_appearing.png`, Buffer.from(resCp3.result.data, 'base64'));
    console.log('Saved checkpoint_3_deep_travel_haulo_appearing.png (~4.0s)');
  }

  // CHECKPOINT 4 — ~5.5s: Octopus approaching final area, HAULO text readable, HUD partially arriving
  await sleep(1500);
  let resCp4 = await send('Page.captureScreenshot', { format: 'png' });
  if (resCp4?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_4_approaching_hero_hud_arriving.png`, Buffer.from(resCp4.result.data, 'base64'));
    console.log('Saved checkpoint_4_approaching_hero_hud_arriving.png (~5.5s)');
  }

  // CHECKPOINT 5 — ~6.9s: Octopus settling, camera stabilized, exact Hero composition
  await sleep(1400);
  let resCp5 = await send('Page.captureScreenshot', { format: 'png' });
  if (resCp5?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_5_hero_settled_exact.png`, Buffer.from(resCp5.result.data, 'base64'));
    console.log('Saved checkpoint_5_hero_settled_exact.png (~6.9s)');
  }

  // Test Scroll: Scroll down 800px to verify ScrollTrigger handoff and scroll unlocked
  console.log('Testing scroll handoff after journey completion...');
  await send('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: 720,
    y: 450,
    deltaX: 0,
    deltaY: 800
  });
  await sleep(600);

  let resScrolled = await send('Page.captureScreenshot', { format: 'png' });
  if (resScrolled?.result?.data) {
    fs.writeFileSync(`${artifactDir}\\checkpoint_6_scrolled.png`, Buffer.from(resScrolled.result.data, 'base64'));
    console.log('Saved checkpoint_6_scrolled.png');
  }

  // Inspect DOM and state
  const stateRes = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const mascot = document.querySelector('.hero-mascot-container');
        const mascotStyles = mascot ? window.getComputedStyle(mascot).transform : null;
        const world = document.querySelector('.hero-world');
        const worldStyles = world ? window.getComputedStyle(world).transform : null;
        const splash = document.querySelector('.splash-container');
        const splashDisplay = splash ? splash.style.display : null;
        const bodyOverflow = document.body.style.overflow;
        return { mascotStyles, worldStyles, splashDisplay, bodyOverflow, scrollY: window.scrollY };
      })()
    `
  });
  console.log('State at end:', stateRes?.result?.result?.value);

  ws.close();
  edge.kill();
}

run().catch((e) => {
  console.error(e);
  try { edge.kill(); } catch {}
});
