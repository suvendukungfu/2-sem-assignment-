# Credit / Reward System

This document designs the credit and reward system to incentivize community participation and reward helpfulness.

## 1. System Goals

-   **Incentivize Helping:** Encourage users to sign up as helpers and respond to alerts.
-   **Reward Timeliness:** Reward helpers who respond and arrive quickly.
-   **Build Reputation:** Create a transparent system where helpful users gain status.
-   **Discourage Misuse:** Prevent users from gaming the system for points.

## 2. Credit Rules: How to Earn Points

Credits are awarded after an incident is successfully resolved.

-   **Accepting a Help Request:** +10 points
    *   For being willing to help.
-   **Arriving at the Scene:** +50 points
    *   Verified by the victim or by reaching the GPS location.
-   **First Responder Bonus:** +20 points
    *   For being the first helper to arrive.
-   **Positive Rating from Victim:**
    *   5 stars: +30 points
    *   4 stars: +15 points
-   **Completing Profile:** +25 points (one-time)
-   **Referring a New User:** +50 points (awarded after the new user helps in their first incident)

## 3. Point Deductions & Penalties

To maintain system integrity, points can be deducted for negative actions.

-   **Accepting and then Cancelling:** -15 points
    *   Discourages users from accepting requests they don't intend to follow through on. A grace period of 1 minute is allowed for cancellations without penalty.
-   **Getting a Low Rating (1 or 2 stars):** -25 points
-   **Being Reported and Found at Fault:** -100 points and a temporary suspension from the helper program.

## 4. Anti-Fraud Mechanisms

-   **GPS Proximity Verification:** To claim arrival points, the helper's GPS coordinates must be within a small radius (e.g., 50 meters) of the incident location.
-   **Victim Confirmation:** The system can send a prompt to the victim: "Did \[Helper's Name] arrive and help you?" Points are only released after confirmation or if the GPS data is conclusive.
-   **Time-based Analysis:** The system should flag suspicious activity, such as a user accumulating points too quickly in a short period. For example, it's physically impossible to respond to incidents miles apart within minutes of each other.
-   **Collusion Detection:** Monitor for patterns where the same two users are frequently the "victim" and "helper" for each other. Such accounts should be flagged for manual review.
-   **IP Address Monitoring:** Flag incidents where the victim and helper are operating from the same IP address.

## 5. Leaderboards and Incentives

-   **Public Leaderboards:** Display weekly, monthly, and all-time top helpers. This creates friendly competition and public recognition. Leaderboards can be filtered by city or region.
-   **Badges and Tiers:**
    *   **Bronze Helper:** 100 points
    *   **Silver Helper:** 500 points
    *   **Gold Helper:** 1000 points
    *   **Platinum Responder:** 5000+ points
    *   Badges are displayed on the user's public profile.
-   **Redeeming Points (Future Scope):**
    *   Partner with local businesses to offer discounts (e.g., coffee shops, gas stations, insurance providers).
    *   Allow users to donate their points to charities.
    *   Premium features within the app (e.g., advanced safety features).

## 6. Credit System Flow

1.  **Incident Resolved:** The incident is marked as resolved in the system.
2.  **Prompt for Ratings:** Both the victim and helper(s) are prompted to rate their experience.
3.  **Credit Calculation:** The **User Service** calculates the points based on the actions taken and the ratings received. Anti-fraud checks are performed.
4.  **Points Awarded:** The points are added to the helper's account, and they receive a notification: "You've earned 80 points for helping in the recent incident!"
5.  **Leaderboard Update:** The leaderboards are updated in near real-time.
