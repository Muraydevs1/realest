import WhatSetsUsApart from "../components/WhatSetsUsApart";
import AboutPage from "./AboutPage";
import { usePageMeta } from "../utils/seo";
import { PAGE_META } from "../utils/routeMeta";

// Testimonials is intentionally not rendered: the current entries are
// placeholder content. Re-add <Testimonials /> once real client quotes exist.
function AboutUs() {
    usePageMeta(PAGE_META.about)
    return (
    <main id="main-content" className="pt-20">
        <AboutPage/>
        <WhatSetsUsApart/>
    </main>
    )
}

export default AboutUs
