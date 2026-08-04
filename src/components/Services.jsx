import { useRef } from 'react'
import { assets } from '../assets/assets'
import { useReveal } from '../utils/motion'

// The four services the company's own copy supports. Each description states
// what the service IS — none of them implies that inventory is currently
// available; live availability is answered through the enquiry flow.
const services = [
    {
        id: 'PropRen',
        title: 'Property Renovation',
        image: assets.service_renovation,
        description: 'We modify and upgrade existing or uncompleted properties to match a client’s taste and requirements, from finishes through to full customisation.',
    },
    {
        id: 'PropDev',
        title: 'Property Development',
        image: assets.service_development,
        description: 'We develop residential properties and custom-build to client specifications, including homes that can be purchased while still under construction.',
    },
    {
        id: 'PropMan',
        title: 'Property Management',
        image: assets.service_management,
        description: 'We rent, lease and sell residential and commercial properties on behalf of owners, handling tenant placement, lease agreements and sale transactions.',
    },
    {
        id: 'LandSale',
        title: 'Land Sale',
        image: assets.service_landsale,
        description: 'We source and sell serviced plots for clients who prefer to build on their own land. Get in touch to discuss current availability and requirements.',
    },
]

function Services() {
    const sectionRef = useRef(null)
    useReveal(sectionRef)
    return (
        <section ref={sectionRef} className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8' id='Services'>
            <h2 data-reveal className="text-center font-bold mb-2 text-3xl sm:text-4xl">Our <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>Services</span></h2>
            <p className='text-center text-gray-500 mb-10 max-w-80 mx-auto'>We Provide Trusted and End to End Real Estate Services Across Ghana.</p>
            {/* 2×2 keeps the four services balanced at every width */}
            <div data-reveal-group className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                {services.map((service) => (
                    /* Informational cards — no card-level link, and no hover
                       lift, so they never read as clickable. Enquiries go
                       through the single CTA below the grid. */
                    <div key={service.id} data-reveal-item className="rounded-lg bg-brand-50 p-6 shadow-sm" id={service.id}>
                        <div className="mb-5 aspect-[3/2] overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">{service.title}</h3>
                        <p className="text-base leading-relaxed text-gray-700">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Single section-level CTA — anchors to the existing contact
                block rather than creating empty per-service routes. */}
            <div data-reveal className="mt-10 text-center">
                <a
                    href="#Contacts"
                    className="inline-block rounded-full border border-brand-500 px-8 py-3 uppercase text-brand-600 transition duration-300 hover:bg-brand-500 hover:text-white"
                >
                    Enquire About A Service
                </a>
            </div>
        </section>
    )
}

export default Services
