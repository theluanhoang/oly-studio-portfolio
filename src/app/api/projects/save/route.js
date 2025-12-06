import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations/projectSchema';

export async function POST(request) {
  try {
    const projectData = await request.json();
    
    if (!projectData.slug || !projectData.title) {
      return Response.json(
        { error: 'Missing required fields: slug, title' },
        { status: 400 }
      );
    }

    const validationResult = projectSchema.safeParse(projectData);
    if (!validationResult.success) {
      return Response.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { slug: projectData.slug },
    });

    if (existingProject) {
      return Response.json(
        { error: `Project with slug "${projectData.slug}" already exists` },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        slug: projectData.slug,
        title: projectData.title,
        category: projectData.category || '',
        location: projectData.location || '',
        area: projectData.area || '',
        year: projectData.year || '',
        heroImage: projectData.heroImage || '',
        content: projectData.content || '',
        gallery: projectData.gallery || [],
      },
    });
    
    return Response.json({ 
      success: true, 
      message: 'Project saved successfully',
      project 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error saving project:', error);
    
    if (error.code === 'P2002') {
      return Response.json(
        { error: 'Project with this slug already exists' },
        { status: 409 }
      );
    }
    
    return Response.json(
      { error: 'Failed to save project', details: error.message },
      { status: 500 }
    );
  }
}
