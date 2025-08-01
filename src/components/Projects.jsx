import React from 'react'
import { assets, projectsData } from '../assets/assets'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Projects() {
    const [CurrentIndex, setCurrentIndex] = useState(0)
    const [CardstoShow, setCardstoShow] = useState(1)
    const navigate = useNavigate();

    const doubledProjects = [...projectsData, ...projectsData];

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardstoShow(projectsData.length);
            } else {
                setCardstoShow(1);
            }
        };
        updateCardsToShow();

        window.addEventListener('resize', updateCardsToShow);

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % projectsData.length);
        }, 5000);

        return () => {
            window.removeEventListener('resize', updateCardsToShow);
            clearInterval(interval);
        };
    }, []);

    const nextProject = () => {
        setCurrentIndex((prevIndex)=> (prevIndex +1) % projectsData.length);
    }

    const previousProject = () => {
        setCurrentIndex((prevIndex)=> prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1);
    }

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div 
        className='container mx-auto py-4 pt-10 px-6 md:px-20 lg:px-32 my-20 w-full overflow-x-hidden' id='Projects'>
            <h1 className='text-center font-bold mb-2 text-2xl sm:text-4xl'>Our <span className='underline  decoration-orange-400  underline-offset-4 decoration-1 font-light'>Projects</span></h1>
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
                <div 
                  className='flex gap-8'
                  style={{
                    transform: `translateX(-${(CurrentIndex * 100) / CardstoShow}%)`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                    {doubledProjects.map((projects, index)=>(
                        <div 
                          key={index} 
                          className='relative flex-shrink-0 w-full sm:w-1/4 hover:cursor-pointer'
                          onClick={() => handleProjectClick(projects.id)}
                        > 
                        <img src={projects.frontimage} alt={projects.alt} className='w-full h-max object-cover mb-14'/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-orange-50 w-3/4 px-4 py-2 shadow-md text-center'>
                                <h2 className='text-lg font-normal text-gray-800'>
                                    {projects.title}
                                </h2>
                                <p className='text-gray-500 text-sm'>{projects.location} </p>
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