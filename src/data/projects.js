// This file now fetches from the database instead of JSON
// For backward compatibility, we keep the same export structure

let cachedProjects = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60000; // 1 minute cache

async function fetchProjects() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedProjects && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedProjects;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    const projects = await response.json();
    cachedProjects = projects;
    cacheTimestamp = now;
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to empty array
    return [];
  }
}

// For server components
export async function getProjects() {
  const { prisma } = await import('@/lib/prisma');
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects from database:', error);
    return [];
  }
}

// Utility functions
export async function getProjectBySlug(slug) {
  const { prisma } = await import('@/lib/prisma');
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

export async function getAllProjectSlugs() {
  const { prisma } = await import('@/lib/prisma');
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true },
    });
    return projects.map((project) => project.slug);
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

// Chuyển đổi projects thành format images để hiển thị trên trang projects
export async function getProjectsAsImages() {
  const projects = await getProjects();
  return projects.map((project) => ({
    src: project.heroImage,
    alt: project.title,
    slug: project.slug,
  }));
}

// Nhóm projects thành các section (mỗi section 4 projects)
export async function groupProjectsIntoSections(itemsPerSection = 4) {
  const images = await getProjectsAsImages();
  const sections = [];
  for (let i = 0; i < images.length; i += itemsPerSection) {
    sections.push(images.slice(i, i + itemsPerSection));
  }
  return sections;
}

// For backward compatibility - export projects as empty array (will be fetched dynamically)
export const projects = [];
