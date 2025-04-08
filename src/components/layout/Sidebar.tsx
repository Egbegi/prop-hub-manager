
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, User, FileText, Settings, Mail, Bell, Search } from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
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

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="hidden lg:flex min-h-screen bg-sidebar w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <Home className="h-5 w-5" />
          <span>HMS</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          <SidebarLink
            to="/"
            icon={<Home className="h-4 w-4" />}
            label="Dashboard"
            isActive={pathname === "/"}
          />
          <SidebarLink
            to="/properties"
            icon={<FileText className="h-4 w-4" />}
            label="Properties"
            isActive={pathname === "/properties"}
          />
          <SidebarLink
            to="/tenants"
            icon={<User className="h-4 w-4" />}
            label="Tenants"
            isActive={pathname === "/tenants"}
          />
          <SidebarLink
            to="/maintenance"
            icon={<Settings className="h-4 w-4" />}
            label="Maintenance"
            isActive={pathname === "/maintenance"}
          />
          <SidebarLink
            to="/communications"
            icon={<Mail className="h-4 w-4" />}
            label="Communications"
            isActive={pathname === "/communications"}
          />
        </nav>
      </div>
    </div>
  );
}
