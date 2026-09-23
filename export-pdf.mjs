/**
 * export-pdf.mjs
 * Exports aegis-presentation.html → aegis-presentation.pdf
 *
 * Usage:  node export-pdf.mjs
 *
 * How it works:
 *  1. Opens the presentation in headless Chrome at 1280×720
 *  2. Navigates to each slide via dot-nav clicks
 *  3. Saves each slide as a PNG to a temp directory
 *  4. Builds a print-page HTML referencing those PNGs via file://
 *  5. Renders that page to PDF with Puppeteer
 *  6. Cleans up temp files
 */

import { execSync }                    from 'node:child_process';
import { mkdirSync, writeFileSync,
         rmSync, existsSync }          from 'node:fs';
import { resolve, dirname }            from 'node:path';
import { fileURLToPath }               from 'node:url';
import { tmpdir }                      from 'node:os';

// ── Paths ────────────────────────────────────────────────────────
const __dir  = dirname(fileURLToPath(import.meta.url));
const SRC    = resolve(__dir, 'src', 'aegis-presentation.html');
const OUT    = resolve(__dir, 'src', 'aegis-presentation.pdf');
const TMP    = resolve(tmpdir(), 'aegis-pdf-export');
const SLIDES = 10;
const W      = 1280;
const H      = 720;

// ── Ensure puppeteer is available ───────────────────────────────
let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  console.log('Installing puppeteer (one-time)…');
  execSync('npm install --save-dev puppeteer', { cwd: __dir, stdio: 'inherit' });
  puppeteer = (await import('puppeteer')).default;
}

// ── Temp directory ───────────────────────────────────────────────
if (existsSync(TMP)) rmSync(TMP, { recursive: true });
mkdirSync(TMP, { recursive: true });

// ── Launch browser ───────────────────────────────────────────────
console.log('Launching headless Chrome…');
const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--allow-file-access-from-files',
    '--disable-web-security',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

// ── Load presentation ────────────────────────────────────────────
const fileUrl = `file://${SRC}`;
console.log(`Loading: ${fileUrl}`);
await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60_000 });
await page.waitForFunction(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));

// Hide navigation UI — inject a stylesheet so it can't be overridden
await page.addStyleTag({
  content: `
    #controls, #kb-hint { display: none !important; visibility: hidden !important; }
  `,
});

// ── Screenshot every slide ───────────────────────────────────────
const imgPaths = [];

for (let i = 0; i < SLIDES; i++) {
  // Click the nav dot to jump to slide i
  await page.evaluate((index) => {
    const dots = document.querySelectorAll('.ndot');
    if (dots[index]) dots[index].click();
  }, i);

  // Wait for CSS transition (0.55 s) + a little extra
  await new Promise(r => setTimeout(r, 750));

  const imgPath = resolve(TMP, `slide-${String(i + 1).padStart(2, '0')}.png`);
  await page.screenshot({
    type: 'png',
    path: imgPath,
    clip: { x: 0, y: 0, width: W, height: H },
  });

  imgPaths.push(imgPath);
  console.log(`  Captured slide ${i + 1} / ${SLIDES}  →  ${imgPath}`);
}

// ── Build a print-ready HTML page referencing the temp PNGs ──────
const printHtmlPath = resolve(TMP, 'print.html');
const printHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: ${W}px ${H}px; margin: 0; }
  body { background: #000; }
  .page {
    width: ${W}px;
    height: ${H}px;
    page-break-after: always;
    overflow: hidden;
  }
  .page:last-child { page-break-after: avoid; }
  .page img { width: 100%; height: 100%; display: block; }
</style>
</head>
<body>
${imgPaths.map(p => `  <div class="page"><img src="file://${p}"></div>`).join('\n')}
</body>
</html>`;

writeFileSync(printHtmlPath, printHtml);

// ── Load the print page and export to PDF ────────────────────────
console.log('\nBuilding PDF…');
await page.goto(`file://${printHtmlPath}`, {
  waitUntil: 'domcontentloaded',
  timeout: 120_000,
});

// Wait for all images to be decoded and rendered at full resolution
await page.evaluate(() => {
  return Promise.all(
    Array.from(document.images).map(img =>
      img.complete
        ? Promise.resolve()
        : new Promise(res => { img.onload = res; img.onerror = res; })
    )
  );
});

// Extra settle time for layout
await new Promise(r => setTimeout(r, 3000));

await page.pdf({
  path: OUT,
  width:  `${W}px`,
  height: `${H}px`,
  printBackground: true,
});

await browser.close();

// ── Cleanup temp files ───────────────────────────────────────────
rmSync(TMP, { recursive: true });

console.log(`\n✓  PDF exported successfully!\n   ${OUT}\n`);
