
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  FileText, 
  CreditCard, 
  Wrench, 
  MessageSquare, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Property Management",
      description: "Easy access to your rental information, lease details, and property updates."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Online Payments",
      description: "Pay rent securely online with multiple payment options and automatic receipts."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Maintenance Requests",
      description: "Submit and track maintenance requests with photo uploads and real-time updates."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Direct Communication",
      description: "Communicate directly with your property manager through our secure messaging system."
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The tenant portal makes paying rent and requesting maintenance so easy. I love the convenience!",
      rating: 5
    },
    {
      name: "Michael Chen",
      text: "Finally, a platform that keeps everything organized. I can access my lease and payment history anytime.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      text: "The maintenance request feature is fantastic. I can track progress and communicate with technicians easily.",
      rating: 5
    }
  ];

  const steps = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Create Account",
      description: "Sign up with your email or use Google to get started quickly."
    },
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Access Your Info",
      description: "View your lease details, payment history, and property information."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Manage Everything",
      description: "Pay rent, submit requests, and communicate with your property manager."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9a9ef63e-9ccf-4f5a-856e-5e2f928d8fea.png" 
              alt="HMS Logo" 
              className="h-10 w-10"
            />
            <span className="font-bold text-xl">HMS Tenant Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Your Housing Management
            <span className="text-primary block">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access your rental information, pay rent online, submit maintenance requests, 
            and communicate with your property manager all in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need in one place
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our tenant portal provides all the tools you need to manage your rental experience efficiently.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-primary mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What our tenants say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied tenants
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our platform today and experience hassle-free rental management.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/9a9ef63e-9ccf-4f5a-856e-5e2f928d8fea.png" 
                  alt="HMS Logo" 
                  className="h-8 w-8"
                />
                <span className="font-bold">HMS Portal</span>
              </div>
              <p className="text-muted-foreground">
                Making rental management simple and efficient for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Online Payments</li>
                <li>Maintenance Requests</li>
                <li>Lease Management</li>
                <li>Communication</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>support@hms.com</li>
                <li>1-800-HMS-HELP</li>
                <li>Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HMS Tenant Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
