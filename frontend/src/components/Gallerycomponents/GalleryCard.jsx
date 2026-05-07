import React from "react";

const GalleryCard = ({ item }) => {
  return (
    <div className="rounded-lg overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-700" style={{ backgroundColor: "#0a1628" }}>
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gray-200">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Date Badge - Top Right */}
        <div className="absolute top-3 right-3 px-3 py-1.5 text-white text-xs font-bold rounded-md shadow-lg" style={{ backgroundColor: "#FF6B35" }}>
          {new Date(item.gallery_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Meta Info - Branch ID & Location */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: "#FF6B35", color: "white" }}>
            Branch {item.branch_id}
          </span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-300 text-xs font-medium">
            📍 {item.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
          Staff ID <span className="font-semibold text-gray-200">{item.staff_id}</span> was present at this event located in{" "}
          <span className="font-semibold text-gray-200">{item.location}</span>.
        </p>

        {/* View More Link */}
        <button className="mt-4 font-semibold text-sm transition-all duration-300 flex items-center gap-2" style={{ color: "#FF6B35" }}>
          VIEW GALLERY
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;