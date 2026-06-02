import { useState } from "react";
import { Search } from "lucide-react";

import {
  useGetAllInquiriesQuery,
  useGetBranchInquiryQuery,
} from "../../../../redux/features/siteSlice";

import DetailsModal from "../../../shared/Modal";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import LocationSelect from "../../../shared/LocationFilterd.jsx";

const InquiryDashboard = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  // ================= API =================

  const {
    data: branchData,
    isLoading: branchLoading,
    error: branchError,
  } = useGetBranchInquiryQuery(
    {
      branch_id: locationForm.branch_id,
    },
    {
      skip: !locationForm.branch_id,
    },
  );

  const {
    data: allData,
    isLoading: allLoading,
    error: allError,
  } = useGetAllInquiriesQuery();

  // ================= BASE LOGIC =================

  const baseInquiries = locationForm.branch_id
    ? branchData?.data || []
    : allData?.data || [];

  // ================= SEARCH =================

  const displayInquiries = baseInquiries.filter((i) => {
    const name = (i.name || "").toLowerCase();
    const phone = i.phone || "";

    return (
      name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
    );
  });

  // ================= VIEW =================

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  // ================= LOADING / ERROR =================

  if (locationForm.branch_id ? branchLoading : allLoading) {
    return <Loading />;
  }

  if (locationForm.branch_id ? branchError : allError) {
    return <Error error={locationForm.branch_id ? branchError : allError} />;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inquiry Management</h1>
      </div>

      {/* LOCATION FILTER */}
      <div className="mb-6">
        <LocationSelect formData={locationForm} setFormData={setLocationForm} />
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-sm text-gray-500">
          Total: {displayInquiries.length}
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
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {displayInquiries.length > 0 ? (
              displayInquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.inquiry_id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">{inquiry.name}</td>

                  <td className="p-3">{inquiry.phone}</td>

                  <td className="p-3">{inquiry.email || "N/A"}</td>

                  <td className="p-3">{inquiry.branch_name || "N/A"}</td>

                  <td className="p-3">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <Button size="sm" onClick={() => handleView(inquiry)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Name</p>
                <p>{selectedInquiry.name}</p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p>{selectedInquiry.phone}</p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p>{selectedInquiry.email || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold">Address</p>
                <p>{selectedInquiry.address || "N/A"}</p>
              </div>

              <div>
                <p className="font-semibold">Date</p>
                <p>{new Date(selectedInquiry.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Description</p>
              <div className="bg-gray-100 p-4 rounded">
                {selectedInquiry.description || "No description"}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
              >
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
