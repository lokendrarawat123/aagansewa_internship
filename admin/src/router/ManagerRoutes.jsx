import InquiryDashboard from "../components/pages/manager/inquiry/Inquiry";
import Manager from "../components/pages/manager/Manager";
import Profile from "../components/pages/manager/profile/Profile";
import Report from "../components/pages/manager/report/Report";
import Review from "../components/pages/manager/review/Review";
import ServiceDashboard from "../components/pages/manager/service/serviceDashboard";
import StaffDashboard from "../components/pages/manager/staff/Staff";

export const managerRoutes = [
  {
    path: "dashboard",
    element: <Manager />,
  },

  {
    path: "inquiry-dashboard",
    element: <InquiryDashboard />,
  },
  {
    path: "staff-dashboard",
    element: <StaffDashboard />,
  },
  {
    path: "review-dashboard",
    element: <Review />,
  },
  {
    path: "reports",
    element: <Report />,
  },
  {
    path: "profile",
    element: <Profile />,
  },

  {
    path: "service-dashboard",
    element: <ServiceDashboard />,
  },
];
