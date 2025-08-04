import React from 'react'
import { assets } from '../assets/assets'



function Services() {
    return (
        <section className='max-w-7xl mx-auto px-6 py-16' id='Services'>
            <h2 className="text-center font-bold mb-2 text-2xl sm:text-4xl">Our <span className='underline decoration-orange-400 underline-offset-4 decoration-1 font-light'>Services</span></h2>
             <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>We Provide Trusted and End to End Real Estate Services Across Ghana.</p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition" id='PropRen'>
                    <div className="mb-4">
                         <img src={assets.proprenovation_png} alt="Property Renovation" className="w-full h-auto mb-14" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Property Renovation</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Modification of properties to suit customer tastes. Customizing or upgrading uncompleted or existing properties based on buyer needs.

                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition" id='PropDev'>
                    <div className="mb-4">
                        <img src={assets.propdevelopment_png}alt="Property Development" className="w-full h-auto mb-14" />
                    </div>                                                                                  
                    <h3 className="text-xl font-semibold mb-2 text-center">Property Development</h3>
                    <p className="text-gray-700 text-sm leading-relaxed ">
                        Sale of uncompleted properties. Selling homes still under construction to give buyers flexibility in customization.

                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition" id='PropMan'>
                    <div className="mb-4">                                                              
                        <img src={assets.propmanagement_png} alt="Property Management" className="w-full h-auto mb-14" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Property Management</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">           
                        Renting, leasing, and sale of residential and commercial properties. Handling all transactions related to tenant placement, lease agreements, and property sales.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-md shadow hover:shadow-lg transition" id='LandSale'>
                    <div className="mb-4">
                        <img src={assets.landsale_png}alt="Land Sale" className="w-full h-auto mb-14" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Land Sale</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                         Provision of serviced plots for clients. Offering ready-to-build land with infrastructure like roads, drainage, and utilities.
                    </p>                                                                                                        
                </div>                                      
            </div>                   
        </section>
    )
}

export default Services
