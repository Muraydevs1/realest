import { useRef } from 'react'
import { useReveal } from '../utils/motion'

const companySections = [
    {
        heading: 'Our Mission',
        body: 'Our mission is to provide customized and innovative housing products and services by deploying new and cost effective technology, while providing secure legal cover, and delivering in a contractually bound manner.',
    },
    {
        heading: 'Development',
        body: 'The company undertakes the splash system of real estate thereby giving much priority to location. Under this system houses are not grouped at one location. Customers are therefore not obliged to acquire properties at locations they do not desire. Apart from outright development of houses for sale, we also custom build houses to the specific tastes and needs of our clients. This means that our customer provide inputs throughout the entire delivery process. Indeed, we deliver your products on your terms. In addition, customers can choose their own designs and we will deliver according to their specifications.',
    },
    {
        heading: 'Our Reach',
        body: 'Our coverage is national and sub-regional. We deliver products to customers in Ghana and the West African Sub region. We have developed and delivered products in Ouagadougou and Bobodiolaso in Burkina Faso.',
    },
    {
        heading: 'Marketing',
        body: 'We market properties whether developed by us or by other developers.',
    },
]

const paymentOptions = [
    'Houses could be purchased by cash or by mortgage.',
    'Another option is a 50% deposit for commencement of the project and a final payment of the other 50% on completion of the house.',
    'The third option requires a down payment of 50% of the cost of the house and the balance paid by monthly installments.',
    'There is yet a fourth option for those who have had bad experience in the past with developers not keeping to their word. In this option, Murray Investments Co. Ltd. permits a customer to introduce a guarantor who pays for the cost of the house, which will be built to the specifications of the customer. This way, the customer enjoys that advantage of owning his dream house before it is paid for.',
]

function AboutPage() {
    const pageRef = useRef(null)
    useReveal(pageRef)
    return (
        <div ref={pageRef} className='mx-auto w-full max-w-3xl px-4 py-10 sm:px-6' id='About'>
            <div data-reveal>
                <h1 className='mb-2 text-center text-3xl font-bold sm:text-4xl'>
                    About <span className='underline decoration-brand-500 underline-offset-4 decoration-1 font-light'>Our Company</span>
                </h1>
                <p className='mb-10 text-center text-gray-500'>Murray Investments Co. Ltd. can help you own your dream house.</p>
            </div>

            <p data-reveal className='text-base leading-relaxed text-gray-700 md:text-lg'>
                Murray Investments Co. Ltd. is a multiline realty company established to provide diversified and innovative products in the real estate industry in Ghana. The company develops, markets and manages properties of all sorts.
            </p>

            <div className='mt-10 space-y-8'>
                {companySections.map((section) => (
                    /* one reveal per content group — never per paragraph */
                    <section key={section.heading} data-reveal>
                        <h2 className='mb-2 border-l-4 border-brand-500 pl-3 text-xl font-semibold text-gray-900'>
                            {section.heading}
                        </h2>
                        <p className='text-base leading-relaxed text-gray-700 md:text-lg'>{section.body}</p>
                    </section>
                ))}

                <section data-reveal>
                    <h2 className='mb-2 border-l-4 border-brand-500 pl-3 text-xl font-semibold text-gray-900'>
                        Legal Coverage
                    </h2>
                    <p className='text-base leading-relaxed text-gray-700 md:text-lg'>
                        We do not only deliver high quality products and services to our customers, but more importantly we ensure complete legal coverage on all properties free from any encumbrances and with properly vested estate interests. At Murray Investments Co. Ltd., a good product is also one with the appropriate and legally enforceable cover.
                    </p>
                </section>

                <section data-reveal>
                    <h2 className='mb-4 border-l-4 border-brand-500 pl-3 text-xl font-semibold text-gray-900'>
                        Terms of Payment
                    </h2>
                    <ol className='space-y-3'>
                        {paymentOptions.map((option, index) => (
                            <li key={index} className='flex items-start gap-3'>
                                <span className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600'>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <p className='text-base leading-relaxed text-gray-700 md:text-lg'>{option}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </div>
    )
}

export default AboutPage
