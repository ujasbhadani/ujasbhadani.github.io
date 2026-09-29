import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const FRAMES = Number(process.env.FRAMES || 288);
const out = path.join(dir, 'frames'); mkdirSync(out, { recursive: true });
const exe = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const modes = process.env.GL ? [[process.env.GL]] : [['--use-gl=angle', '--use-angle=metal'], ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']];
let browser;
for (const m of modes) {
  try { browser = await puppeteer.launch({ executablePath: exe, headless: true, args: [...m, '--ignore-gpu-blocklist', '--window-size=1920,1080'] }); break; }
  catch (e) { console.error('launch failed with', m, e.message); }
}
const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('page error', e.message));
await page.goto('file://' + path.join(dir, 'scene.html'));
await page.waitForFunction('window.sceneReady === true', { timeout: 30000 });
console.log('renderer:', await page.evaluate(() => { const g = document.createElement('canvas').getContext('webgl2'); const e = g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unknown'; }));
const t0 = Date.now();
for (let i = 0; i < FRAMES; i++) {
  const url = await page.evaluate(n => { window.renderFrame(n); return document.getElementById('c').toDataURL('image/png'); }, i / FRAMES);
  writeFileSync(path.join(out, `frame-${String(i).padStart(4, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
  if (i % 24 === 0) console.log('frame', i, ((Date.now() - t0) / 1000).toFixed(1) + 's');
}
console.log('done', FRAMES, 'frames in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
await browser.close();
