
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Send, 
  Bell, 
  MessageSquare,
  Calendar,
  Plus,
  User,
  Search
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample message data
const messages = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Question about rent payment",
    message: "Hi, I wanted to confirm if my rent payment for this month was received correctly. The bank shows the transaction went through, but I wanted to double-check.",
    date: "Apr 5, 2025",
    unit: "101A",
    property: "Skyline Apartments",
    status: "Unread",
    type: "Inquiry"
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "Neighbor noise complaint",
    message: "Hello, I've been having issues with loud noise from the apartment above mine. It's been ongoing for a week now, especially late at night. Could something be done about this?",
    date: "Apr 4, 2025",
    unit: "202B",
    property: "Riverfront Residences",
    status: "Read",
    type: "Complaint"
  },
  {
    id: 3,
    sender: "Michael Chen",
    subject: "Lease renewal question",
    message: "Good day, My lease is up for renewal next month. Could you please let me know what the new rate will be and if there are any changes to the terms?",
    date: "Apr 3, 2025",
    unit: "305C",
    property: "Park View Towers",
    status: "Replied",
    type: "Inquiry"
  },
  {
    id: 4,
    sender: "Sarah Johnson",
    subject: "Thank you for prompt maintenance",
    message: "I just wanted to send a quick note to thank your maintenance team for the quick response to my issue yesterday. They were professional and fixed everything perfectly.",
    date: "Apr 2, 2025",
    unit: "404D",
    property: "Cityscape Complex",
    status: "Read",
    type: "Feedback"
  },
];

// Sample announcements
const announcements = [
  {
    id: 1,
    title: "Annual Building Inspection",
    message: "We will be conducting our annual building inspection on April 15th from 9AM to 5PM. Access to all units will be needed. Please make arrangements if you cannot be present.",
    date: "Apr 10, 2025",
    properties: ["Skyline Apartments", "Riverfront Residences"],
    sentTo: "All tenants",
    status: "Scheduled"
  },
  {
    id: 2,
    title: "Water Shutdown Notice",
    message: "Due to necessary pipe repairs, water will be shut off in the north wing on April 12th from 10AM to 2PM. We apologize for any inconvenience this may cause.",
    date: "Apr 8, 2025",
    properties: ["Park View Towers"],
    sentTo: "Affected units only",
    status: "Sent"
  },
  {
    id: 3,
    title: "Community BBQ Event",
    message: "Join us for a community BBQ on April 20th from 12PM to 3PM in the courtyard. Food and drinks will be provided. Please RSVP by April 15th.",
    date: "Apr 5, 2025",
    properties: ["Cityscape Complex"],
    sentTo: "All tenants",
    status: "Sent"
  },
];

const Communications = () => {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  
  const handleSendAnnouncement = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and message fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Announcement Created",
      description: "Your announcement has been scheduled to send.",
    });
    
    setTitle("");
    setMessage("");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground">Manage tenant messages and announcements</p>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  All
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Unread
                </Button>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search messages..." />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="announcements" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Announcements</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="compose" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Compose New Announcement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="announcement-title">Title</Label>
                  <Input 
                    id="announcement-title" 
                    placeholder="Enter announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="recipient-type">Send To</Label>
                  <select
                    id="recipient-type"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="all">All Tenants</option>
                    <option value="property">Select Property</option>
                    <option value="specific">Specific Units</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="properties">Properties</Label>
                  <select
                    id="properties"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    multiple
                  >
                    <option value="skyline">Skyline Apartments</option>
                    <option value="riverfront">Riverfront Residences</option>
                    <option value="parkview">Park View Towers</option>
                    <option value="cityscape">Cityscape Complex</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="message-content">Message</Label>
                  <Textarea 
                    id="message-content" 
                    placeholder="Type your announcement message here..." 
                    className="min-h-[150px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="schedule">Schedule Send (Optional)</Label>
                  <Input 
                    id="schedule" 
                    type="datetime-local" 
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleSendAnnouncement}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface MessageCardProps {
  message: {
    id: number;
    sender: string;
    subject: string;
    message: string;
    date: string;
    unit: string;
    property: string;
    status: string;
    type: string;
  };
}

const MessageCard = ({ message }: MessageCardProps) => {
  const statusVariant = {
    "Unread": "destructive",
    "Read": "secondary",
    "Replied": "outline"
  } as const;

  const typeColor = {
    "Inquiry": "bg-blue-100 text-blue-800",
    "Complaint": "bg-red-100 text-red-800",
    "Feedback": "bg-green-100 text-green-800"
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{message.sender}</h3>
              <p className="text-sm text-muted-foreground">
                {message.unit} - {message.property}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={statusVariant[message.status as keyof typeof statusVariant]}
            >
              {message.status}
            </Badge>
            <Badge className={typeColor[message.type as keyof typeof typeColor]}>
              {message.type}
            </Badge>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">{message.subject}</h4>
          <p className="text-sm">{message.message}</p>
        </div>
        
        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-sm text-muted-foreground">Received: {message.date}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Reply
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              View Thread
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AnnouncementCardProps {
  announcement: {
    id: number;
    title: string;
    message: string;
    date: string;
    properties: string[];
    sentTo: string;
    status: string;
  };
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-medium">{announcement.title}</h3>
          </div>
          <Badge variant={announcement.status === "Scheduled" ? "outline" : "secondary"}>
            {announcement.status}
          </Badge>
        </div>
        
        <div className="mb-4">
          <p className="text-sm">{announcement.message}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium">Properties:</h4>
            <p className="text-sm text-muted-foreground">
              {announcement.properties.join(", ")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Recipients:</h4>
            <p className="text-sm text-muted-foreground">{announcement.sentTo}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t pt-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{announcement.date}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="outline" size="sm">
              Duplicate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Communications;
