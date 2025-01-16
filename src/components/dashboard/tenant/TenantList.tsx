import React from "react";
import { Button } from "@/components/ui/button";
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
  unit: string;
  status: "active" | "late" | "pending";
  avatarUrl?: string;
}

interface TenantListProps {
  tenants?: Tenant[];
}

const defaultTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    unit: "Apt 101",
    status: "active",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 234-5678",
    unit: "Apt 205",
    status: "late",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 345-6789",
    unit: "Apt 308",
    status: "pending",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

const TenantList = ({ tenants = defaultTenants }: TenantListProps) => {
  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search tenants..." className="pl-9" />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
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
                      <AvatarImage src={tenant.avatarUrl} />
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
                <TableCell>{tenant.unit}</TableCell>
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
