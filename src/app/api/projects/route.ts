import { NextRequest, NextResponse } from 'next/server';
import { projects, Project, simulateNetworkConditions } from './data';

// GET /api/projects  -> Returns the list of all projects
// POST /api/projects -> Creates a new project
export async function GET() {
  // Simulate network delay & random error
  await simulateNetworkConditions();

  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;

    const newProject: Project = {
      id: newId,
      name: body.name || 'Untitled Project',
      description: body.description || '',
      startDate: body.startDate || '',
      endDate: body.endDate || '',
      pm: body.pm || '',
      isFavorite: false,
    };

    projects.push(newProject);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
