import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from "../../../../redux/features/staffSlice";
import { useGetBranchQuery } from "../../../../redux/features/branchSlice";
import Input from "../../../shared/Input";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import { useSelector } from "react-redux";

const ManagerStaffDashboard = () => {
  const { user } = useSelector((state) => state.user) || {};
  const userBranchId = user?.branch_id; // Manager's branch ID

  // State for managing modals and forms
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    position: "",
  });

  // API hooks
  const { data: staffData, isLoading, error } = useGetStaffQuery();
  const { data: branchData } = useGetBranchQuery();
  const [addStaff] = useAddStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  // Filter staff for manager's branch only
  const allStaff = staffData?.staff || staffData?.allStaff || [];
  const branchStaff = allStaff.filter(staff => staff.branch_id == userBranchId);
  const branches = branchData?.branch || [];
  const userBranch = branches.find(branch => branch.branch_id == userBranchId);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle add form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        branch_id: userBranchId, // Auto-assign to manager's branch
      };
      
      const res = await addStaff(submitData).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        position: "",
      });
      setShowAddModal(false);
      toast.success(res.message || "Staff added successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add staff");
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password; // Don't update password if empty
      }

      const res = await updateStaff({
        id: selectedStaff.staff_id,
        data: updateData,
      }).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        position: "",
      });
      setShowEditModal(false);
      setSelectedStaff(null);
      toast.success(res.message || "Staff updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update staff");
    }
  };

  // Handle delete staff
  const handleDelete = async () => {
    try {
      await deleteStaff(selectedStaff.staff_id).unwrap();
      toast.success("Staff deleted successfully");
      setShowDeleteModal(false);
      setSelectedStaff(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete staff");
      setShowDeleteModal(false);
    }
  };

  // Handle view staff details
  const handleViewDetails = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowDetailsModal(true);
  };

  // Handle edit staff
  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name || "",
      email: staffMember.email || "",
      password: "", // Don't pre-fill password
      phone: staffMember.phone || "",
      address: staffMember.address || "",
      position: staffMember.position || "",
    });
    setShowEditModal(true);
  };

  // Handle delete modal
  const handleDeleteModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      position: "",
    });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedStaff(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      position: "",
    });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStaff(null);
  };

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
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Staff Management</h1>
          <p className="text-gray-600">
            Managing staff for {userBranch?.branch_name || `Branch ${userBranchId}`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New Staff
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-xl font-bold text-gray-900">{branchStaff.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-xl font-bold text-gray-900">{branchStaff.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-xl font-bold text-gray-900">
                {branchStaff.filter(staff => {
                  const createdDate = new Date(staff.created_at);
                  const currentDate = new Date();
                  return createdDate.getMonth() === currentDate.getMonth() && 
                         createdDate.getFullYear() === currentDate.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
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
                Position
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {branchStaff?.length > 0 ? (
              branchStaff.map((staffMember, index) => (
                <tr
                  key={staffMember.staff_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{staffMember.staff_id}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.name}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.email}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.position}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.phone || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(staffMember)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(staffMember)}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteModal(staffMember)}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-gray-400 text-4xl">👥</div>
                    <p className="text-gray-500 font-medium">
                      No staff found for your branch
                    </p>
                    <p className="text-gray-400 text-sm">
                      Add your first staff member to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={closeAddModal}
        title="Add New Staff"
        size="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <Input
              type="text"
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <Input
              type="text"
              id="position"
              placeholder="Enter position/role"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <input
              type="text"
              value={userBranch?.branch_name || `Branch ${userBranchId}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Staff will be added to your branch</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeAddModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add Staff
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* Edit Staff Modal */}
      <DetailsModal
        show={showEditModal}
        onClose={closeEditModal}
        title="Edit Staff"
        size="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password (Leave empty to keep current)
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter new password (optional)"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <Input
              type="text"
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <Input
              type="text"
              id="position"
              placeholder="Enter position/role"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Staff
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Staff Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStaff(null);
        }}
        title={`Staff Details: ${selectedStaff?.name || "Staff"}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Staff ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.staff_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Full Name
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Email</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.email}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Phone</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.phone || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Position
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.position}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Branch</h3>
              <p className="text-lg font-semibold text-gray-900">
                {userBranch?.branch_name || `Branch ${userBranchId}`}
              </p>
            </div>
          </div>

          {selectedStaff?.address && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Address
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff.address}
              </p>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Created At
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {selectedStaff?.created_at
                ? new Date(selectedStaff.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </DetailsModal>

      {/* Delete Confirmation Modal */}
      <DetailsModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        title="Confirm Delete"
        size="sm"
      >
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl">⚠️</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete Staff Member
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete "{selectedStaff?.name}"? This
              action cannot be undone.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </DetailsModal>
    </div>
  );
};

export default ManagerStaffDashboard;