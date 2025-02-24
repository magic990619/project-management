'use client';
import React from 'react';
import { useProjectContext } from '../../context/ProjectContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProjectListPage() {
  const { projects, toggleFavorite, loading, error } = useProjectContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return (
      <Typography variant="h6" align="center" className="mt-8">
        Loading projects...
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

  return (
    <div className="pl-8 pr-4">
      <div className="mb-4 mt-6 flex items-center justify-end">
        <Link href="/projects/create">
          <Button variant="contained" color="primary">
            Create Project
          </Button>
        </Link>
      </div>
      {isMobile ? (
        <Grid container spacing={2} className="mt-4">
          {projects.map(proj => (
            <Grid size={12} key={proj.id}>
              <Paper className="p-4">
                <Typography variant="h6">{proj.name}</Typography>
                <Typography variant="body2">ID: {proj.id}</Typography>
                <Typography variant="body2">
                  Start Date: {proj.startDate}
                </Typography>
                <Typography variant="body2">
                  End Date: {proj.endDate}
                </Typography>
                <Typography variant="body2">
                  Project Manager: {proj.pm}
                </Typography>
                <IconButton
                  onClick={() => toggleFavorite(proj.id)}
                  aria-label="toggle favorite"
                >
                  {proj.isFavorite ? (
                    <BookmarkAddIcon color="error" />
                  ) : (
                    <BookmarkRemoveOutlinedIcon />
                  )}
                </IconButton>
                <div className="mt-2 flex space-x-2">
                  <Link href={`/projects/${proj.id}`}>
                    <Button variant="outlined" size="small">
                      Detail
                    </Button>
                  </Link>
                  <Link href={`/projects/${proj.id}/edit`}>
                    <Button variant="contained" size="small">
                      Edit
                    </Button>
                  </Link>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Project Manager</TableCell>
                <TableCell>Favorite</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(proj => (
                <TableRow key={proj.id}>
                  <TableCell>{proj.id}</TableCell>
                  <TableCell>{proj.name}</TableCell>
                  <TableCell>{proj.startDate}</TableCell>
                  <TableCell>{proj.endDate}</TableCell>
                  <TableCell>{proj.pm}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => toggleFavorite(proj.id)}
                      aria-label="toggle favorite"
                    >
                      {proj.isFavorite ? (
                        <BookmarkAddIcon color="error" />
                      ) : (
                        <BookmarkRemoveOutlinedIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/projects/${proj.id}`}>
                        <Button variant="outlined" size="small">
                          Detail
                        </Button>
                      </Link>
                      <Link href={`/projects/${proj.id}/edit`}>
                        <Button variant="contained" size="small">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
