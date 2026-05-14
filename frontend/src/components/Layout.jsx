import React from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from './Sidebar';

const Layout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b0f19' }}>
      {/* Persistent Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: { xs: 0, md: '280px' }, // Margin left to accommodate sidebar on larger screens
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Header */}
        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'rgba(11, 15, 25, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e293b' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { md: 'none' }, mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="subtitle1" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                Pages / {currentPage.replace('-', ' ')}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Avatar sx={{ bgcolor: '#3b82f6', width: 36, height: 36 }}>A</Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Dynamic Page Content */}
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
