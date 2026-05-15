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
import Button from "../../../shared/Button"; // Button component use gareko
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const StaffDashboard = () => {
  // ================= STATE MANAGEMENT =================
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

  // ================= API HOOKS =================
  const { data: staffData, isLoading, error } = useGetStaffQuery();
  const { data: branchData } = useGetBranchQuery();

  const [addStaff, { isLoading: adding }] = useAddStaffMutation();
  const [updateStaff, { isLoading: updating }] = useUpdateStaffMutation();
  const [deleteStaff, { isLoading: deleting }] = useDeleteStaffMutation();

  const staff = staffData?.staff || staffData?.allStaff || [];
  const branches = branchData?.branch || [];

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      position: "",
      branch_id: "",
    });
    setSelectedStaff(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addStaff(formData).unwrap();
      toast.success(res.message || "Staff added successfully");
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.data?.message || "Failed to add staff");
    }
  };

  const handleEditOpen = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name || "",
      email: staffMember.email || "",
      password: "",
      phone: staffMember.phone || "",
      address: staffMember.address || "",
      position: staffMember.position || "",
      branch_id: staffMember.branch_id || "",
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      const res = await updateStaff({
        id: selectedStaff.staff_id,
        data: updateData,
      }).unwrap();

      toast.success(res.message || "Staff updated successfully");
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update staff");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteStaff(selectedStaff.staff_id).unwrap();
      toast.success(res.message || "Staff deleted successfully");
      setShowDeleteModal(false);
      setSelectedStaff(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete staff");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          Add New Staff
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Position</th>
              <th className="px-5 py-4">Branch</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length > 0 ? (
              staff.map((staffMember) => (
                <tr
                  key={staffMember.staff_id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4 text-sm font-medium">
                    #{staffMember.staff_id}
                  </td>
                  <td className="px-5 py-4 text-sm">{staffMember.name}</td>
                  <td className="px-5 py-4 text-sm">{staffMember.email}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold">
                      {staffMember.position}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">{staffMember.branch_id}</td>
                  <td className="px-5 py-4 flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedStaff(staffMember);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditOpen(staffMember)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedStaff(staffMember);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-20 text-gray-500">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODALS (Add/Edit/View/Delete) ================= */}

      {/* ADD MODAL */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Staff"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            id="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            id="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Branch</label>
            <select
              id="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.branch_id} value={b.branch_id}>
                  {b.branch_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Staff"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* EDIT MODAL */}
      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Staff"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            label="Password (Optional)"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            id="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={updating}>
              {updating ? "Updating..." : "Update Staff"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* VIEW MODAL */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Staff Information"
      >
        {selectedStaff && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <b>Name:</b> {selectedStaff.name}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <b>Position:</b> {selectedStaff.position}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <b>Email:</b> {selectedStaff.email}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <b>Phone:</b> {selectedStaff.phone || "N/A"}
            </div>
          </div>
        )}
      </DetailsModal>

      {/* DELETE MODAL */}
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <p className="mb-4">
          Are you sure you want to delete <b>{selectedStaff?.name}</b>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DetailsModal>
    </div>
  );
};

export default StaffDashboard;
