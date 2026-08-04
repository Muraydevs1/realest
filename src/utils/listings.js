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
