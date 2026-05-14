import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import WifiIcon from '@mui/icons-material/Wifi';

const RobotCard = ({ data }) => {
    // Fields based on new DynamoDB schema
    const {
        robotId,
        zone,
        crowdCount,
        riskLevel,
        activeRobots,
        safeZones,
        emergencyAlerts,
        wifiStrength,
        timestamp
    } = data;

    const isHighRisk = riskLevel === "High";

    return (
        <Card 
            className={isHighRisk ? "glass-panel high-risk-pulse" : "glass-panel"}
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: isHighRisk ? 'rgba(239, 68, 68, 0.05)' : 'rgba(30, 41, 59, 0.7)', 
                color: '#f8fafc',
                border: isHighRisk ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isHighRisk ? '0 10px 25px rgba(239, 68, 68, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.3)'
                }
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" component="div" fontWeight="bold" sx={{ color: '#94a3b8' }}>
                        {robotId.toUpperCase()}
                    </Typography>
                    <Chip 
                        label={riskLevel.toUpperCase() + " RISK"} 
                        color={isHighRisk ? "error" : "success"} 
                        size="small" 
                        icon={isHighRisk ? <WarningAmberIcon /> : <VerifiedUserIcon />}
                    />
                </Box>
                <Typography variant="h5" component="div" fontWeight="bold" mb={2}>
                    {zone}
                </Typography>
                
                <Divider sx={{ backgroundColor: '#475569', mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <PeopleIcon color={isHighRisk ? "error" : "info"} />
                            <Typography variant="body1">
                                Crowd: <strong>{crowdCount}</strong>
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ErrorOutlineIcon color={emergencyAlerts > 0 ? "error" : "disabled"} />
                            <Typography variant="body2" sx={{ color: emergencyAlerts > 0 ? '#ef4444' : '#94a3b8' }}>
                                Alerts: {emergencyAlerts}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <PrecisionManufacturingIcon sx={{ color: '#f59e0b' }} />
                            <Typography variant="body2">
                                Active Robots: {activeRobots}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <VerifiedUserIcon sx={{ color: '#22c55e' }} />
                            <Typography variant="body2">
                                Safe Zones: {safeZones}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                            <WifiIcon sx={{ color: wifiStrength > 70 ? '#22c55e' : (wifiStrength > 40 ? '#f59e0b' : '#ef4444') }} />
                            <Typography variant="body2">
                                WiFi Strength: {wifiStrength}%
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={3} pt={2} borderTop="1px solid #475569">
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        Last Updated: {new Date(timestamp).toLocaleString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RobotCard;
