
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TenantLayout } from '@/components/layout/TenantLayout';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  MessageSquare, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TenantDashboard = () => {
  const { user } = useAuth();

  // Fetch tenant's lease information
  const { data: leaseData, isLoading: leaseLoading } = useQuery({
    queryKey: ['tenant-lease', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('leases')
        .select(`
          *,
          units (
            unit_number,
            floor,
            size,
            properties (
              name,
              address
            )
          )
        `)
        .eq('tenant_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lease:', error);
        throw error;
      }
      return data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch recent payments
  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['tenant-payments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('tenant_id', user.id)
        .order('payment_date', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching payments:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch maintenance requests
  const { data: maintenanceData, isLoading: maintenanceLoading } = useQuery({
    queryKey: ['tenant-maintenance', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('tenant_id', user.id)
        .order('submitted_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching maintenance requests:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TenantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Make Payment</p>
                <Link to="/tenant/payments">
                  <Button variant="link" className="h-auto p-0 text-base font-semibold">
                    Pay Rent
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Wrench className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <Link to="/tenant/maintenance">
                  <Button variant="link" className="h-auto p-0 text-base font-semibold">
                    Submit Request
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Support</p>
                <Link to="/tenant/messages">
                  <Button variant="link" className="h-auto p-0 text-base font-semibold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Home className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Lease</p>
                <Link to="/tenant/lease">
                  <Button variant="link" className="h-auto p-0 text-base font-semibold">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lease Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Current Lease
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaseLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : leaseData ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="font-semibold">{leaseData.units?.properties?.name}</p>
                  <p className="text-sm">{leaseData.units?.properties?.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit</p>
                  <p className="font-semibold">Unit {leaseData.units?.unit_number}</p>
                  {leaseData.units?.size && <p className="text-sm">{leaseData.units.size}</p>}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Rent</p>
                  <p className="font-semibold text-green-600">${leaseData.rent_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Period</p>
                  <p className="font-semibold">
                    {new Date(leaseData.start_date).toLocaleDateString()} - {new Date(leaseData.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No Active Lease</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Contact support if you believe this is an error.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paymentsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : paymentsData && paymentsData.length > 0 ? (
                <div className="space-y-3">
                  {paymentsData.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                  <Link to="/tenant/payments">
                    <Button variant="outline" className="w-full">
                      View All Payments
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No payments found</p>
                  <Link to="/tenant/payments">
                    <Button className="mt-2">Make Your First Payment</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Maintenance Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Maintenance Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {maintenanceLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : maintenanceData && maintenanceData.length > 0 ? (
                <div className="space-y-3">
                  {maintenanceData.map((request) => (
                    <div key={request.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{request.title}</p>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  <Link to="/tenant/maintenance">
                    <Button variant="outline" className="w-full">
                      View All Requests
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Wrench className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No maintenance requests</p>
                  <Link to="/tenant/maintenance">
                    <Button className="mt-2">Submit Request</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
};

export default TenantDashboard;
