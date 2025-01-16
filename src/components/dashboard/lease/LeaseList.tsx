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
import { LeaseForm } from "./LeaseForm";
import { Input } from "@/components/ui/input";
import { Search, Plus, Calendar, Building2, MoreVertical } from "lucide-react";
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

interface Lease {
  id: string;
  unit_id: string;
  tenant_id: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  status: string;
  tenant: {
    name: string;
    email: string;
    avatar_url?: string;
  };
  unit: {
    unit_number: string;
    property: {
      title: string;
    };
  };
}

const LeaseList = () => {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeases() {
      try {
        const { data: leasesData, error } = await supabase
          .from("leases")
          .select(`
            *,
            tenant:tenants(name, email, avatar_url),
            unit:units(
              unit_number,
              property:properties(title)
            )
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (leasesData) setLeases(leasesData);
      } catch (error) {
        console.error("Error fetching leases:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeases();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("leases_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leases",
        },
        () => {
          fetchLeases();
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
            placeholder="Search leases..." 
            className="pl-9" 
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Lease
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lease</DialogTitle>
            </DialogHeader>
            <LeaseForm
              onSubmit={async (data) => {
                try {
                  const { error } = await supabase.from("leases").insert([data]);
                  if (error) throw error;
                  // Refresh the leases list
                  window.location.reload();
                } catch (error) {
                  console.error("Error adding lease:", error);
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
              <TableHead>Property</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Monthly Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={lease.tenant.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lease.tenant.name}`} 
                      />
                      <AvatarFallback>{lease.tenant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{lease.tenant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lease.tenant.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lease.unit.property.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lease.unit.unit_number}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(lease.start_date).toLocaleDateString()} - {new Date(lease.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    ${lease.monthly_rent.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lease.status === "active"
                        ? "default"
                        : lease.status === "expired"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {lease.status.charAt(0).toUpperCase() +
                      lease.status.slice(1)}
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
                      <DropdownMenuItem>Edit Lease</DropdownMenuItem>
                      <DropdownMenuItem>Download Contract</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Terminate Lease
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

export default LeaseList;
