import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Reports = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <AssessmentIcon fontSize="large" sx={{ color: '#10b981' }} />
        <Typography variant="h4" fontWeight="bold">Reports</Typography>
      </Box>
      <Card className="glass-panel">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" mb={3}>Generate Performance Reports</Typography>
          <Button variant="outlined" startIcon={<PictureAsPdfIcon />} color="primary">
            Download Weekly Summary
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;
