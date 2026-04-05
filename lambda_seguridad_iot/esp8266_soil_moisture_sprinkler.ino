/*
 * Lambda Seguridad – ESP8266 Soil Moisture Sensor + Sprinkler
 *
 * Hardware:
 *   - ESP8266 (e.g. NodeMCU, Wemos D1 Mini)
 *   - Capacitive or resistive soil moisture sensor connected to A0
 *   - Relay module connected to D1 (GPIO 5) to drive the sprinkler
 *
 * How it works:
 *   Every READING_INTERVAL milliseconds the sketch reads the moisture sensor,
 *   maps the raw ADC value to a 0–100 % scale, and POSTs it to the backend.
 *   The backend replies with { "resData": { "activate_sprinkler": true/false, ... } }.
 *   The sketch then switches the relay accordingly to activate/deactivate the sprinkler.
 *
 * Libraries required (install via Arduino Library Manager):
 *   - ESP8266WiFi   (bundled with the esp8266 board package)
 *   - ESP8266HTTPClient (bundled)
 *   - ArduinoJson   (Benoit Blanchon, v6.x)
 *
 * Backend endpoint:
 *   POST http://<SERVER_IP>:<PORT>/moisture-sensor/reading
 *   Body: { "sensor_id": "<SENSOR_ID>", "moisture_value": <0-100> }
 *   Response: { "resData": { "activate_sprinkler": true/false, "moisture_value": 42.5, "threshold": 30 } }
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// ── WiFi credentials ────────────────────────────────────────────────────────
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// ── Backend server ───────────────────────────────────────────────────────────
const char* SERVER_URL    = "http://192.168.1.100:8080/moisture-sensor/reading";

// ── Sensor & device config ───────────────────────────────────────────────────
const char* SENSOR_ID     = "sensor_01";   // Unique identifier for this sensor
const int   SENSOR_PIN    = A0;            // Analog pin (only A0 on ESP8266)
const int   RELAY_PIN     = D1;            // Relay IN pin (active LOW typical)

/*
 * Calibration: measure raw ADC values for "completely dry" and "fully wet" soil.
 * Replace the constants below with your sensor's actual readings.
 */
const int   DRY_VALUE     = 1023;          // raw ADC when sensor is in dry air
const int   WET_VALUE     = 300;           // raw ADC when sensor is submerged

// ── Timing ───────────────────────────────────────────────────────────────────
const unsigned long READING_INTERVAL = 10000; // ms between readings (10 s)

// ─────────────────────────────────────────────────────────────────────────────

void setup() {
    Serial.begin(115200);
    delay(100);

    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, HIGH); // Relay OFF (active LOW)

    Serial.print("\nConnecting to WiFi: ");
    Serial.println(WIFI_SSID);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print('.');
    }
    Serial.println("\nWiFi connected. IP: " + WiFi.localIP().toString());
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        float moisturePercent = readMoisturePercent();
        Serial.print("Moisture: ");
        Serial.print(moisturePercent);
        Serial.println(" %");

        bool activateSprinkler = postReading(moisturePercent);
        controlSprinkler(activateSprinkler);
    } else {
        Serial.println("WiFi disconnected. Retrying...");
        WiFi.reconnect();
    }

    delay(READING_INTERVAL);
}

/*
 * Read the moisture sensor and map the raw ADC value to a percentage.
 * 100 % = fully wet, 0 % = completely dry.
 * NOTE: We use floating-point arithmetic instead of Arduino's map() because
 * map() returns a long integer and would truncate the result.
 */
float readMoisturePercent() {
    int raw = analogRead(SENSOR_PIN);
    // Higher raw value means drier soil (sensor impedance increases when dry).
    float percent = (float)(DRY_VALUE - raw) / (float)(DRY_VALUE - WET_VALUE) * 100.0f;
    percent = constrain(percent, 0.0f, 100.0f);
    return percent;
}

/*
 * POST the moisture reading to the Lambda Seguridad backend.
 * Returns true if the backend says the sprinkler should be activated.
 */
bool postReading(float moisturePercent) {
    WiFiClient wifiClient;
    HTTPClient http;

    http.begin(wifiClient, SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    // Build JSON payload
    StaticJsonDocument<128> doc;
    doc["sensor_id"]      = SENSOR_ID;
    doc["moisture_value"] = moisturePercent;

    String payload;
    serializeJson(doc, payload);

    int httpCode = http.POST(payload);
    bool activate = false;

    if (httpCode == HTTP_CODE_CREATED || httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.println("Server response: " + response);

        StaticJsonDocument<256> respDoc;
        DeserializationError err = deserializeJson(respDoc, response);
        if (!err) {
            activate = respDoc["resData"]["activate_sprinkler"].as<bool>();
        }
    } else {
        Serial.print("HTTP error: ");
        Serial.println(httpCode);
    }

    http.end();
    return activate;
}

/*
 * Switch the relay on or off based on the server's signal.
 * Relay is assumed to be ACTIVE LOW (LOW = relay ON = sprinkler runs).
 */
void controlSprinkler(bool activate) {
    if (activate) {
        Serial.println(">> Sprinkler ACTIVATED");
        digitalWrite(RELAY_PIN, LOW);
    } else {
        Serial.println(">> Sprinkler OFF");
        digitalWrite(RELAY_PIN, HIGH);
    }
}
