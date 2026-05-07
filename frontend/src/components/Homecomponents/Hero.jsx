import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Select from "../shared/Select";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const { isLoading, data } = useGetAllDistrictQuery();
  const { data: branchData } = useGetBranchByDistrictQuery(selectedDistrict, {
    skip: !selectedDistrict,
  });

  const navigate = useNavigate();

  const districts =
    data?.data?.map((d) => ({
      value: d.district_id,
      label: d.district_name,
    })) || [];

  const availablePlaces =
    branchData?.data?.map((b) => ({
      id: b.branch_id,
      value: b.branch_id,
      label: b.branch_name,
      slug: b.branch_slug,
    })) || [];

  const images = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceChange = (e) => {
    const branchId = e.target.value;
    const branch = availablePlaces.find((p) => p.id === Number(branchId));
    setSelectedPlace(branchId);

    if (branch) {
      navigate(`/services/${branch.slug}`, {
        state: { branchId: branch.id },
      });
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-6 text-white">
          <h1 className="text-5xl font-bold mb-4">Aangan Sewa</h1>
          <p className="text-xl mb-2">Quality home services, on demand</p>
          <p className="text-lg mb-8">
            Experienced professionals at your doorstep
          </p>

          <div className="max-w-2xl mx-auto bg-white text-black rounded-lg p-6">
            <p className="mb-4">Where do you need a service?</p>

            <div className="flex gap-4">
              <Select
                options={districts}
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedPlace("");
                }}
                placeholder="Select district"
              />

              <Select
                options={availablePlaces}
                value={selectedPlace}
                onChange={handlePlaceChange}
                placeholder="Select place"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full z-20"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full z-20"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
