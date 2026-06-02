import { useState } from "react";
import { Search } from "lucide-react";

import {
  useGetBranchServicesQuery,
  useGetsAllServiceWithBranchNameQuery,
} from "../../../../redux/features/serviceSlice.js";

import Input from "../../../shared/Input.jsx";
import DetailsModal from "../../../shared/Modal.jsx";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";
import LocationSelect from "../../../shared/LocationFilterd.jsx";

const ServiceManager = () => {
  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const baseUrl = import.meta.env.VITE_IMG_URL;

  // API
  const { data: servicesData } = useGetBranchServicesQuery(
    {
      branch_id: locationForm.branch_id,
      page: 1,
    },
    {
      skip: !locationForm.branch_id,
    },
  );

  const { data, isLoading, error } = useGetsAllServiceWithBranchNameQuery();

  const services = data?.data || [];
  const branchServices = servicesData?.data || [];

  const baseServices = locationForm.branch_id ? branchServices : services;

  const displayServices = baseServices.filter((s) =>
    s.service_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleView = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
      </div>

      {/* FILTER + SEARCH AREA */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 w-full">
        <div className="w-full md:w-72 mb-4 flex flex-col justify-end gap-4">
          {/* SEARCH KO MATHI TOTAL COUNT */}
          <div className="flex flex-col items-end justify-center px-4 py-1.5 bg-slate-50 border border-gray-200 rounded-lg w-full">
            <span className="text-[14px] uppercase font-semibold text-gray-400 tracking-wider">
              Total Services
            </span>
            <span className="text-sm font-bold text-gray-700">
              {displayServices.length}
            </span>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex-1 w-full">
          <LocationSelect
            formData={locationForm}
            setFormData={setLocationForm}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
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
              {displayServices.length > 0 ? (
                displayServices.map((s, index) => (
                  <tr key={s.service_id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{s.service_name}</td>
                    <td className="p-3">{s.branch_name}</td>

                    <td className="p-3">
                      {s.service_image ? (
                        <img
                          src={`${baseUrl}${s.service_image}`}
                          alt={s.service_name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleView(s)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No services available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <DetailsModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Service Details"
      >
        {selectedService && (
          <div className="space-y-5">
            <div className="flex justify-center">
              {selectedService.service_image ? (
                <img
                  src={`${baseUrl}${selectedService.service_image}`}
                  alt={selectedService.service_name}
                  className="w-52 h-52 rounded-xl object-cover border"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl">
                  No Image
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Service ID</p>
                <p>{selectedService.service_id}</p>
              </div>

              <div>
                <p className="font-semibold">Service Name</p>
                <p>{selectedService.service_name}</p>
              </div>

              <div>
                <p className="font-semibold">Branch Name</p>
                <p>{selectedService.branch_name}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Description</p>
              <div className="bg-gray-100 p-4 rounded-md text-sm">
                {selectedService.description || "No description available"}
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default ServiceManager;
