// Shared helpers for property/project listings.
//
// Listing categories:
//   'sale'      — actively offered for sale
//   'rent'      — actively offered for rent
//   'portfolio' — completed/ongoing development work shown as proof of the
//                 company's track record; never presented as active inventory.
//
// Development status is a separate concept from category: a 'completed'
// portfolio project is NOT implied to be available for sale.

export const CONTACT = {
    phoneDisplay: '+233 (0) 244718186',
    phoneHref: 'tel:+233244718186',
    whatsappNumber: '233244718186',
}

const STATUS_LABELS = {
    completed: 'Completed',
    ongoing: 'Ongoing',
    'under-construction': 'Under Construction',
    available: 'Available',
}

const CATEGORY_LABELS = {
    sale: 'For Sale',
    rent: 'For Rent',
    // portfolio intentionally has no badge — historical work is not inventory
}

const PRICE_PERIOD_LABELS = {
    month: 'month',
    year: 'year',
    night: 'night',
}

export function statusLabel(status) {
    return STATUS_LABELS[status] ?? null
}

export function categoryLabel(category) {
    return CATEGORY_LABELS[category] ?? null
}

// Semantic status colors, intentionally distinct from the brand red:
// green = done/available, amber = in progress. Do not use brand colors here.
export function statusBadgeClasses(status) {
    return status === 'completed' || status === 'available'
        ? 'bg-green-100 text-green-800'
        : 'bg-amber-100 text-amber-800'
}

export function isCommercialListing(project) {
    return project.category === 'sale' || project.category === 'rent'
}

// "Land for Sale" is DERIVED, never a separate data source: it is simply the
// sale listings whose propertyType is 'land'. Returns [] today, so no empty
// land section can render.
export function isLandListing(project) {
    return project.category === 'sale' && project.propertyType === 'land'
}

/* ------------------------------------------------------------------ *
 * Filter architecture
 *
 * Four independent dimensions stay independent (see the model notes in
 * src/assets/assets.js). Nothing here hardcodes which values exist: the UI
 * is built from whatever verified values are actually present in the data,
 * so adding a land listing or a renovation makes its filter appear with no
 * component or JSX changes.
 *
 * Filter state shape (deliberately URL-serialisable, so query-param sync can
 * be added later without rebuilding any of this):
 *   { category: 'all'|'sale'|'rent'|'portfolio',
 *     propertyType: [], status: [], projectType: [], condition: [] }
 * e.g. /properties?category=sale&propertyType=land&status=available
 * ------------------------------------------------------------------ */

export const PRIMARY_CATEGORIES = [
    { key: 'all', label: 'All Properties' },
    { key: 'sale', label: 'For Sale' },
    { key: 'rent', label: 'For Rent' },
    { key: 'portfolio', label: 'Our Portfolio' },
]

// Turns an unmapped but verified value ('semi-detached') into a readable
// label, so a new data value never renders as a raw slug.
const humanize = (value) =>
    String(value).split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const PROPERTY_TYPE_LABELS = {
    house: 'House',
    apartment: 'Apartment',
    land: 'Land',
    'commercial-property': 'Commercial Property',
}

const PROJECT_TYPE_LABELS = {
    development: 'Development',
    renovation: 'Renovation',
    'property-management': 'Property Management',
    'land-sale': 'Land Sale',
}

const CONDITION_LABELS = { renovated: 'Renovated', new: 'New' }

// Order here is the order the filter groups render in.
export const SECONDARY_DIMENSIONS = [
    { key: 'propertyType', label: 'Property Type', labels: PROPERTY_TYPE_LABELS },
    { key: 'status', label: 'Status', labels: STATUS_LABELS },
    { key: 'projectType', label: 'Project Type', labels: PROJECT_TYPE_LABELS },
    { key: 'condition', label: 'Condition', labels: CONDITION_LABELS },
]

export const EMPTY_FILTERS = Object.freeze({
    category: 'all',
    propertyType: [],
    status: [],
    projectType: [],
    condition: [],
})

export function createFilters(overrides = {}) {
    return { ...EMPTY_FILTERS, ...overrides }
}

// Deterministic: input order is preserved, and a dimension with no selected
// values simply does not constrain the result.
export function filterProjects(projects, filters = EMPTY_FILTERS) {
    return projects.filter((project) => {
        if (filters.category && filters.category !== 'all' && project.category !== filters.category) {
            return false
        }
        return SECONDARY_DIMENSIONS.every(({ key }) => {
            const selected = filters[key]
            if (!selected || selected.length === 0) return true
            return selected.includes(project[key])
        })
    })
}

