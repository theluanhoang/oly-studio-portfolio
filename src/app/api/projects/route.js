import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      { error: 'Failed to fetch projects', details: error.message },
      { status: 500 }
    );
  }
}

