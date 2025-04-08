
import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MobileNav />
        <div className="hidden lg:block">
          <Header />
        </div>
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Tenant Portal
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