// Primary tabs: 'All' always shows; a category tab shows only when it has at
// least one verified entry, so empty "For Sale"/"For Rent" tabs never appear.
export function availableCategories(projects) {
    return PRIMARY_CATEGORIES.filter(
        (c) => c.key === 'all' || projects.some((p) => p.category === c.key)
    ).map((c) => ({
        ...c,
        count: c.key === 'all' ? projects.length : projects.filter((p) => p.category === c.key).length,
    }))
}

// Secondary groups, derived from the data currently in scope for the chosen
// category. A dimension where every entry is null (unverified) yields no
// options and the whole group disappears.
export function availableFilterGroups(projects, filters = EMPTY_FILTERS) {
    const inCategory = filters.category && filters.category !== 'all'
        ? projects.filter((p) => p.category === filters.category)
        : projects

    return SECONDARY_DIMENSIONS.map(({ key, label, labels }) => {
        const values = [...new Set(inCategory.map((p) => p[key]).filter(Boolean))].sort()
        return {
            key,
            label,
            options: values.map((value) => ({
                value,
                label: labels[value] ?? humanize(value),
                // count reflects the other active filters, so a checkbox never
                // promises results it cannot deliver
                count: filterProjects(inCategory, { ...filters, category: 'all', [key]: [value] }).length,
            })),
        }
    }).filter((group) => group.options.length > 0)
}

export function activeFilterCount(filters = EMPTY_FILTERS) {
    return SECONDARY_DIMENSIONS.reduce((total, { key }) => total + (filters[key]?.length ?? 0), 0)
}

export function toggleFilterValue(filters, key, value) {
    const current = filters[key] ?? []
    return {
        ...filters,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    }
}

// Builds the listing groupings a page should render. Only non-empty groups
// come back, so a section exists if and only if verified entries exist.
export function listingGroups(projects) {
    return [
        { key: 'sale', heading: 'Properties for Sale', match: (p) => p.category === 'sale' && !isLandListing(p) },
        { key: 'land', heading: 'Land for Sale', match: isLandListing },
        { key: 'rent', heading: 'Properties for Rent', match: (p) => p.category === 'rent' },
        { key: 'portfolio', heading: 'Our Projects', match: (p) => p.category === 'portfolio' },
    ]
        .map((group) => ({ ...group, projects: projects.filter(group.match) }))
        .filter((group) => group.projects.length > 0)
}

// Formatted price for sale/rent listings with verified price data,
// e.g. "GHS 3,500 / month". Returns null when no price exists.
export function formatPrice(project) {
    if (!isCommercialListing(project) || project.price == null) return null
    const amount = `${project.currency ?? 'GHS'} ${Number(project.price).toLocaleString()}`
    const period = PRICE_PERIOD_LABELS[project.pricePeriod]
    return period ? `${amount} / ${period}` : amount
}

// Display price: "Price on request" is ONLY a fallback for actual
// sale/rent listings. Portfolio projects never show pricing.
export function displayPrice(project) {
    if (!isCommercialListing(project)) return null
    return formatPrice(project) ?? 'Price on request'
}

// Structured specifications — an entry is produced only when the
// underlying value actually exists. Unknown stays unknown.
export function specItems(project) {
    const items = []
    if (project.bedrooms != null) {
        items.push({ key: 'bedrooms', label: `${project.bedrooms} bed${project.bedrooms === 1 ? '' : 's'}` })
    }
    if (project.bathrooms != null) {
        items.push({ key: 'bathrooms', label: `${project.bathrooms} bath${project.bathrooms === 1 ? '' : 's'}` })
    }
    if (project.size) {
        items.push({ key: 'size', label: project.size })
    }
    if (project.propertyType) {
        items.push({ key: 'propertyType', label: project.propertyType })
    }
    return items
}

// Privacy rule: a plan renders only when explicitly marked public.
// Site/architectural plans may contain sensitive parcel or boundary
// details, so nothing is exposed by default.
export function publicPlans(project) {
    return (project.plans ?? []).filter((plan) => plan.public === true)
}

// Contextual enquiry message; pass null for a general site-wide enquiry.
export function enquiryMessage(project) {
    const greeting = 'Hello Murray Investments Co. Ltd., '
    if (!project) return `${greeting}I'd like to make an enquiry.`
    const subject = `the ${project.title} located in ${project.location}`
    if (project.category === 'sale') {
        return `${greeting}I'm interested in purchasing ${subject}. I'd like to know more about this property.`
    }
    if (project.category === 'rent') {
        return `${greeting}I'm interested in renting ${subject}. I'd like to know more about this property.`
    }
    return `${greeting}I'm interested in ${subject}. I'd like to know more about this project.`
}

export function whatsappUrl(message) {
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}
