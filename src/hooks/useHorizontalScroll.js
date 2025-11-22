import { useEffect, useRef, useState } from 'react';

export function useHorizontalScroll() {
  const galleryRef = useRef(null);
  const spacerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    const spacer = spacerRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!gallery || !spacer) return;

    // Calculate total width of gallery
    const sections = gallery.querySelectorAll('.section');
    const totalWidth = sections.length * 620; // 610px + 10px gap

    // Adjust spacer height based on gallery width
    spacer.style.height = `${totalWidth}px`;

    let ticking = false;

    function updateGalleryPosition() {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrolled / maxScroll;

      // Calculate translation
      const maxTranslate = -(totalWidth - window.innerWidth + 100);
      const translateX = maxTranslate * scrollPercentage;

      gallery.style.transform = `translateY(-50%) translateX(${translateX}px)`;
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateGalleryPosition);
        ticking = true;
      }

      // Hide scroll indicator after first scroll
      if (!hasScrolled && window.pageYOffset > 50) {
        setHasScrolled(true);
        if (scrollIndicator) {
          scrollIndicator.style.opacity = '0';
        }
      }
    }

    // Initial position
    updateGalleryPosition();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

  return { galleryRef, spacerRef, scrollIndicatorRef };
}

