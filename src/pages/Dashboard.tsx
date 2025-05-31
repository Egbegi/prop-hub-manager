
import { useProperties } from '@/hooks/useProperties';
import { useTenants } from '@/hooks/useTenants';
import { useMaintenanceRequests } from '@/hooks/useMaintenanceRequests';
import { usePayments } from '@/hooks/usePayments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { 
  Building, 
  Users, 
  Wrench, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { properties, isLoading: propertiesLoading } = useProperties();
  const { tenants, isLoading: tenantsLoading } = useTenants();
  const { maintenanceRequests, isLoading: maintenanceLoading } = useMaintenanceRequests();
  const { payments, isLoading: paymentsLoading } = usePayments();

  // Calculate statistics
  const totalUnits = properties?.reduce((total, property) => total + (property.units?.length || 0), 0) || 0;
  const occupiedUnits = properties?.reduce((total, property) => 
    total + (property.units?.filter(unit => unit.status === 'occupied').length || 0), 0
  ) || 0;
  const vacantUnits = totalUnits - occupiedUnits;
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  const pendingMaintenance = maintenanceRequests?.filter(req => req.status === 'submitted').length || 0;
  const pendingPayments = payments?.filter(payment => payment.status === 'pending').length || 0;
  const monthlyRevenue = payments?.filter(payment => 
    payment.status === 'verified' && 
    new Date(payment.payment_date).getMonth() === new Date().getMonth()
  ).reduce((total, payment) => total + Number(payment.amount), 0) || 0;

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

  const isLoading = propertiesLoading || tenantsLoading || maintenanceLoading || paymentsLoading;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your housing management system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : properties?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalUnits} total units
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `${occupancyRate}%`}
              </div>
              <p className="text-xs text-muted-foreground">
                {occupiedUnits} of {totalUnits} units occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : tenants?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `$${monthlyRevenue.toLocaleString()}`}
              </div>
              <p className="text-xs text-muted-foreground">
                Verified payments this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Pending Maintenance ({pendingMaintenance})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                {pendingMaintenance === 0 
                  ? "No pending maintenance requests"
                  : `${pendingMaintenance} maintenance requests need attention`
                }
              </p>
              <Link to="/admin/maintenance">
                <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
                  View Maintenance
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Clock className="mr-2 h-5 w-5" />
                Pending Payments ({pendingPayments})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                {pendingPayments === 0 
                  ? "No pending payment verifications"
                  : `${pendingPayments} payments awaiting verification`
                }
              </p>
              <Link to="/admin/tenants">
                <Button variant="outline" className="border-blue-300 text-blue-800 hover:bg-blue-100">
                  View Payments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Maintenance Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Recent Maintenance Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {maintenanceLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : maintenanceRequests && maintenanceRequests.length > 0 ? (
                <div className="space-y-3">
                  {maintenanceRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{request.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Unit {request.units?.unit_number} • {request.tenants?.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(request.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                  <Link to="/admin/maintenance">
                    <Button variant="outline" className="w-full">
                      View All Requests
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Wrench className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No maintenance requests</p>
                </div>
              )}
            </CardContent>
          </Card>

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
              ) : payments && payments.length > 0 ? (
                <div className="space-y-3">
                  {payments.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.tenants?.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                  <Link to="/admin/tenants">
                    <Button variant="outline" className="w-full">
                      View All Payments
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <DollarSign className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No payments recorded</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Link to="/admin/properties">
                <Button variant="outline" className="w-full justify-start">
                  <Building className="mr-2 h-4 w-4" />
                  Manage Properties
                </Button>
              </Link>
              <Link to="/admin/tenants">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Tenants
                </Button>
              </Link>
              <Link to="/admin/maintenance">
                <Button variant="outline" className="w-full justify-start">
                  <Wrench className="mr-2 h-4 w-4" />
                  Maintenance Requests
                </Button>
              </Link>
              <Link to="/admin/communications">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Communications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
