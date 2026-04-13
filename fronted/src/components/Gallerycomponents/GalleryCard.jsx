import React from "react";
import { galleryData } from "../static/Gallery.js";

const GallerySection = () => {
  return (
    <div className="bg-white p-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-pink-500 pl-4">
            LATEST GALLERY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item) => (
            <div
              key={item.gallery_id}
              className="bg-purple-50 rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-all border border-purple-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image} // डेटाबेसबाट आउँदा `${IMG_URL}/${item.image}` राख्नुहोला
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
                />
                {/* Date Tag */}
                <div className="px-4 py-2 text-white text-xs font-bold tracking-widest bg-pink-500 absolute bottom-0 right-0 rounded-tl-lg">
                  {new Date(item.gallery_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-200 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Branch ID: {item.branch_id}
                  </span>
                  <span className="text-slate-400 text-xs">|</span>
                  <span className="text-slate-500 text-xs italic font-medium">
                    📍 {item.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-2">
                  Staff ID {item.staff_id} was present at this event located in{" "}
                  {item.location}. Explore the moments captured during this
                  special occasion.
                </p>

                <div className="mt-5 flex items-center text-pink-500 font-bold text-sm cursor-pointer group-hover:gap-3 transition-all gap-2">
                  VIEW GALLERY
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
