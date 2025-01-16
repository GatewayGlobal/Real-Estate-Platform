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
import { MaintenanceForm } from "./MaintenanceForm";
import { Input } from "@/components/ui/input";
import { Search, Plus, Clock, Building2, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  unit: {
    unit_number: string;
    property: {
      title: string;
    };
  };
}

const MaintenanceList = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchRequests() {
      try {
        const query = supabase
          .from("maintenance_requests")
          .select(`
            *,
            unit:units(
              unit_number,
              property:properties(title)
            )
          `)
          .order("created_at", { ascending: false });

        if (statusFilter !== "all") {
          query.eq("status", statusFilter);
        }

        const { data: requestsData, error } = await query;

        if (error) throw error;
        if (requestsData) setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("maintenance_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "maintenance_requests",
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [statusFilter]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search requests..." className="pl-9" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Maintenance Request</DialogTitle>
              </DialogHeader>
              <MaintenanceForm
                onSubmit={async (data) => {
                  try {
                    const { error } = await supabase
                      .from("maintenance_requests")
                      .insert([
                        {
                          ...data,
                          submitted_by: (await supabase.auth.getUser()).data.user
                            ?.id,
                        },
                      ]);
                    if (error) throw error;
                    // Refresh the requests list
                    window.location.reload();
                  } catch (error) {
                    console.error("Error adding maintenance request:", error);
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{request.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{request.unit.property.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.unit.unit_number}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.priority === "high"
                        ? "destructive"
                        : request.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {request.priority.charAt(0).toUpperCase() +
                      request.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "completed" ? "default" : "secondary"
                    }
                    className={
                      request.status === "in_progress" ? "bg-blue-500" : ""
                    }
                  >
                    {request.status
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
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
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Assign Technician</DropdownMenuItem>
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

export default MaintenanceList;
