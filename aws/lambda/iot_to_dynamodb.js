const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("Received IoT Event:", JSON.stringify(event, null, 2));

    try {
        // Automatically generate timestamp (ISO 8601 string)
        const currentTimestamp = new Date().toISOString();

        // Extract values from MQTT payload, handle missing fields gracefully
        const payload = {
            robotId: event.robotId || "unknown_robot",
            timestamp: currentTimestamp, // Sort Key
            zone: event.zone || "Unknown Area",
            crowdCount: typeof event.crowdCount === 'number' ? event.crowdCount : 0,
            riskLevel: event.riskLevel || "Low",
            activeRobots: typeof event.activeRobots === 'number' ? event.activeRobots : 0,
            safeZones: typeof event.safeZones === 'number' ? event.safeZones : 0,
            emergencyAlerts: typeof event.emergencyAlerts === 'number' ? event.emergencyAlerts : 0,
            wifiStrength: typeof event.wifiStrength === 'number' ? event.wifiStrength : 0
        };

        const params = {
            TableName: "SensorData",
            Item: payload
        };

        console.log("Putting item into DynamoDB:", JSON.stringify(params, null, 2));
        await ddbDocClient.send(new PutCommand(params));
        
        console.log("Successfully inserted record into DynamoDB");
        return {
            statusCode: 200,
            body: JSON.stringify("Data successfully stored in DynamoDB")
        };

    } catch (error) {
        console.error("Error inserting into DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify("Failed to store data: " + error.message)
        };
    }
};
