import WhatSetsUsApart from "../components/WhatSetsUsApart";
import AboutPage from "./AboutPage";
import { usePageMeta } from "../utils/seo";

// Testimonials is intentionally not rendered: the current entries are
// placeholder content. Re-add <Testimonials /> once real client quotes exist.
function AboutUs() {
    usePageMeta({
        title: 'About Our Company | Murray Investments Co. Ltd.',
        description:
            'Murray Investments Co. Ltd. is a multiline realty company in Ghana providing customized housing products, development, marketing and property management, with legal cover on all properties.',
        path: '/about',
    })
    return (
    <main id="main-content" className="pt-20">
        <AboutPage/>
        <WhatSetsUsApart/>
    </main>
    )
}

export default AboutUs
