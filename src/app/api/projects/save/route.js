import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const projectData = await request.json();
    
    // Validate required fields
    if (!projectData.slug || !projectData.title || !projectData.heroImage) {
      return Response.json(
        { error: 'Missing required fields: slug, title, heroImage' },
        { status: 400 }
      );
    }

    // Path to projects.json file
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    
    // Read current file
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Parse JSON
    let projects;
    try {
      projects = JSON.parse(fileContent);
    } catch (parseError) {
      return Response.json(
        { error: 'Invalid JSON file', details: parseError.message },
        { status: 500 }
      );
    }
    
    // Check if slug already exists
    if (projects.some((project) => project.slug === projectData.slug)) {
      return Response.json(
        { error: `Project with slug "${projectData.slug}" already exists` },
        { status: 400 }
      );
    }
    
    // Add new project to array
    projects.push(projectData);
    
    // Write back to file with pretty formatting (2 spaces indentation)
    const newFileContent = JSON.stringify(projects, null, 2);
    await fs.writeFile(filePath, newFileContent, 'utf8');
    
    return Response.json({ 
      success: true, 
      message: 'Project saved successfully',
      project: projectData 
    });
    
  } catch (error) {
    console.error('Error saving project:', error);
    return Response.json(
      { error: 'Failed to save project', details: error.message },
      { status: 500 }
    );
  }
}

