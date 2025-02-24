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

// Helper function to safely parse JSON responses.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function parseJSON(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type');
  const text = await response.text();
  if (contentType && contentType.indexOf('application/json') !== -1 && text) {
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  }
  return {};
}

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For local development, you might use "http://localhost:4000/api/projects".
  const API_URL = '/api/projects';

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await parseJSON(res);

      if (!res.ok) {
        // If server responded with error, data should include an error message.
        setError(data.error || 'Failed to fetch projects.');
        return;
      }
      // Assuming that the data returned is an object containing a projects array.
      setProjects(data.projects || []);
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
      const data = await parseJSON(res);
      if (!res.ok) {
        setError(data.error || 'Failed to create project.');
        return;
      }
      projects.push(project);
      setProjects(projects);
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
      const data = await parseJSON(res);
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update project.');
      }
      setProjects(prevProjects =>
        prevProjects.map(p => (p.id === project.id ? data : p)),
      );
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
      const data = await parseJSON(res);
      if (!res.ok) {
        throw new Error(data.error || 'Failed to toggle favorite.');
      }
      setProjects(prevProjects =>
        prevProjects.map(p => (p.id === id ? data : p)),
      );
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
