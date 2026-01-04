import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetBranchQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetDistrictQuery,
  useGetProvinceQuery,
} from "../../../redux/features/provinceSlilce";
import Input from "../../shared/Input";
import DetailsModal from "../../shared/modal";
import { Loading } from "../../shared/IsLoading";
import { Error } from "../../shared/Error";

const BranchDashboard = () => {
  // State for managing modal and form
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    branch_name: "",
    province_id: "",
    district_id: "",
    remarks: "",
  });

  // API hooks
  const { data: branchData, isLoading, error } = useGetBranchQuery();
  const { data: districtData } = useGetDistrictQuery();
  const { data: provinceData } = useGetProvinceQuery();
  const [addBranch] = useAddBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const branches = branchData?.branch;
  const allDistricts = districtData?.allDistricts;
  const provinces = provinceData?.provinces;

  // Filter districts based on selected province
  const filteredDistricts = allDistricts?.filter(
    district => district.province_id == formData.province_id
  );

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // If province changes, reset district selection
    if (id === "province_id") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        district_id: "", // Reset district when province changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send required fields to backend
      const submitData = {
        branch_name: formData.branch_name,
        district_id: formData.district_id,
        remarks: formData.remarks,
      };
      
      const res = await addBranch(submitData).unwrap();
      setFormData({ branch_name: "", province_id: "", district_id: "", remarks: "" });
      setShowAddModal(false);
      toast.success(res.message || "Branch added successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add branch");
    }
  };

  // Handle delete branch
  const handleDelete = async (branch) => {
    try {
      await deleteBranch(branch.branch_id).unwrap();
      toast.success("Branch deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete branch");
    }
  };

  // Handle view branch details
  const handleViewDetails = (branch) => {
    setSelectedBranch(branch);
    setShowDetailsModal(true);
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
        <h1 className="text-2xl font-bold mb-4">Branch Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New Branch
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {branches?.length > 0 ? (
              branches.map((branch, index) => (
                <tr
                  key={branch.branch_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{branch.branch_id}</td>
                  <td className="px-4 py-3 text-sm">{branch.branch_name}</td>
                  <td className="px-4 py-3 text-sm">{branch.district_id}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(branch)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(branch)}
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
                <td colSpan="4" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-gray-400 text-4xl">🏢</div>
                    <p className="text-gray-500 font-medium">No branches found</p>
                    <p className="text-gray-400 text-sm">Add your first branch to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Branch Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ branch_name: "", province_id: "", district_id: "", remarks: "" });
        }}
        title="Add New Branch"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name
            </label>
            <Input
              type="text"
              id="branch_name"
              placeholder="Enter branch name"
              value={formData.branch_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* ADDED: Province Selection */}
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

          {/* UPDATED: District Selection - depends on province */}
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
              disabled={!formData.province_id} // Disable until province is selected
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
              Remarks (Optional)
            </label>
            <Input
              type="text"
              id="remarks"
              placeholder="Enter remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setFormData({ branch_name: "", province_id: "", district_id: "", remarks: "" });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add Branch
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Branch Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedBranch(null);
        }}
        title={`Branch Details: ${selectedBranch?.branch_name || "Branch"}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Branch ID</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedBranch?.branch_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Branch Name</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedBranch?.branch_name}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">District ID</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedBranch?.district_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Created At</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedBranch?.created_at ? 
                  new Date(selectedBranch.created_at).toLocaleDateString() : 
                  "N/A"
                }
              </p>
            </div>
          </div>

          {selectedBranch?.remarks && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-blue-600 mb-1">Remarks</h3>
              <p className="text-gray-800">{selectedBranch.remarks}</p>
            </div>
          )}
        </div>
      </DetailsModal>
    </div>
  );
};

export default BranchDashboard;