
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireTenant?: boolean;
  allowPublic?: boolean;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false, 
  requireAdmin = false, 
  requireTenant = false,
  allowPublic = true
}: AuthGuardProps) => {
  const { user, loading, isAdmin, isTenant } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If public access is allowed and no specific auth is required, show content
  if (allowPublic && !requireAuth && !requireAdmin && !requireTenant) {
    return <>{children}</>;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required.
            <div className="mt-2">
              <Navigate to={isTenant ? "/tenant/dashboard" : "/login"} replace />
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (requireTenant && !isTenant) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Tenant privileges required.
            <div className="mt-2">
              <Navigate to={isAdmin ? "/admin/dashboard" : "/login"} replace />
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};
