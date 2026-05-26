import { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByBranchQuery,
} from "../../../../redux/features/siteSlice";

import DetailsModal from "../../../shared/Modal";
import Input from "../../../shared/Input";
import Button from "../../../shared/Button";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const Review = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [addData, setAddData] = useState({
    name: "",
    position: "",
    description: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    position: "",
    description: "",
  });

  const { data: reviewData, isLoading, error } = useGetReviewsByBranchQuery();
  const [addReview, { isLoading: adding }] = useAddReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();

  const reviews = reviewData?.reviews || [];

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setAddData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addReview(addData).unwrap();
      toast.success(res?.message || "Review added successfully");
      setShowAddModal(false);
      setAddData({ name: "", position: "", description: "" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add review");
    }
  };

  const handleEditOpen = (review) => {
    setSelectedReview(review);
    setEditData({
      name: review.name || "",
      position: review.position || "",
      description: review.description || "",
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedReview) return;

    try {
      const res = await updateReview({
        id: selectedReview.review_id,
        data: editData,
      }).unwrap();

      toast.success(res?.message || "Review updated successfully");
      setShowEditModal(false);
      setSelectedReview(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update review");
    }
  };

  const openDeleteModal = (review) => {
    setSelectedReview(review);
    setDeleteId(review.review_id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await deleteReview(deleteId).unwrap();
      toast.success(res?.message || "Review deleted successfully");
      setShowDeleteModal(false);
      setDeleteId(null);
      setSelectedReview(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Review Management</h1>
        <Button
          variant="success"
          size="lg"
          onClick={() => setShowAddModal(true)}
        >
          Add Review
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Position</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-6 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.review_id} className="border-t">
                  <td className="px-5 py-4">#{review.review_id}</td>
                  <td className="px-5 py-4">{review.name}</td>
                  <td className="px-5 py-4">{review.position || "-"}</td>
                  <td className="px-5 py-4">
                    {review.created_at
                      ? new Date(review.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-5 py-4 flex gap-2 justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedReview(review);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditOpen(review)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openDeleteModal(review)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Review Details"
      >
        {selectedReview && (
          <div className="space-y-3">
            <p>
              <b>Name:</b> {selectedReview.name}
            </p>
            <p>
              <b>Position:</b> {selectedReview.position || "-"}
            </p>
            <p>
              <b>Description:</b> {selectedReview.description}
            </p>
          </div>
        )}
      </DetailsModal>

      <DetailsModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Review"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            id="name"
            label="Name"
            value={addData.name}
            onChange={handleAddChange}
            placeholder="e.g. Lokendra Rawat"
            required
          />
          <Input
            id="position"
            label="Position"
            value={addData.position}
            onChange={handleAddChange}
            placeholder="e.g. Branch Manager"
          />
          <textarea
            id="description"
            value={addData.description}
            onChange={handleAddChange}
            className="w-full border p-2 rounded"
            placeholder="Write the review description..."
            required
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              {adding ? "Adding..." : "Add Review"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      <DetailsModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Review"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            id="name"
            label="Name"
            value={editData.name}
            onChange={handleEditChange}
            required
          />
          <Input
            id="position"
            label="Position"
            value={editData.position}
            onChange={handleEditChange}
          />
          <textarea
            id="description"
            value={editData.description}
            onChange={handleEditChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {updating ? "Updating..." : "Update Review"}
            </Button>
          </div>
        </form>
      </DetailsModal>

      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this review?
          </p>
          {selectedReview && (
            <div className="bg-gray-50 p-3 rounded">
              <p>
                <b>Name:</b> {selectedReview.name}
              </p>
              <p>
                <b>Position:</b> {selectedReview.position || "-"}
              </p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DetailsModal>
    </div>
  );
};

export default Review;
