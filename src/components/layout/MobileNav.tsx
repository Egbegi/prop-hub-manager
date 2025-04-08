
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavLink = ({ to, icon, label, isActive, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function MobileNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden flex h-14 items-center border-b px-4 sticky top-0 bg-background z-30">
      <div className="flex flex-1 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5" />
          <span>HMS</span>
        </Link>
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sidebar w-64">
              <div className="flex h-14 items-center border-b px-6">
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 font-semibold text-sidebar-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span>HMS</span>
                </Link>
              </div>
              <nav className="grid items-start px-2 py-4 gap-1">
                <MobileNavLink
                  to="/"
                  icon={<Home className="h-5 w-5" />}
                  label="Dashboard"
                  isActive={pathname === "/"}
                  onClick={handleLinkClick}
                />
                <MobileNavLink
                  to="/properties"
                  icon={<FileText className="h-5 w-5" />}
                  label="Properties"
                  isActive={pathname === "/properties"}
                  onClick={handleLinkClick}
                />
                <MobileNavLink
                  to="/tenants"
                  icon={<User className="h-5 w-5" />}
                  label="Tenants"
                  isActive={pathname === "/tenants"}
                  onClick={handleLinkClick}
                />
                <MobileNavLink
                  to="/maintenance"
                  icon={<Settings className="h-5 w-5" />}
                  label="Maintenance"
                  isActive={pathname === "/maintenance"}
                  onClick={handleLinkClick}
                />
                <MobileNavLink
                  to="/communications"
                  icon={<Mail className="h-5 w-5" />}
                  label="Communications"
                  isActive={pathname === "/communications"}
                  onClick={handleLinkClick}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
