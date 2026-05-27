// components/profile/AccountInfo.jsx

import { User, Building2, ShieldCheck } from "lucide-react";

const Row = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0">

      <div className="rounded-xl bg-slate-100 p-2 text-slate-500">
        <Icon size={16} />
      </div>

      <div>
        <p className="text-xs uppercase text-slate-400">
          {label}
        </p>

        <p className="text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
};

const AccountInfo = ({ profile }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-sm font-bold uppercase text-slate-400">
        Account Info
      </h3>

      <Row
        icon={User}
        label="User ID"
        value={`#${profile?.user_id}`}
      />

      <Row
        icon={Building2}
        label="Branch"
        value={profile?.branch_name}
      />

      <Row
        icon={ShieldCheck}
        label="Role"
        value="Manager"
      />
    </div>
  );
};

export default AccountInfo;