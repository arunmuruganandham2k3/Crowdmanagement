import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

const SensorAnalytics = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <TimelineIcon fontSize="large" sx={{ color: '#3b82f6' }} />
        <Typography variant="h4" fontWeight="bold">Sensor Analytics</Typography>
      </Box>
      <Card className="glass-panel">
        <CardContent sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Advanced metrics and historical charts will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SensorAnalytics;
