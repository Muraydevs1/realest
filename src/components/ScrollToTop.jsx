import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(scrollToHash, 100);
    } else {
      window.addEventListener('load', () => setTimeout(scrollToHash, 100));
    }
  }, [pathname, hash]);

  return null;
}