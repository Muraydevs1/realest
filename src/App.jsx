import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { enquiryMessage, whatsappUrl } from './utils/listings';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProjectDetails from './pages/ProjectDetails';
import AboutUs from './pages/AboutUs';
import Services from './components/Services';
import Projects from './components/Projects';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { usePageMeta } from './utils/seo';


function Home() {
  usePageMeta({
    title: 'Murray Investments Co. Ltd. | Real Estate Development in Ghana',
    description:
      'Murray Investments Co. Ltd. is a Ghanaian real estate company that develops, markets and manages properties across Ghana and the West African sub-region.',
    path: '/',
  });
  return (
    <main id="main-content">
      <Header />
      <About />
      <Projects />
      <Services />
    </main>
  );
}

// Project-detail pages carry their own contextual enquiry CTA, so the
// global floating WhatsApp button is suppressed there.
function useIsProjectDetailPage() {
  const { pathname } = useLocation();
  return /^\/projects\/[^/]+$/.test(pathname);
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const onDetailPage = useIsProjectDetailPage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed ${onDetailPage ? 'bottom-6' : 'bottom-[5.5rem]'} right-6 z-30 h-12 w-12 bg-brand-500 text-white rounded-full shadow-md hover:bg-brand-600 transition duration-300`}
      aria-label="Scroll back to top"
    >
      ↑
    </button>
  );
}

function FloatingWhatsAppButton() {
  const onDetailPage = useIsProjectDetailPage();

  if (onDetailPage) return null;

  return (
    <a
      href={whatsappUrl(enquiryMessage(null))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Murray Investments Co. Ltd. on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition duration-300 hover:bg-[#1ebe5b]"
    >
      <FaWhatsapp className="text-2xl" aria-hidden="true" />
    </a>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full overflow-hidden">
        {/* Keyboard users can jump past the fixed navbar; visible only on focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <BackToTopButton />
        <FloatingWhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
