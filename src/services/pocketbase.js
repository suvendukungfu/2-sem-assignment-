import { useEffect, useState } from 'react';
import pocketbaseService from './services/pocketbaseService';

const AlertsComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const alertsData = await pocketbaseService.getAlerts();
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert.id}>{alert.title}</div>
      ))}
    </div>
  );
};
