import Dashboard from "../components/Dashboard";
import ProvinceDashboard from "../components/pages/province/ProvinceDashboard";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "province-dashboard",
    element: <ProvinceDashboard />,
  },
  {
    path: "district-dashboard",
    element: <ProvinceDashboard />,
  },
  {
    path: "branch-dashboard",
    element: <ProvinceDashboard />,
  },
];
