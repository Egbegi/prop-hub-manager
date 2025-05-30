
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { User, Home, Settings, ArrowUp, ArrowDown, FileText, Building2 } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useTenants } from "@/hooks/useTenants";
import { useMaintenanceRequests } from "@/hooks/useMaintenanceRequests";
import { usePayments } from "@/hooks/usePayments";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { properties, isLoading: propertiesLoading } = useProperties();
  const { tenants, isLoading: tenantsLoading } = useTenants();
  const { maintenanceRequests, isLoading: maintenanceLoading } = useMaintenanceRequests();
  const { payments, isLoading: paymentsLoading } = usePayments();

  // Calculate statistics
  const totalProperties = properties?.length || 0;
  const totalUnits = properties?.reduce((acc, property) => acc + (property.units?.length || 0), 0) || 0;
  const activeTenants = tenants?.filter(tenant => tenant.status === 'active').length || 0;
  const pendingMaintenance = maintenanceRequests?.filter(req => req.status === 'submitted').length || 0;
  const recentPayments = payments?.slice(0, 5) || [];

  // Calculate occupancy rates by property
  const occupancyData = properties?.map(property => {
    const totalUnits = property.units?.length || 0;
    const occupiedUnits = property.units?.filter(unit => unit.status === 'occupied').length || 0;
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
    return {
      name: property.name,
      rate: occupancyRate
    };
  }) || [];

  const isLoading = propertiesLoading || tenantsLoading || maintenanceLoading || paymentsLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your property management system</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-8 w-[60px] mb-4" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your property management system</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                <p className="text-3xl font-bold">{totalProperties}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Units</p>
                <p className="text-3xl font-bold">{totalUnits}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
                <p className="text-3xl font-bold">{activeTenants}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Maintenance</p>
                <p className="text-3xl font-bold">{pendingMaintenance}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Occupancy Overview</CardTitle>
              <CardDescription>Current occupancy rate across all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {occupancyData.length > 0 ? (
                  occupancyData.map((property, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{property.name}</p>
                        <p className="text-sm font-medium">{property.rate}%</p>
                      </div>
                      <Progress value={property.rate} className="h-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No properties available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.length > 0 ? (
                  recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          payment.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          <ArrowDown className={`h-4 w-4 ${
                            payment.status === 'verified' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Payment #{payment.id.slice(0, 8)}
                          </p>
                          <Badge variant={payment.status === 'verified' ? 'default' : 'secondary'}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          +${payment.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent payments</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tenants</CardTitle>
              <CardDescription>Latest tenant additions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenants?.slice(0, 3).map((tenant) => (
                  <div key={tenant.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tenant.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tenant.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No tenants yet</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Maintenance</CardTitle>
              <CardDescription>Latest maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRequests?.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      request.status === 'submitted' ? 'bg-red-100' : 
                      request.status === 'in_progress' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <Settings className={`h-5 w-5 ${
                        request.status === 'submitted' ? 'text-red-600' : 
                        request.status === 'in_progress' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{request.title}</p>
                      <Badge variant={request.status === 'resolved' ? 'default' : 'secondary'}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No maintenance requests</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Overview</CardTitle>
              <CardDescription>Properties in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties?.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{property.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {property.units?.length || 0} units
                      </p>
                    </div>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No properties added yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
