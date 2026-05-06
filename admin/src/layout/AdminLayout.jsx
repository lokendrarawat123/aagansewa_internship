import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex mt-1 ">
      {/* header */}
      {/* sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>

      {/* footer */}
    </div>
  );
};

export default AdminLayout;
