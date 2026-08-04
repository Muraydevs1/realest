import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-20'>
            <p className='text-6xl font-bold text-brand-500 mb-4'>404</p>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Page not found</h1>
            <p className='text-gray-500 mb-8'>The page you are looking for does not exist or has been moved.</p>
            <Link to='/' className='bg-brand-500 text-white hover:bg-brand-600 px-8 py-3 rounded-full uppercase transition duration-300'>
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound
