import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TenantForm } from "./TenantForm";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  avatar_url?: string;
}

const TenantList = () => {
  interface TenantWithUnit extends Tenant {
    unit?: string;
    lease?: {
      unit: {
        unit_number: string;
      };
    };
  }

  const [tenants, setTenants] = useState<TenantWithUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTenants() {
      try {
        const { data: tenantsData, error } = await supabase
          .from("tenants")
          .select(`
            *,
            lease:leases(
              unit:units(unit_number)
            )
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (tenantsData) setTenants(tenantsData);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTenants();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("tenants_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tenants",
        },
        () => {
          fetchTenants();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search tenants..." 
            className="pl-9" 
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
            </DialogHeader>
            <TenantForm
              onSubmit={async (data) => {
                try {
                  const { error } = await supabase.from("tenants").insert([
                    {
                      ...data,
                      owner_id: (await supabase.auth.getUser()).data.user?.id,
                    },
                  ]);
                  if (error) throw error;
                  // Refresh the tenants list
                  window.location.reload();
                } catch (error) {
                  console.error("Error adding tenant:", error);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={tenant.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${tenant.name}`} 
                      />
                      <AvatarFallback>{tenant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tenant.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tenant.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {tenant.lease?.unit?.unit_number || "No unit assigned"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tenant.status === "active"
                        ? "default"
                        : tenant.status === "late"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {tenant.status.charAt(0).toUpperCase() +
                      tenant.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove Tenant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantList;
