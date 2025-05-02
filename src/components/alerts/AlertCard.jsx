import React from "react";
import { format } from "date-fns";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const getSeverityColor = (severity) => {
  switch (severity) {
    case "low":
      return "bg-blue-100 text-blue-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800";
    case "investigating":
      return "bg-yellow-100 text-yellow-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "";
  }
};

const AlertCard = ({ alert }) => {
  const statusPulse = alert.status === "active" && alert.severity === "critical";

  return (
    <Link to={`/alert/${alert.id}`}>
      <div className={`rounded-lg border p-4 bg-white mb-4 hover:shadow-md transition-shadow ${statusPulse ? 'border-red-500 border-2' : ''}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{alert.title}</h3>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getSeverityColor(alert.severity)}`}>
              {alert.severity}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(alert.status)} ${statusPulse ? 'animate-pulse' : ''}`}>
              {alert.status}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mt-2 line-clamp-2">{alert.description}</p>

        <div className="flex items-center mt-3 text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{alert.location.address}</span>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500 border-t pt-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{format(new Date(alert.dateCreated), "MMM d, h:mm a")}</span>
          </div>
          {alert.severity === "critical" && (
            <div className="flex items-center text-red-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Critical</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AlertCard;
