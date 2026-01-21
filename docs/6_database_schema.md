# Database Schema

This document proposes a database schema for the Accident Alert & Community Rescue Platform. We recommend **PostgreSQL** due to its robustness, extensibility, and powerful features, especially when combined with the **PostGIS** extension for geospatial data.

## Schema Diagram (High-Level)

```
[Users] 1--* [EmergencyContacts]
   |
   | 1--* [Incidents] (as victim)
   |
   | 1--* [Locations]
   |
   | 1--* [CreditTransactions]
   |
   `--* [IncidentHelpers] (as helper)
         |
         `----* [Incidents]

[Incidents] 1--* [Ratings]
```

## SQL Schema Definitions

### 1. Users Table

Stores core information about the users.

```sql
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL, -- Used for OTP auth
    password_hash VARCHAR(255), -- For password-based auth
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    profile_picture_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_helper_mode_active BOOLEAN DEFAULT TRUE, -- Can users be alerted to help?
    total_credits INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. EmergencyContacts Table

Stores a user's designated emergency contacts.

```sql
CREATE TABLE EmergencyContacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    contact_name VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    relationship VARCHAR(50)
);
```

### 3. Incidents Table

The central table for tracking all accident events.

```sql
CREATE TYPE incident_status AS ENUM ('pending', 'assistance_on_way', 'resolved', 'cancelled');
CREATE TYPE incident_type AS ENUM ('manual_sos', 'automatic_iot');

CREATE TABLE Incidents (
    id SERIAL PRIMARY KEY,
    victim_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    location GEOMETRY(Point, 4326) NOT NULL, -- Requires PostGIS
    address_text TEXT, -- Geocoded address
    status incident_status DEFAULT 'pending',
    type incident_type NOT NULL,
    iot_sensor_data JSONB, -- Store raw data from IoT device if applicable
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Create a spatial index for fast location queries
CREATE INDEX idx_incidents_location ON Incidents USING GIST (location);
```

### 4. IncidentHelpers Table

A junction table connecting helpers to the incidents they respond to.

```sql
CREATE TYPE helper_status AS ENUM ('notified', 'accepted', 'declined', 'arrived', 'cancelled');

CREATE TABLE IncidentHelpers (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER REFERENCES Incidents(id) ON DELETE CASCADE,
    helper_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    status helper_status DEFAULT 'notified',
    time_accepted TIMESTAMPTZ,
    time_arrived TIMESTAMPTZ,
    UNIQUE(incident_id, helper_id) -- A helper can only be involved in an incident once
);
```

### 5. Locations Table

Tracks the location history of users for proximity alerts.

```sql
CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    location GEOMETRY(Point, 4326) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

-- Index for fast spatial queries
CREATE INDEX idx_locations_location ON Locations USING GIST (location);
```

### 6. Notifications Table

A log of all notifications sent by the system.

```sql
CREATE TYPE notification_channel AS ENUM ('push', 'sms', 'email', 'websocket');

CREATE TABLE Notifications (
    id SERIAL PRIMARY KEY,
    recipient_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    incident_id INTEGER REFERENCES Incidents(id),
    channel notification_channel NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. CreditTransactions Table

Logs every change in a user's credit score for transparency.

```sql
CREATE TABLE CreditTransactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    incident_id INTEGER REFERENCES Incidents(id),
    points INTEGER NOT NULL,
    reason VARCHAR(255), -- e.g., "Accepted help request", "First responder bonus"
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. Ratings Table

Stores feedback after an incident is resolved.

```sql
CREATE TABLE Ratings (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER REFERENCES Incidents(id) ON DELETE CASCADE,
    rater_id INTEGER REFERENCES Users(id), -- The user who is giving the rating
    rated_id INTEGER REFERENCES Users(id), -- The user who is being rated
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
