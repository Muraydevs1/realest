import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'



const Header = function () {
    return (
        <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden' style = {{backgroundImage:"url('https://cdn.pixabay.com/photo/2017/06/13/22/42/twilight-2400368_1280.jpg')"}} id='Header'>
            <Navbar/>
            <div
             className='text-white container text-center py-4 px-6 mx-auto md:px-20 lg:px-32' >
                <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20 '>
                Explore Homes that fit your dream
                </h2>
          <div className='space-x-6 mt-16'>
            <Link to="/projects" className='border border-orange-500 hover:text-gray-400 hover:bg-white px-8 py-3 rounded-full cursor-pointer uppercase'>Projects</Link>
            <a href="#Contacts" className='border bg-orange-500 hover:bg-white hover:text-orange-500 border-white px-8 py-3 rounded-full cursor-pointer uppercase'>Contact Us</a>
          </div>
        </div>
        </div>
    )
}

export default Header
 