import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Sensor Analytics', icon: <TimelineIcon /> },
    { id: 'alerts', label: 'Alerts', icon: <NotificationsActiveIcon /> },
    { id: 'cloud', label: 'AWS Cloud Data', icon: <CloudSyncIcon /> },
    { id: 'emergency', label: 'Emergency Control', icon: <SecurityIcon color="error" /> },
    { id: 'reports', label: 'Reports', icon: <AssessmentIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Box 
      sx={{ 
        width: 280, 
        backgroundColor: '#1e293b', 
        borderRight: '1px solid #334155',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)'
        }}>
          <Typography variant="h6" fontWeight="bold" color="white">S</Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#f8fafc', letterSpacing: 1 }}>
          SWARM-X
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#334155', mb: 2 }} />

      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => setCurrentPage(item.id)}
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? '#3b82f6' : '#94a3b8',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#f8fafc' : '#94a3b8',
                    fontSize: '0.95rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block', textAlign: 'center' }}>
          v2.0.1 Serverless Edition
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
