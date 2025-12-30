import { Outlet } from "react-router-dom";
import Sidebar from "../components/pages/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex mt-3 ">
      {/* header */}
      {/* sidebar */}
      <div className="">
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
