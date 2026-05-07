import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} from "../../../../redux/features/siteSlice";
import { useGetBranchQuery } from "../../../../redux/features/branchSlice";
import Input from "../../../shared/Input";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import { useSelector } from "react-redux";

const ManagerInquiryDashboard = () => {
  const { user } = useSelector((state) => state.user) || {};
  const userBranchId = user?.branch_id; // Manager's branch ID

  // State for managing modals and forms
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    response: "",
  });

  // API hooks
  const { data: inquiriesData, isLoading, error } = useGetInquiriesQuery();
  const { data: branchData } = useGetBranchQuery();
  const [updateInquiry] = useUpdateInquiryMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();

  // Filter inquiries for manager's branch only
  const allInquiries = inquiriesData?.inquiries || inquiriesData?.allInquiries || [];
  const branchInquiries = allInquiries.filter(inquiry => inquiry.branch_id == userBranchId);
  const branches = branchData?.branch || [];
  const userBranch = branches.find(branch => branch.branch_id == userBranchId);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateInquiry({
        id: selectedInquiry.inquiry_id,
        data: formData,
      }).unwrap();
      setFormData({ status: "", response: "" });
      setShowEditModal(false);
      setSelectedInquiry(null);
      toast.success(res.message || "Inquiry updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update inquiry");
    }
  };

  // Handle delete inquiry
  const handleDelete = async () => {
    try {
      await deleteInquiry(selectedInquiry.inquiry_id).unwrap();
      toast.success("Inquiry deleted successfully");
      setShowDeleteModal(false);
      setSelectedInquiry(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete inquiry");
      setShowDeleteModal(false);
    }
  };

  // Handle view inquiry details
  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  // Handle edit inquiry
  const handleEdit = (inquiry) => {
    setSelectedInquiry(inquiry);
    setFormData({
      status: inquiry.status || "",
      response: inquiry.response || "",
    });
    setShowEditModal(true);
  };

  // Handle delete modal
  const handleDeleteModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDeleteModal(true);
  };

  // Close modals
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedInquiry(null);
    setFormData({ status: "", response: "" });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedInquiry(null);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get inquiry stats
  const pendingCount = branchInquiries.filter(i => i.status === 'pending').length;
  const inProgressCount = branchInquiries.filter(i => i.status === 'in_progress').length;
  const resolvedCount = branchInquiries.filter(i => i.status === 'resolved').length;
  const closedCount = branchInquiries.filter(i => i.status === 'closed').length;

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
        <div>
          <h1 className="text-2xl font-bold mb-2">Inquiry Management</h1>
          <p className="text-gray-600">
            Managing inquiries for {userBranch?.branch_name || `Branch ${userBranchId}`}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            {pendingCount} Pending
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {inProgressCount} In Progress
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {resolvedCount} Resolved
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-xl font-bold text-gray-900">{resolvedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">{branchInquiries.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Inquiry ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {branchInquiries?.length > 0 ? (
              branchInquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.inquiry_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{inquiry.inquiry_id}</td>
                  <td className="px-4 py-3 text-sm">{inquiry.name}</td>
                  <td className="px-4 py-3 text-sm">{inquiry.email}</td>
                  <td className="px-4 py-3 text-sm">
                    {inquiry.subject
                      ? inquiry.subject.length > 30
                        ? inquiry.subject.substring(0, 30) + "..."
                        : inquiry.subject
                      : "No subject"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(inquiry.status)}`}
                    >
                      {inquiry.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {inquiry.created_at
                      ? new Date(inquiry.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(inquiry)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(inquiry)}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteModal(inquiry)}
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
                <td colSpan="7" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-gray-400 text-4xl">📧</div>
                    <p className="text-gray-500 font-medium">
                      No inquiries found for your branch
                    </p>
                    <p className="text-gray-400 text-sm">
                      Inquiries will appear here when customers submit them
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Inquiry Modal */}
      <DetailsModal
        show={showEditModal}
        onClose={closeEditModal}
        title="Update Inquiry"
        size="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response/Notes
            </label>
            <textarea
              id="response"
              placeholder="Enter response or notes"
              value={formData.response}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
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
              Update Inquiry
            </button>
          </div>
        </form>
      </DetailsModal>

      {/* View Inquiry Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedInquiry(null);
        }}
        title={`Inquiry Details: ${selectedInquiry?.subject || "Inquiry"}`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Inquiry ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.inquiry_id}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Status</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedInquiry?.status)}`}
              >
                {selectedInquiry?.status || "pending"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Name</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.name}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Email</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Phone</h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.phone || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Branch</h3>
              <p className="text-lg font-semibold text-gray-900">
                {userBranch?.branch_name || `Branch ${userBranchId}`}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Subject</h3>
            <p className="text-lg font-semibold text-gray-900">
              {selectedInquiry?.subject || "No subject"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Message</h3>
            <p className="text-gray-900 whitespace-pre-wrap">
              {selectedInquiry?.message || "No message"}
            </p>
          </div>

          {selectedInquiry?.response && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-blue-600 mb-1">
                Response/Notes
              </h3>
              <p className="text-gray-800 whitespace-pre-wrap">
                {selectedInquiry.response}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Created At
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.created_at
                  ? new Date(selectedInquiry.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Updated At
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {selectedInquiry?.updated_at
                  ? new Date(selectedInquiry.updated_at).toLocaleString()
                  : "N/A"}
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
              Delete Inquiry
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete this inquiry from "
              {selectedInquiry?.name}"? This action cannot be undone.
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

export default ManagerInquiryDashboard;