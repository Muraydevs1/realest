import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


function AboutPage() {
    return (
        <div
         className='flex flex-col items-center justify-center container mx-auto p-14 md:p-20 lg:px-32 w-full -mt-10 overflow-hidden' id='About'>
            <h1 className='text-2xl md:text-4xl font-bold mb-2 id="About"'>About <span className='underline  decoration-orange-400  underline-offset-4 decoration-1 under font-light'
            >Our Brand</span></h1>
            <p className='text-gray-500 w-full max-w-xl lg:max-w-3xl text-center px-4 md:px-6 lg:px-0 -mt-3'>Murray Investment can help you own your dream house. </p>
                    <div className='my-10 w-full max-w-2xl lg:max-w-4xl text-gray-700 text-justify text-lg md:text-xl leading-loose space-y-3 px-4 md:px-6 lg:px-0'> 
                        <p>
                        Murray Investments Co. Ltd is a multiline realty company established to provide diversified and innovative products in the real estate industry in Ghana. The company develops, markets and manages properties of all sorts.
                        </p>
                        <p className='mt-4'>
                        <h6 className='text-orange-500 font-light italic'>Our Mission</h6>
                        Our mission is to provide customized and innovative housing products and services by deploying new and cost effective technology, while providing secure legal cover, and delivering in a contractually bound manner.
                        </p>
                        <p className='mt-4'>
                        <h6 className='italic text-orange-500 font-light'>Development</h6>
                        The company undertakes the splash system of real estate thereby giving much priority to location. Under this system houses are not grouped at one location. Customers are therefore not obliged to acquire properties at locations they do not desire. Apart from outright development of houses for sale, we also custom build houses to the specific tastes and needs of our clients. This means that our customer provide inputs throughout the entire delivery process. Indeed, we deliver your products on your terms. In addition, customers can choose their own designs and we will deliver according to their specifications.
                        </p>
                        <p className='mt-4'>
                        <h6 className='italic text-orange-500 font-light'>Our Reach</h6>
                        Our coverage is national and sub-regional. We deliver products to customers in Ghana and the West African Sub region. We have developed and delivered products in Ouagadougou and Bobodiolaso in Burkina Faso.
                        </p>
                        <p className='mt-4'>
                        <h6 className='italic text-orange-500 font-light'>Marketing</h6>
                        We Market properties whether developed by as or a competitor.
                        </p>
                    </div>
                    <div  className='my-10 w-full max-w-2xl lg:max-w-4xl text-gray-700 text-justify text-lg md:text-xl leading-loose space-y-3 px-4 md:px-6 lg:px-0'>
                        <div>
                            <h2 className='font-semibold text-orange-500 text-center mb-4'>LEGAL COVERAGE</h2>
                            <p className='text-gray-700 text-justify mb-4'>
                                We do not only deliver high quality products and services to our customers, but more importantly we ensure complete legal coverage on all properties free from any encumbrances and with properly vested estate interests. At Murray Investment Co. Ltd., a good product is also one with the appropriate and legally enforceable cover.
                            </p>
                        </div>
                        <div>
                            <h2 className='font-light text-orange-500 mt-4'>TERMS OF PAYMENT</h2>
                            <p>
                                <ul>
                                    <li className='mb-3'>(A) Houses could be purchased by cash or by mortgage</li>
                                    <li className='mb-3'>(B) Another option is a 50% deposit for commencement of the project and a final payment of the other 50% on completion of the house.</li>
                                    <li className='mb-3'>(C) The third option requires a down payment of 50% of the cost of the house and the balance paid by monthly installments</li>
                                    <li className='mb-3'>(D) There is yet a fourth option for those who have had bad experience in the past with developers not keeping to their word. In this option, Murray Investment permits a customer to introduce a guarantor who pays for the cost of the house, which will be built to the specifications of the customer. This way, the customer enjoys that advantage of owning his dream house before it is paid for.</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
    )
}

export default AboutPage
