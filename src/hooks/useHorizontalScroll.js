import { useEffect, useRef, useState, useCallback } from 'react';

export function useHorizontalScroll() {
  const galleryRef = useRef(null);
  const spacerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const setupScrollEffect = useCallback(() => {
    const gallery = galleryRef.current;
    const spacer = spacerRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!gallery || !spacer) {
      return null;
    }

    function calculateTotalWidth() {
      const sections = gallery.querySelectorAll('.project-gallery-section');
      if (sections.length === 0) return 0;
      
      const sectionWidth = sections[0].offsetWidth || 610;
      const gap = 10;
      return sections.length * (sectionWidth + gap) - gap;
    }

    function updateSpacerHeight() {
      const totalWidth = calculateTotalWidth();
      if (totalWidth === 0) {
        spacer.style.height = '100vh';
        return;
      }
      
      const wrapper = gallery.parentElement;
      if (!wrapper) {
        spacer.style.height = `${totalWidth}px`;
        return;
      }
      
      const wrapperWidth = wrapper.offsetWidth;
      const availableWidth = wrapperWidth;
      
      const scrollDistance = totalWidth - availableWidth;
      
      if (scrollDistance > 0) {
        spacer.style.height = `${scrollDistance + window.innerHeight}px`;
      } else {
        spacer.style.height = '100vh';
      }
    }

    let ticking = false;

    function updateGalleryPosition() {
      const totalWidth = calculateTotalWidth();
      if (totalWidth === 0) {
        ticking = false;
        return;
      }

      const scrolled = window.pageYOffset || window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = maxScroll > 0 ? scrolled / maxScroll : 0;
      
      const wrapper = gallery.parentElement;
      if (!wrapper) {
        ticking = false;
        return;
      }
      
      const wrapperWidth = wrapper.offsetWidth;
      const availableWidth = wrapperWidth;
      const maxTranslate = -(totalWidth - availableWidth);
      const translateX = Math.max(maxTranslate, Math.min(0, maxTranslate * scrollPercentage));

      gallery.style.transform = `translateX(${translateX}px)`;
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateGalleryPosition);
        ticking = true;
      }

      if (!hasScrolled && (window.pageYOffset || window.scrollY) > 50) {
        setHasScrolled(true);
        if (scrollIndicator) {
          scrollIndicator.style.opacity = '0';
        }
      }
    }

    function handleResize() {
      updateSpacerHeight();
      updateGalleryPosition();
    }

    const resizeObserver = new ResizeObserver(() => {
      updateSpacerHeight();
      updateGalleryPosition();
    });

    resizeObserver.observe(gallery);

    const mutationObserver = new MutationObserver(() => {
      updateSpacerHeight();
      updateGalleryPosition();
    });

    mutationObserver.observe(gallery, {
      childList: true,
      subtree: true
    });

    updateSpacerHeight();
    updateGalleryPosition();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [hasScrolled]);

  useEffect(() => {
    if (isReady) {
      return setupScrollEffect();
    }
  }, [isReady, setupScrollEffect]);

  const galleryCallbackRef = useCallback((node) => {
    galleryRef.current = node;
    if (node && spacerRef.current) {
      setIsReady(true);
    }
  }, []);

  const spacerCallbackRef = useCallback((node) => {
    spacerRef.current = node;
    if (node && galleryRef.current) {
      setIsReady(true);
    }
  }, []);

  return {
    galleryRef: galleryCallbackRef,
    spacerRef: spacerCallbackRef,
    scrollIndicatorRef
  };
}
