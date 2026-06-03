import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 h-screen overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
