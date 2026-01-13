import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Services from "./Services";
import Gallery from "./Gallery";
import About from "./About";
import Contact from "./Contact";
import Select from "../../components/shared/Select";
import { useNavigate } from "react-router-dom";
import { useGetDistrictQuery } from "../../redux/features/districtSlice";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const districts = [{ value: "kathmandu", label: "Kathmandu" }];
  const navigate = useNavigate();
  const { isLoading, data, error } = useGetDistrictQuery();
  const district = data?.districts;
  if (isLoading) {
    <div>Loading.........</div>;
  }
  console.log(data);
  const placesByDistrict = {
    kathmandu: [
      { value: "thamel", label: "Thamel" },
      { value: "new-baneshwor", label: "New Baneshwor" },
      { value: "maharajgunj", label: "Maharajgunj" },
      { value: "balaju", label: "Balaju" },
    ],
  };
  const availablePlaces = selectedDistrict
    ? placesByDistrict[selectedDistrict] || []
    : [];

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
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const handlePlaceChange = (e) => {
    const place = e.target.value;
    setSelectedPlace(place);
    if (place) {
      navigate(`/services/${place}`);
    }
  };

  return (
    <>
      <div className="relative w-full h-125 overflow-hidden ">
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-black/20 z-10"></div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-8">
            <h1 className="text-5xl font-bold mb-4">Aangan Sewa</h1>
            <p className="text-xl mb-2">Quality home services, on demand</p>
            <p className="text-lg mb-8">
              Experienced, hand-picked Professionals to serve you at your
              doorstep
            </p>
            <div className="max-w-2xl mx-auto bg-white  text-black rounded-lg p-6">
              <p className="text-lg mb-4 text-gray-800">
                Where do you need a service?
              </p>
              <div className="flex gap-4 ">
                <Select
                  options={districts}
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedPlace("");
                  }}
                  placeholder="Select your district"
                />
                <Select
                  options={availablePlaces}
                  value={selectedPlace}
                  onChange={handlePlaceChange}
                  placeholder="Select your place"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 z-20"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 z-20"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-500 scale-125"
                  : "bg-orange-300 hover:bg-orange-400"
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Gallery />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Contact />
      </div>
    </>
  );
};

export default Home;
