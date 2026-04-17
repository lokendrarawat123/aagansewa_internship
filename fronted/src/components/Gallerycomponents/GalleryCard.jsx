import React from "react";

const GalleryCard = ({ item }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all border border-orange-500/20">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
        />

        <div className="px-4 py-2 text-white text-xs font-bold bg-orange-500 absolute bottom-0 right-0 rounded-tl-lg">
          {new Date(item.gallery_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Branch ID: {item.branch_id}
          </span>
          <span className="text-gray-400 text-xs">|</span>
          <span className="text-gray-400 text-xs italic">
            📍 {item.location}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400">
          {item.title}
        </h3>

        <p className="text-[14px] text-gray-400 line-clamp-2">
          Staff ID {item.staff_id} was present at this event located in{" "}
          {item.location}.
        </p>

        <div className="mt-5 text-orange-400 font-bold text-sm cursor-pointer">
          VIEW GALLERY →
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
