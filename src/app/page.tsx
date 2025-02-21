'use client';
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <Typography variant="h2" gutterBottom color="primary">
        Welcome to the Project Management App
      </Typography>
      <Typography variant="h6" className="mb-6">
        Click below to view your projects or create a new one.
      </Typography>
      <div className="mt-4 space-x-4">
        <Link href="/projects">
          <Button variant="contained" color="primary">
            View Projects
          </Button>
        </Link>
        <Link href="/projects/create">
          <Button variant="outlined">Create Project</Button>
        </Link>
      </div>
    </Container>
  );
}
