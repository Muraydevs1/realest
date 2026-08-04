# Deployment & Launch Checklist

## 1. Set the production domain (REQUIRED before launch)

Everything SEO-related derives from one environment variable:

```bash
VITE_SITE_URL=https://www.murrayinvestments.com   # real domain, no trailing slash
npm run build
```

This single value feeds:

- `index.html` — canonical, `og:url`, `og:image`, JSON-LD `url`/`logo`/`@id`
  (substituted at build time by the plugin in `vite.config.js`)
- `public/sitemap.xml` and `public/robots.txt` (written by `scripts/generate-seo.mjs`,
  which runs automatically as part of `npm run build`)
- runtime canonical/OG tags in `src/utils/seo.js`

**If it is not set**, the build falls back to `https://www.murrayinvestments.example`
— a reserved, non-resolving placeholder — and the build log prints:

```
generate-seo: origin https://www.murrayinvestments.example  ** PLACEHOLDER — set VITE_SITE_URL before launch **
```

Treat that warning as a launch blocker. The placeholder is deliberate: a
non-resolving domain fails loudly, whereas a plausible-looking wrong domain
would quietly send crawlers and social scrapers somewhere else.

## 2. Host configuration

The app is a client-routed SPA: **every path must serve `/index.html` with a
200 status** (not a 302, and not a 404).

- **Netlify** — already handled by `public/_redirects` (`/*  /index.html  200`).
- **Vercel** — add `vercel.json` with a rewrite of `/(.*)` → `/index.html`.
- **Apache** — `.htaccess` with `FallbackResource /index.html`.
- **Nginx** — `try_files $uri $uri/ /index.html;`

Serve `dist/` as the web root. Hashed files in `dist/assets/` are safe to
cache immutably; `index.html`, `robots.txt` and `sitemap.xml` should not be
cached aggressively.

## 3. Post-deploy verification

1. `https://<domain>/robots.txt` and `/sitemap.xml` return 200 and show the real domain.
2. Deep-link directly to `https://<domain>/projects/2` — must render (not 404).
3. Run the page through Google's Rich Results Test (RealEstateAgent + BreadcrumbList).
4. Paste the homepage into WhatsApp/LinkedIn to confirm the OG card renders.
5. Submit the sitemap in Google Search Console; create/claim the Google Business Profile.

## 4. Known limitation — social previews are site-level only

This is a client-rendered SPA. Social scrapers (WhatsApp, Facebook, LinkedIn,
X) do **not** execute JavaScript, so they only ever read the static tags in
`index.html`. Every shared URL therefore previews with the site-level title,
description and `og-image.jpg`, even though the browser (and Googlebot, which
does render JS) sees correct per-page metadata.

Per-property social previews require HTML that already contains the per-page
tags at request time. Options, cheapest first:

1. **Prerendering at build time** (e.g. `vite-plugin-prerender`, `react-snap`) —
   emits a static HTML file per known route. Fits this site well: routes are
   few and change rarely. No server needed.
2. **Static-site generation** — migrate to a framework with SSG output.
3. **Server-side rendering** — only worth it if listings become dynamic.

Note that Google indexing does **not** depend on this: Googlebot renders
JavaScript and reads the per-page tags applied by `src/utils/seo.js`.
