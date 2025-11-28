import { notFound } from 'next/navigation';
import Header from '@/components/projects/Header';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectInfo from '@/components/projects/ProjectInfo';
import ProjectContent from '@/components/projects/ProjectContent';
import Footer from '@/components/projects/Footer';
import { getProjectBySlug } from '@/data/projects';

export async function generateStaticParams() {
  const { getAllProjectSlugs } = await import('@/data/projects');
  const slugs = getAllProjectSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Tạo gallery images từ project data
  // Nếu có gallery field thì dùng, nếu không thì dùng heroImage
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

