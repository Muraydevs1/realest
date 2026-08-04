/* eslint-disable react/prop-types */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import gsap from 'gsap'
import { heroSlides } from '../assets/heroSlides'
import { usePrefersReducedMotion } from '../utils/motion'

const AUTOPLAY_MS = 6000        // slow enough to read the hero content
const MANUAL_RESUME_MS = 12000  // autoplay hold-off after prev/next/indicator use
const FADE_S = 1                // crossfade duration

// Zero enabled slides is a config mistake: fail loudly in dev, render a safe
// branded backdrop in production so the page never loses its hero content.
function HeroFallback() {
    useEffect(() => {
        console.error('heroSlides: no enabled slides — check src/assets/heroSlides.js')
    }, [])
    return <HeroShell />
}

function HeroShell({ children }) {
    return (
        <section
            className='relative flex min-h-[88svh] w-full items-center overflow-hidden bg-gradient-to-b from-[#0D1B2A] to-[#1b2c3f] md:min-h-screen'
            id='Header'
        >
            {children}
            <HeroContent />
        </section>
    )
}

// Static hero copy — identical across slides on purpose (no re-animation,
// no layout shift, no screen-reader churn while images rotate).
function HeroContent({ label, labelRef }) {
    return (
        <div className='relative mx-auto w-full max-w-7xl px-6 pt-24 pb-24 text-center text-white sm:px-16 lg:px-8'>
            {label && (
                <p
                    ref={labelRef}
                    data-hero-eyebrow
                    className='mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm'
                >
                    Featured Project · {label}
                </p>
            )}
            {/* overflow-hidden wrapper gives the headline a clipped upward reveal */}
            <div className='overflow-hidden'>
                {/* clamp(): 36px at 320px viewports scaling smoothly to 72px ≥1280px */}
                <h1 data-hero-headline className='mx-auto max-w-3xl font-semibold leading-[1.1] text-[clamp(2.25rem,5vw+1rem,4.5rem)]'>
                    Explore homes that fit your dream.
                </h1>
            </div>
            <p data-hero-subline className='mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg'>
                Developing, marketing and managing properties across Ghana.
            </p>
            <div data-hero-ctas className='mt-10 flex flex-wrap items-center justify-center gap-4'>
                <a href='#Contacts' className='whitespace-nowrap rounded-full border border-transparent bg-brand-500 px-8 py-3 uppercase text-white transition duration-300 hover:bg-brand-600'>Contact Us</a>
                <Link to='/projects' className='whitespace-nowrap rounded-full border border-white/90 px-8 py-3 uppercase transition duration-300 hover:bg-white hover:text-brand-600'>Projects</Link>
            </div>
        </div>
    )
}

const Header = function () {
    const slides = heroSlides
    const slideCount = slides.length
    const multi = slideCount > 1
    if (slideCount === 0) return <HeroFallback />
    return <HeroCarousel slides={slides} slideCount={slideCount} multi={multi} />
}

