import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  Building2,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({
  title = "Total Revenue",
  value = "$125,000",
  change = 12.5,
  icon = <DollarSign className="h-5 w-5" />,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        </div>
        <div className="flex items-center mt-4 space-x-2">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  metrics?: {
    totalRevenue?: { value: string; change: number };
    occupancyRate?: { value: string; change: number };
    totalProperties?: { value: string; change: number };
    activeLeases?: { value: string; change: number };
  };
}

const MetricsOverview = ({
  metrics = {
    totalRevenue: { value: "$125,000", change: 12.5 },
    occupancyRate: { value: "85%", change: -2.3 },
    totalProperties: { value: "24", change: 4.8 },
    activeLeases: { value: "142", change: 8.1 },
  },
}: MetricsOverviewProps) => {
  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <Button variant="outline">Download Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue.value}
          change={metrics.totalRevenue.change}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Occupancy Rate"
          value={metrics.occupancyRate.value}
          change={metrics.occupancyRate.change}
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Total Properties"
          value={metrics.totalProperties.value}
          change={metrics.totalProperties.change}
          icon={<Building2 className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Active Leases"
          value={metrics.activeLeases.value}
          change={metrics.activeLeases.change}
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
