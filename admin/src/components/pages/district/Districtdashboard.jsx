import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetDistrictQuery,
  useAddDistrictMutation,
  useDeleteDistrictMutation,
  useGetProvinceQuery,
} from "../../../redux/features/provinceSlilce";
import Input from "../../shared/Input";
import DetailsModal from "../../shared/modal";
import { Loading } from "../../shared/IsLoading";
import { Error } from "../../shared/Error";

const DistrictDashboard = () => {
  // State for managing modal and form
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBranchesModal, setShowBranchesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [formData, setFormData] = useState({
    district_name: "",
    province_id: "",
  });

  // API hooks
  const { data: districtData, isLoading, error } = useGetDistrictQuery();
  const { data: provinceData } = useGetProvinceQuery();
  const [addDistrict] = useAddDistrictMutation();
  const [deleteDistrict] = useDeleteDistrictMutation();

  const districts = districtData?.allDistricts;
  const provinces = provinceData?.provinces;

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDistrict(formData).unwrap();
      setFormData({ district_name: "", province_id: "" });
      setShowAddModal(false);
      toast.success(res.message || "District added successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add district");
    }
  };
  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedDistrict(null);
  };
  // delelte modal open
  const handleDeleteModal = async (district) => {
    setSelectedDistrict(district);
    setShowDeleteModal(true);
  };
  // Handle delete district
  const handleDelete = async (district) => {
    try {
      console.log(district);
      await deleteDistrict(district.district_id).unwrap();
      toast.success("District deleted successfully");
      setShowAddModal(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete district");
    }
  };

  // Handle view branches
  const handleViewBranches = (district) => {
    setSelectedDistrict(district);
    setShowBranchesModal(true);
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
        <h1 className="text-2xl font-bold mb-4">District Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New District
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                District Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {districts?.length > 0 ? (
              districts.map((district, index) => (
                <tr
                  key={district.district_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{district.district_id}</td>
                  <td className="px-4 py-3 text-sm">
                    {district.district_name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {district.province_name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewBranches(district)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteModal(district)}
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
                    <div className="text-gray-400 text-4xl">📋</div>
                    <p className="text-gray-500 font-medium">
                      No districts found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Add your first district to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add District Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ district_name: "", province_id: "" });
        }}
        title="Add New District"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District Name
            </label>
            <Input
              type="text"
              id="district_name"
              placeholder="Enter district name"
              value={formData.district_name}
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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setFormData({ district_name: "", province_id: "" });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add District
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Branches Modal */}
      <DetailsModal
        show={showBranchesModal}
        onClose={() => {
          setShowBranchesModal(false);
          setSelectedDistrict(null);
        }}
        title={`Branches in ${selectedDistrict?.district_name || "District"}`}
        size="md"
      >
        <div className="space-y-3">
          {selectedDistrict?.branches ? (
            selectedDistrict.branches.split(",").map((branch, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 rounded-lg border-l-4 border-green-500"
              >
                <span className="font-medium text-gray-800">
                  {branch.trim()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No branches found for this district
              </p>
            </div>
          )}
        </div>
      </DetailsModal>

      {/* for the delete confirmation */}
      <DetailsModal
        show={showDeleteModal}
        onClose={handleCloseDelete}
        title="Confirm Delete"
        size="sm"
        footerContent={
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseDelete}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleDelete(districts);
              }}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Yes, Delete
            </button>
          </div>
        }
      >
        <p className="text-gray-700 text-lg">
          Are you sure you want to delete this item?
        </p>
        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>
      </DetailsModal>
    </div>
  );
};

export default DistrictDashboard;
