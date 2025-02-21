'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useProjectContext } from '../../../context/ProjectContext';
import * as yup from 'yup';

interface ProjectFormData {
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  pm: string;
}

const schema = yup.object().shape({
  projectId: yup.string().required('Project ID is required'),
  name: yup.string().required('Project Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().required('End Date is required'),
  pm: yup.string().required('Project Manager is required'),
});

export default function CreateProjectPage() {
  const { createProject } = useProjectContext();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      projectId: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      pm: '',
    },
  });

  const onSubmit: SubmitHandler<ProjectFormData> = data => {
    const newProject = {
      id: parseInt(data.projectId, 10),
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      pm: data.pm,
      isFavorite: false,
    };
    createProject(newProject);
    router.push('/projects');
  };

  return (
    <div className="px-8 pt-12 lg:w-2/3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ md: 2, xs: 1 }} className="w-full">
            {/* Project ID Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="project-id" className="mb-1 block font-semibold">
                Project ID
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="projectId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="project-id"
                    placeholder="Enter Project ID"
                    fullWidth
                    error={!!errors.projectId}
                    helperText={errors.projectId?.message}
                    type="number"
                  />
                )}
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
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="project-name"
                    placeholder="Enter Project Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            {/* Description Field (Multiline) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="description" className="mb-1 block font-semibold">
                Description
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    placeholder="Describe the project"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Start Date Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="start-date" className="mb-1 block font-semibold">
                Start Date
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="start-date"
                    type="date"
                    fullWidth
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                )}
              />
            </Grid>

            {/* End Date Field */}
            <Grid size={{ xs: 12, md: 4 }}>
              <label htmlFor="end-date" className="mb-1 block font-semibold">
                End Date
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="end-date"
                    type="date"
                    fullWidth
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                  />
                )}
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
              <Controller
                name="pm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="project-manager"
                    placeholder="Enter Project Manager Name"
                    fullWidth
                    error={!!errors.pm}
                    helperText={errors.pm?.message}
                  />
                )}
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
