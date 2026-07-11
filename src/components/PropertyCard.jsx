/* eslint-disable react/prop-types */
import { MapPin, Images, Video, ArrowUpRight } from 'lucide-react'

function PropertyCard({ project, onClick }) {
    const isCompleted = project.status?.includes('Completed')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
        }
    }

    return (
        <article
            role="link"
            tabIndex={0}
            aria-label={`View details of ${project.title} in ${project.location}`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className='group cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'
        >
            <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100'>
                <img
                    src={project.frontimage}
                    alt={project.alt}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium shadow-sm ${
                        isCompleted
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                    }`}
                >
                    {isCompleted ? 'Completed' : 'Under Construction'}
                </span>
            </div>

            <div className='space-y-3 py-4'>
                <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1 space-y-1'>
                        <h2 className='text-lg font-bold leading-tight text-gray-800'>{project.title}</h2>
                        <p className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='size-4 text-orange-400' aria-hidden='true' />
                            {project.location}
                        </p>
                    </div>
                    <span
                        className='mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-300 group-hover:border-orange-400 group-hover:bg-orange-400 group-hover:text-white'
                        aria-hidden='true'
                    >
                        <ArrowUpRight className='size-4' />
                    </span>
                </div>

                <p className='line-clamp-2 text-sm text-gray-500'>{project.description}</p>

                <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5'>
                        <Images className='size-4 text-gray-400' aria-hidden='true' />
                        <span className='text-xs text-gray-600'>{project.image.length} photos</span>
                    </div>
                    {project.video && (
                        <div className='flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5'>
                            <Video className='size-4 text-gray-400' aria-hidden='true' />
                            <span className='text-xs text-gray-600'>Video tour</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}

export default PropertyCard
