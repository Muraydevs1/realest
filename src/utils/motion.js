// Shared GSAP motion system — ONE motion language for the whole site.
//
// Usage: const ref = useRef(null); useReveal(ref) in a component whose root
// carries ref, then mark elements:
//   data-reveal                    — element fades/slides up on its own trigger
//   data-reveal-group + -item      — items animate together with a stagger,
//                                    one ScrollTrigger per group (batched)
// Reveals run ONCE (once: true); content is fully visible without JS because
// gsap.from() only hides elements the moment the tween initializes.
// Under prefers-reduced-motion nothing is registered at all.
import { useEffect, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Restrained shared values — keep every section reveal consistent.
export const REVEAL = { y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.1 }

export function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const onChange = () => setReduced(mq.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])
    return reduced
}

export function useReveal(scopeRef) {
    const reduced = usePrefersReducedMotion()
    useLayoutEffect(() => {
        if (reduced) return undefined
        const scope = scopeRef.current
        if (!scope) return undefined
        // NOTE: queries must be scoped to this component's element — a bare
        // gsap.utils.toArray('[data-reveal]') searches the whole document and
        // would double-register elements owned by sibling components.
        // fromTo (not from): explicit start AND end values. from() captures the
        // element's current state as the end value at init time, which proved
        // fragile here (a tween could capture an already-hidden state and
        // animate 0 -> 0); fromTo is deterministic.
        const ctx = gsap.context(() => {
            gsap.utils.toArray(scope.querySelectorAll('[data-reveal]')).forEach((el) => {
                gsap.fromTo(el,
                    { y: REVEAL.y, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: REVEAL.duration,
                        ease: REVEAL.ease,
                        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                    })
            })
            gsap.utils.toArray(scope.querySelectorAll('[data-reveal-group]')).forEach((group) => {
                // Only this group's own items — nested groups animate themselves.
                const items = [...group.querySelectorAll('[data-reveal-item]')]
                    .filter((el) => el.closest('[data-reveal-group]') === group)
                if (!items.length) return
                gsap.fromTo(items,
                    { y: REVEAL.y, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: REVEAL.duration,
                        ease: REVEAL.ease,
                        stagger: REVEAL.stagger,
                        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
                    })
            })
        }, scopeRef)
        return () => ctx.revert()
    }, [reduced, scopeRef])
    return reduced
}
