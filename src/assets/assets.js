import star_icon from './star_icon.svg'
// Hero slider imagery lives in ./heroSlides.js (its own config module).
import dahwenya_pic1 from './dawhwnya1.webp'
import dahwenya_pic2 from './dawhwnya2.webp'
import dahwenya_pic3 from './dawhwnya3.webp'
import dahwenya_pic4 from './dawhwnya4.webp'
import dahwenya_pic5 from './dawhwnya5.webp'
import dahwenya_vid from './dawenyavid.mp4'
import dahwenya_poster from './dawenyavid-poster.webp'
// tamale5 was a byte-identical duplicate of tamale3 and has been removed.
// tamale2/3/4/7 stay JPEG: their WebP re-encodes came out larger than the
// originals, so the originals are kept untouched.
import tamale_pic1 from './tamale1.webp'
import tamale_pic2 from './tamale2.jpeg'
import tamale_pic3 from './tamale3.jpeg'
import tamale_pic4 from './tamale4.jpeg'
import tamale_pic6 from './tamale6.webp'
import tamale_pic7 from './tamale7.jpeg'
import eastlegon_pic1 from './eastlegon1.webp'
import eastlegon_pic2 from './eastlegon2.webp'
import eastlegon_pic3 from './eastlegon3.webp'
import eastlegon_pic4 from './eastlegon4.webp'
import eastlegon_pic5 from './eastlegon5.webp'
import frafraha_pic1 from './frafraha.webp'
import frafraha_pic2 from './frafraha1.webp'
import profile_img_1 from './profile_img_1.webp'
import profile_img_2 from './profile_img_2.webp'
import profile_img_3 from './profile_img_3.webp'
// Official company logo, light-background variant (red/black, transparent).
import logoPrimary from './logo.png'
// Dark-background variant: derived pixel-for-pixel from the master logo —
// red elements untouched, black elements recolored white, alpha/geometry
// identical. Used on the navy footer. Regenerate via scripts/optimize-media.mjs
// if the master logo ever changes.
import logoDark from './logo-dark.png'
// Services imagery — authentic Murray photos where they exist:
//   development <- Dawhenya block under construction, management <- completed
//   Dawhenya apartments. Renovation is still a themed stock image and the
//   land-sale photo is a small stock placeholder; both should be replaced
//   when real Murray photos become available (see docs/MEDIA.md).
import service_development from './svc-propdev.webp'
import service_management from './svc-propman.webp'
import service_renovation from './svc-proprenov.webp'
import service_landsale from './landsale.jpeg'
import front_east from './Feastlegon2.webp'
import front_dawhenya from './Fdawhwnya4.webp'
import front_tamale from './Ftamale7.webp'
// Landscape 4:3 cover cropped from the portrait frafraha1 original so the
// card doesn't crop the building awkwardly.
import front_frafraha from './Ffrafraha.webp'

export const assets = {
    service_renovation,
    service_development,
    service_management,
    service_landsale,
    star_icon,
    front_east,
    front_dawhenya,
    front_tamale,
    front_frafraha,
    dahwenya_pic1,
    dahwenya_pic2,
    dahwenya_pic3,
    dahwenya_pic4,
    dahwenya_pic5,
    eastlegon_pic1,
    eastlegon_pic2,
    eastlegon_pic3,
    eastlegon_pic4,
    eastlegon_pic5,
    frafraha_pic1,
    frafraha_pic2,
    tamale_pic1,
    tamale_pic2,
    tamale_pic3,
    tamale_pic4,
    tamale_pic6,
    tamale_pic7,
    dahwenya_vid,
    dahwenya_poster,
    logoPrimary,
    logoDark
}

