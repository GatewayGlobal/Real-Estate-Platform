import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut, User, CreditCard } from "lucide-react";

const TopNav = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const unreadNotifications = 3; // TODO: Implement notifications

  return (
    <div className="h-16 px-6 border-b bg-white flex items-center justify-between">
      {/* Left side - can be used for breadcrumbs or page title */}
      <div></div>

      {/* Right side - notifications and profile */}
      <div className="flex items-center gap-4">
        {/* Subscription Status */}
        <Badge
          variant={
            profile?.subscription_status === "active" ? "default" : "secondary"
          }
          className={`${profile?.subscription_status === "active" ? "bg-green-500" : "bg-yellow-500"} cursor-pointer`}
          onClick={() => navigate("/account")}
        >
          {(profile?.subscription_status || "trial").charAt(0).toUpperCase() +
            (profile?.subscription_status || "trial").slice(1)}{" "}
          Subscription
        </Badge>

        {/* Notifications */}
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
              variant="destructive"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email}`}
                  alt={profile?.name || ""}
                />
                <AvatarFallback>
                  {(profile?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {profile?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNav;
