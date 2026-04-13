import React, { useState, useEffect } from "react";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import ServiceCard from "./ServiceCard";

const FilterService = () => {
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [districts, setDistricts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  // १. Province तान्ने
  const { data: allProvinces } = useGetProvinceQuery();
  const allprovince = allProvinces?.data || [];

  // २. RTK Query: ID हरू फेरिने बित्तिकै यसले अटोमेटिक नयाँ डाटा तान्छ (req.query मा जान्छ)
  const { data: allServices } = useGetAllServicesQuery({
    province_id: selectedProvince,
    district_id: selectedDistrict,
    branch_id: selectedBranch,
  });

  // ३. लजिक: आएको डाटालाई सही ठाउँमा सेट गर्ने
  useEffect(() => {
    if (allServices?.data) {
      const result = allServices.data;
      if (selectedProvince && !selectedDistrict) {
        setDistricts(result);
      } else if (selectedDistrict && !selectedBranch) {
        setBranches(result);
      } else {
        setServicesList(result);
      }
    }
  }, [allServices, selectedProvince, selectedDistrict, selectedBranch]);
  console.log(branches);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">
          {/* Province Select */}
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedProvince} // यो थप्नुपर्छ
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedBranch("");
              setDistricts([]); // Province फेरिँदा जिल्लाको एरे खाली गर्ने
              setBranches([]); // Province फेरिँदा शाखाको एरे खाली गर्ने
            }}
          >
            <option value="">Select Province</option>
            {allprovince.map((p) => (
              <option key={p.province_id} value={p.province_id}>
                {p.province_name}
              </option>
            ))}
          </select>

          {/* District Select */}
          <select
            className="border rounded-lg px-4 py-2"
            disabled={!selectedProvince}
            value={selectedDistrict} // यो थप्नुपर्छ
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedBranch("");
              setBranches([]); // District फेरिँदा शाखाको एरे खाली गर्ने
            }}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.district_id} value={d.district_id}>
                {d.district_name}
              </option>
            ))}
          </select>

          {/* Branch Select */}
          <select
            className="border rounded-lg px-4 py-2"
            disabled={!selectedDistrict}
            value={selectedBranch} // यो थप्नुपर्छ
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b.branch_id} value={b.branch_id}>
                {b.branch_name}
              </option>
            ))}
          </select>

          <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
            Find Services
          </button>
        </div>

        {/* Services List Display */}
        <section>
          <div>
            <ServiceCard allServices={servicesList} image_url={IMG_URL}>
              All Services
            </ServiceCard>
          </div>
        </section>
      </div>
    </section>
  );
};
export default FilterService;
