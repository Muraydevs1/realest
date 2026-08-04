import { useMemo, useRef, useState } from 'react'
import { projectsData } from '../assets/assets'
import PropertyCard from '../components/PropertyCard'
import PropertyFilters from '../components/PropertyFilters'
import { useReveal } from '../utils/motion'
import { createFilters, filterProjects, listingGroups } from '../utils/listings'
import { usePageMeta } from '../utils/seo'

const PropertiesPage = () => {
  const pageRef = useRef(null)
  useReveal(pageRef)
  usePageMeta({
    title: 'Properties | Murray Investments Co. Ltd.',
    description:
      'Browse properties and completed developments by Murray Investments Co. Ltd., including residential projects in East Legon, Dawhenya, Tamale and Frafraha.',
    path: '/properties',
  })

  // Filter state is a plain, URL-serialisable object — see the notes in
  // src/utils/listings.js. Query-param sync can be layered on later without
  // touching the filter UI or the filtering logic.
  const [filters, setFilters] = useState(() => createFilters())
  const results = useMemo(() => filterProjects(projectsData, filters), [filters])

  // Within a result set, entries are still grouped by commercial category, so
  // "Land for Sale" appears automatically once verified land listings exist.
  const sections = listingGroups(results)
  const showSectionHeadings = sections.length > 1

  return (
    <main id='main-content' ref={pageRef} className='mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 lg:px-8'>
      <div data-reveal>
        <h1 className='text-center font-bold mb-2 text-3xl sm:text-4xl'>
          Our <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>Properties</span>
        </h1>
        <p className='mx-auto mb-10 max-w-xl text-center text-gray-500'>
          Browse our portfolio of completed and ongoing developments across Ghana.
        </p>
      </div>

      <PropertyFilters
        projects={projectsData}
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
      />

      {results.length === 0 ? (
        <div className='mx-auto max-w-md rounded-xl border border-gray-200 bg-white px-6 py-14 text-center'>
          <h2 className='text-lg font-semibold text-gray-900'>No properties match these filters</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Try removing a filter to see more of our work.
          </p>
          <button
            type='button'
            onClick={() => setFilters(createFilters())}
            className='mt-6 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium uppercase text-white transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
          >
            Clear filters
          </button>
        </div>
      ) : (
        sections.map((section) => (
          <section key={section.key} className='mb-16 last:mb-0'>
            {/* With a single group the heading is redundant on screen, but the
                h2 level must still exist so card h3s don't skip a level. */}
            <h2 className={showSectionHeadings ? 'mb-6 text-xl font-semibold text-gray-800' : 'sr-only'}>
              {section.heading}
            </h2>
            <div data-reveal-group className='mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-5xl'>
              {section.projects.map((project) => (
                <div key={project.id} data-reveal-item className='h-full'>
                  <PropertyCard project={project} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  )
}

export default PropertiesPage
