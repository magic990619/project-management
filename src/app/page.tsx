'use client';
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <Typography variant="h2" gutterBottom color="primary">
        Welcome to the Project Management App
      </Typography>
      <Typography variant="h6" className="mb-6">
        Click below to open the app
      </Typography>
      <Grid container spacing={2} justifyContent="center" className="mt-4">
        <Grid size={12}>
          <Link href="/projects" passHref>
            <Button variant="contained" color="primary" fullWidth>
              Enter
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
