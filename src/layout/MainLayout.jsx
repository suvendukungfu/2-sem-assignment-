import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, MapPin, Home, AlertTriangle, Settings } from "lucide-react";
import { Button } from "../components/ui/button"; // Update path as needed
import { cn } from "../lib/utils"; // Update path as needed

const MainLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/alerts", label: "Alerts", icon: Bell },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/create-alert", label: "Report", icon: AlertTriangle },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-alert-purple text-white p-4 shadow-md">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Bell className="h-6 w-6" />
            <span className="text-xl font-bold">AccidentAlert</span>
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              Log In
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-1 rounded-md",
                  isActive ? "text-alert-purple" : "text-gray-500"
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Layout: Sidebar + Main */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-alert-purple text-white"
                        : "text-gray-700 hover:text-alert-purple hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:pb-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
