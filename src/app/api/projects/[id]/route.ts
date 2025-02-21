import { NextRequest, NextResponse } from 'next/server';
import { projects, simulateNetworkConditions } from '../data';

// GET /api/projects/:id -> Get project by ID
// PUT /api/projects/:id -> Update project
// DELETE /api/projects/:id -> Delete project

// Helper: find project by ID
function findProjectIndex(id: number) {
  return projects.findIndex(p => p.id === id);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateNetworkConditions();
  const id = parseInt((await params).id, 10);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateNetworkConditions();
  const id = parseInt((await params).id, 10);
  const index = findProjectIndex(id);

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    // Merge existing project with updated fields
    projects[index] = { ...projects[index], ...body };

    return NextResponse.json(projects[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateNetworkConditions();
  const id = parseInt((await params).id, 10);
  const index = findProjectIndex(id);

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    // Merge existing project with updated fields
    projects[index].isFavorite = !projects[index].isFavorite;

    return NextResponse.json(projects[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await simulateNetworkConditions();
  const id = parseInt((await params).id, 10);
  const index = findProjectIndex(id);

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const deleted = projects.splice(index, 1)[0];
  return NextResponse.json(deleted, { status: 200 });
}
