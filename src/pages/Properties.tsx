
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, MoreHorizontal, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample property data
const properties = [
  {
    id: 1,
    name: "Skyline Apartments",
    address: "123 Tower Rd, New York, NY 10001",
    units: 12,
    occupiedUnits: 11,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$18,500",
    status: "Active"
  },
  {
    id: 2,
    name: "Riverfront Residences",
    address: "456 River Ave, Chicago, IL 60601",
    units: 8,
    occupiedUnits: 7,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$12,800",
    status: "Active"
  },
  {
    id: 3,
    name: "Park View Towers",
    address: "789 Park Blvd, San Francisco, CA 94103",
    units: 16,
    occupiedUnits: 12,
    image: "https://images.unsplash.com/photo-1622015663084-307d19eababe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$24,500",
    status: "Active"
  },
  {
    id: 4,
    name: "Cityscape Complex",
    address: "101 Downtown St, Austin, TX 78701",
    units: 10,
    occupiedUnits: 9,
    image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$15,200",
    status: "Active"
  },
  {
    id: 5,
    name: "Harbor Heights",
    address: "202 Harbor View, Seattle, WA 98101",
    units: 0,
    occupiedUnits: 0,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$0",
    status: "Inactive"
  },
  {
    id: 6,
    name: "Sunset Gardens",
    address: "303 Sunset Blvd, Los Angeles, CA 90028",
    units: 2,
    occupiedUnits: 2,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    monthlyIncome: "$5,800",
    status: "Active"
  }
];

const Properties = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground">Manage your real estate portfolio</p>
          </div>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((property) => property.status === "Active")
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties
                .filter((property) => property.status === "Inactive")
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    address: string;
    units: number;
    occupiedUnits: number;
    image: string;
    monthlyIncome: string;
    status: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const occupancyRate = property.units > 0 
    ? Math.round((property.occupiedUnits / property.units) * 100) 
    : 0;

  return (
    <Card className="property-card overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={property.image} 
          alt={property.name}
          className="object-cover w-full h-full" 
        />
        <div className="absolute top-2 right-2">
          <Badge variant={property.status === "Active" ? "default" : "secondary"}>
            {property.status}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{property.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Property</DropdownMenuItem>
              <DropdownMenuItem>Manage Units</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{property.address}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Units:</span>
          <span>{property.occupiedUnits}/{property.units}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Occupancy:</span>
          <span>{occupancyRate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Monthly Income:</span>
          <span>{property.monthlyIncome}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Home className="mr-2 h-4 w-4" />
          Units
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <User className="mr-2 h-4 w-4" />
          Tenants
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Properties;
