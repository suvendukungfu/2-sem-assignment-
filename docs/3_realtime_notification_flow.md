# Real-time Notification & Alert Flow

This document describes the real-time notification and alert flow for the Accident Alert & Community Rescue Platform.

## 1. Technologies

We will use a combination of **WebSockets (via Socket.IO)** and **Web Push Notifications (via Firebase Cloud Messaging)** to deliver real-time alerts.

- **Socket.IO:** Used for real-time, bidirectional communication between the client and the server when the application is open. This is ideal for live location tracking, chat, and status updates.
- **Firebase Cloud Messaging (FCM):** Used to send push notifications to users even when the application is not open in the foreground. This is crucial for alerting nearby helpers and emergency contacts who might not be actively using the app.

## 2. Notification Flow

The notification flow is triggered when an incident is created, either manually by a user or automatically by an IoT device.

### 2.1. Automatic vs. Manual Accident Alerts

**Manual SOS Alert Flow:**
1.  **User Action:** A user presses the SOS button in the web application.
2.  **API Request:** The frontend sends a `POST /api/incidents/sos` request to the API Gateway, including the user's current location from the browser's Geolocation API.
3.  **Incident Creation:** The request is routed to the **Incident Service**. It creates a new incident in the database with `type: 'manual'` and `status: 'pending'`.
4.  **Event Publishing:** The Incident Service publishes an `IncidentCreated` event to the message broker (e.g., RabbitMQ).

**Automatic Accident Alert Flow (from IoT hardware):**
1.  **Device Trigger:** The ESP32 device detects a crash (e.g., via an accelerometer and gyroscope) and triggers an alert.
2.  **API Request:** The device sends a secure, authenticated `POST /api/incidents/auto` request to a dedicated endpoint on the API Gateway. The payload includes sensor data and GPS coordinates.
3.  **Incident Creation:** The request is routed to the **Incident Service**. It validates the data, creates a new incident with `type: 'automatic'` and `status: 'pending'`.
4.  **Event Publishing:** The Incident Service publishes an `IncidentCreated` event to the message broker.

### 2.2. Alert Propagation

Once the `IncidentCreated` event is published, the **Notification Service** consumes it and initiates the alert propagation.

1.  **Consume Event:** The Notification Service listens for `IncidentCreated` events from the message broker.
2.  **Find Recipients:** Upon receiving an event, the Notification Service coordinates with other services:
    *   It queries the **Location Service** to find all users within a predefined radius (e.g., 5km) of the accident. These are the "Nearby Helpers".
    *   It queries the **User Service** to get the emergency contacts of the victim.
3.  **Dispatch Notifications:** The Notification Service sends out alerts tailored to each recipient group.

## 3. Alert Types & Channels

### 3.1. Nearby User Alerts

- **Channel:** Firebase Cloud Messaging (FCM) push notification to ensure delivery even if the app is closed. A follow-up WebSocket message is sent if the user is online.
- **Content:** "Accident alert near you. Can you help? [View Details]"
- **Action:** The notification, when tapped, opens the app to a screen showing the accident location, victim details (with privacy considerations), and options to "Accept" or "Decline" the help request.

### 3.2. Emergency Contact Alerts

- **Channel:** SMS (via Twilio), a phone call (automated voice call), and an in-app notification/email. Using multiple channels increases the likelihood of the message being seen.
- **Content:** "\[User Name] has been in an accident at \[Location]. We will notify you of further updates. [Link to live tracking]"
- **Action:** The link directs them to a web page (no login required for immediate access) showing the live location of the incident and any updates.

### 3.3. Emergency Authority Notifications (Police, Ambulance)

- **Channel:** Direct API integration with local emergency services (e.g., a 911/112 dispatch system). This is a long-term goal requiring government partnerships.
- **Initial MVP:** A dashboard for registered hospitals/police stations where they can see incoming alerts in their jurisdiction. The system can also be configured to send automated emails or make automated calls to their registered contact numbers.
- **Content:** All relevant data: precise location, user's medical information (if provided and consented to), time of the incident, and whether any community helpers are en route.

## 4. Flow Diagram

```
[User/IoT Device] -> [API Gateway] -> [Incident Service]
                                             |
                                             v
                                   [Message Broker (Event: IncidentCreated)]
                                             |
                                             v
[Location Service] <- [Notification Service] -> [User Service]
        |                      |                     |
        v                      v                     v
[Finds Nearby Helpers] [Sends Push/SMS] [Gets Emergency Contacts]
        |                      |                     |
        v                      v                     v
[Nearby User]       [Emergency Contact]   [Authorities Dashboard]
```
