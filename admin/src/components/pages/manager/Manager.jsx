import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Manager = () => {
  const { user } = useSelector((state) => state.user) || {};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Manager Dashboard</h1>

      <p className="text-gray-600 mb-6">Welcome {user?.name || "Manager"} 👋</p>

      {/* Simple Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Staff</p>
          <p className="text-xl font-bold">12</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Services</p>
          <p className="text-xl font-bold">8</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Inquiries</p>
          <p className="text-xl font-bold">5</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Reports</p>
          <p className="text-xl font-bold">3</p>
        </div>
      </div>

      {/* Simple Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/manager/staff-dashboard"
          className="bg-blue-600 text-white p-4 rounded text-center"
        >
          Manage Staff
        </Link>

        <Link
          to="/manager/service-dashboard"
          className="bg-green-600 text-white p-4 rounded text-center"
        >
          Manage Services
        </Link>

        <Link
          to="/manager/inquiry-dashboard"
          className="bg-yellow-600 text-white p-4 rounded text-center"
        >
          Manage Inquiries
        </Link>
      </div>

      {/* Footer note */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        Branch Management System
      </div>
    </div>
  );
};

export default Manager;
