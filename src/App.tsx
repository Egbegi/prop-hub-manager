
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Communications from "./pages/Communications";
import NotFound from "./pages/NotFound";

// Tenant Interface Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TenantDashboard from "./pages/tenant/Dashboard";
import Lease from "./pages/tenant/Lease";
import Payments from "./pages/tenant/Payments";
import TenantMaintenance from "./pages/tenant/Maintenance";
import Messages from "./pages/tenant/Messages";
import Settings from "./pages/tenant/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public landing page - set as the default route */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Tenant portal routes */}
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/lease" element={<Lease />} />
          <Route path="/tenant/payments" element={<Payments />} />
          <Route path="/tenant/maintenance" element={<TenantMaintenance />} />
          <Route path="/tenant/messages" element={<Messages />} />
          <Route path="/tenant/settings" element={<Settings />} />
          
          {/* Admin/Property Manager routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/properties" element={<Properties />} />
          <Route path="/admin/tenants" element={<Tenants />} />
          <Route path="/admin/maintenance" element={<Maintenance />} />
          <Route path="/admin/communications" element={<Communications />} />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
