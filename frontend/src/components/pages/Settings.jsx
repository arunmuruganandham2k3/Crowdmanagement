import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <SettingsIcon fontSize="large" color="action" />
        <Typography variant="h4" fontWeight="bold">System Settings</Typography>
      </Box>
      <Card className="glass-panel">
        <CardContent sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Configuration preferences and threshold settings will go here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
