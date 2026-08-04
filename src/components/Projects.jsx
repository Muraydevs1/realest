import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../assets/assets'
import PropertyCard from './PropertyCard'
import { useReveal } from '../utils/motion'
import { SECONDARY_CTA } from '../utils/ui'

function Projects() {
    const sectionRef = useRef(null)
    useReveal(sectionRef)
    return (
        <section
            ref={sectionRef}
            className='mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'
            id='Projects'
        >
            <h2 data-reveal className='text-center font-bold mb-2 text-3xl sm:text-4xl'>
                Our <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>Projects</span>
            </h2>
            <p className='text-center text-gray-500 mb-10 max-w-80 mx-auto'>
                Crafting Space, Building Legacies-Explore our Portfolio
            </p>

            {/* 2×2 keeps the current four-item portfolio balanced; move to
                lg:grid-cols-3 once the portfolio grows past a screenful */}
            <div data-reveal-group className='mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-5xl'>
                {projectsData.map((project) => (
                    <div key={project.id} data-reveal-item className='h-full'>
                        <PropertyCard project={project} />
                    </div>
                ))}
            </div>

            <div className='mt-12 text-center'>
                <Link
                    to='/properties'
                    className={SECONDARY_CTA}
                >
                    View All Properties
                </Link>
            </div>
        </section>
    )
}

export default Projects
