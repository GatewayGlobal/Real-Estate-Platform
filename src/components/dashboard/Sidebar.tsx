import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  FileText,
  Wrench,
  BarChart3,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activeSection?: "property" | "tenant" | "lease" | "maintenance" | "financial";
}

const Sidebar = ({ className, activeSection = "property" }: SidebarProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const navigationItems = [
    { icon: Building2, label: "Property", id: "property", path: "/" },
    { icon: Users, label: "Tenant", id: "tenant", path: "/tenants" },
    { icon: FileText, label: "Lease", id: "lease", path: "/leases" },
    {
      icon: Wrench,
      label: "Maintenance",
      id: "maintenance",
      path: "/maintenance",
    },
    {
      icon: BarChart3,
      label: "Financial",
      id: "financial",
      path: "/financial",
    },
  ];

  return (
    <div
      className={cn(
        "w-[280px] h-full bg-white border-r flex flex-col",
        className,
      )}
    >
      {/* Logo Section */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">PropManager</h1>
        <p className="text-sm text-muted-foreground">Real Estate Management</p>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                activeSection === item.id && "bg-primary/10",
                "cursor-pointer",
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/account")}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
