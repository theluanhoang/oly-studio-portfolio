'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/projects/Header';
import ProjectSection from '@/components/projects/ProjectSection';
import Footer from '@/components/projects/Footer';
import ScrollIndicator from '@/components/projects/ScrollIndicator';
import { LoadingSpinner } from '@/components/ui';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { groupArrayIntoChunks } from '@/lib/utils';

export default function ProjectsPage() {
  const { galleryRef, spacerRef, scrollIndicatorRef } = useHorizontalScroll();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const projects = await response.json();
        
        const images = projects.map((project) => ({
          src: project.heroImage,
          alt: project.title,
          slug: project.slug,
        }));
        
        const groupedSections = groupArrayIntoChunks(images, 4);
        setSections(groupedSections);
      } catch (error) {
        console.error('Error loading projects:', error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Đang tải..." />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333] overflow-x-hidden pt-[79px]">
      <Header />

      <div className="fixed top-[79px] left-0 w-full h-[calc(100vh-79px)] overflow-hidden">
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
