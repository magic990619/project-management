'use client';
import React, { createContext, useContext, useState } from 'react';

// Type of a project
export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  pm?: string;
  isFavorite?: boolean;
}

// Context type
interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  toggleFavorite: (id: number) => void;
  updateProject: (updated: Project) => void;
  createProject: (newProject: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

// Custom hook
export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return ctx;
}

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initial mock data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: '2023-01-01',
      endDate: '2023-06-01',
      pm: 'John Doe',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Project Beta',
      description: 'Consectetur adipiscing elit.',
      startDate: '2023-02-10',
      endDate: '2023-07-20',
      pm: 'Jane Smith',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Project 3',
      description: 'Consectetur adipiscing elit.',
      startDate: '2023-02-10',
      endDate: '2023-07-20',
      pm: 'Jane Smith',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Project 4',
      description: 'Consectetur adipiscing elit.',
      startDate: '2023-02-10',
      endDate: '2023-07-20',
      pm: 'Jane Smith',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Project 5',
      description: 'Consectetur adipiscing elit.',
      startDate: '2023-02-10',
      endDate: '2023-07-20',
      pm: 'Jane Smith',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Project 6',
      description: 'Consectetur adipiscing elit.',
      startDate: '2023-02-10',
      endDate: '2023-07-20',
      pm: 'Jane Smith',
      isFavorite: false,
    },
  ]);

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === id ? { ...proj, isFavorite: !proj.isFavorite } : proj,
      ),
    );
  };

  // Update a project
  const updateProject = (updated: Project) => {
    setProjects(prev =>
      prev.map(proj => (proj.id === updated.id ? updated : proj)),
    );
  };

  // Create a new project
  const createProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        toggleFavorite,
        updateProject,
        createProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
