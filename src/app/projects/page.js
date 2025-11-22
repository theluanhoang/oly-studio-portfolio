'use client';

import Header from '@/components/projects/Header';
import ProjectSection from '@/components/projects/ProjectSection';
import Footer from '@/components/projects/Footer';
import ScrollIndicator from '@/components/projects/ScrollIndicator';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { groupProjectsIntoSections } from '@/data/projects';

export default function ProjectsPage() {
  const { galleryRef, spacerRef, scrollIndicatorRef } = useHorizontalScroll();

  // Nhóm projects thành các section 4 projects mỗi section
  const sections = groupProjectsIntoSections(4);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333] overflow-x-hidden">
      <Header />

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <div
          ref={galleryRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 flex gap-[10px] transition-transform duration-100 ease-out will-change-transform md:px-5"
        >
          {sections.map((sectionImages, sectionIndex) => (
            <ProjectSection
              key={sectionIndex}
              images={sectionImages}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
      </div>

      <div ref={spacerRef} className="h-[500vh]"></div>

      <ScrollIndicator ref={scrollIndicatorRef} />

      <Footer />
    </div>
  );
}
