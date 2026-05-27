// pages/Profile.jsx

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import AccountInfo from "./AccountInfo";
import QuickLinks from "./QuickLinks";

const Profile = () => {
  const profile = {
    user_id: 1,
    name: "Manager",
    email: "manager@gmail.com",
    branch_id: 2,
    branch_name: "Nepalgunj",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3 ">
          <Link
            to="/admin/manager-dashboard"
            className="rounded border  p-2 bg-slate-900 text-white"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Branch Profile
            </h1>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          {/* Left */}
          <div className="space-y-5">
            <AccountInfo profile={profile} />
            <ProfileCard profile={profile} />

            <QuickLinks />
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Profile Settings</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
