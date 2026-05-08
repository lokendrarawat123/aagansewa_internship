import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import ServiceCard from "../../components/Servicecomponents/ServiceCard";
import FilterService from "../../components/Servicecomponents/FilterService";

const Services = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const {
    data: allService,
    isLoading: allServicesLoading,
    error: allServicesError,
  } = useGetAllServicesQuery();
  const allServices = allService?.data || [];

  return (
    <div className="w-full text-gray-800">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978')",
          }}
        />

        {/* Gradient Overlay - Navy blue with orange accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(25, 45, 85, 0.6) 0%, rgba(25, 45, 85, 0.5) 60%, rgba(255, 107, 53, 0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Aagan Sewa Services
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Explore public and government services available across different
            Aagan Sewa branches. Find the service you need and connect with our
            local managers for quick assistance.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              className="px-8 py-3 font-semibold text-base rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-white group"
              style={{ backgroundColor: "#FF6B35" }}
            >
              Browse All Services
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTER & SERVICES SECTION */}
      <section className="py-12 px-6 bg-gray-50">
        {/* Filter */}
        <div className="max-w-7xl mx-auto mb-12">
          <FilterService />
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          {allServicesLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading services...</p>
            </div>
          ) : allServicesError ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Error loading services</p>
            </div>
          ) : allServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  imgUrl={IMG_URL}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
