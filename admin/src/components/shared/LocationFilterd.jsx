import Select from "./Select";

const LocationSelect = ({
  provinces = [],
  districts = [],
  branches = [],
  formData,
  setFormData,
}) => {
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Province <span className="text-red-500">*</span>
        </label>
        <Select
          id="province_id"
          options={provinces.map((p) => ({
            value: p.province_id,
            label: p.province_name,
          }))}
          value={formData.province_id}
          onChange={handleProvinceChange}
          placeholder="Select Province"
        />
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District <span className="text-red-500">*</span>
        </label>
        <Select
          id="district_id"
          options={districts.map((d) => ({
            value: d.district_id,
            label: d.district_name,
          }))}
          value={formData.district_id}
          onChange={handleDistrictChange}
          placeholder={
            !formData.province_id ? "Select Province First" : "Select District"
          }
        />
      </div>

      {/* Branch */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Branch <span className="text-red-500">*</span>
        </label>
        <Select
          id="branch_id"
          options={branches.map((b) => ({
            value: b.branch_id,
            label: b.branch_name,
          }))}
          value={formData.branch_id}
          onChange={handleBranchChange}
          placeholder={
            !formData.district_id ? "Select District First" : "Select Branch"
          }
        />
      </div>
    </div>
  );
};

export default LocationSelect;
