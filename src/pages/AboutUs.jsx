import About from "../components/About";
import Testimonials from "../components/Testimonials";
import WhatSetsUsApart from "../components/WhatSetsUsApart";
import React from "react";


function AboutUs() {
    return (
    <div className="pt-20">
        <About>
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
        </About>
        <WhatSetsUsApart/>
        <Testimonials/>
    </div>
    )
}

export default AboutUs
