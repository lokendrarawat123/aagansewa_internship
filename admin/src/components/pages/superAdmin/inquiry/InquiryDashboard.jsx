import { useState } from "react";
import { useGetAllInquiriesQuery } from "../../../../redux/features/siteSlice";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const InquiryDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // API hook
  const { data: inquiriesData, isLoading, error } = useGetAllInquiriesQuery();

  const inquiries = inquiriesData?.data || [];

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
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
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

                  <td className="p-3">{inquiry.phone}</td>

                  <td className="p-3 text-sm">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Inquiry ID</p>
                <p>{selectedInquiry.inquiry_id}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Branch</p>
                <p>{selectedInquiry.branch_name || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Name</p>
                <p>{selectedInquiry.name}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p>{selectedInquiry.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p>{selectedInquiry.email || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p>{selectedInquiry.address}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Inquiry Date</p>
                <p>{new Date(selectedInquiry.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Message / Description
              </p>

              <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                {selectedInquiry.description || "No description provided"}
              </div>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default InquiryDashboard;
