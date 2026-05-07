import Dashboard from "../components/pages/superAdmin/Dashboard";
import BranchDashboard from "../components/pages/superAdmin/branch/BranchDashboard";
import Districtdashboard from "../components/pages/superAdmin/district/Districtdashboard";
import ProvinceDashboard from "../components/pages/superAdmin/province/ProvinceDashboard";
import ManagerDashboard from "../components/pages/superAdmin/branchmanager/BranchManager";
import ServiceManager from "../components/pages/superAdmin/service/ServiceDashboard";
import InquiryDashboard from "../components/pages/superAdmin/inquiry/InquiryDashboard";
import StaffDashboard from "../components/pages/superAdmin/staff/StaffDashboard";
import Manager from "../components/pages/manager/Manager";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "manager-dashboard",
    element: <Manager />,
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
