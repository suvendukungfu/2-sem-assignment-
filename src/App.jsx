import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertProvider } from "@/context/AlertContext";

// Pages
import Index from "./pages/Index";
import AlertsPage from "./pages/AlertsPage";
import CreateAlert from "./pages/CreateAlert";
import AlertDetail from "./pages/AlertDetail";
import MapView from "./pages/MapView";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/create-alert" element={<CreateAlert />} />
              <Route path="/alert/:id" element={<AlertDetail />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AlertProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
