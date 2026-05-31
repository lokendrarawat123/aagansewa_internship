import { useState } from "react";
import { toast } from "react-toastify";

import { useGetsAllServiceWithBranchNameQuery } from "../../../../redux/features/serviceSlice.js";

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
  const baseUrl = import.meta.env.VITE_IMG_URL;

  // MODALS
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  // API
  const { data, isLoading, error } = useGetsAllServiceWithBranchNameQuery();

  const services = data?.data || [];

  // VIEW
  const handleView = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
      </div>
      {/* == ======= for branch wise filtered */}
      <div className="mb-6">
        <LocationSelect formData={locationForm} setFormData={setLocationForm} />
      </div>
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
            {services.map((s, index) => (
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

                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleView(s)}
                    >
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW MODAL ================= */}

      <DetailsModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Service Details"
      >
        {selectedService && (
          <div className="space-y-5">
            {/* IMAGE */}
            <div className="flex justify-center">
              {selectedService.service_image ? (
                <img
                  src={`${baseUrl}${selectedService.service_image}`}
                  alt={selectedService.service_name}
                  className="w-52 h-52 rounded-xl object-cover border shadow-sm"
                />
              ) : (
                <div className="w-52 h-52 rounded-xl border bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Service ID</p>

                <p>{selectedService.service_id}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Service Name</p>

                <p>{selectedService.service_name}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Branch Name</p>

                <p>{selectedService.branch_name}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">Description</p>

              <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 leading-7">
                {selectedService.description || "No description available"}
              </div>
            </div>

            {/* BUTTON */}
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
