
import React from "react";
import { TenantLayout } from "@/components/layout/TenantLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, DollarSign, MapPin, User, Phone, Mail, Edit } from "lucide-react";

const Lease = () => {
  // Mock lease data
  const leaseData = {
    property: {
      name: "Skyline Apartments",
      unit: "Apt 304",
      address: "123 Main Street, City, State 12345",
      type: "2 Bedroom, 1 Bathroom",
      sqft: "850 sq ft"
    },
    lease: {
      startDate: "January 1, 2024",
      endDate: "December 31, 2024",
      monthlyRent: "$1,200.00",
      securityDeposit: "$1,200.00",
      dueDate: "1st of each month",
      status: "Active",
      renewalEligible: true,
      daysUntilExpiration: 287
    },
    landlord: {
      name: "Property Management Co.",
      contact: "John Smith",
      phone: "(555) 123-4567",
      email: "john@propertymanagement.com"
    },
    documents: [
      {
        id: 1,
        name: "Original Lease Agreement",
        date: "Dec 15, 2023",
        type: "PDF",
        size: "2.4 MB"
      },
      {
        id: 2,
        name: "Property Rules & Regulations",
        date: "Dec 15, 2023",
        type: "PDF",
        size: "856 KB"
      },
      {
        id: 3,
        name: "Move-in Inspection Report",
        date: "Jan 1, 2024",
        type: "PDF",
        size: "1.2 MB"
      }
    ]
  };

  const handleDownload = (documentName: string) => {
    // Simulate document download
    console.log(`Downloading ${documentName}`);
  };

  const handleRenewalRequest = () => {
    // Handle renewal request
    console.log("Renewal request submitted");
  };

  return (
    <TenantLayout>
      <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lease Information</h1>
          <p className="text-muted-foreground">
            View your lease details, download documents, and manage your rental agreement
          </p>
        </div>

        {/* Lease Status Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lease Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  {leaseData.lease.status}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {leaseData.lease.daysUntilExpiration} days remaining
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Monthly Rent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{leaseData.lease.monthlyRent}</div>
                <p className="text-sm text-muted-foreground">
                  Due {leaseData.lease.dueDate}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lease Term
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Start:</span> {leaseData.lease.startDate}
                </div>
                <div className="text-sm">
                  <span className="font-medium">End:</span> {leaseData.lease.endDate}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Property Details
              </CardTitle>
              <CardDescription>Your current rental property information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">{leaseData.property.name}</h4>
                <p className="text-muted-foreground">{leaseData.property.unit}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="text-right">{leaseData.property.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{leaseData.property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{leaseData.property.sqft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security Deposit:</span>
                  <span>{leaseData.lease.securityDeposit}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Landlord/Property Manager Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Property Manager
              </CardTitle>
              <CardDescription>Contact information for your property manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">{leaseData.landlord.name}</h4>
                <p className="text-muted-foreground">{leaseData.landlord.contact}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{leaseData.landlord.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{leaseData.landlord.email}</span>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lease Documents */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lease Documents
            </CardTitle>
            <CardDescription>Download and view your lease-related documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaseData.documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{document.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {document.type} • {document.size} • {document.date}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownload(document.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Renewal Section */}
        {leaseData.lease.renewalEligible && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Lease Renewal</CardTitle>
              <CardDescription>
                Your lease is eligible for renewal. Submit a renewal request to continue your tenancy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleRenewalRequest}>
                  Request Lease Renewal
                </Button>
                <Button variant="outline">
                  Schedule Renewal Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TenantLayout>
  );
};

export default Lease;
