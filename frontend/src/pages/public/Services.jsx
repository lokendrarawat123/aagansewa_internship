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
      {/* HERO */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Agan Sewa Services</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Explore public and government services available across different
            Agan Sewa branches.
          </p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section>
        <FilterService />
      </section>
    </div>
  );
};

export default Services;
