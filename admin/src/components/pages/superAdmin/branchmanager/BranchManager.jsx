import React, { useState } from "react";
import {
  useGetManagersQuery,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
} from "../../../../redux/features/branchSlice.js";

import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import DetailsModal from "../../../shared/Modal.jsx";
import Input from "../../../shared/Input.jsx";
import Select from "../../../shared/Select.jsx";
import LocationSelect from "../../../shared/LocationFilterd.jsx";
import Button from "../../../shared/Button.jsx";
import { toast } from "react-toastify";

const BranchManager = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // API
  const { data, isLoading, error } = useGetManagersQuery();

  const [addManager, { isLoading: isAdding }] = useAddManagerMutation();
  const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();
  const [deleteManager, { isLoading: isDeleting }] = useDeleteManagerMutation();

  const managers = data?.managers || [];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      province_id: "",
      district_id: "",
      branch_id: "",
    });
    setSelectedManager(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (manager) => {
    setSelectedManager(manager);

    setFormData({
      name: manager.name || "",
      email: manager.email || "",
      password: "",
      province_id: "",
      district_id: "",
      branch_id: manager.branch_id || "",
    });

    setShowEditModal(true);
  };

  const openDeleteConfirm = (manager) => {
    setSelectedManager(manager);
    setConfirmOpen(true);
  };

  // ADD
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.branch_id
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      const res = await addManager(formData).unwrap();
      toast.success(res.message || "Manager added");

      setShowAddModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add manager");
    }
  };

  // UPDATE
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        branch_id: formData.branch_id,
      };

      if (formData.password) payload.password = formData.password;

      const res = await updateManager({
        id: selectedManager.user_id,
        data: payload,
      }).unwrap();

      toast.success(res.message || "Manager updated");

      setShowEditModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // DELETE
  const confirmDelete = async () => {
    try {
      await deleteManager(selectedManager.user_id).unwrap();
      toast.success("Manager deleted");

      setConfirmOpen(false);
      setSelectedManager(null);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manager Management</h1>

        <Button variant="success" size="lg" onClick={openAddModal}>
          Add New Manager
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {managers.map((m) => (
              <tr key={m.user_id} className="border-b hover:bg-slate-50">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.branch_name}</td>

                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openEditModal(m)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openDeleteConfirm(m)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Manager"
        size="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <LocationSelect formData={formData} setFormData={setFormData} />

          <Input id="name" value={formData.name} onChange={handleChange} />
          <Input id="email" value={formData.email} onChange={handleChange} />
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>

            {/* IMPORTANT: type="submit" only */}
            <Button variant="success" loading={isAdding} type="submit">
              Add Manager
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* EDIT MODAL */}
      {/* ================= EDIT MODAL ================= */}
      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Manager"
        size="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6">
          {/* HEADER INFO */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Updating: <b>{selectedManager?.name}</b>
            </p>
            <p className="text-xs text-blue-500">
              You can update basic details or change password (optional)
            </p>
          </div>

          {/* GRID FORM */}
          <div className="grid grid-cols-2 gap-4">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            {/* BRANCH */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>

              <Select
                id="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
                options={[]}
                placeholder="Select branch"
              />
            </div>

            {/* PASSWORD */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>

              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank if you don't want to change password"
              />

              <p className="text-xs text-gray-400 mt-1">
                Password will only update if you enter new value
              </p>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>

            <Button variant="primary" loading={isUpdating} type="submit">
              Update Manager
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* DELETE MODAL */}
      <DetailsModal
        show={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Manager"
        size="sm"
      >
        <p className="mb-4">
          Are you sure you want to delete <b>{selectedManager?.name}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>

          <Button variant="danger" loading={isDeleting} onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </DetailsModal>
    </div>
  );
};

export default BranchManager;
