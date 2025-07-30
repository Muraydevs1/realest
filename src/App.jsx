import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import WhatSetsUsApart from './components/WhatSetsUsApart';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';

function Home() {
  return (
    <>
      <Header />
      <About />
      <WhatSetsUsApart />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="w-full overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;