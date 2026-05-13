const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        // For real-time dashboard, we want the latest data for each robot.
        // A simple approach for a dashboard is to scan and group by robotId.
        // For production with large datasets, querying a GSI on a fixed key with limit=1, 
        // or a dedicated table for "CurrentState" is better.
        // Here we scan and return the latest for each robot.
        const params = {
            TableName: "SensorData"
        };
        
        const data = await ddbDocClient.send(new ScanCommand(params));
        
        // Group and find latest per robotId
        const latestRecords = {};
        
        data.Items.forEach(item => {
            if (!latestRecords[item.robotId]) {
                latestRecords[item.robotId] = item;
            } else {
                // Compare timestamps, keep the newest
                if (new Date(item.timestamp) > new Date(latestRecords[item.robotId].timestamp)) {
                    latestRecords[item.robotId] = item;
                }
            }
        });

        const responseData = Object.values(latestRecords);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Enable CORS for the frontend
                "Content-Type": "application/json"
            },
            body: JSON.stringify(responseData)
        };

    } catch (error) {
        console.error("Error fetching data from DynamoDB:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify("Error retrieving data")
        };
    }
};
