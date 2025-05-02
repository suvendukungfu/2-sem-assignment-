import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlerts } from "@/context/AlertContext";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  MapPin, 
  Clock, 
  User, 
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle
} from "lucide-react";
import SimpleMap from "@/components/map/SimpleMap";
import { cn } from "@/lib/utils";
import { Alert as AlertType } from "@/types";

const AlertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAlertById, updateAlert } = useAlerts();
  
  const alert = getAlertById(id || "");
  
  if (!alert) {
    return (
      <MainLayout>
        <div className="container mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Alert Not Found</h2>
          <p className="text-gray-600 mb-6">
            The alert you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>
            Return to Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getSeverityColor = (severity: AlertType["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  const getStatusColor = (status: AlertType["status"]) => {
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
  
  const handleResolve = () => {
    updateAlert({
      ...alert,
      status: "resolved",
      dateResolved: new Date()
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{alert.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                Reported {format(new Date(alert.dateCreated), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Badge className={getStatusColor(alert.status)}>
              {alert.status}
            </Badge>
            <Badge className={getSeverityColor(alert.severity)}>
              {alert.severity}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Alert Details</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700">{alert.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-gray-600">{alert.location.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Date Reported</h4>
                          <p className="text-gray-600">
                            {format(new Date(alert.dateCreated), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Reported By</h4>
                          <p className="text-gray-600">{alert.createdBy}</p>
                        </div>
                      </div>
                      
                      {alert.status === "resolved" && alert.dateResolved && (
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Resolved On</h4>
                            <p className="text-gray-600">
                              {format(new Date(alert.dateResolved), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {alert.status !== "resolved" && (
                <CardFooter className="border-t bg-gray-50 flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={handleResolve}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            {alert.severity === "critical" && (
              <div className={cn(
                "mt-6 p-4 border rounded-lg flex items-center",
                "bg-red-50 border-red-200"
              )}>
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h3 className="font-medium text-red-700">Critical Alert</h3>
                  <p className="text-sm text-red-600">
                    This is a high-priority alert that requires immediate attention.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Location</h3>
            <SimpleMap alerts={[alert]} selectedAlert={alert} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Actions</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Subscribe to Updates
                    </Button>
                    
                    <Button
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/")}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      View All Alerts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlertDetail;
