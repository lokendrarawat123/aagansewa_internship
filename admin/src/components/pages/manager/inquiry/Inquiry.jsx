import { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddInquiryMutation,
  useGetInquiriesByBranchQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} from "../../../../redux/features/siteSlice";

import DetailsModal from "../../../shared/Modal";
import Input from "../../../shared/Input";
import Button from "../../../shared/Button";

import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const InquiryDashboard = () => {
  // ================= MODALS =================
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ================= DATA =================
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FORMS =================
  const [addData, setAddData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });

  // ================= API =================
  const {
    data: inquiriesData,
    isLoading,
    error,
  } = useGetInquiriesByBranchQuery();

  const [addInquiry, { isLoading: adding }] = useAddInquiryMutation();
  const [updateInquiry, { isLoading: updating }] = useUpdateInquiryMutation();
  const [deleteInquiry, { isLoading: deleting }] = useDeleteInquiryMutation();

  const inquiries = inquiriesData?.data || [];
  console.log(inquiries);

  // ================= ADD =================
  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setAddData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addInquiry(addData).unwrap();
      toast.success(res?.message || "Inquiry added");

      setShowAddModal(false);
      setAddData({
        name: "",
        phone: "",
        email: "",
        address: "",
        description: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Add failed");
    }
  };

  // ================= EDIT =================
  const handleEditOpen = (inquiry) => {
    setSelectedInquiry(inquiry);

    setEditData({
      name: inquiry.name || "",
      phone: inquiry.phone || "",
      email: inquiry.email || "",
      address: inquiry.address || "",
      description: inquiry.description || "",
    });

    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateInquiry({
        id: selectedInquiry.inquiry_id,
        data: editData,
      }).unwrap();

      toast.success(res?.message || "Updated successfully");
      setShowEditModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // ================= DELETE =================
  const openDeleteModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setDeleteId(inquiry.inquiry_id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteInquiry(deleteId).unwrap();

      toast.success(res?.message || "Deleted successfully");

      setShowDeleteModal(false);
      setDeleteId(null);
      setSelectedInquiry(null);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Inquiry Management</h1>

        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
        >
          Add Inquiry
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Name</th>

              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.inquiry_id} className="border-t">
                <td className="px-5 py-4">#{inquiry.inquiry_id}</td>
                <td className="px-5 py-4">{inquiry.name}</td>

                <td className="px-5 py-4">{inquiry.phone}</td>
                <td className="px-5 py-4">
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 flex gap-2 justify-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      setShowDetailsModal(true);
                    }}
                  >
                    View
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditOpen(inquiry)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openDeleteModal(inquiry)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW MODAL ================= */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-2">
            <p>
              <b>Name:</b> {selectedInquiry.name}
            </p>
            <p>
              <b>Phone:</b> {selectedInquiry.phone}
            </p>
            <p>
              <b>Email:</b> {selectedInquiry.email}
            </p>
            <p>
              <b>Address:</b> {selectedInquiry.address}
            </p>
            <p>
              <b>Description:</b> {selectedInquiry.description}
            </p>
          </div>
        )}
      </DetailsModal>

      {/* ================= ADD MODAL ================= */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Inquiry"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            id="name"
            label="Name"
            value={addData.name}
            onChange={handleAddChange}
            placeholder="e.g. Lokendra Rawat"
            required
          />
          <Input
            id="phone"
            label="Phone Number"
            value={addData.phone}
            onChange={handleAddChange}
            placeholder="e.g. 98XXXXXXXX"
            required
          />
          <Input
            id="email"
            label="Email"
            value={addData.email}
            onChange={handleAddChange}
            placeholder="example@domain.com"
            required
          />
          <Input
            id="address"
            label="Address"
            value={addData.address}
            onChange={handleAddChange}
            placeholder="e.g. Kathmandu, Nepal"
            required
          />

          <textarea
            id="description"
            value={addData.description}
            onChange={handleAddChange}
            className="w-full border p-2 rounded"
            placeholder="Description"
            placeholder="Write a brief description about the inquiry..."
            required
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              {adding ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= EDIT MODAL ================= */}
      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Inquiry"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            id="name"
            label="Name"
            value={editData.name}
            onChange={handleEditChange}
          />
          <Input
            id="phone"
            label="Phone"
            value={editData.phone}
            onChange={handleEditChange}
          />
          <Input
            id="email"
            label="Email"
            value={editData.email}
            onChange={handleEditChange}
          />
          <Input
            id="address"
            label="Address"
            value={editData.address}
            onChange={handleEditChange}
          />

          <textarea
            id="description"
            value={editData.description}
            onChange={handleEditChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              {updating ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= DELETE MODAL (IMPORTANT PART) ================= */}
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this inquiry?
          </p>

          {selectedInquiry && (
            <div className="bg-gray-50 p-3 rounded">
              <p>
                <b>Name:</b> {selectedInquiry.name}
              </p>
              <p>
                <b>Phone:</b> {selectedInquiry.phone}
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

export default InquiryDashboard;
