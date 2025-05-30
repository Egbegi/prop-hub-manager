
import React, { useState } from "react";
import { TenantLayout } from "@/components/layout/TenantLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Camera,
  FileText,
  User
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Maintenance = () => {
  const [newRequest, setNewRequest] = useState({
    category: "",
    priority: "",
    title: "",
    description: "",
    location: ""
  });

  // Mock maintenance requests data
  const maintenanceRequests = [
    {
      id: 1,
      title: "Kitchen Sink Leak",
      category: "Plumbing",
      priority: "High",
      status: "in_progress",
      dateSubmitted: "Mar 15, 2025",
      lastUpdated: "Mar 18, 2025",
      progress: 75,
      description: "Kitchen sink is leaking under the cabinet. Water damage is starting to occur.",
      location: "Kitchen",
      assignedTo: "Mike Johnson - Plumbing Services",
      estimatedCompletion: "Mar 20, 2025",
      updates: [
        { date: "Mar 18, 2025", message: "Parts ordered, will complete repair tomorrow", author: "Mike Johnson" },
        { date: "Mar 16, 2025", message: "Diagnosed issue - need to replace faucet assembly", author: "Mike Johnson" },
        { date: "Mar 15, 2025", message: "Request received and assigned to plumber", author: "Property Management" }
      ]
    },
    {
      id: 2,
      title: "AC Not Cooling",
      category: "HVAC",
      priority: "Medium",
      status: "pending",
      dateSubmitted: "Mar 20, 2025",
      lastUpdated: "Mar 20, 2025",
      progress: 10,
      description: "Air conditioning unit is running but not cooling the apartment effectively.",
      location: "Living Room",
      assignedTo: "Pending Assignment",
      estimatedCompletion: "TBD",
      updates: [
        { date: "Mar 20, 2025", message: "Request received, scheduling technician", author: "Property Management" }
      ]
    },
    {
      id: 3,
      title: "Bathroom Light Fixture",
      category: "Electrical",
      priority: "Low",
      status: "completed",
      dateSubmitted: "Mar 10, 2025",
      lastUpdated: "Mar 12, 2025",
      progress: 100,
      description: "Bathroom light fixture is flickering intermittently.",
      location: "Bathroom",
      assignedTo: "Sarah Wilson - Electrical Services",
      estimatedCompletion: "Completed",
      updates: [
        { date: "Mar 12, 2025", message: "Light fixture replaced successfully", author: "Sarah Wilson" },
        { date: "Mar 11, 2025", message: "Scheduled for tomorrow morning", author: "Sarah Wilson" },
        { date: "Mar 10, 2025", message: "Request received and assigned to electrician", author: "Property Management" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="mr-1 h-3 w-3" />
          Completed
        </Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Pending
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "Low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleSubmitRequest = () => {
    if (!newRequest.category || !newRequest.title || !newRequest.description) {
      toast({
        title: "Please fill in all required fields",
        description: "Category, title, and description are required.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Maintenance Request Submitted",
      description: "Your request has been submitted and will be reviewed shortly.",
    });

    // Reset form
    setNewRequest({
      category: "",
      priority: "",
      title: "",
      description: "",
      location: ""
    });
  };

  return (
    <TenantLayout>
      <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            Submit new maintenance requests and track existing ones
          </p>
        </div>

        <Tabs defaultValue="my-requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            <TabsTrigger value="submit-request">Submit New Request</TabsTrigger>
          </TabsList>

          {/* My Requests Tab */}
          <TabsContent value="my-requests">
            <div className="space-y-6">
              {maintenanceRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="h-5 w-5" />
                          {request.title}
                        </CardTitle>
                        <CardDescription>
                          {request.category} • {request.location} • Submitted {request.dateSubmitted}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(request.priority)}
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{request.description}</p>
                      
                      {/* Progress Section */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{request.progress}%</span>
                        </div>
                        <Progress value={request.progress} className="h-2" />
                      </div>

                      {/* Assignment Info */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Assigned to: {request.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Est. Completion: {request.estimatedCompletion}</span>
                        </div>
                      </div>

                      {/* Updates Section */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Recent Updates</h4>
                        <div className="space-y-2">
                          {request.updates.slice(0, 2).map((update, index) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-4 py-2">
                              <div className="flex justify-between items-start">
                                <p className="text-sm">{update.message}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {update.date}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                - {update.author}
                              </p>
                            </div>
                          ))}
                        </div>
                        {request.updates.length > 2 && (
                          <Button variant="ghost" size="sm">
                            View All Updates ({request.updates.length})
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {maintenanceRequests.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="bg-muted rounded-full p-3 inline-flex mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Maintenance Requests</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any maintenance requests at the moment.
                    </p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Submit Your First Request
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Submit Request Tab */}
          <TabsContent value="submit-request">
            <Card>
              <CardHeader>
                <CardTitle>Submit Maintenance Request</CardTitle>
                <CardDescription>
                  Describe the issue you're experiencing and we'll assign it to the appropriate technician
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newRequest.category} onValueChange={(value) => setNewRequest({...newRequest, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="appliances">Appliances</SelectItem>
                        <SelectItem value="general">General Maintenance</SelectItem>
                        <SelectItem value="pest-control">Pest Control</SelectItem>
                        <SelectItem value="locks-keys">Locks & Keys</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newRequest.priority} onValueChange={(value) => setNewRequest({...newRequest, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title *</Label>
                    <Input
                      id="title"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                      placeholder="Brief description of the issue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={newRequest.location} onValueChange={(value) => setNewRequest({...newRequest, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="bathroom">Bathroom</SelectItem>
                        <SelectItem value="living-room">Living Room</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="balcony">Balcony/Patio</SelectItem>
                        <SelectItem value="hallway">Hallway</SelectItem>
                        <SelectItem value="common-area">Common Area</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    placeholder="Please provide a detailed description of the issue, including when it started and any relevant details..."
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Photos (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">
                      Upload photos to help us understand the issue better
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSubmitRequest} className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>• Emergency requests (gas leaks, electrical hazards, flooding) should be reported immediately by phone</p>
                  <p>• For non-emergency requests, expect a response within 24-48 hours</p>
                  <p>• You'll receive email updates as your request progresses</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TenantLayout>
  );
};

export default Maintenance;
