import { notFound } from 'next/navigation';
import Header from '@/components/projects/Header';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectInfo from '@/components/projects/ProjectInfo';
import ProjectContent from '@/components/projects/ProjectContent';
import Footer from '@/components/projects/Footer';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';

export async function generateStaticParams() {
  const allSlugs = await getAllProjectSlugs();
  
  return allSlugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : project.heroImage 
      ? [project.heroImage] 
      : [];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333] overflow-x-hidden">
      <Header />
      
      {/* Gallery Section */}
      <ProjectGallery images={galleryImages} />
      
      {/* Project Info Section */}
      <ProjectInfo project={project} />
      
      {/* Project Content Section */}
      <ProjectContent content={project.content} />
      
      <Footer />
    </div>
  );
}

