import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, Building2, User } from "lucide-react";

const Profile = () => {
  const { name, email, role, branch_name, branch_id } = useSelector(
    (state) => state.user,
  );

  const displayName = name || email?.split("@")[0] || "Manager";
  const roleLabel = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Manager";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Manager Profile</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              Welcome, {displayName}
            </h1>
            <p className="mt-2 text-slate-600 max-w-xl">
              This page shows your current account details, branch assignment,
              and manager role information.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/manager-dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Back to dashboard
            </Link>
            <Link
              to="/admin/review-dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
            >
              Review Management
            </Link>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
                <User size={34} />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {displayName}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {email || "No email available"}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {roleLabel}
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Branch</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {branch_name || "Not assigned"}
                </p>
                {branch_id && (
                  <p className="text-sm text-slate-500">
                    Branch ID: {branch_id}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[.2em] text-slate-500">
                    Account details
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    Personal information
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {roleLabel}
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail size={18} />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{email || "-"}</p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <ShieldCheck size={18} />
                    <span className="font-medium">Account type</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{roleLabel}</p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Building2 size={18} />
                    <span className="font-medium">Branch name</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {branch_name || "Not assigned"}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <User size={18} />
                    <span className="font-medium">User ID</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {branch_id || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Helpful links
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Quick access to tools you use most as a manager.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/admin/review-dashboard"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Manage reviews
                </Link>
                <Link
                  to="/admin/inquiry-dashboard"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Manage inquiries
                </Link>
                <Link
                  to="/admin/service-dashboard"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Manage services
                </Link>
                <Link
                  to="/admin/staff-dashboard"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Manage staff
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
