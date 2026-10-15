// Post-build step: gives every public route its own HTML <head>.
//
// Why: this is a client-rendered SPA. Before this step every URL was served
// the same index.html, so the raw HTML of /about, /properties/2, etc. claimed
// to be the homepage (homepage title, description and canonical) until
// JavaScript ran, and unknown URLs returned 200 ("soft 404"). Crawlers that do
// not run JS — and Google's first, pre-render pass — saw conflicting signals.
//
// What it does (after `vite build`, on dist/):
//   1. Copies dist/index.html once per route and rewrites the title,
//      description, canonical, robots and Open Graph/Twitter tags using the
//      shared values in src/utils/routeMeta.js (the same ones React applies).
//   2. Keeps the WebSite (site-name) JSON-LD on the homepage only, and adds
//      BreadcrumbList JSON-LD to project pages.
//   3. Writes dist/404.html (noindex) for unknown URLs.
//   4. Writes dist/_redirects (Netlify) mapping each route to its file,
//      301-redirecting the legacy /projects URLs, and returning a real 404
//      for everything else. The app's JS/CSS and body rendering are untouched.
//
// Adding a route: add its metadata to routeMeta.js and its path to ROUTES below.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { ROOT, readProjects } from './lib/projects.mjs'
import { PAGE_META, projectMeta, breadcrumbJsonLd } from '../src/utils/routeMeta.js'

const DIST = path.join(ROOT, 'dist')
const ROUTES_DIR = '_routes'

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8')

// Origin was already substituted into the canonical by vite.config.js.
const ORIGIN = template.match(/<link rel="canonical" href="([^"]+?)\/?"/)?.[1]
if (!ORIGIN || ORIGIN.includes('__SITE_ORIGIN__')) {
    throw new Error('prerender-routes: could not read the site origin from dist/index.html — run `vite build` first')
}
const abs = (p) => `${ORIGIN}${p}`

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Safe embedding of JSON inside <script>: neutralise "</script" and friends.
const jsonForScript = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

// Replace exactly one occurrence; fail the build if the template drifted.
function replaceOnce(html, pattern, replacement, label) {
    const matches = html.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'))
    if (!matches || matches.length !== 1) {
        throw new Error(`prerender-routes: expected exactly one ${label} in dist/index.html, found ${matches?.length ?? 0}`)
    }
    return html.replace(pattern, replacement)
}

const metaContent = (attr, key) => new RegExp(`(<meta\\s+${attr}="${key.replace(/[:]/g, '\\$&')}"\\s+content=")[^"]*(")`)
// Function replacer: keeps the captured prefix/suffix and inserts the value verbatim
// (a string replacement would misinterpret "$" sequences in titles or descriptions).
const keep = (value) => (_m, before, after) => `${before}${value}${after}`

