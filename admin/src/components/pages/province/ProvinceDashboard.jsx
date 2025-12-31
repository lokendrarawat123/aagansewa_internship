import { use, useState } from "react";
import {
  useAddProvinceMutation,
  useGetProvinceQuery,
} from "../../../redux/features/provinceSlilce";
import Input from "../../shared/Input";
//dasboard
const ProvinceDashboard = () => {
  const [provinceName, setProvinceName] = useState({
    name: "",
  });
  const [provinceId, setprovinceId] = useState();
  const { data } = useGetProvinceQuery(); // get province form the backend
  const [addNewProvince] = useAddProvinceMutation();

  const provinces = data?.provinces; // if data available get data else response of the backend
  //onchange
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProvinceName((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };
  //if user clicked in add new province
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addNewProvince(provinceName).unwrap(); //calling login api throuh redux
      toast.success(res.message || "successfully added");
    } catch (error) {
      toast.error(error.data?.message || "something went wrong ");
    }
  };
  //delete province
  const handleDelete = () => {};
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Teachers List</h1>

        <div className="">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Enter new Province"
              id="name"
              value={provinceName.name}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="cursor-pointer bg-green-400 text-white p-3 rounded-full"
            >
              Add New Province
            </button>
          </form>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden ">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
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
            {provinces?.length > 0 ? (
              provinces.map((province, index) => (
                <tr
                  key={province.province_id || index}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3 text-sm">{province.province_id}</td>
                  <td className="px-4 py-3 text-sm">
                    {province.province_name}
                  </td>
                  <td className="px-4 py-3 text-sm ">
                    <div className="space-x-4">
                      <button
                        onClick={() => onDelete(province.id)}
                        className="text-red-600 hover:text-red-800 font-medium "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleEdit(province)}
                        className="text-red-600 hover:text-red-800 font-medium "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No provinces found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProvinceDashboard;
