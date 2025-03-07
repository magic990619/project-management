'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, IconButton, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import { useProjectContext } from '../../../context/ProjectContext';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, toggleFavorite, loading, error } = useProjectContext();

  const [project, setProject] = useState(() => {
    const found = projects.find(p => p.id === Number(id));
    return found || null;
  });

  // Keep local state in sync if global projects change.
  useEffect(() => {
    const found = projects.find(p => p.id === Number(id));
    setProject(found || null);
  }, [id, projects]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" className="mt-8">
        Loading project details...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" className="mt-8">
        {error}
      </Typography>
    );
  }

  if (!project) {
    return (
      <Typography variant="h6" align="center" className="mt-8">
        Project not found
      </Typography>
    );
  }

  const handleToggleFavorite = async () => {
    // Optimistically update local state
    setProject(prev =>
      prev ? { ...prev, isFavorite: !prev.isFavorite } : prev,
    );

    try {
      await toggleFavorite(project.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // On error, revert optimistic update
      setProject(prev =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : prev,
      );
    }
  };

  return (
    <div className="relative pl-8 pr-4 pt-12 lg:w-2/3">
      <div className="absolute right-4 top-4">
        <IconButton onClick={handleToggleFavorite} aria-label="toggle favorite">
          {project.isFavorite ? (
            <BookmarkAddIcon color="error" />
          ) : (
            <BookmarkRemoveOutlinedIcon />
          )}
        </IconButton>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ md: 2, xs: 1 }} className="w-full">
          {/* Project ID Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="project-id" className="mb-1 block">
              Project ID
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="project-id">
              {project.id}
            </Typography>
          </Grid>

          {/* Project Name Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="project-name" className="mb-1 block">
              Project Name
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="project-name">
              {project.name}
            </Typography>
          </Grid>

          {/* Description Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="description" className="mb-1 block">
              Description
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="description">
              {project.description}
            </Typography>
          </Grid>

          {/* Start Date Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="start-date" className="mb-1 block">
              Start Date
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="start-date">
              {project.startDate}
            </Typography>
          </Grid>

          {/* End Date Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="end-date" className="mb-1 block">
              End Date
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="end-date">
              {project.endDate}
            </Typography>
          </Grid>

          {/* Project Manager Field */}
          <Grid size={{ xs: 12, md: 4 }}>
            <label htmlFor="project-manager" className="mb-1 block">
              Project Manager
            </label>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" id="project-manager">
              {project.pm}
            </Typography>
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12, md: 4 }} />
          <Grid size={{ xs: 12, md: 6 }} className="space-x-2">
            <Button variant="outlined" onClick={() => router.push('/projects')}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push(`/projects/${project.id}/edit`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
