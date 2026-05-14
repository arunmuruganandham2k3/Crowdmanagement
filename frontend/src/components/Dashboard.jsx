import React from 'react';
import { Grid, Typography, Box, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import RobotCard from './RobotCard';
import { useRobotData } from '../hooks/useRobotData';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';

const Dashboard = () => {
    const { robotData, loading, error } = useRobotData();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} thickness={4} sx={{ color: '#3b82f6' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" p={3}>
                <Alert severity="error" sx={{ width: '100%', maxWidth: 600, fontSize: '1.1rem' }}>{error}</Alert>
            </Box>
        );
    }

    // Calculate top-level metrics
    const totalCrowd = robotData.reduce((acc, curr) => acc + curr.crowdCount, 0);
    const totalAlerts = robotData.reduce((acc, curr) => acc + curr.emergencyAlerts, 0);
    const activeRobots = robotData.reduce((acc, curr) => acc + curr.activeRobots, 0);

    return (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            
            <Box mb={5} display="flex" alignItems="center" gap={2}>
                <Box sx={{ p: 1.5, borderRadius: 3, background: 'rgba(59, 130, 246, 0.1)' }}>
                    <PrecisionManufacturingIcon fontSize="large" sx={{ color: '#3b82f6' }} />
                </Box>
                <Box>
                    <Typography variant="h3" component="h1" fontWeight="800" sx={{ 
                        background: 'linear-gradient(90deg, #f8fafc 0%, #94a3b8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Fleet Overview
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Real-time monitoring of all autonomous swarm units
                    </Typography>
                </Box>
            </Box>

            {/* Top Level Metrics */}
            <Grid container spacing={3} mb={5}>
                <Grid item xs={12} md={4}>
                    <Card className="glass-panel" sx={{ borderLeft: '4px solid #3b82f6' }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="overline" fontSize="0.9rem">
                                Total Active Robots
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2}>
                                <PrecisionManufacturingIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
                                <Typography variant="h3" fontWeight="bold">{activeRobots}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="glass-panel" sx={{ borderLeft: '4px solid #10b981' }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="overline" fontSize="0.9rem">
                                Estimated Total Crowd
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2}>
                                <PeopleIcon sx={{ fontSize: 40, color: '#10b981' }} />
                                <Typography variant="h3" fontWeight="bold">{totalCrowd}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className={totalAlerts > 0 ? "glass-panel high-risk-pulse" : "glass-panel"} sx={{ borderLeft: totalAlerts > 0 ? '4px solid #ef4444' : '4px solid #94a3b8' }}>
                        <CardContent>
                            <Typography color={totalAlerts > 0 ? "error" : "textSecondary"} gutterBottom variant="overline" fontSize="0.9rem">
                                Active System Alerts
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2}>
                                <WarningIcon sx={{ fontSize: 40, color: totalAlerts > 0 ? '#ef4444' : '#94a3b8' }} />
                                <Typography variant="h3" fontWeight="bold" color={totalAlerts > 0 ? "error" : "textPrimary"}>{totalAlerts}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#e2e8f0' }}>
                Zone Status Monitoring
            </Typography>

            <Grid container spacing={3}>
                {robotData.map((robot, index) => (
                    <Grid item xs={12} md={4} key={robot.robotId} sx={{ animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both` }}>
                        <RobotCard data={robot} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
