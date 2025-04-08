
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  CreditCard, 
  Wrench, 
  MessageSquare, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TenantLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/tenant/dashboard",
  },
  {
    label: "Lease",
    icon: <FileText className="h-5 w-5" />,
    href: "/tenant/lease",
  },
  {
    label: "Payments",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/tenant/payments",
  },
  {
    label: "Maintenance",
    icon: <Wrench className="h-5 w-5" />,
    href: "/tenant/maintenance",
  },
  {
    label: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/tenant/messages",
  },
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/tenant/settings",
  },
];

export function TenantLayout({ children }: TenantLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Simulate logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleNotificationClick = () => {
    setHasNotifications(false);
    toast({
      title: "Notifications",
      description: "You have no new notifications.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-background border-b h-16 flex items-center px-4 md:px-6">
        <div className="flex items-center w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2 mr-4">
            <Link to="/tenant/dashboard" className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="font-bold hidden md:inline-block">HMS Tenant Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
              <SheetHeader className="border-b h-16 flex items-center px-6">
                <SheetTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span>HMS Tenant Portal</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="px-2 py-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive(item.href)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {isActive(item.href) && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-muted transition-colors"
                      onClick={() => {
                        setIsMobileNavOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex mx-4 flex-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side of header - notifications & profile */}
          <div className="flex items-center gap-2 ml-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/tenant/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Optional, can be removed if not needed */}
      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground">
        <div className="max-w-screen-2xl mx-auto">
          <p>&copy; {new Date().getFullYear()} HMS Tenant Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
