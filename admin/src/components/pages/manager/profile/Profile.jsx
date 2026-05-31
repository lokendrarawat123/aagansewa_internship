import { ArrowLeft, Building2, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../shared/Button";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
} from "../../../../redux/features/siteSlice";
import { useState } from "react";
import DetailsModal from "../../../shared/Modal";
import Input from "../../../shared/Input";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const resetForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const { data, isLoading, error } = useGetProfileQuery();
  const [changePassword, { isLoading: passwordLoading }] =
    useChangePasswordMutation();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await changePassword(formData).unwrap();

      toast.success(res.message);

      setModalOpen(false);

      resetForm();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const profile = data?.data;

  if (isLoading) {
    return (
      <div className="p-10 text-center text-slate-500">Loading profile...</div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load profile
      </div>
    );
  }
  const handleChange = (e) => {
    const { id, value } = e.target; // इन्क्वायरीको जस्तै डिस्ट्रक्चरिङ गरियो
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleChangePassword = () => {
    setModalOpen(true);
  };

  return (
    <div className="max-h-screen  bg-slate-50 p-5">
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/manager-dashboard"
            className="rounded-lg bg-slate-900 p-2 text-white"
          >
            <ArrowLeft size={18} />
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Avatar */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              {profile?.name}
            </h2>
          </div>

          {/* Info */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <User className="text-slate-500" size={18} />

              <div>
                <p className="text-xs text-slate-500">Branch ID</p>
                <p className="font-medium text-slate-900">
                  {profile?.branch_id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Mail className="text-slate-500" size={18} />

              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Building2 className="text-slate-500" size={18} />

              <div>
                <p className="text-xs text-slate-500">Branch</p>
                <p className="font-medium capitalize text-slate-900">
                  {profile?.branch_name}
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <Button
              onClick={handleChangePassword}
              variant="primary"
              size="lg"
              className="w-full rounded-xl"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      <DetailsModal
        show={modalOpen}
        onClose={() => {
          setModalOpen(false);

          resetForm();
        }}
        title="Change Password"
      >
        <form className="space-y-4">
          <Input
            id="currentPassword"
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <Input
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2  justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setModalOpen(false);

                resetForm();
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={passwordLoading}
              onClick={handlePasswordSubmit}
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </Button>
          </div>
        </form>
      </DetailsModal>
    </div>
  );
};

export default Profile;
