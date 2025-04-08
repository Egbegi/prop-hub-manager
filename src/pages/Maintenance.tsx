
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
import { 
  Settings, 
  MoreHorizontal, 
  Plus, 
  Calendar, 
  User, 
  Home 
} from "lucide-react";

// Sample maintenance data
const maintenanceRequests = [
  {
    id: 1,
    title: "Leaking Faucet",
    description: "The kitchen sink faucet is leaking constantly.",
    property: "Skyline Apartments",
    unit: "101A",
    tenant: "John Doe",
    dateSubmitted: "Apr 5, 2025",
    status: "Open",
    priority: "Medium",
    assignedTo: "Mike the Plumber",
    category: "Plumbing",
  },
  {
    id: 2,
    title: "Broken Air Conditioner",
    description: "The A/C unit is not cooling properly and making strange noises.",
    property: "Riverfront Residences",
    unit: "202B",
    tenant: "Jane Smith",
    dateSubmitted: "Apr 4, 2025",
    status: "In Progress",
    priority: "High",
    assignedTo: "Cool Air Services",
    category: "HVAC",
  },
  {
    id: 3,
    title: "Electrical Outlet Not Working",
    description: "The outlet in the living room doesn't work at all.",
    property: "Park View Towers",
    unit: "305C",
    tenant: "Michael Chen",
    dateSubmitted: "Apr 3, 2025",
    status: "Open",
    priority: "Low",
    assignedTo: "Unassigned",
    category: "Electrical",
  },
  {
    id: 4,
    title: "Clogged Toilet",
    description: "The toilet in the master bathroom is clogged and won't flush properly.",
    property: "Cityscape Complex",
    unit: "404D",
    tenant: "Sarah Johnson",
    dateSubmitted: "Apr 2, 2025",
    status: "Completed",
    priority: "High",
    assignedTo: "Plumbing Pros",
    category: "Plumbing",
  },
  {
    id: 5,
    title: "Broken Window Latch",
    description: "The latch on the bedroom window is broken and won't close securely.",
    property: "Skyline Apartments",
    unit: "101B",
    tenant: "David Wilson",
    dateSubmitted: "Apr 1, 2025",
    status: "Open",
    priority: "Medium",
    assignedTo: "Unassigned",
    category: "Structural",
  },
  {
    id: 6,
    title: "Dishwasher Not Draining",
    description: "The dishwasher fills with water but doesn't drain properly.",
    property: "Riverfront Residences",
    unit: "202C",
    tenant: "Emily Rodriguez",
    dateSubmitted: "Mar 31, 2025",
    status: "In Progress",
    priority: "Medium",
    assignedTo: "Appliance Repair Inc.",
    category: "Appliance",
  },
  {
    id: 7,
    title: "Smoke Detector Beeping",
    description: "The smoke detector is beeping intermittently, possibly needs new batteries.",
    property: "Park View Towers",
    unit: "303A",
    tenant: "Robert Taylor",
    dateSubmitted: "Mar 30, 2025",
    status: "Completed",
    priority: "Low",
    assignedTo: "Maintenance Staff",
    category: "Safety",
  },
  {
    id: 8,
    title: "Carpet Damage",
    description: "There's a large stain on the living room carpet that needs cleaning or replacement.",
    property: "Cityscape Complex",
    unit: "505D",
    tenant: "Lisa Garcia",
    dateSubmitted: "Mar 29, 2025",
    status: "Open",
    priority: "Low",
    assignedTo: "Unassigned",
    category: "Flooring",
  },
];

const Maintenance = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
            <p className="text-muted-foreground">Manage maintenance requests and work orders</p>
          </div>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Request
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter(r => r.status === "Open").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {maintenanceRequests.filter(r => r.status === "Open" && r.priority === "High").length} high priority
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter(r => r.status === "In Progress").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Assigned to contractors
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter(r => r.status === "Completed").length}
              </div>
              <p className="text-xs text-muted-foreground">
                In the last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter(r => r.assignedTo === "Unassigned").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need contractor assignment
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceRequests.map((request) => (
                <MaintenanceCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="open" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceRequests
                .filter((request) => request.status === "Open")
                .map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="in-progress" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceRequests
                .filter((request) => request.status === "In Progress")
                .map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceRequests
                .filter((request) => request.status === "Completed")
                .map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface MaintenanceCardProps {
  request: {
    id: number;
    title: string;
    description: string;
    property: string;
    unit: string;
    tenant: string;
    dateSubmitted: string;
    status: string;
    priority: string;
    assignedTo: string;
    category: string;
  };
}

const MaintenanceCard = ({ request }: MaintenanceCardProps) => {
  const priorityColor = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Low": "bg-green-100 text-green-800"
  };

  const statusVariant = {
    "Open": "secondary",
    "In Progress": "default",
    "Completed": "outline"
  } as const;

  return (
    <div className="maintenance-card">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{request.title}</h3>
              <Badge 
                variant={statusVariant[request.status as keyof typeof statusVariant]}
              >
                {request.status}
              </Badge>
              <Badge className={priorityColor[request.priority as keyof typeof priorityColor]}>
                {request.priority} Priority
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {request.property} - Unit {request.unit}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Assign Contractor</DropdownMenuItem>
            <DropdownMenuItem>Contact Tenant</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="ml-[3.25rem] mt-1 space-y-3">
        <p className="text-sm">{request.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Submitted: {request.dateSubmitted}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Tenant: {request.tenant}</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Category: {request.category}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3">
          <div className="text-sm">
            <span className="text-muted-foreground">Assigned to: </span>
            <span className={request.assignedTo === "Unassigned" ? "text-yellow-600 font-medium" : ""}>
              {request.assignedTo}
            </span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Assign
            </Button>
            <Button size="sm">
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
