import { useState, useEffect } from 'react';
import axios from 'axios';

// Replace this with your actual AWS API Gateway Invoke URL from AWS_SETUP.md Step 4
const AWS_API_URL = 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/api/data';

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
                setError("Failed to fetch data from AWS. Ensure your API Gateway is deployed and the URL is correct in useRobotData.js.");
                console.error("Fetch error:", err);
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
