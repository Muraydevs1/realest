import Testimonials from "../components/Testimonials";
import WhatSetsUsApart from "../components/WhatSetsUsApart";
import React from "react";
import AboutPage from "./AboutPage";


function AboutUs() {
    return (
    <div className="pt-20">
        <AboutPage/>
        <WhatSetsUsApart/>
        <Testimonials/>
    </div>
    )
}

export default AboutUs
