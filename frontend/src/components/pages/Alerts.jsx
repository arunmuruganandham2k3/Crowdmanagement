import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const Alerts = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <NotificationsActiveIcon fontSize="large" sx={{ color: '#ef4444' }} />
        <Typography variant="h4" fontWeight="bold">System Alerts</Typography>
      </Box>
      <Card className="glass-panel">
        <CardContent>
          <Typography variant="h6" mb={2}>Recent Alerts</Typography>
          <List>
            <ListItem>
              <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
              <ListItemText primary="High Crowd Density in Lab" secondary="10 mins ago" />
            </ListItem>
            <ListItem>
              <ListItemIcon><InfoIcon color="info" /></ListItemIcon>
              <ListItemText primary="Robot Beta-02 Offline" secondary="1 hour ago" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Alerts;
