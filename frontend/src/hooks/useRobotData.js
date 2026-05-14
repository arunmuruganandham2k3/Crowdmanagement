import { useState, useEffect } from 'react';
import axios from 'axios';

// Replace this with your actual AWS API Gateway Invoke URL from AWS_SETUP.md Step 4
// Or use your local FastAPI backend:
const AWS_API_URL = 'http://localhost:8000/api/robot_data';

export const useRobotData = () => {
    const [robotData, setRobotData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If you haven't set up AWS API Gateway yet, this will fail.
                // Replace AWS_API_URL with valid endpoint when ready.
                const response = await axios.get(AWS_API_URL);
                setRobotData(response.data);
                setError(null);
            } catch (err) {
                console.warn("Fetch error, falling back to mock data:", err);
                
                // Fallback to mock data if API is not available
                const mockData = [
                    {
                        robotId: "alpha-01",
                        zone: "Entrance",
                        crowdCount: Math.floor(Math.random() * 50),
                        riskLevel: "Medium",
                        activeRobots: 2,
                        safeZones: 1,
                        emergencyAlerts: 0,
                        wifiStrength: 80 + Math.floor(Math.random() * 20),
                        timestamp: new Date().toISOString()
                    },
                    {
                        robotId: "beta-02",
                        zone: "Faculty",
                        crowdCount: Math.floor(Math.random() * 8), // Occupancy limit: 5
                        riskLevel: "Low",
                        activeRobots: 1,
                        safeZones: 2,
                        emergencyAlerts: 0,
                        wifiStrength: 75 + Math.floor(Math.random() * 25),
                        timestamp: new Date().toISOString()
                    },
                    {
                        robotId: "gamma-03",
                        zone: "Lab",
                        crowdCount: Math.floor(Math.random() * 30), // Occupancy limit: 25
                        riskLevel: "Low",
                        activeRobots: 3,
                        safeZones: 1,
                        emergencyAlerts: 0,
                        wifiStrength: 90 + Math.floor(Math.random() * 10),
                        timestamp: new Date().toISOString()
                    }
                ].map(robot => {
                    if (robot.zone === "Faculty" && robot.crowdCount > 5) {
                        robot.riskLevel = "High";
                        robot.emergencyAlerts = 1;
                    } else if (robot.zone === "Lab" && robot.crowdCount > 25) {
                        robot.riskLevel = "High";
                        robot.emergencyAlerts = 1;
                    } else if (robot.crowdCount > 40) {
                        robot.riskLevel = "High";
                        robot.emergencyAlerts = 1;
                    }
                    return robot;
                });
                
                setRobotData(mockData);
                setError(null); // Clear error since we have mock data
            } finally {
                setLoading(false);
            }
        };

        // Fetch initially
        fetchData();

        // Dashboard automatically refreshes every 15 seconds per requirements
        const interval = setInterval(fetchData, 15000);

        return () => clearInterval(interval);
    }, []);

    return { robotData, loading, error };
};
