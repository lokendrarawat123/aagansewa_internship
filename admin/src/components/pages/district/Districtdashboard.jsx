import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../shared/Input";
import { useGetDistrictQuery } from "../../../redux/features/provinceSlilce";

const DistrictDashboard = () => {
  const [formData, setFormData] = useState({
    province_name: "",
    district_name: "",
  });
  const [isAddDistrict, setIsAddDistrict] = useState(false);
  const { data } = useGetDistrictQuery();
  const districts = data?.allDistricts; // store  all district

  console.log(districts);
  const handleAddDistrict = async () => {
    setIsAddDistrict(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            District Management
          </h1>
          <div>
            <button
              onClick={handleAddDistrict}
              className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-full font-medium"
            >
              Add New District
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  District ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  District Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Province Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {districts?.length > 0 ? (
                districts.map((district) => (
                  <tr
                    key={district.district_id}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 text-sm">
                      {district.district_id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {district.district_name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {district.province_name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDelete(district.district_id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No districts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add District Form */}
      {isAddDistrict && (
        <form onSubmit={""} className="flex gap-3">
          <Input
            type="text"
            id="province_name"
            placeholder="Province Name"
            value={formData.province_name}
            // onChange={handleChange}
          />

          <Input
            type="text"
            id="district_name"
            placeholder="District Name"
            value={formData.district_name}
            // onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-full font-medium"
          >
            Add District
          </button>
        </form>
      )}
    </>
  );
};

export default DistrictDashboard;