function renderHead({ title, description, path: routePath, robots = 'index, follow' }, { image, keepWebsite = false, canonical = true, jsonLd = [] } = {}) {
    let html = template
    const url = abs(routePath)

    html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escapeText(title)}</title>`, '<title>')
    html = replaceOnce(html, metaContent('name', 'description'), keep(escapeAttr(description)), 'meta description')
    html = replaceOnce(html, metaContent('name', 'robots'), keep(escapeAttr(robots)), 'meta robots')
    html = replaceOnce(html, metaContent('property', 'og:title'), keep(escapeAttr(title)), 'og:title')
    html = replaceOnce(html, metaContent('property', 'og:description'), keep(escapeAttr(description)), 'og:description')
    html = replaceOnce(html, metaContent('name', 'twitter:title'), keep(escapeAttr(title)), 'twitter:title')
    html = replaceOnce(html, metaContent('name', 'twitter:description'), keep(escapeAttr(description)), 'twitter:description')

    if (canonical) {
        html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, keep(escapeAttr(url)), 'canonical')
        html = replaceOnce(html, metaContent('property', 'og:url'), keep(escapeAttr(url)), 'og:url')
    } else {
        html = replaceOnce(html, /\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '', 'canonical')
        html = replaceOnce(html, /\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, '', 'og:url')
    }

    if (image) {
        html = replaceOnce(html, metaContent('property', 'og:image'), keep(escapeAttr(image)), 'og:image')
        html = replaceOnce(html, metaContent('name', 'twitter:image'), keep(escapeAttr(image)), 'twitter:image')
        // The template's 1200x630 dimensions describe og-image.jpg only.
        html = replaceOnce(html, /\s*<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/?>/, '', 'og:image:width')
        html = replaceOnce(html, /\s*<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/?>/, '', 'og:image:height')
    }

    if (!keepWebsite) {
        // Site-name WebSite markup belongs on the homepage only (plus its comment).
        html = replaceOnce(
            html,
            /\s*<!--\s*Google site name[\s\S]*?-->\s*<script type="application\/ld\+json" id="jsonld-website">[\s\S]*?<\/script>/,
            '',
            'WebSite JSON-LD block'
        )
    }

    if (jsonLd.length) {
        const tags = jsonLd
            .map(({ id, data }) => `    <script type="application/ld+json" id="jsonld-${id}">${jsonForScript(data)}</script>`)
            .join('\n')
        html = replaceOnce(html, /<\/head>/, () => `${tags}\n  </head>`, '</head>')
    }
    return html
}

// Hashed dist URL for a source image, e.g. Feastlegon2.webp -> /assets/Feastlegon2-AbC123.webp
const distAssets = existsSync(path.join(DIST, 'assets')) ? readdirSync(path.join(DIST, 'assets')) : []
function assetUrl(sourceFile) {
    if (!sourceFile) return null
    const { name, ext } = path.parse(sourceFile)
    const hit = distAssets.find((f) => f.startsWith(`${name}-`) && f.endsWith(ext) && /^[\w-]{6,}$/.test(f.slice(name.length + 1, -ext.length)))
    return hit ? abs(`/assets/${hit}`) : null
}

// ---- Routes -------------------------------------------------------------
const projects = readProjects()
const pages = [
    { route: '/about', file: 'about.html', html: renderHead(PAGE_META.about) },
    { route: '/properties', file: 'properties.html', html: renderHead(PAGE_META.properties) },
    ...projects.map((project) => ({
        route: `/properties/${project.id}`,
        file: `properties-${project.id}.html`,
        html: renderHead(projectMeta(project), {
            image: assetUrl(project.coverFile) ?? undefined,
            jsonLd: [{ id: 'breadcrumb', data: breadcrumbJsonLd(project, abs) }],
        }),
    })),
]

// Homepage: rewritten in place so it also gets the shared metadata (keeps WebSite JSON-LD).
writeFileSync(path.join(DIST, 'index.html'), renderHead(PAGE_META.home, { keepWebsite: true }))

mkdirSync(path.join(DIST, ROUTES_DIR), { recursive: true })
for (const page of pages) writeFileSync(path.join(DIST, ROUTES_DIR, page.file), page.html)

// Real 404 for unknown URLs. The SPA still boots and renders its Not Found page.
writeFileSync(path.join(DIST, '404.html'), renderHead(PAGE_META.notFound, { canonical: false }))

// ---- Netlify routing ----------------------------------------------------
// Overwrites the SPA catch-all copied from public/_redirects. Rules are
// first-match; existing static files (assets, icons, robots.txt…) are served
// before any of these rules apply.
const redirects = `# Generated by scripts/prerender-routes.mjs — do not edit dist/_redirects by hand.

# Legacy URLs: permanent server-side redirects (previously client-side only).
/projects        /properties        301
/projects/:id    /properties/:id    301

# Each public route is served its own pre-built HTML (status 200, URL unchanged).
${pages.map((p) => `${p.route.padEnd(16)} /${ROUTES_DIR}/${p.file.padEnd(24)} 200`).join('\n')}

# Everything else is a genuine 404 (the app renders its Not Found page).
/*               /404.html          404
`
writeFileSync(path.join(DIST, '_redirects'), redirects)

console.log(`prerender-routes: origin ${ORIGIN}`)
console.log(`prerender-routes: wrote index.html, 404.html and ${pages.length} route files in dist/${ROUTES_DIR}/`)
