import React from "react";
import { Button } from "@/components/ui/button";
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
  property: string;
  unit: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "completed";
  dateSubmitted: string;
  description: string;
}

interface MaintenanceListProps {
  requests?: MaintenanceRequest[];
}

const defaultRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Leaking Faucet",
    property: "Sunset Apartments",
    unit: "Apt 101",
    priority: "medium",
    status: "open",
    dateSubmitted: "2024-03-15",
    description: "Kitchen sink faucet is leaking continuously",
  },
  {
    id: "2",
    title: "AC Not Working",
    property: "Ocean View Complex",
    unit: "Apt 205",
    priority: "high",
    status: "in_progress",
    dateSubmitted: "2024-03-14",
    description: "Air conditioning unit not cooling properly",
  },
  {
    id: "3",
    title: "Light Fixture Replacement",
    property: "Mountain Lodge",
    unit: "Apt 308",
    priority: "low",
    status: "completed",
    dateSubmitted: "2024-03-13",
    description: "Living room light fixture needs replacement",
  },
];

const MaintenanceList = ({
  requests = defaultRequests,
}: MaintenanceListProps) => {
  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search requests..." className="pl-9" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select defaultValue="all">
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
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
                      <span className="text-sm">{request.property}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.unit}
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
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{request.dateSubmitted}</span>
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
