'use client';
import React from 'react';
import { useProjectContext } from '../context/ProjectContext';
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar: React.FC = () => {
  const { projects } = useProjectContext();
  const favoriteProjects = projects.filter(p => p.isFavorite);

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="mb-4 mt-6 text-xl font-bold">Favorite Projects</h2>
      <List
        sx={{
          listStyleType: 'disc',
          pl: 4, // indent bullets
          '& .MuiListItem-root': {
            display: 'list-item',
            listStyleType: 'inherit',
          },
        }}
      >
        {favoriteProjects.length === 0 ? (
          <p className="text-sm italic">No favorites projects.</p>
        ) : (
          favoriteProjects.map(project => (
            <ListItem key={project.id} disablePadding>
              <Link
                href={`/projects/${project.id}`}
                className="w-full hover:text-blue-600 hover:underline"
              >
                <ListItemText primary={project.name} />
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </aside>
  );
};

export default Sidebar;
