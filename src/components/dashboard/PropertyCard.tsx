import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, AlertCircle, DollarSign, Users } from "lucide-react";

interface PropertyCardProps {
  title?: string;
  address?: string;
  occupancyRate?: number;
  maintenanceRequests?: number;
  monthlyRevenue?: number;
  imageUrl?: string;
}

const PropertyCard = ({
  title = "Sunset Apartments",
  address = "123 Main Street, Anytown, USA",
  occupancyRate = 85,
  maintenanceRequests = 3,
  monthlyRevenue = 25000,
  imageUrl = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
}: PropertyCardProps) => {
  return (
    <Card className="w-[380px] bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge
            className="absolute top-4 right-4 bg-white text-primary"
            variant="secondary"
          >
            {occupancyRate}% Occupied
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{address}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm">{occupancyRate}% Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <span className="text-sm">{maintenanceRequests} Requests</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              ${monthlyRevenue.toLocaleString()} Monthly Revenue
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          View Details
        </Button>
        <Button className="flex-1">Manage Property</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
