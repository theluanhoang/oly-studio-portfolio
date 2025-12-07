'use client';

import { useState, useEffect } from 'react';

export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(79);

  useEffect(() => {
    function updateHeaderHeight() {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    }

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });
    
    const header = document.querySelector('header');
    if (header) {
      resizeObserver.observe(header);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return headerHeight;
}

