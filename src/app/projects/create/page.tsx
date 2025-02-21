'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useProjectContext } from '../../../context/ProjectContext';

export default function CreateProjectPage() {
  const { createProject } = useProjectContext();
  const router = useRouter();

  // Basic form fields
  const [projectId, setProjectId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pm, setPm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: parseInt(projectId, 10),
      name,
      description,
      startDate,
      endDate,
      pm,
      isFavorite: false,
    };
    createProject(newProject);
    router.push('/projects');
  };

  return (
    <div className="px-8 pt-12 lg:w-2/3">
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} className="w-full">
            {/* Project ID Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="project-id" className="mb-1 block font-semibold">
                Project ID
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="project-id"
                placeholder="Enter Project ID"
                value={projectId}
                onChange={e => setProjectId(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Project Name Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label
                htmlFor="project-name"
                className="mb-1 block font-semibold"
              >
                Project Name
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="project-name"
                placeholder="Enter Project Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Description Field (Multiline) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="description" className="mb-1 block font-semibold">
                Description
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="description"
                placeholder="Describe the project"
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Start Date Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="start-date" className="mb-1 block font-semibold">
                Start Date
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="start-date"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* End Date Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="end-date" className="mb-1 block font-semibold">
                End Date
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="end-date"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Project Manager Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label
                htmlFor="project-manager"
                className="mb-1 block font-semibold"
              >
                Project Manager
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="project-manager"
                placeholder="Enter Project Manager Name"
                value={pm}
                onChange={e => setPm(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Action Buttons */}
            <Grid size={{ xs: 12, md: 4 }}></Grid>
            <Grid size={{ xs: 12, md: 6 }} className="space-x-2">
              <Button type="submit" variant="contained">
                Create
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/projects')}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}
