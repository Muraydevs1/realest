import React from 'react'
import { FaBuilding } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaCity } from 'react-icons/fa';
import { MdHomeRepairService } from 'react-icons/md';



function Services() {
    return (
        <section className='max-w-7xl mx-auto px-6 py-16'>
            <h2 className="text-center font-bold mb-2 text-2xl sm:text-4xl">Our<span className='underline decoration-orange-400 underline-offset-4 decoration-1 font-light'>Services</span></h2>
             <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Our Trusted Company offers the Following Services</p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                         <MdHomeRepairService className="text-3xl text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Property Renovation</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        The highest quality with the best price–performance ratio – this is what we focus all our efforts on. Excellence is our drive. We set ourselves high standards and create innovative solutions.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                        <FaCity className="text-3xl text-orange-600" />
                    </div>                                                                                  
                    <h3 className="text-xl font-semibold mb-2">Property Development</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        To increase efficiency and precision, we use digital construction and innovative methods to use the latest technology. We are technological pioneers.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">                                                              
                        <FaBuilding className="text-3xl text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">           
                        We work with the best planning offices and executing companies on a situational and regional basis, tailored to the property and the initial situation. We are where our customers are.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                        <FaMapMarkedAlt className="text-3xl text-orange-600"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Land Sale</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Our entrepreneurial independence creates full cost transparency and maximum flexibility for our customers. We maintain transparent business relationships.
                    </p>                                                                                                        
                </div>                                      
            </div>                   
        </section>
    )
}

export default Services
