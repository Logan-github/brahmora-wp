#!/usr/bin/env node
/**
 * Renders src/aegis-minute-read.html to plan/aegis-case-study.pdf
 * as a 1280x720 landscape deck (one .slide per page), with backgrounds.
 */
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = join(__dirname, '..', 'src', 'aegis-minute-read.html');
const OUT  = join(__dirname, 'aegis-case-study.pdf');

const W = 1280, H = 720;

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

await page.goto('file://' + HTML, { waitUntil: 'networkidle0' });
// Ensure web fonts are ready before printing
await page.evaluateHandle('document.fonts.ready');

await page.pdf({
  path: OUT,
  width: `${W}px`,
  height: `${H}px`,
  printBackground: true,
  preferCSSPageSize: false,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('PDF written to', OUT);
