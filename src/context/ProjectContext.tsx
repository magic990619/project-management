'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

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
interface ProjectContextProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => void;
  createProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined,
);

// Custom hook
export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return ctx;
}

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = '/api/projects';

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      setProjects(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch projects.');
      }
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Project) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      await fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create project.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (project: Project) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      await fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update project.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      await fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to toggle favorite.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        toggleFavorite,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
