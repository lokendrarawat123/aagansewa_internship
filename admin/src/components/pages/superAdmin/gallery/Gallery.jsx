import { useState, useEffect } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import {
  useGetBranchGalleriesQuery,
  useGetAllGalleriesQuery,
} from "../../../../redux/features/gallerySlice.js";
import DetailsModal from "../../../shared/Modal.jsx";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";
import LocationSelect from "../../../shared/LocationFilterd.jsx";

const GalleryDashboard = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Location State
  const [locationForm, setLocationForm] = useState({
    province_id: "",
    district_id: "",
    branch_id: "",
  });

  const baseUrl = import.meta.env.VITE_IMG_URL;

  // API hooks
  const {
    data: branchGalleryData,
    isLoading: branchLoading,
    error: branchError,
    refetch: refetchBranchGalleries,
  } = useGetBranchGalleriesQuery(
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

  const { data: allGalleryData, isLoading, error } = useGetAllGalleriesQuery();

  // Force refetch when branch changes
  useEffect(() => {
    if (locationForm.branch_id && refetchBranchGalleries) {
      refetchBranchGalleries();
      setPage(1); // Reset to first page
    }
  }, [locationForm.branch_id, refetchBranchGalleries]);

  const allGalleries = allGalleryData?.data || [];
  const branchGalleries = branchGalleryData?.data || [];
  const totalGalleries = branchGalleryData?.total || allGalleries.length;
  const totalPages = branchGalleryData?.totalPages || 1;

  const displayGalleries = locationForm.branch_id ? branchGalleries : allGalleries;

  // Search filter
  const filteredGalleries = displayGalleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (gallery.location && gallery.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // View handler
  const handleView = (gallery) => {
    setSelectedGallery(gallery);
    setShowViewModal(true);
  };

  // Format images from comma-separated string
  const formatImages = (imageString) => {
    if (!imageString) return [];
    return imageString.split(',').map(img => img.trim()).filter(img => img);
  };

  if (isLoading || (locationForm.branch_id && branchLoading)) return <Loading />;
  if (error || (locationForm.branch_id && branchError)) return <Error error={error || branchError} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
      </div>

      {/* LOCATION FILTER */}
      <div className="mb-6">
        <LocationSelect formData={locationForm} setFormData={setLocationForm} />
      </div>

      {/* SEARCH AND STATS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-purple-600 font-medium">
              Total Galleries: {totalGalleries}
            </span>
          </div>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Images</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {!locationForm.branch_id && filteredGalleries.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  {allGalleries.length === 0 ? "No galleries available" : "No galleries match your search"}
                </td>
              </tr>
            ) : locationForm.branch_id && filteredGalleries.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No galleries found for selected branch
                </td>
              </tr>
            ) : (
              filteredGalleries.map((gallery, index) => {
                const images = formatImages(gallery.image);
                return (
                  <tr key={gallery.gallery_id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{locationForm.branch_id ? (page - 1) * 10 + (index + 1) : index + 1}</td>
                    <td className="p-3 font-medium">{gallery.title}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {gallery.location}
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(gallery.gallery_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex -space-x-2">
                        {images.slice(0, 3).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={`${baseUrl}${img}`}
                            alt={`${gallery.title} ${imgIndex + 1}`}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {images.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                            +{images.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleView(gallery)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* PAGINATION - only show for branch galleries */}
        {locationForm.branch_id && totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {filteredGalleries.length} of {totalGalleries} galleries
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
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Gallery Details"
      >
        {selectedGallery && (
          <div className="space-y-5">
            {/* IMAGES GALLERY */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {formatImages(selectedGallery.image).map((img, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={`${baseUrl}${img}`}
                    alt={`${selectedGallery.title} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => window.open(`${baseUrl}${img}`, '_blank')}
                  />
                </div>
              ))}
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Gallery ID</p>
                <p>{selectedGallery.gallery_id}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Title</p>
                <p>{selectedGallery.title}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Location</p>
                <p className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedGallery.location}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Gallery Date</p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(selectedGallery.gallery_date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Created Date</p>
                <p>{new Date(selectedGallery.created_at).toLocaleString()}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Total Images</p>
                <p>{formatImages(selectedGallery.image).length} images</p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
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

export default GalleryDashboard;
