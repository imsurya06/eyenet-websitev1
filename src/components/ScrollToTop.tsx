"use client";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, try to scroll to the element with that ID
      const element = document.getElementById(hash.substring(1)); // Remove '#' from hash
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If element not found, or if navigating to a new page with a hash,
        // still scroll to top first, then try to scroll to hash.
        // This handles cases where the component might not be rendered yet.
        window.scrollTo(0, 0);
        // A small delay might be needed if the content loads asynchronously
        setTimeout(() => {
          const delayedElement = document.getElementById(hash.substring(1));
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Small delay to allow content to render
      }
    } else {
      // If no hash, just scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Re-run effect when pathname or hash changes

  return null;
};

export default ScrollToTop;