import { useState } from "react";
import { toast } from "react-toastify";

import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../../redux/features/categorySlice.js";

import Input from "../../../shared/Input.jsx";
import DetailsModal from "../../../shared/Modal.jsx";
import Button from "../../../shared/Button.jsx";
import { Loading } from "../../../shared/IsLoading.jsx";
import { Error } from "../../../shared/Error.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ServiceCategory = () => {
  // ================= MODAL =================
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ================= SELECTED =================
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ================= FORM =================
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  // ================= API =================
  const { data, isLoading, error } = useGetAllCategoriesQuery();

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ================= RESET =================
  const resetForm = () => {
    setFormData({
      category_name: "",
      description: "",
    });

    setSelectedCategory(null);
  };

  // ================= CLOSE =================
  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    resetForm();
  };

  // ================= ADD =================
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await addCategory(formData).unwrap();

      toast.success(res.message || "Category Added");

      setShowAddModal(false);

      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add category");
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (category) => {
    setSelectedCategory(category);

    setFormData({
      category_name: category.category_name,
      description: category.description || "",
    });

    setShowEditModal(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateCategory({
        id: selectedCategory.category_id,
        data: formData,
      }).unwrap();

      toast.success(res.message || "Updated Successfully");

      setShowEditModal(false);

      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory.category_id).unwrap();

      toast.success("Deleted Successfully");

      setShowDeleteModal(false);

      setSelectedCategory(null);
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm ">
        <div className="flex items-center gap-4">
          <Link
            to="/manager/service-dashboard"
            className="rounded-lg bg-slate-900 p-2 text-white hover:bg-slate-700 transition"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Service Category Management
            </h1>
            <p className="text-sm text-slate-500">
              Manage all service categories easily
            </p>
          </div>
        </div>

        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
          className="shadow-md"
        >
          Add Category
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">S.N</th>

              <th className="p-3 text-left">Category Name</th>

              <th className="p-3 text-left">Description</th>

              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.category_id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 capitalize font-medium">
                  {category.category_name}
                </td>

                <td className="p-3">{category.description || "N/A"}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openEdit(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDeleteModal(true);
                      }}
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
        onClose={closeModal}
        title="Add Category"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            id="category_name"
            label="Category Name"
            value={formData.category_name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />

          <Input
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              {isAdding ? "Adding..." : "Add Category"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= EDIT MODAL ================= */}
      <DetailsModal
        show={showEditModal}
        onClose={closeModal}
        title="Edit Category"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            id="category_name"
            label="Category Name"
            value={formData.category_name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />

          <Input
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>

            <Button variant="success" type="submit">
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      {/* ================= DELETE MODAL ================= */}
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Category"
      >
        <p>Are you sure you want to delete this category?</p>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DetailsModal>
    </div>
  );
};

export default ServiceCategory;
