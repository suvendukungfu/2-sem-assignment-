import React from "react";
import { MapPin } from "lucide-react";

// You can define alert shape via prop types or PropTypes if needed
const SimpleMap = ({ alerts, selectedAlert }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 h-[400px] bg-gray-100 relative">
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <MapPin className="w-10 h-10 text-alert-purple" />
        <p className="mt-2 text-gray-600">Map visualization goes here</p>
        <p className="mt-1 text-sm text-gray-500">
          (In a real app, this would be an interactive map)
        </p>

        {alerts.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded-lg shadow-md max-w-md w-full">
            <h3 className="font-medium">Alert Locations:</h3>
            <ul className="mt-2 text-sm space-y-1">
              {alerts.slice(0, 3).map((alert) => (
                <li
                  key={alert.id}
                  className={`p-2 rounded ${
                    selectedAlert?.id === alert.id ? "bg-alert-purple/10" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <MapPin
                      className={`w-4 h-4 mr-1 mt-0.5 ${
                        alert.severity === "critical"
                          ? "text-red-500"
                          : "text-alert-purple"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-gray-500 text-xs">
                        {alert.location.address}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {alerts.length > 3 && (
                <li className="text-center text-alert-purple text-sm">
                  +{alerts.length - 3} more locations
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleMap;
