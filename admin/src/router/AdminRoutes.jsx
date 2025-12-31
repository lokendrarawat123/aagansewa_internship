import Dashboard from "../components/Dashboard";
import BranchDashboard from "../components/pages/branch/BranchDashboard";
import Districtdashboard from "../components/pages/district/Districtdashboard";
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
    element: <Districtdashboard />,
  },
  {
    path: "branch-dashboard",
    element: <BranchDashboard />,
  },
];
