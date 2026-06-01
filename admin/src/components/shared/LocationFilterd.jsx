import {
  useGetProvinceQuery,
  useGetDistrictByProvinceQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/branchSlice.js";

import Button from "./Button.jsx";
import Select from "./Select";

const LocationSelect = ({ formData, setFormData }) => {
  const { data: provincesData } = useGetProvinceQuery();

  const { data: districtData } = useGetDistrictByProvinceQuery(
    formData.province_id,
    { skip: !formData.province_id },
  );

  const { data: branchData } = useGetBranchByDistrictQuery(
    formData.district_id,
    { skip: !formData.district_id },
  );

  const provinces = provincesData?.data || [];
  const districts = districtData?.data || [];
  const branches = branchData?.data || [];

  const hasDistricts = districts.length > 0;
  const hasBranches = branches.length > 0;

  const handleProvinceChange = (e) => {
    setFormData({
      province_id: e.target.value,
      district_id: "",
      branch_id: "",
    });
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

  const handleClear = () => {
    setFormData({
      province_id: "",
      district_id: "",
      branch_id: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* HEADER (optional clean spacing) */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Filter Branch</h2>

        <Button
          onClick={handleClear}
          size="sm"
          variant="danger"
          className="px-3 py-1 text-xs"
        >
          Clear
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* PROVINCE */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            Province <span className="text-red-500">*</span>
          </label>

          <Select
            value={formData.province_id}
            onChange={handleProvinceChange}
            options={provinces.map((p) => ({
              value: p.province_id,
              label: p.province_name,
            }))}
            placeholder="Select Province"
          />
        </div>

        {/* DISTRICT */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            District <span className="text-red-500">*</span>
          </label>

          <Select
            value={formData.district_id}
            onChange={handleDistrictChange}
            disabled={!formData.province_id}
            options={
              hasDistricts
                ? districts.map((d) => ({
                    value: d.district_id,
                    label: d.district_name,
                  }))
                : []
            }
            placeholder={
              !formData.province_id
                ? "Select Province First"
                : hasDistricts
                  ? "Select District"
                  : "No districts available"
            }
          />

          {formData.province_id && !hasDistricts && (
            <p className="text-xs text-red-500">No districts available</p>
          )}
        </div>

        {/* BRANCH */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            Branch <span className="text-red-500">*</span>
          </label>

          <Select
            value={formData.branch_id}
            onChange={handleBranchChange}
            disabled={!formData.district_id}
            options={
              hasBranches
                ? branches.map((b) => ({
                    value: b.branch_id,
                    label: b.branch_name,
                  }))
                : []
            }
            placeholder={
              !formData.district_id
                ? "Select District First"
                : hasBranches
                  ? "Select Branch"
                  : "No branches available"
            }
          />

          {formData.district_id && !hasBranches && (
            <p className="text-xs text-red-500">No branches available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
