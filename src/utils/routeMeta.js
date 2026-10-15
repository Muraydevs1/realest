// Single source of truth for brand names and per-route metadata.
//
// Plain data only — no React, no asset imports — so it can be imported both
// by the React pages (runtime <head> updates) and by the Node build scripts
// (scripts/prerender-routes.mjs), which bake the same values into the static
// HTML each route is served with. Keep the two in lock-step by editing here.
import { statusLabel } from './listings.js'

export const BRAND = {
    // Preferred site name for Google Search and all on-page/site metadata.
    name: 'Murray Investments Co. Ltd.',
    // Registered company name (used in copy and as legalName/alternateName).
    legalName: 'Murray Investments Company Limited',
    // Short brand name.
    shortName: 'Murray Investments',
}

// Appended to every non-home page title: "<Page> | Murray Investments Co. Ltd."
export const titleFor = (page) => `${page} | ${BRAND.name}`

export const PAGE_META = {
    home: {
        title: `${BRAND.name} | Real Estate Development in Ghana`,
        description:
            `${BRAND.name} is a Ghanaian real estate company that develops, markets and manages properties across Ghana and the West African sub-region.`,
        path: '/',
    },
    about: {
        title: titleFor('About Our Company'),
        description:
            `${BRAND.name} is a multiline realty company in Ghana providing customized housing products, development, marketing and property management, with legal cover on all properties.`,
        path: '/about',
    },
    properties: {
        title: titleFor('Properties'),
        description:
            `Browse properties and completed developments by ${BRAND.name}, including residential projects in East Legon, Dawhenya, Tamale and Frafraha.`,
        path: '/properties',
    },
    notFound: {
        title: titleFor('Page Not Found'),
        description: 'The page you are looking for does not exist or has been moved.',
        path: '/404',
        robots: 'noindex, follow',
    },
    projectNotFound: {
        title: titleFor('Project Not Found'),
        description: 'This project does not exist or is no longer available.',
        path: '/properties',
        robots: 'noindex, follow',
    },
}

// Built only from verified project fields — never invented specifics.
export function projectMeta(project) {
    const status = statusLabel(project.status).toLowerCase()
    const article = /^[aeiou]/.test(status) ? 'An' : 'A'
    return {
        title: titleFor(`${project.title}, ${project.location}`),
        description: `${project.description} ${article} ${status} project by ${BRAND.name} in ${project.location}, Ghana.`,
        path: `/properties/${project.id}`,
    }
}

// Home > Properties > <project title>. `toAbsolute` maps a path to an absolute
// URL (runtime and build scripts each pass their own origin-aware helper).
export function breadcrumbJsonLd(project, toAbsolute) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsolute('/') },
            { '@type': 'ListItem', position: 2, name: 'Properties', item: toAbsolute('/properties') },
            { '@type': 'ListItem', position: 3, name: project.title, item: toAbsolute(`/properties/${project.id}`) },
        ],
    }
}
