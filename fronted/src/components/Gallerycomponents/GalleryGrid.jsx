import React from "react";
import { galleryData } from "../static/Gallery";
import GalleryCard from "./GalleryCard";

const GalleryGrid = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold border-l-4 border-orange-500 pl-4 mb-10">
          ALL GALLERY
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {galleryData.map((item) => (
            <GalleryCard key={item.gallery_id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryGrid;
