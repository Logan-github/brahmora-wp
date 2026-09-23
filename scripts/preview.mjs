#!/usr/bin/env node
/**
 * Local preview server with clean-URL resolution.
 * Mirrors the production CloudFront Function (infra/functions/rewrite-urls.js):
 *   /                  -> src/index.html
 *   /about-us          -> src/about-us.html
 *   /about-us/         -> src/about-us.html
 *   /assets/styles.css -> served as-is
 *
 * Zero dependencies. Usage:
 *   node scripts/preview.mjs            # serves ./src on http://localhost:8080
 *   PORT=3000 node scripts/preview.mjs
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'src');
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

/** Resolve a request URL path to a file path, applying clean-URL rules. */
function resolvePath(urlPath) {
  // Strip query/hash and decode
  let uri = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);

  if (uri === '/' || uri === '') return join(ROOT, 'index.html');
  if (uri.endsWith('/')) return join(ROOT, uri.slice(1, -1) + '.html');

  const lastSeg = uri.substring(uri.lastIndexOf('/') + 1);
  if (!lastSeg.includes('.')) uri += '.html'; // extensionless -> .html

  return join(ROOT, uri.replace(/^\//, ''));
}

const server = createServer(async (req, res) => {
  // Prevent path traversal
  const safe = normalize(resolvePath(req.url)).replace(/\0/g, '');
  if (!safe.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const info = await stat(safe);
    if (!info.isFile()) throw new Error('not a file');
    const body = await readFile(safe);
    const type = MIME[extname(safe).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type }).end(body);
  } catch {
    // Fallback to index.html (matches CloudFront 404 -> index behaviour)
    try {
      const body = await readFile(join(ROOT, 'index.html'));
      res.writeHead(404, { 'Content-Type': MIME['.html'] }).end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  Brahmora preview → http://localhost:${PORT}\n  Serving: ${ROOT}\n  Clean URLs enabled (e.g. /about-us). Ctrl+C to stop.\n`);
});
