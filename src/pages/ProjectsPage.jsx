import { useRef } from 'react'
import { projectsData } from '../assets/assets'
import PropertyCard from '../components/PropertyCard'
import { useReveal } from '../utils/motion'
import { listingGroups } from '../utils/listings'
import { usePageMeta } from '../utils/seo'

const ProjectsPage = () => {
  const pageRef = useRef(null)
  useReveal(pageRef)
  usePageMeta({
    title: 'Our Projects | Murray Investments Co. Ltd.',
    description:
      'Browse completed and ongoing developments by Murray Investments Co. Ltd., including residential projects in East Legon, Dawhenya, Tamale and Frafraha.',
    path: '/projects',
  })
  // Groups come back only when they contain entries, so "Properties for Sale",
  // "Land for Sale" and "Properties for Rent" appear the moment verified
  // listings are added — and never render empty before that.
  const sections = listingGroups(projectsData)

  const showSectionHeadings = sections.length > 1

  return (
    <main id='main-content' ref={pageRef} className='mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 lg:px-8'>
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
          {/* With a single group the heading is redundant on screen, but the
              h2 level must still exist so card h3s don't skip a level. */}
          <h2 className={showSectionHeadings ? 'mb-6 text-xl font-semibold text-gray-800' : 'sr-only'}>
            {section.heading}
          </h2>
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
