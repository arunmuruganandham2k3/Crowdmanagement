import React from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import RobotCard from './RobotCard';
import { useRobotData } from '../hooks/useRobotData';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const Dashboard = () => {
    const { robotData, loading, error } = useRobotData();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4} display="flex" alignItems="center" gap={2}>
                <PrecisionManufacturingIcon fontSize="large" sx={{ color: '#3b82f6' }} />
                <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#f8fafc' }}>
                    Swarm Robotics Crowd Dashboard
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {robotData.map((robot) => (
                    <Grid item xs={12} md={4} key={robot.robotId}>
                        <RobotCard data={robot} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
