import { useEffect } from 'react'

// Site-wide SEO configuration and per-page metadata hooks.
//
// PRODUCTION DOMAIN: set VITE_SITE_URL in the deployment environment
// (e.g. VITE_SITE_URL=https://www.murrayinvestments.com). Until it is set,
// everything falls back to the reserved .example placeholder below, which is
// guaranteed never to resolve — a wrong absolute URL fails loudly instead of
// silently pointing search engines at someone else's domain.
// The same variable drives robots.txt and sitemap.xml via
// scripts/generate-seo.mjs, so the domain is configured in ONE place.
const PLACEHOLDER_ORIGIN = 'https://www.murrayinvestments.example'

const rawOrigin = import.meta.env?.VITE_SITE_URL || PLACEHOLDER_ORIGIN
const ORIGIN = rawOrigin.replace(/\/+$/, '')

export const SITE = {
    origin: ORIGIN,
    usesPlaceholderDomain: ORIGIN === PLACEHOLDER_ORIGIN,
    name: 'Murray Investments Co. Ltd.',
    // Verified contact details — mirrored from src/utils/listings.js CONTACT
    // and the footer. Do not add facts that are not published on the site.
    phone: '+233244718186',
    email: 'murraygh@yahoo.com',
    address: {
        street: 'Plot M51, C25',
        locality: 'Tema',
        country: 'GH',
    },
    areaServed: ['Ghana', 'Burkina Faso'],
    ogImage: '/og-image.jpg',
    logo: '/icon-512.png',
}

export const absoluteUrl = (path = '/') => `${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`

// --- DOM helpers -----------------------------------------------------------
// index.html ships static defaults for every tag below, so crawlers that do
// not execute JavaScript still receive valid site-level metadata. These
// helpers only rewrite the existing tags' content per route.
function setMetaTag(attr, key, content) {
    if (typeof document === 'undefined') return
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function setCanonical(href) {
    if (typeof document === 'undefined') return
    let el = document.head.querySelector('link[rel="canonical"]')
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

/**
 * Applies a page's title/description/canonical plus the Open Graph and
 * Twitter tags that vary per route. Call once per page component.
 */
export function applyPageMeta({ title, description, path, image = SITE.ogImage, type = 'website', robots = 'index, follow' }) {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)

    document.title = title
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', robots)
    setCanonical(url)

    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:type', type)
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('property', 'og:site_name', SITE.name)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', imageUrl)
}

/** React wrapper: applies page metadata after each render of a page. */
export function usePageMeta(meta) {
    const { title, description, path, image, type, robots } = meta
    useEffect(() => {
        applyPageMeta({ title, description, path, image, type, robots })
    }, [title, description, path, image, type, robots])
}

/** React wrapper: injects page-level JSON-LD and cleans it up on unmount. */
export function useJsonLd(id, data) {
    const serialized = data ? JSON.stringify(data) : null
    useEffect(() => {
        if (!serialized) return undefined
        return applyJsonLd(id, JSON.parse(serialized))
    }, [id, serialized])
}

/**
 * Injects a JSON-LD block for the current page and removes it on unmount, so
 * route changes never leave stale structured data behind. `id` keys the tag.
 */
export function applyJsonLd(id, data) {
    if (typeof document === 'undefined') return () => {}
    const elementId = `jsonld-${id}`
    let el = document.getElementById(elementId)
    if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = elementId
        document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
    return () => el.remove()
}

// Home > Projects > <project title>
export function breadcrumbJsonLd(project) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Properties', item: absoluteUrl('/properties') },
            { '@type': 'ListItem', position: 3, name: project.title, item: absoluteUrl(`/properties/${project.id}`) },
        ],
    }
}