function HeroCarousel({ slides, slideCount, multi }) {
    const reducedMotion = usePrefersReducedMotion()
    const rootRef = useRef(null)
    const slideRefs = useRef([])
    const labelRef = useRef(null)
    const prevIndexRef = useRef(0)

    const [index, setIndex] = useState(0)
    // Which slides have their <picture> in the DOM. Start with the current
    // slide plus the next one (preloaded); others mount when first needed so
    // slow connections never download the whole set up front.
    const [mounted, setMounted] = useState(() => slides.map((_, i) => i === 0 || (multi && i === 1)))
    const [userPaused, setUserPaused] = useState(() => {
        try { return sessionStorage.getItem('heroAutoplayPaused') === '1' } catch { return false }
    })
    const [hoverPaused, setHoverPaused] = useState(false)
    const [focusPaused, setFocusPaused] = useState(false)
    const [tabHidden, setTabHidden] = useState(() => document.hidden)
    const [manualHoldAt, setManualHoldAt] = useState(null)
    // Autoplay waits for the entrance animation so the first slide isn't cut short.
    const [entranceDone, setEntranceDone] = useState(false)
    const touchStart = useRef(null)

    const supportsHover = useMemo(() => window.matchMedia('(hover: hover)').matches, [])

    const goTo = useCallback((target, manual) => {
        const next = ((target % slideCount) + slideCount) % slideCount
        setIndex(next)
        setMounted((prev) => {
            if (prev[next] && prev[(next + 1) % slideCount]) return prev
            const copy = [...prev]
            copy[next] = true
            copy[(next + 1) % slideCount] = true
            return copy
        })
        if (manual) setManualHoldAt(Date.now())
    }, [slideCount])

    // Swipe navigation (horizontal-dominant, small threshold) — same pattern
    // as the project gallery; counts as manual interaction for the hold-off.
    const handleTouchStart = (e) => {
        const t = e.touches[0]
        touchStart.current = { x: t.clientX, y: t.clientY }
    }
    const handleTouchEnd = (e) => {
        if (!touchStart.current) return
        const t = e.changedTouches[0]
        const dx = t.clientX - touchStart.current.x
        const dy = t.clientY - touchStart.current.y
        touchStart.current = null
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return
        goTo(index + (dx < 0 ? 1 : -1), true)
    }

    // --- autoplay: exactly one pending timer, re-armed per index/pause change ---
    const autoplayBlocked = !multi || !entranceDone || userPaused || hoverPaused || focusPaused || tabHidden || reducedMotion
    useEffect(() => {
        if (autoplayBlocked) return undefined
        const holdRemaining = manualHoldAt ? manualHoldAt + MANUAL_RESUME_MS - Date.now() : 0
        const t = setTimeout(() => {
            setManualHoldAt(null)
            goTo(index + 1, false)
        }, Math.max(AUTOPLAY_MS, holdRemaining))
        return () => clearTimeout(t)
    }, [index, autoplayBlocked, manualHoldAt, goTo])

    useEffect(() => {
        const onVis = () => setTabHidden(document.hidden)
        document.addEventListener('visibilitychange', onVis)
        return () => document.removeEventListener('visibilitychange', onVis)
    }, [])

    const toggleUserPaused = () => {
        setUserPaused((p) => {
            try { sessionStorage.setItem('heroAutoplayPaused', p ? '0' : '1') } catch { /* private mode */ }
            return !p
        })
    }

    // --- entrance: runs once; skipped entirely under reduced motion so the
    // content is simply visible (gsap.from also means content shows if JS dies
    // before this effect) ---
    useLayoutEffect(() => {
        if (reducedMotion) {
            setEntranceDone(true)
            return undefined
        }
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => setEntranceDone(true),
            })
            tl.from('[data-hero-eyebrow]', { y: 20, autoAlpha: 0, duration: 0.6 })
                .from('[data-hero-headline]', { yPercent: 70, autoAlpha: 0, duration: 1 }, '-=0.35')
                .from('[data-hero-subline]', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.55')
                .from('[data-hero-ctas]', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.4')
                .fromTo('[data-hero-controls]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.3')
        }, rootRef)
        return () => ctx.revert()
    }, [reducedMotion])

    // --- slide transition: restrained crossfade + tiny settle-scale ---
    useEffect(() => {
        const prev = prevIndexRef.current
        if (prev === index) return
        prevIndexRef.current = index
        const incoming = slideRefs.current[index]
        const outgoing = slideRefs.current[prev]
        if (!incoming) return
        gsap.killTweensOf([incoming, outgoing].filter(Boolean))
        if (reducedMotion) {
            gsap.set(incoming, { autoAlpha: 1, scale: 1 })
            if (outgoing) gsap.set(outgoing, { autoAlpha: 0 })
        } else {
            gsap.fromTo(incoming, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: FADE_S, ease: 'power2.out', overwrite: 'auto' })
            if (outgoing) gsap.to(outgoing, { autoAlpha: 0, duration: FADE_S, ease: 'power2.out', overwrite: 'auto' })
            if (labelRef.current) gsap.fromTo(labelRef.current, { autoAlpha: 0.3 }, { autoAlpha: 1, duration: 0.5 })
        }
    }, [index, reducedMotion])

    useEffect(() => () => gsap.killTweensOf(slideRefs.current.filter(Boolean)), [])

    const current = slides[index]

    return (
        <section
            ref={rootRef}
            id='Header'
            aria-roledescription='carousel'
            aria-label='Murray Investments featured projects'
            className='relative flex min-h-[88svh] w-full items-center overflow-hidden bg-[#0D1B2A] md:min-h-screen'
            onMouseEnter={supportsHover ? () => setHoverPaused(true) : undefined}
            onMouseLeave={supportsHover ? () => setHoverPaused(false) : undefined}
            onFocusCapture={() => setFocusPaused(true)}
            onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setFocusPaused(false)
            }}
            onTouchStart={multi ? handleTouchStart : undefined}
            onTouchEnd={multi ? handleTouchEnd : undefined}
        >
            {/* Stacked slides. Only the active one is visible; GSAP owns
                opacity/visibility after mount, React only toggles aria-hidden. */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    ref={(el) => { slideRefs.current[i] = el }}
                    aria-hidden={i !== index}
                    className='absolute inset-0'
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
                >
                    {mounted[i] && (
                        <picture>
                            <source type='image/avif' srcSet={slide.avifSrcSet} sizes='100vw' />
                            <img
                                src={slide.fallbackSrc}
                                srcSet={slide.webpSrcSet}
                                sizes='100vw'
                                width={slide.width}
                                height={slide.height}
                                alt={slide.alt}
                                fetchpriority={i === 0 ? 'high' : undefined}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                decoding='async'
                                className='hero-slide-img h-full w-full object-cover'
                                style={{
                                    '--focal-mobile': slide.focalPosition?.mobile ?? 'center',
                                    '--focal-tablet': slide.focalPosition?.tablet ?? 'center',
                                    '--focal-desktop': slide.focalPosition?.desktop ?? 'center',
                                }}
                            />
                        </picture>
                    )}
                </div>
            ))}

            {/* Scrim for headline/CTA legibility over light areas of any slide */}
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10' aria-hidden='true' />

            <HeroContent label={current.label} labelRef={labelRef} />

            {multi && (
                <>
                    {/* 44x44 arrow targets, inset from edges, clear of the padded text column */}
                    <button
                        type='button'
                        onClick={() => goTo(index - 1, true)}
                        aria-label='Previous slide'
                        data-hero-controls
                        className='absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block'
                    >
                        <ChevronLeft className='size-6' aria-hidden='true' />
                    </button>
                    <button
                        type='button'
                        onClick={() => goTo(index + 1, true)}
                        aria-label='Next slide'
                        data-hero-controls
                        className='absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block'
                    >
                        <ChevronRight className='size-6' aria-hidden='true' />
                    </button>

                    {/* Indicators + always-visible pause/play (not hover-gated) */}
                    <div
                        data-hero-controls
                        className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-black/25 px-1.5 py-0.5 backdrop-blur-sm'
                    >
                        {slides.map((slide, i) => (
                            <button
                                key={slide.id}
                                type='button'
                                onClick={() => goTo(i, true)}
                                aria-label={`Go to slide ${i + 1} of ${slideCount}: ${slide.label}`}
                                aria-current={i === index ? 'true' : undefined}
                                className='flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                            >
                                <span
                                    aria-hidden='true'
                                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${i === index ? 'bg-white' : 'bg-white/30 ring-1 ring-white/70'}`}
                                />
                            </button>
                        ))}
                        <button
                            type='button'
                            onClick={toggleUserPaused}
                            aria-label={userPaused ? 'Play automatic slideshow' : 'Pause automatic slideshow'}
                            aria-pressed={userPaused}
                            className='ml-0.5 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                        >
                            {userPaused
                                ? <Play className='size-3.5' aria-hidden='true' />
                                : <Pause className='size-3.5' aria-hidden='true' />}
                        </button>
                    </div>

                    {/* Restrained announcement for assistive tech; focus never moves */}
                    <p className='sr-only' aria-live='polite'>
                        Slide {index + 1} of {slideCount}: {current.label}
                    </p>
                </>
            )}
        </section>
    )
}

export default Header
