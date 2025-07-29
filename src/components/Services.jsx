import React from 'react'
import { FaBuilding } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaCity } from 'react-icons/fa';
import { MdHomeRepairService } from 'react-icons/md';



function Services() {
    return (
        <section className='max-w-7xl mx-auto px-6 py-16' id='Services'>
            <h2 className="text-center font-bold mb-2 text-2xl sm:text-4xl">Our<span className='underline decoration-orange-400 underline-offset-4 decoration-1 font-light'>Services</span></h2>
             <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>We Provide Trusted and End to End Real Estate Services Across Ghana.</p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                         <MdHomeRepairService className="text-3xl text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Property Renovation</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        We breathe new life into existing structures, upgrading spaces to meet modern standards while preserving their value and integrity.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                        <FaCity className="text-3xl text-orange-600" />
                    </div>                                                                                  
                    <h3 className="text-xl font-semibold mb-2">Property Development</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        From concept to completion, we design and construct high-quality residential and commercial properties that stand the test of time.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">                                                              
                        <FaBuilding className="text-3xl text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">           
                        Our experienced team ensures your assets are well-maintained, tenants are supported, and your investment performs at its best.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition">
                    <div className="mb-4">
                        <FaMapMarkedAlt className="text-3xl text-orange-600"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Land Sale</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                         Whether buying or selling, we connect clients with prime land opportunities backed by due diligence and market expertise.
                    </p>                                                                                                        
                </div>                                      
            </div>                   
        </section>
    )
}

export default Services
