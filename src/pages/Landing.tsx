
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  MessageSquare, 
  FileText, 
  Settings, 
  ArrowRight, 
  CheckCircle 
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <header className="border-b py-4 px-4 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">HMS Portal</span>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Your Home, Managed Effortlessly
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Access your lease information, make payments, submit maintenance requests, and communicate with your property manager—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login" className="px-8">
                Existing Tenants
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need in One Portal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lease Management</h3>
              <p className="text-muted-foreground">
                Access your lease details, review terms, and download important documents anytime.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-muted-foreground">
                Send messages directly to your property manager for quick and efficient responses.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
              <Settings className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Maintenance Requests</h3>
              <p className="text-muted-foreground">
                Submit and track maintenance issues with photo uploads and real-time status updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-muted-foreground">
                Sign up using your email or Google account to access your tenant portal.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify Your Information</h3>
              <p className="text-muted-foreground">
                Confirm your identity and connect to your property profile with secure verification.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Your Dashboard</h3>
              <p className="text-muted-foreground">
                Enjoy full access to payments, maintenance requests, and communication tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Tenants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Tenant since 2022</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The tenant portal has made managing my lease and payments so much easier. I love being able to submit maintenance requests right from my phone!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Torres</h4>
                  <p className="text-sm text-muted-foreground">Tenant since 2021</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "Being able to track my payment history and download receipts has been incredibly helpful for my records. Great system!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Emma Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Tenant since 2023</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The communication center has been a game-changer. I get quick responses from my property manager without playing phone tag."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of tenants who are simplifying their rental experience with our tenant portal.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup" className="px-8">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Home className="h-5 w-5 text-primary" />
              <span className="font-medium">HMS Portal</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
              <span>&copy; {new Date().getFullYear()} Housing Management System</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
