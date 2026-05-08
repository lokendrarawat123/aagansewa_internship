import {
  MapPin,
  Layers,
  Building2,
  LogOut,
  House,
  Users,
  Settings,
  MessageCircleQuestionMark,
  UserPen,
  UserPlus2Icon,
  UserCheck,
  UserRoundCog,
  Star,
  UserCircle,
  BarChart3,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../redux/features/authState";
import { toast } from "react-toastify";

import { useSignOutMutation } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const role = user?.role?.toLowerCase();
  console.log("User Role:", user); // Debugging line to check the role value
  const [signout] = useSignOutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "logout");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "logout failed");
    }
  };
  const menu = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: <House size={18} />,
      path: "dashboard",
      role: ["admin", "manager"],
    },
    {
      name: "Province Management",
      key: "province",
      icon: <MapPin size={18} />,
      path: "/admin/province-dashboard",
    },
    {
      name: "District Management",
      key: "district",
      icon: <Layers size={18} />,
      path: "/admin/district-dashboard",
    },
    {
      name: "Branch Management",
      key: "branch",
      icon: <Building2 size={18} />,
      path: "/admin/branch-dashboard",
    },
    {
      name: "Manager Management",
      key: "manager",
      icon: <UserCheck size={18} />,
      path: "/admin/manager-dashboard",
    },
    {
      name: "Service Management",
      key: "service",
      icon: <Settings size={18} />,
      path: "/admin/service-dashboard",
    },
    {
      name: "Inquiry Management",
      key: "inquiry",
      icon: <MessageCircleQuestionMark size={18} />,
      path: "/admin/inquiry-dashboard",
    },
    {
      name: "Staff Management",
      key: "staff",
      icon: <UserRoundCog size={18} />,
      path: "/admin/staff-dashboard",
    },
  ];

  const managerMenu = [
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
  const currentMenu = role === "admin" ? menu : managerMenu;
  return (
    <aside className="fixed-0 w-64 h-screen bg-slate-900 text-slate-200 flex flex-col shadow-xl">
      {/* Brand */}
      <div className="px-6 py-5 text-xl font-semibold border-b border-slate-700">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {currentMenu.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active === item.key
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
