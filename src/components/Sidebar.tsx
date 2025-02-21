'use client';
import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import Link from 'next/link';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar: React.FC = () => {
  const { projects } = useProjectContext();
  const favoriteProjects = projects.filter(p => p.isFavorite);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" className="mb-4 mt-6 font-bold">
        Favorite Projects
      </Typography>
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
          <Typography variant="body2" className="italic">
            No favorite projects.
          </Typography>
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
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        size="large"
        sx={{ display: { sm: 'none' }, position: 'fixed', top: 12, left: 12 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>

      {!isMobile && (
        <aside className="w-64 bg-gray-100 p-4">{drawerContent}</aside>
      )}
    </>
  );
};

export default Sidebar;
