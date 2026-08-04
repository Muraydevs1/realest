// Central hero-slider configuration — the ONLY place slides are defined.
// The Header carousel renders whatever this module exports; replacing an
// image later means: add the new optimized files (see docs/MEDIA.md "Hero
// slider"), swap the imports/srcsets in ONE entry below, adjust
// focalPosition if needed, rebuild. No carousel/animation code changes.
//
// Every slide must use verified Murray project media already in the repo.
// `isTemporary: true` marks assets below final hero quality (current photos
// max out at 1000–1080px wide; final sources should be ≥1920px).
// `enabled: false` removes a slide without deleting its entry; the carousel
// adapts (indicators, wrap-around, single-slide and zero-slide handling).

import eastLegon640Avif from './hero-east-legon-640.avif'
import eastLegon960Avif from './hero-east-legon-960.avif'
import eastLegon1080Avif from './hero-east-legon-1080.avif'
import eastLegon640Webp from './hero-east-legon-640.webp'
import eastLegon960Webp from './hero-east-legon-960.webp'
import eastLegon1080Webp from './hero-east-legon-1080.webp'
import dawhenya640Avif from './hero-dawhenya-640.avif'
import dawhenya960Avif from './hero-dawhenya-960.avif'
import dawhenya1000Avif from './hero-dawhenya-1000.avif'
import dawhenya640Webp from './hero-dawhenya-640.webp'
import dawhenya960Webp from './hero-dawhenya-960.webp'
import dawhenya1000Webp from './hero-dawhenya-1000.webp'
import eastLegonB640Avif from './hero-east-legon-2-640.avif'
import eastLegonB960Avif from './hero-east-legon-2-960.avif'
import eastLegonB1080Avif from './hero-east-legon-2-1080.avif'
import eastLegonB640Webp from './hero-east-legon-2-640.webp'
import eastLegonB960Webp from './hero-east-legon-2-960.webp'
import eastLegonB1080Webp from './hero-east-legon-2-1080.webp'

const slides = [
    {
        id: 'east-legon',
        projectId: 1,               // links to projectsData: 5 bedroom House, East Legon
        label: 'East Legon',
        alt: 'Completed Murray Investments 5-bedroom house in East Legon at dusk',
        enabled: true,
        order: 1,
        isTemporary: true,          // best current photo, but only 1080px wide
        width: 1080,
        height: 809,
        fallbackSrc: eastLegon1080Webp,
        avifSrcSet: `${eastLegon640Avif} 640w, ${eastLegon960Avif} 960w, ${eastLegon1080Avif} 1080w`,
        webpSrcSet: `${eastLegon640Webp} 640w, ${eastLegon960Webp} 960w, ${eastLegon1080Webp} 1080w`,
        // object-position per breakpoint (mobile <768, tablet <1024, desktop)
        focalPosition: { mobile: 'center', tablet: 'center', desktop: 'center' },
    },
    {
        id: 'dawhenya',
        projectId: 2,               // Modern Apartments, Dawhenya
        label: 'Dawhenya',
        alt: 'Completed Murray Investments apartment block in Dawhenya',
        enabled: true,
        order: 2,
        isTemporary: true,          // 1000px wide, overexposed sky
        width: 1000,
        height: 750,
        fallbackSrc: dawhenya1000Webp,
        avifSrcSet: `${dawhenya640Avif} 640w, ${dawhenya960Avif} 960w, ${dawhenya1000Avif} 1000w`,
        webpSrcSet: `${dawhenya640Webp} 640w, ${dawhenya960Webp} 960w, ${dawhenya1000Webp} 1000w`,
        // building fills the upper 2/3; bias the crop upward on tall phones
        focalPosition: { mobile: 'center 40%', tablet: 'center 45%', desktop: 'center' },
    },
    {
        id: 'east-legon-2',
        projectId: 1,               // second completed house from the East Legon project
        label: 'East Legon',
        alt: 'Completed Murray Investments house with gated compound in East Legon',
        enabled: true,
        order: 3,
        isTemporary: true,          // 1080px wide, hazy dusk sky
        width: 1080,
        height: 809,
        fallbackSrc: eastLegonB1080Webp,
        avifSrcSet: `${eastLegonB640Avif} 640w, ${eastLegonB960Avif} 960w, ${eastLegonB1080Avif} 1080w`,
        webpSrcSet: `${eastLegonB640Webp} 640w, ${eastLegonB960Webp} 960w, ${eastLegonB1080Webp} 1080w`,
        focalPosition: { mobile: 'center 55%', tablet: 'center', desktop: 'center' },
    },
]

// The carousel consumes only this: disabled slides drop out, order applies,
// and indices/indicators/wrapping stay consistent automatically.
export const heroSlides = slides
    .filter((s) => s.enabled !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
