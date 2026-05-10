import {
  useGetProvinceQuery,
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/branchSlice.js";

import Select from "./Select";

const LocationSelect = ({ formData, setFormData }) => {
  // Fetch Provinces
  const { data: provincesData } = useGetProvinceQuery();

  // Fetch Districts based on Province
  const { data: districtData } = useGetDistrictByProvinceQuery(
    formData.province_id,
    {
      skip: !formData.province_id,
    },
  );

  // Fetch Branches based on District
  const { data: branchData } = useGetBranchByDistrictQuery(
    formData.district_id,
    {
      skip: !formData.district_id,
    },
  );

  const provinces = provincesData?.data || [];
  const districts = districtData?.data || [];
  const branches = branchData?.data || [];

  const handleProvinceChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      province_id: e.target.value,
      district_id: "",
      branch_id: "",
    }));
  };

  const handleDistrictChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      district_id: e.target.value,
      branch_id: "",
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      branch_id: e.target.value,
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Province */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Province <span className="text-red-500">*</span>
        </label>

        <Select
          id="province_id"
          value={formData.province_id}
          onChange={handleProvinceChange}
          options={provinces.map((p) => ({
            value: p.province_id,
            label: p.province_name,
          }))}
          placeholder="Select Province"
        />
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium mb-1">
          District <span className="text-red-500">*</span>
        </label>

        <Select
          id="district_id"
          value={formData.district_id}
          onChange={handleDistrictChange}
          options={districts.map((d) => ({
            value: d.district_id,
            label: d.district_name,
          }))}
          placeholder={
            !formData.province_id ? "Select Province First" : "Select District"
          }
        />
      </div>

      {/* Branch */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Branch <span className="text-red-500">*</span>
        </label>

        <Select
          id="branch_id"
          value={formData.branch_id}
          onChange={handleBranchChange}
          options={branches.map((b) => ({
            value: b.branch_id,
            label: b.branch_name,
          }))}
          placeholder={
            !formData.district_id ? "Select District First" : "Select Branch"
          }
        />
      </div>
    </div>
  );
};

export default LocationSelect;
