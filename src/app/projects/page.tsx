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
} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import Link from 'next/link';

export default function ProjectListPage() {
  const { projects, toggleFavorite } = useProjectContext();

  return (
    <div className="px-4">
      <div className="mb-4 mt-6 flex items-center justify-end">
        <Link href="/projects/create">
          <Button variant="contained" color="primary">
            Create Project
          </Button>
        </Link>
      </div>
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
    </div>
  );
}