/*
 * Listing data model
 *
 * FOUR INDEPENDENT DIMENSIONS — never collapse these into one field.
 *
 * 1. category — the commercial relationship: 'sale' | 'rent' | 'portfolio'
 *   All current entries are past/ongoing development work. None is confirmed
 *   as actively for sale or rent, so none carries a commercial category.
 *   Future sale/rent listings: add an entry with category 'sale' or 'rent'
 *   and fill in the commercial fields below with VERIFIED values only.
 *
 * 2. propertyType — what the asset IS:
 *   'house' | 'apartment' | 'land' | 'commercial-property'
 *   Drives derived groupings: "Land for Sale" is category 'sale' +
 *   propertyType 'land' — never a separate, duplicated data source.
 *   Left null on existing entries: the company has not confirmed types, and
 *   the UI hides anything null rather than guessing.
 *
 * 3. projectType — the service that produced it:
 *   'development' | 'renovation' | 'property-management' | 'land-sale'
 *   Ties a project to a service line (e.g. a renovation case study).
 *   Left null on existing entries pending company confirmation.
 *
 * 4. status — where it is in its lifecycle:
 *   'completed' | 'ongoing' | 'under-construction' | 'available'
 *   Machine-readable; presentation labels live in src/utils/listings.js.
 *   A 'completed' portfolio project is NOT implied to be available.
 *
 * condition: 'renovated' | null — optional. A renovated property is never a
 *   top-level category; it is an ordinary sale/rent/portfolio entry that
 *   additionally carries condition 'renovated' and/or projectType
 *   'renovation'. Populate only where verified.
 *
 * Commercial fields (price, currency, pricePeriod ('month'|'year'|'night'),
 * bedrooms, bathrooms, size) stay null until verified data is provided —
 * the UI hides anything that is null. Do not guess values.
 *
 * A land listing needs only: title, location, category 'sale', propertyType
 * 'land', price/currency, size, status, coverImage, images, and (optionally)
 * plans marked public. Bedroom/bathroom fields stay null and self-hide.
 *
 * plans: [{ type: 'floor-plan'|'site-plan'|'architectural-plan',
 *           title, file, public }]
 *   Only entries with `public: true` ever render on the site.
 */
export const projectsData = [
    {
      id: 1,
      slug: "east-legon-5-bedroom-house",
      title: "5 bedroom House",
      location: "East Legon",
      description: "A spacious 5-bedroom house with a modern design.",
      category: "portfolio",
      status: "completed",
      coverImage: front_east,
      alt: "East Legon Project Front View",
      images: [
        front_east,
        eastlegon_pic1,
        eastlegon_pic2,
        eastlegon_pic3,
        eastlegon_pic4,
        eastlegon_pic5,
      ],
      video: null,
      price: null,
      currency: null,
      pricePeriod: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      propertyType: null,   // see model notes: null until company-confirmed
      projectType: null,
      condition: null,
      plans: [],
    },
    {
      id: 2,
      slug: "dawhenya-modern-apartments",
      title: "Modern Apartments",
      location: "Dawhenya",
      description: "A luxurious apartment complex with modern amenities and stunning views.",
      category: "portfolio",
      status: "completed",
      coverImage: front_dawhenya,
      alt: "Dawhenya Project Front View",
      images: [
        dahwenya_pic1,
        dahwenya_pic2,
        dahwenya_pic3,
        dahwenya_pic4,
        dahwenya_pic5,
      ],
      video: dahwenya_vid,
      videoPoster: dahwenya_poster,
      price: null,
      currency: null,
      pricePeriod: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      propertyType: null,   // see model notes: null until company-confirmed
      projectType: null,
      condition: null,
      plans: [],
    },
    {
      id: 3,
      slug: "tamale-guest-house",
      title: "Guest House",
      location: "Tamale",
      description: "A cozy guest house under construction at the airport avenue.",
      category: "portfolio",
      status: "under-construction",
      coverImage: front_tamale,
      alt: "Tamale Project Front View",
      images: [
        tamale_pic1,
        tamale_pic2,
        tamale_pic3,
        tamale_pic4,
        tamale_pic6,
        tamale_pic7,
      ],
      video: null,
      price: null,
      currency: null,
      pricePeriod: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      propertyType: null,   // see model notes: null until company-confirmed
      projectType: null,
      condition: null,
      plans: [],
    },
    {
      id: 4,
      slug: "frafraha-customized-apartments",
      title: "Customized Apartments",
      location: "Frafraha",
      description: "A customized apartment complex with unique designs and features.",
      category: "portfolio",
      status: "under-construction",
      coverImage: front_frafraha,
      alt: "Frafraha Project Front View",
      images: [
        frafraha_pic1,
        frafraha_pic2,
      ],
      video: null,
      price: null,
      currency: null,
      pricePeriod: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      propertyType: null,   // see model notes: null until company-confirmed
      projectType: null,
      condition: null,
      plans: [],
    },
  ];

  export const testimonialsData = [
    {
        name: "Charles Amuri",
        title: "Trader",
        image: profile_img_1,
        alt: "Portrait of Charles Amuri",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Richard Amoah",
        title: "Corporate Worker",
        image: profile_img_2,
        alt: "Portrait of Richard Amoah",
        rating: 4,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "James Mensah",
        title: "Business Owner",
        image: profile_img_3,
        alt: "Portrait of James Mensah",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    }
];
