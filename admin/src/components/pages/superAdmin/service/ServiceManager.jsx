import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../../../redux/features/serviceSlice.js";
import { useGetBranchQuery } from "../../../../redux/features/branchSlice";
import Input from "../../../shared/Input.jsx";
import DetailsModal from "../../../shared/Modal.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";

const ServiceManager = () => {
  // State for managing modals and forms
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    branch_id: "",
    service_image: null,
  });

  // API hooks
  const { data: servicesData, isLoading, error } = useGetServicesQuery();
  const { data: branchData } = useGetBranchQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = servicesData?.allServices || servicesData?.services;
  const branches = branchData?.branch;

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "service_image") {
      setFormData((prev) => ({
        ...prev,
        [id]: files[0],
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
      const submitData = new FormData();
      submitData.append("service_name", formData.service_name);
      submitData.append("description", formData.description);
      submitData.append("branch_id", formData.branch_id);
      if (formData.service_image) {
        submitData.append("service_image", formData.service_image);
      }

      const res = await addService(submitData).unwrap();
      setFormData({
        service_name: "",
        description: "",
        branch_id: "",
        service_image: null,
      });
      setShowAddModal(false);
      toast.success(res.message || "Service added successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to add service");
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("service_name", formData.service_name);
      updateData.append("description", formData.description);
      if (formData.service_image) {
        updateData.append("service_image", formData.service_image);
      }

      const res = await updateService({
        id: selectedService.service_id,
        data: updateData,
      }).unwrap();
      setFormData({
        service_name: "",
        description: "",
        branch_id: "",
        service_image: null,
      });
      setShowEditModal(false);
      setSelectedService(null);
      toast.success(res.message || "Service updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update service");
    }
  };

  // Handle delete service
  const handleDelete = async () => {
    try {
      await deleteService(selectedService.service_id).unwrap();
      toast.success("Service deleted successfully");
      setShowDeleteModal(false);
      setSelectedService(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete service");
      setShowDeleteModal(false);
    }
  };

  // Handle view service details
  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  // Handle edit service
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData({
      service_name: service.service_name,
      description: service.description || "",
      branch_id: service.branch_id,
      service_image: null,
    });
    setShowEditModal(true);
  };

  // Handle delete modal
  const handleDeleteModal = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({
      service_name: "",
      description: "",
      branch_id: "",
      service_image: null,
    });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedService(null);
    setFormData({
      service_name: "",
      description: "",
      branch_id: "",
      service_image: null,
    });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedService(null);
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
        <h1 className="text-2xl font-bold mb-4">Service Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-500 transition"
        >
          Add New Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Service ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Service Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Branch ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {services?.length > 0 ? (
              services.map((service, index) => (
                <tr
                  key={service.service_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{service.service_id}</td>
                  <td className="px-4 py-3 text-sm">{service.service_name}</td>
                  <td className="px-4 py-3 text-sm">
                    {service.description
                      ? service.description.length > 50
                        ? service.description.substring(0, 50) + "..."
                        : service.description
                      : "No description"}
                  </td>
                  <td className="px-4 py-3 text-sm">{service.branch_id}</td>
                  <td className="px-4 py-3 text-sm">
                    {service.service_image ? (
                      <img
                        src={`http://localhost:3000/${service.service_image}`}
                        alt={service.service_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(service)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(service)}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteModal(service)}
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
                    <div className="text-gray-400 text-4xl">🛠️</div>
                    <p className="text-gray-500 font-medium">
                      No services found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Add your first service to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      <DetailsModal
        show={showAddModal}
        onClose={closeAddModal}
        title="Add New Service"
        size="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name
            </label>
            <Input
              type="text"
              id="service_name"
              placeholder="Enter service name"
              value={formData.service_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter service description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image
            </label>
            <input
              type="file"
              id="service_image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              Add Service
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* Edit Service Modal */}
      <DetailsModal
        show={showEditModal}
        onClose={closeEditModal}
        title="Edit Service"
        size="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name
            </label>
            <Input
              type="text"
              id="service_name"
              placeholder="Enter service name"
              value={formData.service_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter service description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image (Optional)
            </label>
            <input
              type="file"
              id="service_image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {selectedService?.service_image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current image:</p>
                <img
                  src={`http://localhost:3000/${selectedService.service_image}`}
                  alt={selectedService.service_name}
                  className="w-20 h-20 object-cover rounded mt-1"
                />
              </div>
            )}
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
              Update Service
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Service Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedService(null);
        }}
        title={`Service Details: ${selectedService?.service_name || "Service"}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Service ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedService?.service_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Service Name
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedService?.service_name}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Description
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {selectedService?.description || "No description provided"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Branch ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedService?.branch_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Created At
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedService?.created_at
                  ? new Date(selectedService.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {selectedService?.service_image && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Service Image
              </h3>
              <img
                src={`http://localhost:3000/${selectedService.service_image}`}
                alt={selectedService.service_name}
                className="w-full max-w-xs h-48 object-cover rounded"
              />
            </div>
          )}
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
              Delete Service
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete "{selectedService?.service_name}"?
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

export default ServiceManager;
