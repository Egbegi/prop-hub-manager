
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Communications from "./pages/Communications";
import NotFound from "./pages/NotFound";

// Tenant Interface Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
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
          {/* Public pages - no auth required */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Tenant portal routes - protected but can be viewed publicly */}
          <Route path="/tenant/dashboard" element={
            <AuthGuard requireTenant>
              <TenantDashboard />
            </AuthGuard>
          } />
          <Route path="/tenant/lease" element={
            <AuthGuard requireTenant>
              <Lease />
            </AuthGuard>
          } />
          <Route path="/tenant/payments" element={
            <AuthGuard requireTenant>
              <Payments />
            </AuthGuard>
          } />
          <Route path="/tenant/maintenance" element={
            <AuthGuard requireTenant>
              <TenantMaintenance />
            </AuthGuard>
          } />
          <Route path="/tenant/messages" element={
            <AuthGuard requireTenant>
              <Messages />
            </AuthGuard>
          } />
          <Route path="/tenant/settings" element={
            <AuthGuard requireTenant>
              <Settings />
            </AuthGuard>
          } />
          
          {/* Admin/Property Manager routes - protected but can be viewed publicly */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={
            <AuthGuard requireAdmin>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/admin/properties" element={
            <AuthGuard requireAdmin>
              <Properties />
            </AuthGuard>
          } />
          <Route path="/admin/tenants" element={
            <AuthGuard requireAdmin>
              <Tenants />
            </AuthGuard>
          } />
          <Route path="/admin/maintenance" element={
            <AuthGuard requireAdmin>
              <Maintenance />
            </AuthGuard>
          } />
          <Route path="/admin/communications" element={
            <AuthGuard requireAdmin>
              <Communications />
            </AuthGuard>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
