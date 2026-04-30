import Dashboard from "../components/Dashboard";
import BranchDashboard from "../components/pages/branch/BranchDashboard";
import Districtdashboard from "../components/pages/district/Districtdashboard";
import ProvinceDashboard from "../components/pages/province/ProvinceDashboard";
import ManagerDashboard from "../components/pages/manager/ManagerDashboard";
import ServiceManager from "../components/pages/service/ServiceManager";
import InquiryDashboard from "../components/pages/inquiry/InquiryDashboard";
import StaffDashboard from "../components/pages/staff/StaffDashboard";

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
  {
    path: "manager-dashboard",
    element: <ManagerDashboard />,
  },
  {
    path: "service-dashboard",
    element: <ServiceManager />,
  },
  {
    path: "inquiry-dashboard",
    element: <InquiryDashboard />,
  },
  {
    path: "staff-dashboard",
    element: <StaffDashboard />,
  },
];
