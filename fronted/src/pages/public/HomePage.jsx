import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
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
  );
};

export default Home;
