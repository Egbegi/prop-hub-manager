
import React from "react";
import { TenantLayout } from "@/components/layout/TenantLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, CreditCard, Bell, Wrench, Calendar, ArrowRight, CheckCircle, Clock, AlertTriangle, Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePayments } from "@/hooks/usePayments";
import { useMaintenanceRequests } from "@/hooks/useMaintenanceRequests";
import { Skeleton } from "@/components/ui/skeleton";

const TenantDashboard = () => {
  const { user } = useAuth();
  const { payments, isLoading: paymentsLoading } = usePayments();
  const { maintenanceRequests, isLoading: maintenanceLoading } = useMaintenanceRequests();

  // Mock tenant data - in a real app, this would come from the database
  const tenant = {
    name: user?.profile?.full_name || "Tenant User",
    leaseStatus: "Active",
    leaseEnd: "May 15, 2025",
    nextPayment: {
      amount: "$1,200.00",
      dueDate: "April 01, 2025",
      status: "upcoming",
      daysUntilDue: 5,
    },
    property: {
      name: "Skyline Apartments",
      unit: "Apt 304",
      address: "123 Main Street, City, State 12345",
    },
  };

  // Get payment status styling
  const getPaymentStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          className: "bg-green-500/10 text-green-500 border-green-500/20",
        };
      case "upcoming":
        return {
          icon: <Clock className="h-4 w-4" />,
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        };
      case "due":
        return {
          icon: <Bell className="h-4 w-4" />,
          className: "bg-primary/10 text-primary border-primary/20",
        };
      case "overdue":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          className: "bg-destructive/10 text-destructive border-destructive/20",
        };
      default:
        return {
          icon: <Bell className="h-4 w-4" />,
          className: "bg-primary/10 text-primary border-primary/20",
        };
    }
  };

  const paymentStatus = getPaymentStatusStyles(tenant.nextPayment.status);

  // Mock recent activity data with real data if available
  const recentActivity = [
    {
      id: 1,
      type: "payment",
      title: "Rent Payment",
      description: payments && payments.length > 0 ? 
        `Payment of $${payments[0].amount} processed` : 
        "March 2025 rent payment processed",
      date: payments && payments.length > 0 ? 
        new Date(payments[0].payment_date).toLocaleDateString() : 
        "Mar 1, 2025",
      status: "completed",
    },
    {
      id: 2,
      type: "maintenance",
      title: "Maintenance Request",
      description: maintenanceRequests && maintenanceRequests.length > 0 ? 
        maintenanceRequests[0].title : 
        "Kitchen sink repair completed",
      date: maintenanceRequests && maintenanceRequests.length > 0 ? 
        new Date(maintenanceRequests[0].submitted_at).toLocaleDateString() : 
        "Feb 25, 2025",
      status: "completed",
    },
    {
      id: 3,
      type: "document",
      title: "New Document",
      description: "Updated property rules and regulations",
      date: "Feb 15, 2025",
      status: "unread",
    },
    {
      id: 4,
      type: "announcement",
      title: "Community Announcement",
      description: "Building maintenance scheduled for April 10",
      date: "Feb 10, 2025",
      status: "unread",
    },
  ];

  // Use real maintenance requests or show placeholder
  const displayMaintenanceRequests = maintenanceRequests && maintenanceRequests.length > 0 
    ? maintenanceRequests.slice(0, 2).map(req => ({
        id: req.id,
        title: req.title,
        status: req.status,
        dateSubmitted: new Date(req.submitted_at).toLocaleDateString(),
        lastUpdated: new Date(req.submitted_at).toLocaleDateString(),
        progress: req.status === 'resolved' ? 100 : req.status === 'in_progress' ? 50 : 10,
      }))
    : [
        {
          id: 1,
          title: "Sample Maintenance Request",
          status: "pending",
          dateSubmitted: "Mar 20, 2025",
          lastUpdated: "Mar 20, 2025",
          progress: 10,
        },
      ];

  // Get status badge for maintenance requests
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>;
      case "submitted":
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (paymentsLoading || maintenanceLoading) {
    return (
      <TenantLayout>
        <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      <div className="container mx-auto py-6 px-4 max-w-screen-2xl animate-fade-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {tenant.name}</h1>
              <p className="text-muted-foreground">
                Here's an overview of your tenant portal
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link to="/tenant/payments">
                  Make a Payment
                  <CreditCard className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/tenant/maintenance">
                  Request Maintenance
                  <Wrench className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Property Information Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="h-5 w-5" />
                Your Residence
              </CardTitle>
              <CardDescription>Current property information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium text-lg">{tenant.property.name}</div>
                <div className="text-muted-foreground">{tenant.property.unit}</div>
                <div className="text-sm text-muted-foreground">{tenant.property.address}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/tenant/lease">
                  View Lease Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Lease Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lease Status
              </CardTitle>
              <CardDescription>Current lease information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    {tenant.leaseStatus}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Lease ends on {tenant.leaseEnd}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Your lease is in good standing. Remember to review renewal options 60 days before expiration.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/tenant/lease">
                  Download Lease
                  <FileText className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Payment Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Next Payment
              </CardTitle>
              <CardDescription>
                {payments && payments.length > 0 ? "Recent payment status" : "Upcoming rent payment"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">
                    {payments && payments.length > 0 ? `$${payments[0].amount}` : tenant.nextPayment.amount}
                  </div>
                  <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${paymentStatus.className}`}>
                    {paymentStatus.icon}
                    <span className="capitalize">
                      {payments && payments.length > 0 ? payments[0].status : tenant.nextPayment.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {payments && payments.length > 0 
                      ? `Last payment: ${new Date(payments[0].payment_date).toLocaleDateString()}`
                      : `Due on ${tenant.nextPayment.dueDate}`
                    }
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {payments && payments.length > 0 
                    ? "Thank you for your recent payment!"
                    : `${tenant.nextPayment.daysUntilDue} days until payment is due`
                  }
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/tenant/payments">
                  View Payment History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="bg-muted rounded-full p-2 mt-0.5">
                      {activity.type === "payment" && <CreditCard className="h-4 w-4" />}
                      {activity.type === "maintenance" && <Wrench className="h-4 w-4" />}
                      {activity.type === "document" && <FileText className="h-4 w-4" />}
                      {activity.type === "announcement" && <Bell className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    {activity.status === "unread" && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/tenant/messages">
                  View All Updates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Maintenance Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>
                {maintenanceRequests && maintenanceRequests.length > 0 
                  ? "Your active maintenance requests" 
                  : "No active maintenance requests"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {displayMaintenanceRequests.length > 0 ? (
                  displayMaintenanceRequests.map((request) => (
                    <div key={request.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{request.title}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Submitted: {request.dateSubmitted} • Last updated: {request.lastUpdated}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{request.progress}%</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-muted rounded-full p-3 inline-flex mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium mb-1">No Active Requests</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't have any active maintenance requests at the moment.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center w-full justify-between">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/tenant/maintenance">
                    View All Requests
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/tenant/maintenance">
                    New Request
                    <Wrench className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Frequently used tenant resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/tenant/lease">
                  <FileText className="h-6 w-6" />
                  <span>Lease Documents</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/tenant/payments">
                  <CreditCard className="h-6 w-6" />
                  <span>Payment History</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/tenant/maintenance">
                  <Wrench className="h-6 w-6" />
                  <span>Submit Repair</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/tenant/messages">
                  <Bell className="h-6 w-6" />
                  <span>Announcements</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
};

export default TenantDashboard;
