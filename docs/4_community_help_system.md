# Community Help System

This document outlines the design of the Community Help System, a core feature of the platform that enables nearby users to assist accident victims.

## 1. User Flow: Accepting/Declining Help

The flow begins when a nearby user (a "helper") receives a notification about a new incident.

1.  **Notification:** The helper receives a push notification: "Accident alert near you. Can you help?"
2.  **View Incident:** Tapping the notification opens the app to an **Incident Details** screen. This screen will show:
    *   An overview map with the victim's location and the helper's current location.
    *   The estimated time of arrival (ETA) and distance to the victim.
    *   The victim's name and a profile picture (optional, based on privacy settings).
    *   A brief, non-graphic description of the incident (e.g., "Manual SOS" or "Potential Collision").
    *   A clear countdown timer (e.g., 60 seconds) for the helper to respond. This creates a sense of urgency and prevents stale requests.
3.  **Decision:** The helper has two primary actions:
    *   **Accept Help:** The helper taps "Accept."
    *   **Decline Help:** The helper taps "Decline" or lets the timer run out. The system should not penalize users for declining.
4.  **After Accepting:**
    *   The helper's status is updated to "Responding."
    *   The victim and their emergency contacts are notified that a helper is on the way, including the helper's name, profile picture, and ETA.
    *   The app's UI transitions to a navigation view, providing turn-by-turn directions to the incident location using the Google Maps Directions API.
    *   A secure, in-app communication channel (chat or one-tap "I'm on my way" messages) is opened between the victim and the helper.

## 2. System Logic for Multiple Helpers

-   The system will alert a pool of nearby helpers simultaneously.
-   We can cap the number of helpers who can accept a request (e.g., the first 3 to accept).
-   Once the cap is reached, the incident is marked as "Help on the way," and other helpers are informed that assistance is no longer needed. This prevents overcrowding and confusion.
-   If no one accepts within a set time (e.g., 2-3 minutes), the system automatically escalates the alert to a wider radius or directly to professional emergency services.

## 3. Safety & Trust Mechanisms

Building trust is critical for a community-based system.

-   **Verified Profiles:** Encourage users to complete their profiles with a real name and photo. A "Verified" badge can be awarded to users who complete an optional ID verification step (future feature).
-   **Anonymized Communication:** Initial communication can be anonymized. For example, use a chat system that doesn't reveal phone numbers.
-   **SOS for Helpers:** Helpers must have access to their own SOS button within the app. If they feel unsafe upon arriving at the scene, they can trigger their own alert.
-   **Ratings and Reviews:** After an incident is resolved, both the victim and the helper can rate each other. This helps build a reputation system and discourages misuse.
-   **Report and Block:** Users must be able to report inappropriate behavior or block other users. A history of being reported could temporarily suspend a user's ability to help.

## 4. Location Visibility Rules

Protecting user privacy is paramount. Location data should only be shared when necessary.

-   **Default State:** No user's location is visible to any other user by default.
-   **During an Incident (Pre-Acceptance):** A potential helper can only see the *location of the incident*, not the victim's live, moving position.
-   **During an Incident (Post-Acceptance):** Once a helper accepts a request, a temporary, secure channel is opened where the victim and the responding helper(s) can see each other's live location.
-   **Termination of Sharing:** Location sharing is automatically terminated for all parties once the incident is marked as "Resolved" or "Cancelled" by the victim or by an administrator.

## 5. Incident Resolution Flow

An incident can be resolved in several ways:
-   The victim marks the issue as resolved.
-   A helper marks the incident as resolved (requires confirmation from the victim).
-   Emergency services arrive and take over.
-   The incident is cancelled by the victim.

Upon resolution, the system prompts users to provide ratings and awards credit points.
