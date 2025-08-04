import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProjectDetails from './pages/ProjectDetails';
import AboutUs from './pages/AboutUs'; 
import Services from './components/Services';
import Projects from './components/Projects';
import ScrollToTop from './components/ScrollToTop';


function Home() {
  return (
    <>
      <Header />
      <About />
      <Services />
      <Projects />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>
    </Router>
  );
}

export default App;