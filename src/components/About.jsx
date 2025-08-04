import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


function About() {
    return (
        <div
         className='flex flex-col items-center justify-center container mx-auto pt-10 p-14 md:p-20 lg:px-32 w-full overflow-hidden' id='About'>
            <h1 className='text-2xl md:text-4xl font-bold mb-2 id="About"'>About <span className='underline  decoration-orange-400  underline-offset-4 decoration-1 under font-light'
            >Our Brand</span></h1>
            <p className='text-gray-500 max-w-80 text-center mb-8 '>Passionate About Properties, Dedicated to Your Vision </p>
            <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20  '>
                <img src= {assets.brand_img} className='w-full sm:w-1/2 max-w-lg' alt="" />  
                <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
                    <div className='grid grid-cols-2 gap-6  md:gap-10 w-full 2xl:pr-28'>
                        <div>
                            <p className='font-medium text-orange-500 text-4xl'>10+</p>
                            <p>Years of Experience</p>
                        </div>
                        <div>
                            <p className='font-medium text-orange-500 text-4xl'>20+</p>
                            <p>Projects Completed</p>
                        </div>
                        <div>
                            <p className='font-medium text-orange-500 text-4xl'>20+</p>
                            <p>Mn. Sq. Ft. Delivered</p>
                        </div>
                        <div>
                            <p className='font-medium text-orange-500 text-4xl'>5+</p>
                            <p>Ongoing Projects</p>
                        </div>
                    </div>
                    <p className='my-10 max-w-lg text-gray-700 text-justify md:text-xl text-xl mt-4 leading-relaxed'> 
                        Murray Investments Co. Ltd is a multiline realty company established to provide diversified and innovative products in the real estate industry in Ghana. The company develops, markets and manages properties of all sorts.
                        Our mission is to provide customized and innovative housing products and services by deploying new and cost effective technology, while providing secure legal cover, and delivering in a contractually bound manner.
                    </p>
                    <p className='italic text-orange-500 -mt-7 font-serif text-justify'>"Your Customized Housing Solutions Provider"</p>
                    <Link to="/about" className='border border-orange-500 hover:text-gray-400 hover:bg-white px-5 py-3 rounded-full cursor-pointer uppercase mt-6'>Learn More</Link>
                </div>
            </div>
        </div>
    )
}

export default About
