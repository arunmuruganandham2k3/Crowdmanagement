#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

// ==========================================
// CONFIGURATION
// ==========================================
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// AWS IoT Endpoint
const char* AWS_IOT_ENDPOINT = "YOUR_AWS_IOT_ENDPOINT.iot.us-east-1.amazonaws.com";

// MQTT Topic
const char* AWS_IOT_TOPIC = "swarm/robot/data";

// Robot Identity
const char* ROBOT_ID = "robot1";
const char* ROBOT_ZONE = "Faculty Area";

// ==========================================
// CERTIFICATES (Obtained from AWS IoT Core)
// ==========================================
// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
)EOF";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
)KEY";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
)KEY";

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

void connectAWS() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  Serial.println("Connecting to AWS IoT");

  while (!client.connect(ROBOT_ID)) {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  Serial.println("AWS IoT Connected!");
}

void publishMessage() {
  StaticJsonDocument<200> doc;
  
  // Create payload
  doc["robotId"] = ROBOT_ID;
  doc["zone"] = ROBOT_ZONE;
  doc["crowdCount"] = random(0, 100); // Replace with real sensor reading
  doc["riskLevel"] = (doc["crowdCount"] > 25) ? "High" : "Low";
  doc["activeRobots"] = 3;
  doc["safeZones"] = 2;
  doc["emergencyAlerts"] = (doc["riskLevel"] == "High") ? 1 : 0;
  doc["wifiStrength"] = WiFi.RSSI();

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // print to client

  Serial.print("Publishing message: ");
  Serial.println(jsonBuffer);

  client.publish(AWS_IOT_TOPIC, jsonBuffer);
}

void setup() {
  Serial.begin(115200);
  connectAWS();
}

void loop() {
  client.loop();

  // Publish every 10 seconds (adjust as needed)
  publishMessage();
  delay(10000); 
}
