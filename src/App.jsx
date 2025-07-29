import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import WhatSetsUsApart from './components/WhatSetsUsApart'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Services from './components/Services'



function App() {
  return (
    <div className='w-full overflow-hidden'>
        <Header/>
        <About/>
        <Services/>
        <Projects/>
        <WhatSetsUsApart/>
        <Testimonials/>
        <Footer/>
    </div>
  
  )
}

export default App
