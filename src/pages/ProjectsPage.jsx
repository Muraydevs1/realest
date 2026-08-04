import { useRef } from 'react'
import { projectsData } from '../assets/assets'
import PropertyCard from '../components/PropertyCard'
import { useReveal } from '../utils/motion'
import { listingGroups } from '../utils/listings'

const ProjectsPage = () => {
  const pageRef = useRef(null)
  useReveal(pageRef)
  // Groups come back only when they contain entries, so "Properties for Sale",
  // "Land for Sale" and "Properties for Rent" appear the moment verified
  // listings are added — and never render empty before that.
  const sections = listingGroups(projectsData)

  const showSectionHeadings = sections.length > 1

  return (
    <main ref={pageRef} className='mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 lg:px-8'>
      <div data-reveal>
        <h1 className='text-center font-bold mb-2 text-3xl sm:text-4xl'>
          Our <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>Projects</span>
        </h1>
        <p className='mx-auto mb-12 max-w-xl text-center text-gray-500'>
          Browse our portfolio of completed and ongoing developments across Ghana.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.key} className='mb-16 last:mb-0'>
          {showSectionHeadings && (
            <h2 className='mb-6 text-xl font-semibold text-gray-800'>{section.heading}</h2>
          )}
          {/* 2×2 for the current four-item portfolio; grows to 3 columns later */}
          <div data-reveal-group className='mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-5xl'>
            {section.projects.map((project) => (
              <div key={project.id} data-reveal-item className='h-full'>
                <PropertyCard project={project} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default ProjectsPage
