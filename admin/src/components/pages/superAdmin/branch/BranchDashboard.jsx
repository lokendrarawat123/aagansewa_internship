import { useState } from "react";
import { toast } from "react-toastify";

import {
  useGetBranchQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetProvinceQuery,
  useGetDistrictByProvinceQuery,
} from "../../../../redux/features/branchSlice.js";

import Input from "../../../shared/Input";
import DetailsModal from "../../../shared/Modal";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";
import Select from "../../../shared/Select.jsx";
import Button from "../../../shared/Button"; // ✅ NEW IMPORT

const BranchDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [formData, setFormData] = useState({
    branch_name: "",
    province_id: "",
    district_id: "",
    remarks: "",
  });

  // API
  const { data: branchData, isLoading, error } = useGetBranchQuery();
  const { data: districtData } = useGetDistrictByProvinceQuery(
    formData.province_id,
  );
  const { data: provinceData } = useGetProvinceQuery();

  const [addBranch] = useAddBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const branches = branchData?.data || [];
  const provinces = provinceData?.data || [];
  const districts = districtData?.data || [];

  // CHANGE HANDLER
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "province_id") {
      setFormData((prev) => ({
        ...prev,
        province_id: value,
        district_id: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addBranch({
        branch_name: formData.branch_name,
        district_id: formData.district_id,
        remarks: formData.remarks,
      }).unwrap();

      toast.success(res.message || "Branch added");

      setFormData({
        branch_name: "",
        province_id: "",
        district_id: "",
        remarks: "",
      });

      setShowAddModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add branch");
    }
  };

  // DELETE
  const handleDelete = async (branch) => {
    try {
      await deleteBranch(branch.branch_id).unwrap();
      toast.success("Branch deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Branch Management</h1>

        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
        >
          Add New Branch
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((b) => (
              <tr key={b.branch_id} className="border-b hover:bg-slate-50">
                <td className="p-3">{b.branch_id}</td>
                <td className="p-3">{b.branch_name}</td>
                <td className="p-3">{b.district_name}</td>

                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedBranch(b);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(b)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD MODAL ================= */}
      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Branch"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            id="province_id"
            value={formData.province_id}
            onChange={handleChange}
            options={provinces.map((p) => ({
              value: p.province_id,
              label: p.province_name,
            }))}
            placeholder="Select Province"
          />

          <Select
            id="district_id"
            value={formData.district_id}
            onChange={handleChange}
            options={districts.map((d) => ({
              value: d.district_id,
              label: d.district_name,
            }))}
            placeholder="Select District"
          />

          <Input
            id="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            placeholder="Branch Name"
          />

          <Input
            id="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              Add Branch
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= DETAILS MODAL ================= */}
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Branch Details"
        size="md"
      >
        <div className="space-y-3">
          <p>
            <b>ID:</b> {selectedBranch?.branch_id}
          </p>
          <p>
            <b>Name:</b> {selectedBranch?.branch_name}
          </p>
          <p>
            <b>District:</b> {selectedBranch?.district_name}
          </p>
        </div>
      </DetailsModal>
    </div>
  );
};

export default BranchDashboard;
