import { useEffect, useState } from "react";

const LocationSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [branches, setBranches] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // Load provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await axios.get("/api/provinces");
      setProvinces(res.data.data);
    };

    fetchProvinces();
  }, []);

  // When province changes → load districts
  useEffect(() => {
    if (!selectedProvince) return;

    const fetchDistricts = async () => {
      const res = await axios.get(`/api/districts/${selectedProvince}`);
      setDistricts(res.data.data);
      setBranches([]);
      setSelectedDistrict("");
      setSelectedBranch("");
    };

    fetchDistricts();
  }, [selectedProvince]);

  // When district changes → load branches
  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchBranches = async () => {
      const res = await axios.get(`/api/branches/${selectedDistrict}`);
      setBranches(res.data.data);
      setSelectedBranch("");
    };

    fetchBranches();
  }, [selectedDistrict]);

  return (
    <div style={{ maxWidth: "400px" }}>
      {/* Province */}
      <select
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="">Select Province</option>
        {provinces.map((p) => (
          <option key={p.province_id} value={p.province_id}>
            {p.province_name}
          </option>
        ))}
      </select>

      {/* District */}
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedProvince}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.district_id} value={d.district_id}>
            {d.district_name}
          </option>
        ))}
      </select>

      {/* Branch */}
      <select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        disabled={!selectedDistrict}
      >
        <option value="">Select Branch</option>
        {branches.map((b) => (
          <option key={b.branch_id} value={b.branch_id}>
            {b.branch_name}
          </option>
        ))}
      </select>

      {/* Debug */}
      <div style={{ marginTop: "10px" }}>
        <p>Province: {selectedProvince}</p>
        <p>District: {selectedDistrict}</p>
        <p>Branch: {selectedBranch}</p>
      </div>
    </div>
  );
};

export default LocationSelector;
