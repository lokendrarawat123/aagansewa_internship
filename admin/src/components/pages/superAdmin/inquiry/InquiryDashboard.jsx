import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useGetBranchInquiryQuery } from "../../../../redux/features/siteSlice";
import DetailsModal from "../../../shared/Modal";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import LocationSelect from "../../../shared/LocationFilterd.jsx";

const InquiryDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Location State
  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // API hook with proper caching
  const {
    data: inquiriesData,
    isLoading,
    error,
    refetch: refetchInquiries,
  } = useGetBranchInquiryQuery(
    {
      branch_id: locationForm.branch_id,
      page: page,
      limit: 10,
    },
    {
      skip: !locationForm.branch_id,
      refetchOnMountOrArgChange: true,
    },
  );

  // Force refetch when branch changes
  useEffect(() => {
    if (locationForm.branch_id && refetchInquiries) {
      refetchInquiries();
      setPage(1); // Reset to first page
    }
  }, [locationForm.branch_id, refetchInquiries]);

  const inquiries = inquiriesData?.data || [];
  const totalInquiries = inquiriesData?.total || 0;
  const totalPages = inquiriesData?.totalPages || 1;

  // Search filter
  const displayInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm),
  );

  // View handler
  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Inquiry Management</h1>
      </div>

      {/* LOCATION FILTER */}
      <div className="mb-6">
        <LocationSelect formData={locationForm} setFormData={setLocationForm} />
      </div>

      {/* SEARCH AND STATS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-blue-600 font-medium">
              Total Inquiries: {totalInquiries}
            </span>
          </div>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {!locationForm.branch_id ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  Please select a branch to view inquiries
                </td>
              </tr>
            ) : displayInquiries.length > 0 ? (
              displayInquiries.map((inquiry, index) => (
                <tr key={inquiry.inquiry_id} className="border-b hover:bg-slate-50">
                  <td className="p-3">{(page - 1) * 10 + (index + 1)}</td>
                  <td className="p-3 font-medium">{inquiry.name}</td>
                  <td className="p-3">{inquiry.phone}</td>
                  <td className="p-3">{inquiry.email || "N/A"}</td>
                  <td className="p-3 text-sm">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(inquiry)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No inquiries found for selected branch
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {displayInquiries.length} of {totalInquiries} inquiries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(p - 1, 1))}
              >
                Previous
              </Button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-5">
            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Inquiry ID</p>
                <p>{selectedInquiry.inquiry_id}</p>
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
                <p>{selectedInquiry.address || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Date</p>
                <p>{new Date(selectedInquiry.created_at).toLocaleString()}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">Description</p>
              <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 leading-7">
                {selectedInquiry.description || "No description provided"}
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default InquiryDashboard;
