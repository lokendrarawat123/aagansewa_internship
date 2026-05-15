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

const StaffDashboard = () => {
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
    branch_id: "",
  });

  // API hooks
  const { data: staffData, isLoading, error } = useGetStaffQuery();
  const { data: branchData } = useGetBranchQuery();
  const [addStaff] = useAddStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  const staff = staffData?.staff || staffData?.allStaff || [];
  const branches = branchData?.branch || [];

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
      const res = await addStaff(formData).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        position: "",
        branch_id: "",
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
        branch_id: "",
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
      branch_id: staffMember.branch_id || "",
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
      branch_id: "",
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
      branch_id: "",
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
        <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New Staff
        </button>
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
                Branch
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
                  <td className="px-4 py-3 text-sm">{staffMember.name}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.email}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.position}</td>
                  <td className="px-4 py-3 text-sm">{staffMember.branch_id}</td>
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
                    <p className="text-gray-500 font-medium">No staff found</p>
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
            <select
              id="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Branch</option>
              {branches?.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <select
              id="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Branch</option>
              {branches?.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
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
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Branch ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedStaff?.branch_id}
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

export default StaffDashboard;
