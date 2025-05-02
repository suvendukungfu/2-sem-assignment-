import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SimpleMap from "@/components/map/SimpleMap";
import { useAlerts } from "@/context/AlertContext";

const MapView = () => {
  const { alerts } = useAlerts();
  
  return (
    <MainLayout>
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Alert Map</h1>
          <p className="text-gray-600 mt-1">
            View all incident locations on the map
          </p>
        </header>
        
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <p className="text-sm text-gray-600">
            In a full implementation, this would display an interactive map with
            markers for each incident location. Users could click on markers to 
            view details or filter the map by alert type, severity, or status.
          </p>
        </div>
        
        <div className="h-[600px]">
          <SimpleMap alerts={alerts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MapView;