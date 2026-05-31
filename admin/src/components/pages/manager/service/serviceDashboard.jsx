import { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetsAllServiceWithBranchNameQuery,
  useGetServicesByBranchQuery,
} from "../../../../redux/features/serviceSlice.js";

import { useGetBranchQuery } from "../../../../redux/features/branchSlice.js";

import Input from "../../../shared/Input.jsx";
import DetailsModal from "../../../shared/Modal.jsx";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";
import Pagination from "../../../shared/Pagignation.jsx";

const ServiceDashboard = () => {
  const baseUrl = import.meta.env.VITE_IMG_URL;

  // MODALS
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [page, setPage] = useState(1);

  // FORM
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    branch_id: "",
    service_image: null,
  });

  // API
  const { data, isLoading, error } = useGetsAllServiceWithBranchNameQuery();

  const { data: branchWiseData } = useGetServicesByBranchQuery(page);

  const { data: branchData } = useGetBranchQuery();

  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdate }] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = data?.data || [];
  const branches = branchData?.branch || [];
  const branchWiseDataList = branchWiseData?.data || [];
  const totalPages = branchWiseData?.totalPages || 1;

  const filteredServices = branchWiseDataList;
  console.log(filteredServices);

  // INPUT
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "service_image") {
      setFormData((prev) => ({
        ...prev,
        service_image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // RESET
  const resetForm = () => {
    setFormData({
      service_name: "",
      description: "",
      branch_id: "",
      service_image: null,
    });
    setSelectedService(null);
  };

  // ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("service_name", formData.service_name);
      fd.append("description", formData.description);
      fd.append("branch_id", formData.branch_id);

      if (formData.service_image) {
        fd.append("image", formData.service_image);
      }

      const res = await addService(fd).unwrap();
      toast.success(res.message || "Service added");

      setShowAddModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add service");
    }
  };

  // OPEN EDIT
  const openEdit = (service) => {
    setSelectedService(service);

    setFormData({
      service_name: service.service_name,
      description: service.description || "",
      branch_id: service.branch_id,
      service_image: `${baseUrl}${service.service_image}`,
    });

    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("service_name", formData.service_name);
      fd.append("description", formData.description);
      fd.append("branch_id", formData.branch_id);

      if (formData.service_image) {
        fd.append("image", formData.service_image);
      }

      const res = await updateService({
        id: selectedService.service_id,
        data: fd,
      }).unwrap();

      toast.success(res.message || "Updated");

      setShowEditModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await deleteService(selectedService.service_id).unwrap();

      toast.success("Deleted successfully");
      setShowDeleteModal(false);
      setSelectedService(null);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const closeModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    resetForm();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Service Management (Manager)</h1>

        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
        >
          Add Service
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Service</th>

              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((s, index) => (
              <tr key={s.service_id} className="border-b hover:bg-slate-50">
                <td className="p-3">{index}</td>
                <td className="p-3 capitalize">
                  {s.service_name}
                  <p className="text-sm text-gray-800 lowercase first-letter:uppercase">
                    {s.description}
                  </p>
                </td>

                <td className="p-3">
                  {s.service_image ? (
                    <img
                      src={`${baseUrl}${s.service_image}`}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openEdit(s)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedService(s);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* ADD MODAL */}
      <DetailsModal
        show={showAddModal}
        onClose={closeModal}
        title="Add Service"
        size="lg"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            id="service_name"
            label="Service Name"
            value={formData.service_name}
            onChange={handleChange}
            placeholder="E.g Ac Repair"
            required
          />

          <Input
            id="description"
            label="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description of the service"
            required
          />

          <Input
            type="file"
            id="service_image"
            label="Select Image"
            value={formData.service_image}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              {isAdding ? "Adding..." : "Add Service"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* EDIT MODAL */}
      <DetailsModal
        show={showEditModal}
        onClose={closeModal}
        title="Edit Service"
      >
        <form className="space-y-4">
          <Input
            id="service_name"
            label="Service Name"
            value={formData.service_name}
            onChange={handleChange}
            placeholder="e.g Ac Repair"
            required
          />

          <Input
            id="description"
            label="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="description of the service"
            required
          />

          <Input
            type="file"
            id="service_image"
            label="Select Image"
            onChange={handleChange}
            value={formData.service_image}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit" onClick={handleUpdate}>
              {isUpdate ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* DELETE MODAL */}
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Service"
      >
        <p>Are you sure?</p>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DetailsModal>
    </div>
  );
};

export default ServiceDashboard;
