import React from "react";
import { useAlerts } from "../context/AlertContext"; // Adjust path as needed
import AlertCard from "../components/alerts/AlertCard"; // Adjust path as needed

const RecentAlerts = () => {
  const { alerts } = useAlerts();

  // Sort by date, most recent first
  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  // Take only the first 3 alerts
  const recentAlerts = sortedAlerts.slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Alerts</h2>

      {recentAlerts.length > 0 ? (
        <div className="grid gap-4">
          {recentAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent alerts</p>
      )}
    </div>
  );
};

export default RecentAlerts;
