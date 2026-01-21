# Maps & Location System

This document details the design of the Maps & Location System for the Accident Alert & Community Rescue Platform.

## 1. API Choice: Google Maps API vs. Mapbox

Both Google Maps and Mapbox are excellent choices for this platform. However, we recommend starting with the **Google Maps API** for the following reasons:

- **Familiarity:** Most users are familiar with Google Maps, which will provide a better user experience.
- **Comprehensive Data:** Google Maps has a vast amount of data, including traffic data, which can be used to calculate more accurate ETAs.
- **Rich Feature Set:** The Google Maps API provides a rich set of features, including directions, geocoding, and places.

**Mapbox** is a strong alternative and could be considered in the future if we need more customization options or a more flexible pricing model.

## 2. Data Models

We will use a **PostgreSQL** database with the **PostGIS** extension for storing and querying location data. PostGIS provides powerful geospatial functions that will be useful for finding nearby helpers.

### Location Schema

```sql
CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    incident_id INTEGER REFERENCES Incidents(id),
    geom GEOMETRY(Point, 4326), -- 4326 is the SRID for WGS 84
    timestamp TIMESTAMPTZ NOT NULL
);
```

- `user_id`: The ID of the user whose location is being tracked.
- `incident_id`: The ID of the incident, if the location is related to an incident.
- `geom`: The user's location as a GeoJSON Point.
- `timestamp`: The timestamp of the location update.

## 3. Live Accident Markers

When a new incident is created, a live marker will be added to the map. The marker will be updated in real-time as the incident status changes.

- The frontend will subscribe to a WebSocket channel for the incident.
- When the incident status is updated, the backend will publish a message to the channel.
- The frontend will receive the message and update the marker on the map accordingly.

## 4. Nearby Helper Detection

To find nearby helpers, we will use a spatial query with PostGIS.

### Algorithm

1. When a new incident is created, the Location Service will query the `Locations` table to find users within a certain radius (e.g., 5 km) of the incident location.
2. The query will use the `ST_DWithin` function to find users within the specified distance.
3. The query will also filter out users who have opted out of receiving help requests.
4. The Location Service will then publish a message to the Notification Service with the list of nearby helpers.

### SQL Query

```sql
SELECT user_id
FROM Locations
WHERE ST_DWithin(
    geom,
    ST_MakePoint(:incident_longitude, :incident_latitude)::geography,
    :radius_in_meters
)
AND timestamp > NOW() - INTERVAL '5 minutes'; -- Only consider recent locations
```

## 5. Hospital and Police Routing

The platform will provide routing to nearby hospitals and police stations.

- We will use the **Google Maps Directions API** to calculate the optimal route.
- The route will be displayed on the map, along with the ETA and distance.
- The user will be able to choose between different routes (e.g., fastest, shortest).

## 6. ETA and Distance Calculations

The **Google Maps Distance Matrix API** will be used to calculate the ETA and distance between two points.

- This will be used to show helpers the ETA to the incident location.
- It will also be used to show the user the ETA of the responding emergency services.
```
