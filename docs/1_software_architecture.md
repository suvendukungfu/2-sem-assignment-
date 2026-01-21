# Software Architecture

This document outlines the software architecture for the Accident Alert & Community Rescue Platform.

## 1. System Overview

The system is designed as a modular, scalable, and resilient platform for real-time accident reporting and community-based rescue. It consists of a frontend web application, a backend API, a real-time communication service, and a database.

## 2. Architectural Style

We will use a **microservices architecture** for the backend, as it provides the following advantages:

- **Scalability:** Each service can be scaled independently based on its load.
- **Resilience:** Failure in one service does not bring down the entire system.
- **Maintainability:** Services are smaller and easier to understand and maintain.
- **Technology Flexibility:** Each service can be implemented using the most appropriate technology.

The frontend will be a **single-page application (SPA)** built with React, which will communicate with the backend services via a RESTful API and WebSockets.

## 3. Frontend Architecture

- **Framework:** React.js with TypeScript for type safety.
- **Component Model:** Reusable, modular components for UI elements.
- **State Management:** `useState` and `useEffect` for component-level state, and a global state management library like Redux or Zustand for application-level state (e.g., user authentication, real-time alerts).
- **UI:** Tailwind CSS for responsive design.
- **Map Integration:** Google Maps API or Mapbox for displaying maps, markers, and routes.
- **Real-time Communication:** Socket.IO client to connect to the backend for real-time updates.

## 4. Backend Architecture

The backend will be composed of the following microservices:

- **Auth Service:** Handles user authentication (JWT/OTP) and authorization.
- **Incident Service:** Manages accident reports (manual and automatic), including location, severity, and status.
- **User Service:** Manages user profiles, emergency contacts, and credit/reward points.
- **Notification Service:** Sends real-time alerts to users, emergency contacts, and authorities via WebSockets and push notifications (Firebase Cloud Messaging).
- **Location Service:** Tracks user locations, finds nearby helpers, and calculates ETAs and distances.

### Technology Stack

- **Framework:** Node.js with Express and TypeScript.
- **Real-time Communication:** Socket.IO for WebSocket-based communication.
- **Database:** PostgreSQL for structured data and MongoDB for location data (optional).
- **API Gateway:** An API Gateway (e.g., Express Gateway, Kong) will be used to route requests to the appropriate microservice and handle cross-cutting concerns like authentication, rate limiting, and logging.

## 5. Communication Patterns

- **Client-Backend:** The frontend will communicate with the backend via a RESTful API for most operations and WebSockets for real-time updates.
- **Inter-service Communication:** The microservices will communicate with each other asynchronously using a message broker like RabbitMQ or Kafka. This will ensure loose coupling and improve resilience.

## 6. Data Flow

1. **Accident Report:**
   - The user's device (web browser or IoT device) sends an accident report to the Incident Service.
   - The Incident Service creates a new incident in the database and publishes an `IncidentCreated` event to the message broker.
2. **Notification:**
   - The Notification Service consumes the `IncidentCreated` event and sends alerts to nearby users, emergency contacts, and authorities.
3. **Helper Response:**
   - A nearby user accepts the help request.
   - The frontend sends a request to the Incident Service to update the incident status.
   - The Incident Service publishes an `IncidentStatusUpdated` event.
4. **Real-time Updates:**
   - The Notification Service consumes the `IncidentStatusUpdated` event and sends real-time updates to all relevant users via WebSockets.

## 7. Diagram

```
[Frontend (React SPA)] <--> [API Gateway] <--> [Auth Service]
                                       <--> [User Service]
                                       <--> [Incident Service]
                                       <--> [Location Service]
                                       <--> [Notification Service]

[Incident Service] --> [Message Broker] --> [Notification Service]
```
