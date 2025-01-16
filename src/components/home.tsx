import React from "react";
import DashboardLayout from "./dashboard/DashboardLayout";

interface HomeProps {
  activeSection?: "property" | "tenant" | "lease" | "maintenance" | "financial";
  children?: React.ReactNode;
}

const Home = ({ activeSection = "property", children }: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout activeSection={activeSection}>
        {children}
      </DashboardLayout>
    </div>
  );
};

export default Home;
