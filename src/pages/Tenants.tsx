
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Search, 
  MoreHorizontal, 
  Plus, 
  FileText, 
  Mail, 
  Phone 
} from "lucide-react";

// Sample tenant data
const tenants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    unit: "101A",
    property: "Skyline Apartments",
    leaseEnd: "May 15, 2025",
    status: "Active",
    rentStatus: "Paid",
    rentAmount: "$1,500",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 234-5678",
    unit: "202B",
    property: "Riverfront Residences",
    leaseEnd: "Aug 01, 2025",
    status: "Active",
    rentStatus: "Paid",
    rentAmount: "$1,200",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 345-6789",
    unit: "305C",
    property: "Park View Towers",
    leaseEnd: "Jul 10, 2025",
    status: "Active",
    rentStatus: "Late",
    rentAmount: "$1,800",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 456-7890",
    unit: "404D",
    property: "Cityscape Complex",
    leaseEnd: "Apr 30, 2025",
    status: "Active",
    rentStatus: "Paid",
    rentAmount: "$1,350",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 567-8901",
    unit: "101B",
    property: "Skyline Apartments",
    leaseEnd: "May 05, 2025",
    status: "Active",
    rentStatus: "Late",
    rentAmount: "$1,500",
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "(555) 678-9012",
    unit: "202C",
    property: "Riverfront Residences",
    leaseEnd: "Jun 15, 2025",
    status: "Active",
    rentStatus: "Paid",
    rentAmount: "$1,250",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "(555) 789-0123",
    unit: "303A",
    property: "Park View Towers",
    leaseEnd: "Jun 30, 2025",
    status: "Notice",
    rentStatus: "Paid",
    rentAmount: "$1,750",
  },
  {
    id: 8,
    name: "Lisa Garcia",
    email: "lisa.g@example.com",
    phone: "(555) 890-1234",
    unit: "505D",
    property: "Cityscape Complex",
    leaseEnd: "May 10, 2025",
    status: "Active",
    rentStatus: "Paid",
    rentAmount: "$1,400",
  },
];

const Tenants = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
            <p className="text-muted-foreground">Manage your tenant information</p>
          </div>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex-1">
            <Label htmlFor="search-tenants">Search Tenants</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-tenants"
                type="search"
                placeholder="Search by name, email, unit or property..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-[180px]">
            <Label htmlFor="filter-property">Filter by Property</Label>
            <select
              id="filter-property"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Properties</option>
              <option value="skyline">Skyline Apartments</option>
              <option value="riverfront">Riverfront Residences</option>
              <option value="parkview">Park View Towers</option>
              <option value="cityscape">Cityscape Complex</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tenants</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="notice">Notice</TabsTrigger>
            <TabsTrigger value="late">Late Rent</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTenants.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTenants
                .filter((tenant) => tenant.status === "Active")
                .map((tenant) => (
                  <TenantCard key={tenant.id} tenant={tenant} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="notice" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTenants
                .filter((tenant) => tenant.status === "Notice")
                .map((tenant) => (
                  <TenantCard key={tenant.id} tenant={tenant} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="late" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTenants
                .filter((tenant) => tenant.rentStatus === "Late")
                .map((tenant) => (
                  <TenantCard key={tenant.id} tenant={tenant} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface TenantCardProps {
  tenant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    unit: string;
    property: string;
    leaseEnd: string;
    status: string;
    rentStatus: string;
    rentAmount: string;
  };
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  return (
    <div className="tenant-card">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <User className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{tenant.name}</h3>
            <p className="text-sm text-muted-foreground">
              {tenant.unit} - {tenant.property}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Badge 
              variant={tenant.status === "Active" ? "default" : "secondary"}
              className="ml-auto"
            >
              {tenant.status}
            </Badge>
            <Badge 
              variant={tenant.rentStatus === "Paid" ? "outline" : "destructive"}
              className="ml-auto"
            >
              {tenant.rentStatus}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                <DropdownMenuItem>Lease Documents</DropdownMenuItem>
                <DropdownMenuItem>Payment History</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Remove Tenant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
          <div className="flex items-center gap-1">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs truncate">{tenant.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs">{tenant.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs">Lease ends: {tenant.leaseEnd}</span>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-sm">Monthly Rent: <span className="font-medium">{tenant.rentAmount}</span></span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <Mail className="h-3.5 w-3.5 mr-1" />
              Email
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Phone className="h-3.5 w-3.5 mr-1" />
              Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenants;
