"use client";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, try to scroll to the element
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a timeout to ensure the element is rendered and the page has settled
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to allow page rendering
        return () => clearTimeout(timer);
      }
    } else {
      // If no hash, scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Depend on both pathname and hash

  return null;
};

export default ScrollToTop;