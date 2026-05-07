import React, { useState } from "react";
import { galleryData } from "../static/Gallery";
import GalleryCard from "./GalleryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GallerySlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    if (startIndex + visibleCount < galleryData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleItems = galleryData.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="bg-white py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold border-l-4 border-orange-500 pl-4 mb-10">
          LATEST GALLERY
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <GalleryCard key={item.gallery_id} item={item} />
          ))}
        </div>

        {/* Left */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full"
        >
          <FaChevronLeft />
        </button>

        {/* Right */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default GallerySlider;
