
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
import { 
  MessageSquare, 
  Send, 
  Bell, 
  User, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Reply,
  Forward
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Messages = () => {
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    message: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Mock messages data
  const conversations = [
    {
      id: 1,
      subject: "Lease Renewal Options",
      lastMessage: "Thank you for your interest in renewing. I'll send you the renewal terms by Friday.",
      participant: "John Smith - Property Manager",
      lastUpdated: "2 hours ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "tenant",
          content: "Hi John, I'm interested in renewing my lease for another year. What are the terms?",
          timestamp: "Mar 20, 2025 10:30 AM"
        },
        {
          id: 2,
          sender: "manager",
          content: "Hello! Great to hear you'd like to renew. The rent will increase by 3% for the new term, which would be $1,236/month. Everything else remains the same.",
          timestamp: "Mar 20, 2025 2:15 PM"
        },
        {
          id: 3,
          sender: "tenant",
          content: "That sounds reasonable. When do I need to let you know by?",
          timestamp: "Mar 20, 2025 3:45 PM"
        },
        {
          id: 4,
          sender: "manager",
          content: "Thank you for your interest in renewing. I'll send you the renewal terms by Friday.",
          timestamp: "Mar 20, 2025 4:20 PM"
        }
      ]
    },
    {
      id: 2,
      subject: "Parking Space Assignment",
      lastMessage: "Your new parking space number is P-47. The change will be effective Monday.",
      participant: "Sarah Johnson - Leasing Office",
      lastUpdated: "1 day ago",
      unread: true,
      messages: [
        {
          id: 1,
          sender: "tenant",
          content: "Hi, I was wondering if I could get a parking space closer to the building entrance?",
          timestamp: "Mar 19, 2025 9:00 AM"
        },
        {
          id: 2,
          sender: "manager",
          content: "Let me check what's available. I have space P-47 which is much closer to the main entrance.",
          timestamp: "Mar 19, 2025 11:30 AM"
        },
        {
          id: 3,
          sender: "tenant",
          content: "That would be perfect! When can I start using it?",
          timestamp: "Mar 19, 2025 1:15 PM"
        },
        {
          id: 4,
          sender: "manager",
          content: "Your new parking space number is P-47. The change will be effective Monday.",
          timestamp: "Mar 19, 2025 3:45 PM"
        }
      ]
    },
    {
      id: 3,
      subject: "Building Maintenance Schedule",
      lastMessage: "The elevator maintenance is scheduled for this Saturday from 9 AM to 2 PM.",
      participant: "Property Management Team",
      lastUpdated: "3 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "manager",
          content: "The elevator maintenance is scheduled for this Saturday from 9 AM to 2 PM. Please use the stairs during this time.",
          timestamp: "Mar 17, 2025 2:00 PM"
        }
      ]
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Building Wi-Fi Upgrade",
      content: "We're upgrading the building's Wi-Fi infrastructure this weekend. You may experience brief interruptions on Saturday between 10 AM - 12 PM.",
      date: "Mar 18, 2025",
      category: "Maintenance",
      priority: "medium",
      read: false
    },
    {
      id: 2,
      title: "Pool Season Opening",
      content: "The community pool will be opening for the season on April 1st. Pool hours are 6 AM - 10 PM daily. Please review the updated pool rules posted on the community board.",
      date: "Mar 15, 2025",
      category: "Community",
      priority: "low",
      read: true
    },
    {
      id: 3,
      title: "Rent Payment Portal Maintenance",
      content: "Our online rent payment system will be undergoing maintenance on March 25th from 2 AM - 6 AM. Please plan your payments accordingly.",
      date: "Mar 12, 2025",
      category: "Important",
      priority: "high",
      read: true
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const handleSendMessage = () => {
    if (!newMessage.recipient || !newMessage.subject || !newMessage.message) {
      toast({
        title: "Please fill in all fields",
        description: "Recipient, subject, and message are required.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });

    setNewMessage({ recipient: "", subject: "", message: "" });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Important</Badge>;
      case "medium":
        return <Badge variant="secondary">Update</Badge>;
      case "low":
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <TenantLayout>
      <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with your property manager and view important announcements
          </p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="announcements">
              Announcements
              <Badge variant="secondary" className="ml-2">
                {announcements.filter(a => !a.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
          </TabsList>

          {/* Conversations Tab */}
          <TabsContent value="conversations">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Conversation List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Conversations</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-4 cursor-pointer border-b hover:bg-muted/50 transition-colors ${
                            selectedConversation.id === conversation.id ? 'bg-muted' : ''
                          }`}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`font-medium text-sm truncate ${conversation.unread ? 'font-semibold' : ''}`}>
                                  {conversation.subject}
                                </h4>
                                {conversation.unread && (
                                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">{conversation.participant}</p>
                              <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                              <p className="text-xs text-muted-foreground mt-1">{conversation.lastUpdated}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversation Detail */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedConversation.subject}</CardTitle>
                        <CardDescription>{selectedConversation.participant}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'tenant'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'tenant' 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="resize-none"
                        rows={2}
                      />
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Reply className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className={`${!announcement.read ? 'border-primary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          {getPriorityBadge(announcement.priority)}
                          {!announcement.read && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.date}</span>
                          <span>•</span>
                          <span>{announcement.category}</span>
                        </div>
                      </div>
                      <Bell className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compose Tab */}
          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
                <CardDescription>Send a message to your property manager or leasing office</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">To</Label>
                  <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({...newMessage, recipient: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property-manager">John Smith - Property Manager</SelectItem>
                      <SelectItem value="leasing-office">Sarah Johnson - Leasing Office</SelectItem>
                      <SelectItem value="maintenance">Maintenance Team</SelectItem>
                      <SelectItem value="management">Property Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                    placeholder="Write your message here..."
                    rows={6}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TenantLayout>
  );
};

export default Messages;
