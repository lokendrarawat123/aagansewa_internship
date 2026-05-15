import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllInquiriesQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} from "../../../../redux/features/siteSlice";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const InquiryDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // API hooks
  const { data: inquiriesData, isLoading, error } = useGetAllInquiriesQuery();
  const [deleteInquiry] = useDeleteInquiryMutation();

  const inquiries = inquiriesData?.data || []; // Controller ko response 'data' field ma chha
  console.log(inquiries);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteInquiry(id).unwrap();
        toast.success("Inquiry deleted successfully");
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inquiry Management</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Branch</th>
              <th className="p-3 border-b">Address/Phone</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr
                key={inquiry.inquiry_id}
                className="hover:bg-gray-50 border-b"
              >
                <td className="p-3">{inquiry.inquiry_id}</td>
                <td className="p-3 font-medium">{inquiry.name}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs uppercase font-bold">
                    {inquiry.branch_name || "N/A"}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {inquiry.address} <br />
                  <span className="text-gray-500">{inquiry.phone}</span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      setShowDetailsModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(inquiry.inquiry_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simplified View Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedInquiry.inquiry_id}
              </p>
              <p>
                <strong>Branch:</strong> {selectedInquiry.branch_name}
              </p>
              <p>
                <strong>Name:</strong> {selectedInquiry.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedInquiry.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedInquiry.address}
              </p>
              <p>
                <strong>Email:</strong> {selectedInquiry.email || "N/A"}
              </p>
            </div>
            <hr />
            <div>
              <p className="text-sm font-bold">Description/Message:</p>
              <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                {selectedInquiry.description || "No description provided."}
              </p>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default InquiryDashboard;
