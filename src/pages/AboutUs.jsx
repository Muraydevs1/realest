import WhatSetsUsApart from "../components/WhatSetsUsApart";
import AboutPage from "./AboutPage";

// Testimonials is intentionally not rendered: the current entries are
// placeholder content. Re-add <Testimonials /> once real client quotes exist.
function AboutUs() {
    return (
    <div className="pt-20">
        <AboutPage/>
        <WhatSetsUsApart/>
    </div>
    )
}

export default AboutUs
