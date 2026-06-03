import { useState } from "react";
import { Search } from "lucide-react";

import {
  useGetAllStaffQuery,
  useGetBranchStaffQuery,
} from "../../../../redux/features/staffSlice";

import DetailsModal from "../../../shared/Modal";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import LocationSelect from "../../../shared/LocationFilterd.jsx";

const StaffDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // API
  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetBranchStaffQuery(locationForm.branch_id, {
    skip: !locationForm.branch_id,
  });

  const {
    data: allData,
    isLoading: allLoading,
    error: allError,
  } = useGetAllStaffQuery();

  const baseStaff = locationForm.branch_id
    ? branchData?.data || []
    : allData?.data || [];

  const displayStaff = baseStaff.filter((s) => {
    const name = (s.name || "").toLowerCase();
    const email = (s.email || "").toLowerCase();
    const phone = s.phone || "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)
    );
  });

  if (locationForm.branch_id ? branchLoading : allLoading) return <Loading />;
  if (locationForm.branch_id ? branchError : allError)
    return <Error error={locationForm.branch_id ? branchError : allError} />;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Staff Management
      </h1>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col lg:flex-row gap-4 mb-5 sm:mb-6">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-72 flex flex-col gap-3">
          {/* TOTAL */}
          <div className="flex justify-between items-center px-3 py-2 bg-slate-50 border rounded-lg">
            <span className="text-xs text-gray-500 uppercase">Total</span>
            <span className="font-bold text-sm">{displayStaff.length}</span>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border rounded-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex-1">
          <LocationSelect
            formData={locationForm}
            setFormData={setLocationForm}
          />
        </div>
      </div>

      {/* TABLE WRAPPER (IMPORTANT FOR RESPONSIVE) */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full min-w-225 text-sm sm:text-base">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Branch</th>

              <th className="p-3 text-left hidden md:table-cell">Created</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {displayStaff.length > 0 ? (
              displayStaff.map((staff, index) => (
                <tr key={staff.staff_id} className="border-b hover:bg-slate-50">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">{staff.name}</td>

                  <td className="p-3 break-all text-xs sm:text-sm">
                    {staff.email}
                  </td>

                  <td className="p-3">{staff.phone || "N/A"}</td>

                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {staff.position}
                    </span>
                  </td>

                  <td className="p-3">{staff.branch_name || "N/A"}</td>

                  <td className="p-3 hidden md:table-cell">
                    {staff.created_at
                      ? new Date(staff.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-3 text-center">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-500">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStaff(null);
        }}
        title="Staff Details"
      >
        {selectedStaff &&
          (() => {
            const { password, ...safeStaff } = selectedStaff;

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">Staff ID</p>
                  <p>{safeStaff.staff_id}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Name</p>
                  <p>{safeStaff.name}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Position</p>
                  <p>{safeStaff.position}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Email</p>
                  <p className="break-all">{safeStaff.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p>{safeStaff.phone || "N/A"}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Role</p>
                  <p>{safeStaff.role || "N/A"}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Description</p>
                  <p>{safeStaff.description || "N/A"}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Service ID</p>
                  <p>{safeStaff.service_id || "N/A"}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Branch ID</p>
                  <p>{safeStaff.branch_id}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Branch Name</p>
                  <p>{safeStaff.branch_name || "N/A"}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Created At</p>
                  <p>
                    {safeStaff.created_at
                      ? new Date(safeStaff.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            );
          })()}
      </DetailsModal>
    </div>
  );
};

export default StaffDashboard;
