import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth-context";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./components/auth/LoginPage";
import Home from "./components/home";
import TenantList from "./components/dashboard/tenant/TenantList";
import MaintenanceList from "./components/dashboard/maintenance/MaintenanceList";
import LeaseList from "./components/dashboard/lease/LeaseList";
import AccountPage from "./components/dashboard/account/AccountPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/tenants"
            element={
              <AuthGuard>
                <Home activeSection="tenant">
                  <TenantList />
                </Home>
              </AuthGuard>
            }
          />
          <Route
            path="/maintenance"
            element={
              <AuthGuard>
                <Home activeSection="maintenance">
                  <MaintenanceList />
                </Home>
              </AuthGuard>
            }
          />
          <Route
            path="/leases"
            element={
              <AuthGuard>
                <Home activeSection="lease">
                  <LeaseList />
                </Home>
              </AuthGuard>
            }
          />
          <Route
            path="/account"
            element={
              <AuthGuard>
                <Home>
                  <AccountPage />
                </Home>
              </AuthGuard>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </AuthProvider>
    </Suspense>
  );
}

export default App;
