
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAlerts } from "@/context/AlertContext";
import AlertCard from "@/components/alerts/AlertCard";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert } from "@/types";
import { Search, RefreshCw } from "lucide-react";

const AlertsPage = () => {
  const { alerts, loading, error, refreshAlerts } = useAlerts();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Apply filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alert.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });
  
  // Sort by date, most recent first
  const sortedAlerts = [...filteredAlerts].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );
  
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSeverityFilter("all");
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAlerts();
    setIsRefreshing(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">All Alerts</h1>
            <p className="text-gray-600 mt-1">
              View and filter all incident reports
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </header>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={severityFilter} 
              onValueChange={setSeverityFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(searchQuery || statusFilter !== "all" || severityFilter !== "all") && (
            <div className="mt-3 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Loading, Error, Empty states */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-alert-purple border-r-transparent mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900">Loading alerts...</h3>
          </div>
        )}
        
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error loading alerts</h3>
            <p className="text-red-600">{error}</p>
            <Button 
              variant="outline"
              className="mt-4 border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleRefresh}
            >
              Try Again
            </Button>
          </div>
        )}
        
        {/* Alert List */}
        {!loading && !error && (
          <div className="grid gap-4">
            {sortedAlerts.length > 0 ? (
              sortedAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AlertsPage;
