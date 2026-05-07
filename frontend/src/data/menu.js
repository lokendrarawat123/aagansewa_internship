import {
  House,
  Settings,
  UserRoundCog,
  MessageCircleQuestionMark,
  Star,
  UserCircle,
  BarChart3,
} from "lucide-react";

export const managerMenu = [
  {
    name: "Home",
    key: "home",
    icon: <House size={18} />,
    path: "/dashboard", // Clean URL
  },
  {
    name: "Service Management",
    key: "service",
    icon: <Settings size={18} />,
    path: "/service-management",
  },
  {
    name: "Staff Management",
    key: "staff",
    icon: <UserRoundCog size={18} />,
    path: "/staff-management",
  },
  {
    name: "Inquiry Management",
    key: "inquiry",
    icon: <MessageCircleQuestionMark size={18} />,
    path: "/inquiry-management",
  },
  {
    name: "Review Management",
    key: "review",
    icon: <Star size={18} />,
    path: "/review-management",
  },
  {
    name: "Profile",
    key: "profile",
    icon: <UserCircle size={18} />,
    path: "/profile",
  },
  {
    name: "Reports",
    key: "report",
    icon: <BarChart3 size={18} />,
    path: "/reports",
  },
];
