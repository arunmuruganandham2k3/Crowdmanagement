# AWS Setup Instructions for Swarm Robot System

This guide explains how to set up the serverless AWS architecture for the Swarm Robot Crowd Management system.

## 1. Create DynamoDB Table
1. Log in to the AWS Management Console and go to **DynamoDB**.
2. Make sure you are in the **us-east-1** region.
3. Click **Create table**.
4. Set the Table name to `SensorData`.
5. Set the Partition key to `robotId` (String).
6. Set the Sort key to `timestamp` (String).
7. Under Table settings, select **Customize settings**.
8. For Read/write capacity settings, select **On-demand**.
9. Click **Create table**.

## 2. Create the Data Ingestion Lambda
1. Go to **AWS Lambda** in the console.
2. Click **Create function**.
3. Choose **Author from scratch**, name it `IoTCoreToDynamoDB`.
4. Select `Node.js 20.x` (or latest) for the Runtime.
5. Click **Create function**.
6. Replace the default code with the contents of `aws/lambda/iot_to_dynamodb.js`.
7. Click **Deploy**.
8. **Permissions**: Go to the *Configuration* tab -> *Permissions*, click the Execution role. Attach the `AmazonDynamoDBFullAccess` policy to this role so the Lambda can write to DynamoDB.

## 3. Set up AWS IoT Core
1. Go to **AWS IoT Core**.
2. **Create a Policy**: Go to Security -> Policies. Create a policy allowing `iot:Connect`, `iot:Publish`, `iot:Subscribe`, `iot:Receive` for resource `*`.
3. **Create a Thing**: Go to Manage -> All devices -> Things. Create a new thing (e.g., `robot1`). 
4. Auto-generate the certificates. **Download** the Device certificate, Private key, and Root CA 1. You will need these for the ESP32 code. Attach the policy you just created.
5. **Create IoT Rule**: Go to Message Routing -> Rules. Create a new rule.
    - Rule name: `SaveSwarmDataToDynamoDB`
    - SQL Statement: `SELECT * FROM 'swarm/robot/data'`
    - Rule Action: Choose **AWS Lambda**. Select the `IoTCoreToDynamoDB` function you created.
6. Now, whenever the ESP32 publishes to `swarm/robot/data`, AWS IoT will automatically trigger the Lambda function to store the data in DynamoDB.

## 4. Create the Data Retrieval Lambda & API Gateway
1. Go to **AWS Lambda** and create another function named `FetchSwarmData`.
2. Use Node.js 20.x runtime.
3. Replace the code with the contents of `aws/lambda/fetch_dynamodb_data.js`.
4. Deploy the function. Add DynamoDB Read permissions to its execution role.
5. Go to **API Gateway** -> Create API -> **HTTP API**.
6. Add an integration, select your `FetchSwarmData` Lambda function.
7. Set the path to `/api/data` with method `GET`.
8. Configure CORS (allow origin `*` or your frontend URL).
9. Deploy the API. **Note down the Invoke URL**.

## 5. Configure the Frontend
In the frontend React app, you will configure `src/hooks/useRobotData.js` to point to the API Gateway Invoke URL you noted down in Step 4.

## 6. Flash the ESP32
Update `aws/esp32_mqtt/main.ino` with:
- Your WiFi credentials.
- Your AWS IoT Endpoint (found in AWS IoT Core -> Settings).
- The certificates you downloaded in Step 3.
Upload the code to your ESP32.
