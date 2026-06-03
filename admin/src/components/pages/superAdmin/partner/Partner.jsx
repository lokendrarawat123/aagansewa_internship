import { useState } from "react";
import { toast } from "react-toastify";

import DetailsModal from "../../../shared/Modal";
import Input from "../../../shared/Input";
import Button from "../../../shared/Button";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

import {
  useAddTrustedCustomerMutation,
  useDeleteTrustedCustomerMutation,
  useGetTrustedCustomersQuery,
} from "../../../../redux/features/siteSlice";
import { getImageUrl } from "../../../../utils/ImgUrl";

const TrustedCustomerDashboard = () => {
  // ================= STATES =================
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  // ================= API HOOKS =================
  const {
    data: customerData,
    isLoading,
    error,
  } = useGetTrustedCustomersQuery();

  const [addTrustedCustomer, { isLoading: adding }] =
    useAddTrustedCustomerMutation();

  const [deleteTrustedCustomer, { isLoading: deleting }] =
    useDeleteTrustedCustomerMutation();

  const customers = customerData?.trustedCustomers || [];

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: null,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("image", formData.image);

      const res = await addTrustedCustomer(submitData).unwrap();

      toast.success(res?.message || "Customer added successfully");

      setShowAddModal(false);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add customer");
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      const res = await deleteTrustedCustomer(
        selectedCustomer.costumer_id,
      ).unwrap();

      toast.success(res?.message || "Customer deleted successfully");

      setShowDeleteModal(false);
      setSelectedCustomer(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete customer");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trusted Customer Management</h1>

        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
        >
          Add Customer
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="px-5 py-4">S.N</th>
              <th className="px-5 py-4">Image</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No trusted customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr
                  key={customer.costumer_id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">{index + 1}</td>

                  <td className="px-5 py-4">
                    <img
                      src={getImageUrl(customer.image)}
                      alt={customer.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  </td>

                  <td className="px-5 py-4 font-medium">{customer.name}</td>

                  <td className="px-5 py-4 flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowViewModal(true);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      <DetailsModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Customer Details"
      >
        {selectedCustomer && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-center">
              <img
                src={getImageUrl(selectedCustomer.image)}
                alt={selectedCustomer.name}
                className="w-40 h-40 object-cover rounded-xl border"
              />
            </div>

            <div className="bg-gray-50 p-3 rounded col-span-2">
              <b>ID:</b> {selectedCustomer.costumer_id}
            </div>
            <div className="bg-gray-50 p-3 rounded col-span-2">
              <b>Name:</b> {selectedCustomer.name}
            </div>
            <div className="bg-gray-50 p-3 rounded col-span-2">
              <b>Created At:</b>{" "}
              {selectedCustomer.created_at
                ? new Date(selectedCustomer.created_at).toLocaleString()
                : "N/A"}
            </div>
          </div>
        )}
      </DetailsModal>

      {/* ADD MODAL */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Trusted Customer"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            id="name"
            label="Customer Name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Partner Name"
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Customer Image</label>

            <Input
              type="file"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Customer"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* DELETE MODAL */}
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this customer?
          </p>

          {selectedCustomer && (
            <div className="bg-gray-50 p-3 rounded">
              <p>
                <b>Name:</b> {selectedCustomer.name}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>

            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DetailsModal>
    </div>
  );
};

export default TrustedCustomerDashboard;
