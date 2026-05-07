import ManagerInquiryDashboard from "../components/pages/manager/inquiry/InquiryDashboard";
import Manager from "../components/pages/manager/Manager";
import ManagerServiceDashboard from "../components/pages/manager/service/ServiceDashboard";
import ManagerStaffDashboard from "../components/pages/manager/staff/StaffDashboard";

export const managerRoutes = [
  {
    path: "dashboard",
    element: <Manager />,
  },
  {
    path: "service-dashboard",
    element: <ManagerServiceDashboard />,
  },
  {
    path: "staff-dashboard",
    element: <ManagerStaffDashboard />,
  },
  {
    path: "inquiry-dashboard",
    element: <ManagerInquiryDashboard />,
  },
];
