import React, { useState } from "react";
import {
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
  useGetBranchByDistrictQuery,
  useGetDistrictByProvinceQuery,
  useGetManagersQuery,
  useGetProvinceQuery,
} from "../../../../redux/features/branchSlice.js";

import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import DetailsModal from "../../../shared/Modal.jsx";
import Input from "../../../shared/Input.jsx";
import LocationSelect from "../../../shared/LocationFilterd.jsx";
import { toast } from "react-toastify";

const BranchManager = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    province_id: "",
    district_id: "",
    branch_id: "",
    remarks: "",
  });

  // RTK Query & Mutations
  const { data, isLoading, error } = useGetManagersQuery();
  const { data: provincesData } = useGetProvinceQuery();
  const { data: districtData } = useGetDistrictByProvinceQuery(
    formData.province_id,
    {
      skip: !formData.province_id,
    },
  );
  const { data: branchData } = useGetBranchByDistrictQuery(
    formData.district_id,
    {
      skip: !formData.district_id,
    },
  );

  const [addManager, { isLoading: isAdding }] = useAddManagerMutation();
  const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();
  const [deleteManager, { isLoading: isDeleting }] = useDeleteManagerMutation();

  const provinces = provincesData?.data || [];
  const districts = districtData?.data || [];
  const branches = branchData?.data || [];
  const managers = data?.managers || [];

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      province_id: "",
      district_id: "",
      branch_id: "",
      remarks: "",
    });
    setShowAddModal(true);
  };

  // Open Edit Modal
  const openEditModal = (manager) => {
    setSelectedManager(manager);
    setFormData({
      name: manager.name || "",
      email: manager.email || "",
      password: "", // Password खाली राख्ने (security को लागि)
      province_id: "", // Location select को लागि अहिले खाली
      district_id: "",
      branch_id: manager.branch_id || "",
      remarks: manager.remarks || "",
    });
    setShowEditModal(true);
  };

  // Add Manager
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
      const res = await addManager({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branch_id: formData.branch_id,
        remarks: formData.remarks,
      }).unwrap();

      toast.success(res.message || "Manager added successfully");
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add manager");
    }
  };

  // Update Manager
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.branch_id) {
      return toast.error("Please fill all required fields");
    }

    try {
      const res = await updateManager({
        id: selectedManager.user_id,
        data: {
          name: formData.name,
          email: formData.email,
          branch_id: formData.branch_id,
          remarks: formData.remarks,
          // password पठाउने कि नपठाउने भन्ने तपाईंको decision अनुसार
        },
      }).unwrap();

      toast.success(res.message || "Manager updated successfully");
      setShowEditModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update manager");
    }
  };

  // Delete Manager
  const handleDelete = async (manager) => {
    if (!window.confirm(`Are you sure you want to delete ${manager.name}?`))
      return;

    try {
      await deleteManager(manager.user_id).unwrap();
      toast.success("Manager deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete manager");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      province_id: "",
      district_id: "",
      branch_id: "",
      remarks: "",
    });
    setSelectedManager(null);
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manager Management</h1>
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
        >
          Add New Manager
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm text-center">S.N</th>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Branch</th>
              <th className="p-4 font-semibold text-sm">Joined Date</th>
              <th className="p-4 font-semibold text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m, index) => (
              <tr key={m.user_id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4 font-medium">{m.name}</td>
                <td className="p-4">{m.email}</td>
                <td className="p-4">
                  {m.branch_name
                    ? `${m.branch_name} (${m.branch_id})`
                    : m.branch_id}
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(m)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m)}
                      disabled={isDeleting}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Manager"
        size="lg"
      >
        {/* ... Add form (माथिको handleAddSubmit प्रयोग गर्ने) */}
        <form onSubmit={handleAddSubmit} className="space-y-5">
          {/* Name, Email, Password, LocationSelect, Remarks */}
          {/* तपाईंले पहिलेको जस्तै राख्न सक्नुहुन्छ */}
        </form>
      </DetailsModal>

      {/* Edit Modal */}
      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Manager"
        size="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-5">
          {/* Same fields as Add but without password or with optional password */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>Full Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>New Password (Optional)</label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <LocationSelect
            provinces={provinces}
            districts={districts}
            branches={branches}
            formData={formData}
            setFormData={setFormData}
          />

          <div>
            <label>Remarks (Optional)</label>
            <Input
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isUpdating ? "Updating..." : "Update Manager"}
            </button>
          </div>
        </form>
      </DetailsModal>
    </div>
  );
};

export default BranchManager;
