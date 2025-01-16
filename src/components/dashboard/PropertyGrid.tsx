import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

interface Property {
  id: string;
  title: string;
  address: string;
  occupancyRate: number;
  maintenanceRequests: number;
  monthlyRevenue: number;
  imageUrl: string;
}

interface PropertyGridProps {
  properties?: Property[];
}

const defaultProperties: Property[] = [
  {
    id: "1",
    title: "Sunset Apartments",
    address: "123 Main Street, Anytown, USA",
    occupancyRate: 85,
    maintenanceRequests: 3,
    monthlyRevenue: 25000,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ocean View Complex",
    address: "456 Beach Road, Seaside, USA",
    occupancyRate: 92,
    maintenanceRequests: 1,
    monthlyRevenue: 35000,
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Mountain Lodge",
    address: "789 Peak Avenue, Highland, USA",
    occupancyRate: 78,
    maintenanceRequests: 5,
    monthlyRevenue: 28000,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
  },
];

const PropertyGrid = ({
  properties = defaultProperties,
}: PropertyGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");

  return (
    <div className="w-full bg-background p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Name</SelectItem>
                <SelectItem value="occupancyRate">Occupancy Rate</SelectItem>
                <SelectItem value="monthlyRevenue">Monthly Revenue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button>Add Property</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              address={property.address}
              occupancyRate={property.occupancyRate}
              maintenanceRequests={property.maintenanceRequests}
              monthlyRevenue={property.monthlyRevenue}
              imageUrl={property.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
