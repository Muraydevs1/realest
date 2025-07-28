import React from 'react'
import { assets, projectsData } from '../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'


function Projects() {
    const [CurrentIndex, setCurrentIndex] = useState(0)
    const [CardstoShow, setCardstoShow] = useState(1)

    useEffect(()=>{const updateCardsToShow =() =>{
        if(window.innerWidth >= 1024){
            setCardstoShow(projectsData.length);} else{
                setCardstoShow(1)
            }};
            updateCardsToShow();

            window.addEventListener('resize',updateCardsToShow)
            return ()=> window.removeEventListener('resize', updateCardsToShow);
        },[]
    )

    const nextProject = () => {
        console.log("Next button clicked");
        setCurrentIndex((prevIndex)=> (prevIndex +1) % projectsData.length)}

        const previousProject = () => {
            console.log("Previous button clicked");
            setCurrentIndex((prevIndex)=> prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1)}
    

    return (
        <div 
        className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-x-hidden' id='Projects'>
            <h1 className='text-center font-bold mb-2 text-2xl sm:text-4xl'>Projects <span className='underline  decoration-orange-400  underline-offset-4 decoration-1 font-light'>Completed</span></h1>
            <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Crafting Space, Building Legacies-Explore our Portfolio</p>
            <div className='flex justify-end items-center mb-8'>
                <button onClick={previousProject}
                className='p-4 bg-orange-300 hover:bg-orange-500 rounded mr-2' aria-label='previous project'>
                    <img src={assets.left_arrow} alt="previous"  />
                </button>
                <button onClick={nextProject}
                 className='p-4 bg-orange-300 hover:bg-orange-500 rounded mr-2' aria-label='next project'>
                    <img src={assets.right_arrow} alt="next"  />
                </button>
            </div>

            <div className='overflow-hidden'>
                <div className='flex gap-8 transition-transform duration-500 ease-in-out'
                style={{transform: `translateX(-${(CurrentIndex*100)/CardstoShow}%)`}}>
                    {projectsData.map((projects, index)=>(
                        <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'> 
                        <img src={projects.image} alt={projects.title} className='w-full h-auto mb-14'/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-orange-50 w-3/4 px-4 py-2 shadow-md'>
                                <h2 className='text-xl font-semibold text-gray-800'>
                                    {projects.title}
                                </h2>
                                <p className='text-gray-500 text-sm'> {projects.price} <span>/</span>{projects.location} </p>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Projects
