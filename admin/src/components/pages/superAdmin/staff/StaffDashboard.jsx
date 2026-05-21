import { useState } from "react";

import { useGetStaffQuery } from "../../../../redux/features/staffSlice";

import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const StaffDashboard = () => {
  // STATES
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // API hooks
  const { data: staffData, isLoading, error } = useGetStaffQuery();

  const staff = staffData?.staff || staffData?.allStaff || [];

  // Loading and error states
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Staff ID
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Name
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Position
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Address
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Created At
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {staff?.length > 0 ? (
              staff.map((staffMember, index) => (
                <tr
                  key={staffMember.staff_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{staffMember.staff_id}</td>

                  <td className="px-4 py-3 text-sm font-medium">
                    {staffMember.name}
                  </td>

                  <td className="px-4 py-3 text-sm">{staffMember.email}</td>

                  <td className="px-4 py-3 text-sm">
                    {staffMember.phone || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs uppercase font-bold">
                      {staffMember.position}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm">{staffMember.branch_id}</td>

                  <td className="px-4 py-3 text-sm">
                    {staffMember.address || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {staffMember.created_at
                      ? new Date(staffMember.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => {
                        setSelectedStaff(staffMember);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-gray-400 text-4xl">👥</div>

                    <p className="text-gray-500 font-medium">No staff found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW DETAILS MODAL ================= */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStaff(null);
        }}
        title="Staff Details"
      >
        {selectedStaff && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Staff ID</p>

                <p>{selectedStaff.staff_id}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Full Name</p>

                <p>{selectedStaff.name}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Email</p>

                <p>{selectedStaff.email}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Phone</p>

                <p>{selectedStaff.phone || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Position</p>

                <p>{selectedStaff.position}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Branch</p>

                <p>{selectedStaff.branch_id}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Address</p>

                <p>{selectedStaff.address || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Created At</p>

                <p>
                  {selectedStaff.created_at
                    ? new Date(selectedStaff.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default StaffDashboard;
