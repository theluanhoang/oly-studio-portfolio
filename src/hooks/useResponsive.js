'use client';

import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1366,
  xl: 1920,
  '2xl': 2560,
};

export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [breakpoint, setBreakpoint] = useState('xs');

  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    }

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return {
    breakpoint,
    windowWidth,
    isXs: windowWidth > 0 && windowWidth < breakpoints.sm,
    isSm: windowWidth >= breakpoints.sm,
    isMd: windowWidth >= breakpoints.md,
    isLg: windowWidth >= breakpoints.lg,
    isXl: windowWidth >= breakpoints.xl,
    is2Xl: windowWidth >= breakpoints['2xl'],
    isMobile: windowWidth > 0 && windowWidth < breakpoints.md,
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: windowWidth >= breakpoints.lg,
  };
}

