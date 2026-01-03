import { use, useState } from "react";
import { toast } from "react-toastify";
import {
  useAddProvinceMutation,
  useDeleteProvinceMutation,
  useGetProvinceQuery,
} from "../../../redux/features/provinceSlilce";
import Input from "../../shared/Input";

import DetailsModal from "../../shared/modal";
import { Loading } from "../../shared/IsLoading";
import { Error } from "../../shared/Error";
import Select from "../../shared/Select";
//dasboard
const actionOptions = [
  { value: "Delete", label: "Delete" },
  { value: "view", label: "View" },
];
const ProvinceDashboard = () => {
  const [provinceName, setProvinceName] = useState({
    name: "",
  });
  // ADDED: State for managing modal and selected province
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showDistricts, setShowDistricts] = useState(false);

  const { data, isLoading, error } = useGetProvinceQuery(); // get province form the backend
  const [addNewProvince] = useAddProvinceMutation();
  const [deleteProvince] = useDeleteProvinceMutation();
  //store province details for in variable
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
      setProvinceName({ name: "" });
      toast.success(res.message || "successfully added");
    } catch (error) {
      toast.error(error.data?.message || "something went wrong ");
    }
  };
  //delete province
  const handleDelete = async (province) => {
    try {
      await deleteProvince(province.province_id).unwrap(); // for  direct api call.
      toast.success("province deleted succesfully");
    } catch (error) {
      toast.error(error.data?.message || "failed to delete province");
    }
  };

  // ADDED: Handle action dropdown changes (View/Delete)
  const handleActionChange = (e, province) => {
    const action = e.target.value;

    if (action === "view") {
      setSelectedProvince(province);
      setShowDistricts(true);
    } else if (action === "Delete") {
      handleDelete(province);
    }

    e.target.value = "";
  };
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  if (error) {
    return <Error Error={Error} />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Province Management</h1>

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
              {/* REMOVED: onChange from th element (not needed) */}
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
                  <td className="px-4 py-3 text-sm">
                    {/* CHANGED: Updated Select onChange to handle actions */}
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleActionChange(e, province)}
                    />
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
      {/* ADDED: Using DetailsModal component */}
      <DetailsModal
        show={showDistricts}
        onClose={() => {
          setShowDistricts(false);
          setSelectedProvince(null);
        }}
        title={`Districts in ${selectedProvince?.province_name || "Province"}`}
        size="md"
      >
        <div className="space-y-3">
          {selectedProvince?.district ? (
            selectedProvince.district.split(",").map((district, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 rounded-lg border-l-4 border-blue-500"
              >
                <span className="font-medium text-gray-800">
                  {district.trim()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No districts found for this province
              </p>
            </div>
          )}
        </div>
      </DetailsModal>
    </div>
  );
};
export default ProvinceDashboard;
