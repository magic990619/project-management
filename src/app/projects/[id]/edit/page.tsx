'use client';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useProjectContext } from '../../../../context/ProjectContext';
import * as yup from 'yup';

interface ProjectFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  pm: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Project Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().required('End Date is required'),
  pm: yup.string().required('Project Manager is required'),
});

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, updateProject, loading, error } = useProjectContext();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      pm: '',
    },
  });

  useEffect(() => {
    const found = projects.find(p => p.id === Number(id));
    if (found) {
      setValue('name', found.name);
      setValue('description', found.description || '');
      setValue('startDate', found.startDate || '');
      setValue('endDate', found.endDate || '');
      setValue('pm', found.pm || '');
    }
  }, [id, projects, setValue]);

  const onSubmit: SubmitHandler<ProjectFormData> = async data => {
    await updateProject({
      id: Number(id),
      ...data,
      isFavorite: projects.find(p => p.id === Number(id))?.isFavorite || false,
    });
    router.push(`/projects`);
  };

  return (
    <div className="px-8 pt-12 lg:w-2/3">
      {/* Display error message if exists */}
      {error && (
        <Typography variant="h6" color="error" align="center" className="mb-4">
          {error}
        </Typography>
      )}
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
              <Typography variant="h6" id="project-id">
                {id}
              </Typography>
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
            <Grid size={{ xs: 12, md: 4 }} />
            <Grid size={{ xs: 12, md: 6 }} className="space-x-2">
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? (
                  <>
                    <CircularProgress size={20} /> Updating...
                  </>
                ) : (
                  'Update'
                )}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/projects`)}
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
