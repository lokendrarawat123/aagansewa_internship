import React from "react";

const ServiceCard = ({ allServices, image_url, children }) => {
    
  return (
    <div className="bg-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 inline-block">
            {children || "Our Services"}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-lg:max-w-3xl max-md:max-w-md mx-auto">
          {allServices.map((service) => (
            <div
              key={service.service_id}
              className="bg-white cursor-pointer rounded-lg overflow-hidden group relative before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-30"
            >
              <img
                src={`${image_url}/${service.service_image}`}
                alt={service.service_name}
                className="w-full h-96 object-cover group-hover:scale-110 transition-all duration-300"
              />

              <div className="bg-linear-to-t from-black/60 via-black/60 to-transparent p-6 absolute bottom-0 left-0 right-0 z-20">
                <span className="text-sm block mb-2 text-slate-300 font-semibold">
                  {new Date(service.created_at).toDateString()}
                </span>

                <h3 className="text-xl font-semibold text-white">
                  {service.service_name}
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
