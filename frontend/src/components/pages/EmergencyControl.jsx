import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const EmergencyControl = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <SecurityIcon fontSize="large" sx={{ color: '#f59e0b' }} />
        <Typography variant="h4" fontWeight="bold">Emergency Control</Typography>
      </Box>
      <Card className="glass-panel" sx={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 6 }}>
          <Typography variant="h5" color="error" mb={4} fontWeight="bold">
            RESTRICTED ACCESS: ALL-STOP OVERRIDE
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            size="large"
            startIcon={<StopCircleIcon />}
            sx={{ px: 6, py: 2, fontSize: '1.2rem', borderRadius: 4 }}
          >
            EMERGENCY HALT ALL ROBOTS
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmergencyControl;
