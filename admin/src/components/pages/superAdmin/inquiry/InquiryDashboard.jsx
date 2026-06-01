import { useState } from "react";
import { Search } from "lucide-react";
import { useGetAllInquiriesQuery } from "../../../../redux/features/siteSlice";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import LocationSelect from "../../../shared/LocationFilterd.jsx"; // LocationSelect थपियो

const InquiryDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Location State थपियो
  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // API hook
  const { data: inquiriesData, isLoading, error } = useGetAllInquiriesQuery();

  const inquiries = inquiriesData?.data || [];

  // १. पहिले Location Form को Branch ID को आधारमा फिल्टर गर्ने
  const branchFilteredInquiries = locationForm.branch_id
    ? inquiries.filter(
        (inquiry) =>
          String(inquiry.branch_id) === String(locationForm.branch_id),
      )
    : inquiries;

  // २. त्यसपछि Search Term को आधारमा फिल्टर गर्ने (Name वा Phone नम्बर)
  const displayInquiries = branchFilteredInquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm),
  );

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inquiry Management</h1>
      </div>

      {/* FILTER + SEARCH AREA */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 w-full">
        {/* LEFT - LOCATION FILTER (ब्रान्च छान्नका लागि) */}
        <div className="flex-1 w-full">
          <LocationSelect
            formData={locationForm}
            setFormData={setLocationForm}
          />
        </div>

        {/* RIGHT - SEARCH AND COUNT CONTAINER */}
        <div className="w-full md:w-72 flex flex-col justify-end gap-2">
          {/* SEARCH KO MATHI TOTAL COUNT */}
          <div className="flex flex-col items-end justify-center px-4 py-1.5 bg-slate-50 border border-gray-200 rounded-lg w-full">
            <span className="text-[14px] uppercase font-semibold text-gray-400 tracking-wider">
              Total Inquiries
            </span>
            <span className="text-sm font-bold text-gray-700">
              {displayInquiries.length}
            </span>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 border-collapse text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Branch</th>
                <th className="p-3 border-b">Phone</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {displayInquiries.length > 0 ? (
                displayInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry.inquiry_id}
                    className="hover:bg-slate-50 border-b"
                  >
                    <td className="p-3">{index + 1}</td>

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

                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setShowDetailsModal(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No inquiries available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                <p>{selectedInquiry.address || "N/A"}</p>
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
