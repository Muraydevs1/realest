import React from 'react'
import { assets } from '../assets/assets'


function About() {
    return (
        <div
         className='flex flex-col items-center justify-center container mx-auto p-14 md:p-20 lg:px-32 w-full overflow-hidden' id='About'>
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
                    <p className='my-10 max-w-lg text-gray-700 text-justify md:text-xl mt-4 leading-relaxed'> Murray Investments Ltd. is a reputable real estate development and construction firm committed to excellence in the built environment. With a strong focus on development, management, and marketing, the company specializes in the sales and rentals of all types of properties.

Driven by a dedication to quality and client satisfaction, Murray Investments delivers end-to-end real estate solutions, ranging from conceptual planning and development to comprehensive property management services. Whether you’re looking to invest, build, buy, or lease, Murray stands as a trusted partner in real estate.

Our extensive experience in the industry, combined with strategic marketing approaches and efficient management practices, positions us as a key player in the property sector.</p>
                    <button className='bg-orange-500 text-white px-8 py-2 rounded hover:bg-blue-700 '>Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default About
