import { Link } from 'react-router-dom'
import { usePageMeta } from '../utils/seo'

function NotFound() {
    // noindex: error pages must never enter the search index.
    usePageMeta({
        title: 'Page Not Found | Murray Investments Co. Ltd.',
        description: 'The page you are looking for does not exist or has been moved.',
        path: '/404',
        robots: 'noindex, follow',
    })
    return (
        <main id='main-content' className='min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-20'>
            <p className='text-6xl font-bold text-brand-500 mb-4'>404</p>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Page not found</h1>
            <p className='text-gray-500 mb-8'>The page you are looking for does not exist or has been moved.</p>
            <div className='flex flex-wrap items-center justify-center gap-3'>
                <Link to='/' className='bg-brand-500 text-white hover:bg-brand-600 px-8 py-3 rounded-full uppercase transition duration-300'>
                    Back to Home
                </Link>
                <Link to='/properties' className='border border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white px-8 py-3 rounded-full uppercase transition duration-300'>
                    View Properties
                </Link>
            </div>
        </main>
    )
}

export default NotFound
