import React from "react";
import { Button } from "@/components/ui/button";
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
  tenant: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: "active" | "expired" | "pending";
}

interface LeaseListProps {
  leases?: Lease[];
}

const defaultLeases: Lease[] = [
  {
    id: "1",
    tenant: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    property: "Sunset Apartments",
    unit: "Apt 101",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 1500,
    status: "active",
  },
  {
    id: "2",
    tenant: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    property: "Ocean View Complex",
    unit: "Apt 205",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    monthlyRent: 2000,
    status: "pending",
  },
  {
    id: "3",
    tenant: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    property: "Mountain Lodge",
    unit: "Apt 308",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    monthlyRent: 1800,
    status: "expired",
  },
];

const LeaseList = ({ leases = defaultLeases }: LeaseListProps) => {
  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search leases..." className="pl-9" />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Lease
        </Button>
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
                      <AvatarImage src={lease.tenant.avatarUrl} />
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
                      <span className="text-sm">{lease.property}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lease.unit}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {lease.startDate} - {lease.endDate}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    ${lease.monthlyRent.toLocaleString()}
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
