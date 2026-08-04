import { useRef } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useReveal } from '../utils/motion'
import { SECONDARY_CTA } from '../utils/ui'


function About() {
    const sectionRef = useRef(null)
    useReveal(sectionRef)
    return (
        <div
         ref={sectionRef}
         className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8' id='About'>
            <h2 data-reveal className='text-3xl sm:text-4xl font-bold mb-2'>About <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'
            >Our Company</span></h2>
            <p className='text-gray-500 max-w-80 text-center mb-8 '>Passionate About Properties, Dedicated to Your Vision </p>
            {/* image + text reveal as one paired composition */}
            <div data-reveal-group className='flex flex-col md:flex-row items-center md:items-start md:gap-20  '>
                <img data-reveal-item src={assets.front_east} className='w-full sm:w-1/2 max-w-lg rounded-2xl object-cover' alt="Completed Murray Investments 5-bedroom house in East Legon" width="1243" height="1600" loading="lazy" decoding="async" />
                <div data-reveal-item className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
                    {/* Three stats stay on ONE row at every width — numbers scale
                        fluidly (24px small phones -> 36px desktop) so nothing wraps
                        or orphans. Cells center on mobile, left-align on desktop. */}
                    <div data-reveal-group className='grid w-full grid-cols-3 gap-2 sm:gap-6 md:gap-10 2xl:pr-28'>
                        <div data-reveal-item className='min-w-0 text-center md:text-left'>
                            <p className='font-medium leading-tight text-brand-500 text-[clamp(1.5rem,6vw,2.25rem)]'>10+</p>
                            <p className='mt-1 text-xs leading-snug sm:text-sm lg:text-base'>Years of Experience</p>
                        </div>
                        <div data-reveal-item className='min-w-0 text-center md:text-left'>
                            <p className='font-medium leading-tight text-brand-500 text-[clamp(1.5rem,6vw,2.25rem)]'>20+</p>
                            <p className='mt-1 text-xs leading-snug sm:text-sm lg:text-base'>Projects Completed</p>
                        </div>
                        <div data-reveal-item className='min-w-0 text-center md:text-left'>
                            <p className='font-medium leading-tight text-brand-500 text-[clamp(1.5rem,6vw,2.25rem)]'>5+</p>
                            <p className='mt-1 text-xs leading-snug sm:text-sm lg:text-base'>Ongoing Projects</p>
                        </div>
                    </div>
                    <p className='mt-8 mb-4 max-w-lg text-base leading-relaxed text-gray-700 md:text-lg'>
                        Murray Investments Co. Ltd. is a multiline realty company established to provide diversified and innovative products in the real estate industry in Ghana. The company develops, markets and manages properties of all sorts.
                        Our mission is to provide customized and innovative housing products and services by deploying new and cost effective technology, while providing secure legal cover, and delivering in a contractually bound manner.
                    </p>
                    <p className='italic text-brand-500'>&ldquo;Your Customized Housing Solutions Provider&rdquo;</p>
                    <Link to="/about" className={`${SECONDARY_CTA} mt-6`}>Learn More About Us</Link>
                </div>
            </div>
        </div>
    )
}

export default About
