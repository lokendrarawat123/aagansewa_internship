import Dashboard from "../components/pages/superAdmin/Dashboard";
import BranchDashboard from "../components/pages/superAdmin/branch/BranchDashboard";
import Districtdashboard from "../components/pages/superAdmin/district/Districtdashboard";
import ProvinceDashboard from "../components/pages/superAdmin/province/ProvinceDashboard";
import BranchManagerDashboard from "../components/pages/superAdmin/branchmanager/BranchManager";
import ServiceManager from "../components/pages/superAdmin/service/ServiceDashboard";
import InquiryDashboard from "../components/pages/superAdmin/inquiry/InquiryDashboard";
import StaffDashboard from "../components/pages/superAdmin/staff/StaffDashboard";
import ManagerDashboard from "../components/pages/manager/Manager";
import ManagerServiceDashboard from "../components/pages/manager/service/ServiceDashboard";
import ManagerStaffDashboard from "../components/pages/manager/staff/StaffDashboard";
import ManagerInquiryDashboard from "../components/pages/manager/inquiry/InquiryDashboard";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "manager-dashboard",
    element: <ManagerDashboard />,
  },
  {
    path: "manager-service-dashboard",
    element: <ManagerServiceDashboard />,
  },
  {
    path: "manager-staff-dashboard",
    element: <ManagerStaffDashboard />,
  },
  {
    path: "manager-inquiry-dashboard",
    element: <ManagerInquiryDashboard />,
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
    path: "branch-manager-dashboard",
    element: <BranchManagerDashboard />,
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
