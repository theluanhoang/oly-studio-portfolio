import projectsData from './projects.json';

// Export projects array
export const projects = projectsData;

// Utility functions
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) || null;
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}

// Chuyển đổi projects thành format images để hiển thị trên trang projects
// Sử dụng heroImage làm thumbnail
export function getProjectsAsImages() {
  return projects.map((project) => ({
    src: project.heroImage,
    alt: project.title,
    slug: project.slug,
  }));
}

// Nhóm projects thành các section (mỗi section 4 projects)
export function groupProjectsIntoSections(itemsPerSection = 4) {
  const images = getProjectsAsImages();
  const sections = [];
  for (let i = 0; i < images.length; i += itemsPerSection) {
    sections.push(images.slice(i, i + itemsPerSection));
  }
  return sections;
}
