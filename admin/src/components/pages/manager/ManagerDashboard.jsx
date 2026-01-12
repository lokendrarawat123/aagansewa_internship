import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetManagerQuery,
  useAddManagerMutation,
  useUpdateManagerMutation,
  useDeleteManagerMutation,
  useGetBranchQuery,
  useGetDistrictQuery,
  useGetProvinceQuery,
} from "../../../redux/features/provinceSlilce";
import Input from "../../shared/Input";
import DetailsModal from "../../shared/modal";
import { Loading } from "../../shared/IsLoading";
import { Error } from "../../shared/Error";

const ManagerDashboard = () => {
  // State for managing modals and forms
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // API hooks
  const { data: managerData, isLoading, error } = useGetManagerQuery();
  const { data: branchData } = useGetBranchQuery();
  const { data: districtData } = useGetDistrictQuery();
  const { data: provinceData } = useGetProvinceQuery();
  const [addManager] = useAddManagerMutation();
  const [updateManager] = useUpdateManagerMutation();
  const [deleteManager] = useDeleteManagerMutation();

  const managers = managerData?.managers;
  const allBranches = branchData?.branch;
  const allDistricts = districtData?.allDistricts;
  const provinces = provinceData?.provinces;

  // Filter districts based on selected province
  const filteredDistricts = allDistricts?.filter(
    district => district.province_id == formData.province_id
  );

  // Filter branches based on selected district
  const filteredBranches = allBranches?.filter(
    branch => branch.district_id == formData.district_id
  );

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Reset dependent fields when parent changes
    if (id === "province_id") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        district_id: "",
        branch_id: "",
      }));
    } else if (id === "district_id") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        branch_id: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle add form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branch_id: formData.branch_id,
      };
      const res = await addManager(submitData).unwrap();
      setFormData({ name: "", email: "", password: "", province_id: "", district_id: "", branch_id: "" });
      setShowAddModal(false);
      toast.success(res.message || "Manager added successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add manager");
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        branch_id: formData.branch_id,
      };
      const res = await updateManager({
        id: selectedManager.user_id,
        ...updateData,
      }).unwrap();
      setFormData({ name: "", email: "", password: "", province_id: "", district_id: "", branch_id: "" });
      setShowEditModal(false);
      setSelectedManager(null);
      toast.success(res.message || "Manager updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update manager");
    }
  };

  // Handle delete manager
  const handleDelete = async () => {
    try {
      await deleteManager(selectedManager.user_id).unwrap();
      toast.success("Manager deleted successfully");
      setShowDeleteModal(false);
      setSelectedManager(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete manager");
      setShowDeleteModal(false);
    }
  };

  // Handle view manager details
  const handleViewDetails = (manager) => {
    setSelectedManager(manager);
    setShowDetailsModal(true);
  };

  // Handle edit manager
  const handleEdit = (manager) => {
    setSelectedManager(manager);
    
    // Find the branch details to get province and district
    const managerBranch = allBranches?.find(branch => branch.branch_id == manager.branch_id);
    const branchDistrict = allDistricts?.find(district => district.district_id == managerBranch?.district_id);
    
    setFormData({
      name: manager.name,
      email: manager.email,
      password: "",
      province_id: branchDistrict?.province_id || "",
      district_id: managerBranch?.district_id || "",
      branch_id: manager.branch_id,
    });
    setShowEditModal(true);
  };

  // Handle delete modal
  const handleDeleteModal = (manager) => {
    setSelectedManager(manager);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({ name: "", email: "", password: "", province_id: "", district_id: "", branch_id: "" });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedManager(null);
    setFormData({ name: "", email: "", password: "", province_id: "", district_id: "", branch_id: "" });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedManager(null);
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
        <h1 className="text-2xl font-bold mb-4">Manager Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New Manager
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Manager ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {managers?.length > 0 ? (
              managers.map((manager, index) => (
                <tr
                  key={manager.user_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{manager.user_id}</td>
                  <td className="px-4 py-3 text-sm">{manager.name}</td>
                  <td className="px-4 py-3 text-sm">{manager.email}</td>
                  <td className="px-4 py-3 text-sm">{manager.branch_id}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(manager)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(manager)}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteModal(manager)}
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
                <td colSpan="5" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-gray-400 text-4xl">👨💼</div>
                    <p className="text-gray-500 font-medium">No managers found</p>
                    <p className="text-gray-400 text-sm">Add your first manager to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Manager Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={closeAddModal}
        title="Add New Manager"
        size="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter manager name"
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
              Province
            </label>
            <select
              id="province_id"
              value={formData.province_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Province</option>
              {provinces?.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              id="district_id"
              value={formData.district_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.province_id}
            >
              <option value="">
                {!formData.province_id ? "Select Province First" : "Select District"}
              </option>
              {filteredDistricts?.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
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
              disabled={!formData.district_id}
            >
              <option value="">
                {!formData.district_id ? "Select District First" : "Select Branch"}
              </option>
              {filteredBranches?.map((branch) => (
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
              Add Manager
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* Edit Manager Modal */}
      <DetailsModal
        show={showEditModal}
        onClose={closeEditModal}
        title="Edit Manager"
        size="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter manager name"
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

          {/* ADDED: Cascading Province → District → Branch selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province
            </label>
            <select
              id="province_id"
              value={formData.province_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Province</option>
              {provinces?.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              id="district_id"
              value={formData.district_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.province_id}
            >
              <option value="">
                {!formData.province_id ? "Select Province First" : "Select District"}
              </option>
              {filteredDistricts?.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
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
              disabled={!formData.district_id}
            >
              <option value="">
                {!formData.district_id ? "Select District First" : "Select Branch"}
              </option>
              {filteredBranches?.map((branch) => (
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
              Update Manager
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Manager Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedManager(null);
        }}
        title={`Manager Details: ${selectedManager?.name || "Manager"}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Manager ID</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.user_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Name</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.name}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Email</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.email}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Branch ID</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.branch_id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Role</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.role || "Manager"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Created At</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedManager?.created_at ? 
                  new Date(selectedManager.created_at).toLocaleDateString() : 
                  "N/A"
                }
              </p>
            </div>
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
              Delete Manager
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete "{selectedManager?.name}"? 
              This action cannot be undone.
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

export default ManagerDashboard;