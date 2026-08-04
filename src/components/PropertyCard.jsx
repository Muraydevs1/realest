/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { MapPin, Images, Video, ArrowUpRight, BedDouble, Bath, Ruler, Home } from 'lucide-react'
import { statusLabel, statusBadgeClasses, categoryLabel, displayPrice, specItems } from '../utils/listings'

const SPEC_ICONS = {
    bedrooms: BedDouble,
    bathrooms: Bath,
    size: Ruler,
    propertyType: Home,
}

function PropertyCard({ project }) {
    const status = statusLabel(project.status)
    const category = categoryLabel(project.category)
    const price = displayPrice(project)
    const specs = specItems(project)

    return (
        <article className='h-full'>
            <Link
                to={`/properties/${project.id}`}
                // Category-aware wording: portfolio entries are development
                // work ("project"), commercial entries are inventory ("property").
                aria-label={`View ${category ? 'property' : 'project'}: ${project.title} in ${project.location}`}
                className='group flex h-full flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1'
            >
                <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-lg'>
                    <img
                        src={project.coverImage}
                        alt={project.alt}
                        loading='lazy'
                        decoding='async'
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className='absolute left-4 top-4 flex flex-wrap gap-2'>
                        {category && (
                            <span className='rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white shadow-sm'>
                                {category}
                            </span>
                        )}
                        {status && (
                            <span className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm ${statusBadgeClasses(project.status)}`}>
                                {status}
                            </span>
                        )}
                    </div>
                </div>

                <div className='flex flex-1 flex-col gap-3 py-4'>
                    <div className='flex items-start justify-between gap-4'>
                        <div className='flex-1 space-y-1'>
                            <h3 className='text-lg font-bold leading-tight text-gray-900 sm:text-xl'>{project.title}</h3>
                            <p className='flex items-center gap-1 text-sm text-gray-500'>
                                <MapPin className='size-4 text-brand-500' aria-hidden='true' />
                                {project.location}
                            </p>
                        </div>
                        <span
                            className='mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white'
                            aria-hidden='true'
                        >
                            <ArrowUpRight className='size-4' />
                        </span>
                    </div>

                    {price && (
                        <p className='text-lg font-semibold text-brand-500'>{price}</p>
                    )}

                    {specs.length > 0 && (
                        <ul className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600'>
                            {specs.map((spec) => {
                                const Icon = SPEC_ICONS[spec.key]
                                return (
                                    <li key={spec.key} className='flex items-center gap-1.5'>
                                        {Icon && <Icon className='size-4 text-gray-400' aria-hidden='true' />}
                                        {spec.label}
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <p className='line-clamp-2 text-sm text-gray-600'>{project.description}</p>

                    <div className='mt-auto flex flex-wrap items-center gap-2 pt-1'>
                        <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5'>
                            <Images className='size-4 text-gray-400' aria-hidden='true' />
                            <span className='text-xs text-gray-600'>{project.images.length} photos</span>
                        </div>
                        {project.video && (
                            <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5'>
                                <Video className='size-4 text-gray-400' aria-hidden='true' />
                                <span className='text-xs text-gray-600'>Video tour</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default PropertyCard
