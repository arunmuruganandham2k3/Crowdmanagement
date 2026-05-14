import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

const CloudData = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <CloudSyncIcon fontSize="large" sx={{ color: '#8b5cf6' }} />
        <Typography variant="h4" fontWeight="bold">AWS Cloud Data</Typography>
      </Box>
      <Card className="glass-panel">
        <CardContent sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            DynamoDB synchronization status and raw records will appear here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CloudData;
