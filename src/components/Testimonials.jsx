import React from 'react'
import { assets, testimonialsData } from '../assets/assets'


function Testimonials() {
    return (
        <div
        className='container py-10 mx-auto lg:px-32 w-full overflow-hidden' id='Testimonials'>
            <h1 className='text-center font-bold mb-2 text-2xl sm:text-4xl'>Customer <span className='underline  decoration-orange-400  underline-offset-4 decoration-1 font-light'>testimonials</span></h1>
            <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Real stories from Those Who Found Home With Us</p>

            <div className='flex flex-wrap justify-center gap-8 '>
                {testimonialsData.map((testimonial, index)=>(
                    <div key={index} className='max-w-[320px] border shadow-lg bg-orange-50 rounded px-8 py-12 text-center'>
                        <img className='w-20 h-20 rounded-full mx-auto mb-4  ' src={testimonial.image} alt="testimonial.alt" />
                        <h2 className='text-xl text-gray-700 font-medium'>{testimonial.name}</h2>
                        <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>
                        <div className='flex justify-center gap-1 text-red-500 mb-4'>
                            {Array.from({length: testimonial.rating },(item,index)=>(
                                <img src={assets.star_icon} key={index} alt="" />
                            ))}
                        </div>
                        <p className='text-gray-600'>{testimonial.text}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Testimonials
 