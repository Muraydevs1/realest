import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute URLs (canonical, og:url, og:image, JSON-LD) must be baked into
// index.html at build time. Set VITE_SITE_URL in the deploy environment; the
// reserved .example placeholder is used otherwise so a missing config fails
// loudly instead of pointing crawlers at an unrelated domain.
// Keep this fallback in sync with src/utils/seo.js and scripts/generate-seo.mjs.
const PLACEHOLDER_ORIGIN = 'https://www.murrayinvestments.example'

function siteOriginHtmlPlugin() {
  const origin = (process.env.VITE_SITE_URL || PLACEHOLDER_ORIGIN).replace(/\/+$/, '')
  return {
    name: 'murray-site-origin-html',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_ORIGIN__', origin)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteOriginHtmlPlugin()],
})
