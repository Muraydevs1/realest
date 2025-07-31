import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProjectDetails from './pages/ProjectDetails';
import AboutPage from './pages/AboutUs'; 
import Services from './components/Services';
import Projects from './components/Projects';

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
      <div className="w-full overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;