// Shared button styles.
//
// Two levels only, so the visual hierarchy stays legible:
//
//   PRIMARY   — filled brand red. Reserved for high-priority conversion
//               actions: the hero "Contact Us", the contextual WhatsApp/phone
//               enquiry buttons on a property page, and error-recovery CTAs.
//               Written inline where used; there is no shared constant because
//               those buttons vary (some sit on photos, some on tinted panels).
//
//   SECONDARY — outlined brand red that fills on hover. Used by every
//               section-level "go see more" CTA on the homepage. These share
//               ONE constant so border width, radius, padding, type size,
//               transition, hover, active and focus can never drift apart.
//
// `inline-flex` + `gap-2` means an icon can be dropped in later and will align
// and inherit `currentColor` (including the hover/active colour change) with
// no further styling. Only colours change between states, so hovering never
// shifts layout.
export const SECONDARY_CTA = [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-full border border-brand-500 px-8 py-3',
    'text-base uppercase text-brand-600',
    'transition duration-300',
    'hover:bg-brand-500 hover:text-white',
    'active:border-brand-600 active:bg-brand-600 active:text-white',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
].join(' ')
