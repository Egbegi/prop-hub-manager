
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireTenant?: boolean;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requireAdmin = false, 
  requireTenant = false 
}: AuthGuardProps) => {
  const { user, loading, isAdmin, isTenant } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/tenant/dashboard" replace />;
  }

  if (requireTenant && !isTenant) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};
