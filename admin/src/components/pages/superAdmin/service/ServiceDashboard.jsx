import { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetsAllServiceWithBranchNameQuery,
} from "../../../../redux/features/serviceSlice.js";

import { useGetBranchQuery } from "../../../../redux/features/branchSlice.js";

import Input from "../../../shared/Input.jsx";
import Select from "../../../shared/Select.jsx";
import DetailsModal from "../../../shared/Modal.jsx";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";
import { useIsAdmin } from "../../../shared/RolesCheck.jsx";

const ServiceManager = () => {
  const baseUrl = import.meta.env.VITE_IMG_URL;

  // MODALS
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  // FORM
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    branch_id: "",
    service_image: null,
  });

  // API
  const { data, isLoading, error } = useGetsAllServiceWithBranchNameQuery();

  const { data: branchData } = useGetBranchQuery();

  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = data?.data || [];
  const branches = branchData?.branch || [];
  const isAdmin = useIsAdmin();
  console.log(isAdmin);

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
        fd.append("service_image", formData.service_image);
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
      service_image: null,
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
        fd.append("service_image", formData.service_image);
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
  const handleView = (service) => {
    console.log(service);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      {!isAdmin && (
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Service Management</h1>

          <Button
            variant="success"
            size="lg"
            onClick={() => setShowAddModal(true)}
          >
            Add Service
          </Button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s.service_id} className="border-b hover:bg-slate-50">
                <td className="p-3">{s.service_id}</td>
                <td className="p-3">{s.service_name}</td>
                <td className="p-3">{s.branch_name}</td>

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
                  {isAdmin ? (
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(s)}
                      >
                        view
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedService(s);
                          openEdit(s);
                        }}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD MODAL ================= */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Service"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Service Name"
            id="service_name"
            value={formData.service_name}
            onChange={handleChange}
            placeholder="Enter service name"
            required
            fullWidth
          />

          <Input
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <Select
            id="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            options={branches.map((b) => ({
              value: b.branch_id,
              label: b.branch_name,
            }))}
          />

          <Input
            type="file"
            id="service_image"
            onChange={handleChange}
            fullWidth
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= EDIT MODAL ================= */}
      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Service"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            id="service_name"
            value={formData.service_name}
            onChange={handleChange}
            fullWidth
          />

          <Input
            id="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />

          <Select
            id="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            options={branches.map((b) => ({
              value: b.branch_id,
              label: b.branch_name,
            }))}
          />

          <Input
            type="file"
            id="service_image"
            onChange={handleChange}
            fullWidth
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= DELETE ================= */}
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

export default ServiceManager;
