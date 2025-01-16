import React from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import MetricsOverview from "./MetricsOverview";
import PropertyGrid from "./PropertyGrid";

interface DashboardLayoutProps {
  activeSection?: "property" | "tenant" | "lease" | "maintenance" | "financial";
  children?: React.ReactNode;
}

const DashboardLayout = ({
  activeSection = "property",
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          {activeSection === "property" ? (
            <>
              <MetricsOverview />
              <PropertyGrid />
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
