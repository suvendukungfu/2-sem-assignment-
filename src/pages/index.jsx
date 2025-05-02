import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAlerts } from "@/context/AlertContext";
import StatCard from "@/components/dashboard/StatCard";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import SimpleMap from "@/components/map/SimpleMap";
import { Bell, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { alerts } = useAlerts();
  
  const activeAlerts = alerts.filter(a => a.status === "active");
  const criticalAlerts = alerts.filter(a => a.severity === "critical" && a.status === "active");
  
  return (
    <MainLayout>
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Accident Alert Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage alerts from a central location
          </p>
        </header>
        
        {/* Action buttons */}
        <div className="mb-8">
          <Link to="/create-alert">
            <Button className="bg-alert-orange hover:bg-alert-orange/90 text-white">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report New Incident
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Alerts"
            value={activeAlerts.length}
            icon={<Bell className="h-6 w-6 text-alert-purple" />}
          />
          <StatCard
            title="Critical Incidents"
            value={criticalAlerts.length}
            icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
            className={criticalAlerts.length > 0 ? "border-red-200" : ""}
          />
          <StatCard
            title="Monitored Locations"
            value={alerts.length}
            icon={<MapPin className="h-6 w-6 text-alert-blue" />}
          />
        </div>
        
        {/* Map and Recent Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Alert Map</h2>
            <SimpleMap alerts={alerts} />
          </div>
          
          <div>
            <RecentAlerts />
            
            {alerts.length > 3 && (
              <div className="mt-4">
                <Link to="/alerts">
                  <Button variant="outline" className="w-full">
                    View All Alerts
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
