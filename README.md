# brahmora-wp

Brahmora Technologies website (static HTML) for the AEGIS platform.

## Local preview (clean URLs)

The site uses extensionless URLs (e.g. `/about-us`, not `/about-us.html`).
To preview locally with the same URL behaviour as production, run a local server —
opening the files directly with `file://` will **not** resolve clean URLs.

```bash
npm run preview          # serves ./src at http://localhost:8080
PORT=3000 npm run preview # custom port
```

The preview server (`scripts/preview.mjs`, zero dependencies) mirrors the
production CloudFront Function:

| Request            | Serves               |
| ------------------ | -------------------- |
| `/`                | `src/index.html`     |
| `/about-us`        | `src/about-us.html`  |
| `/about-us/`       | `src/about-us.html`  |
| `/assets/*`        | served as-is         |

## Production URLs

Clean URLs are handled at the edge by a CloudFront Function
(`infra/functions/rewrite-urls.js`), attached to the distribution's
viewer-request event in `infra/cloudfront.tf`. S3 objects keep their `.html`
keys; the function rewrites the incoming clean path to the `.html` object.

## Deploy

```bash
./infra/deploy.sh        # sync src/ to S3 + invalidate CloudFront
```
