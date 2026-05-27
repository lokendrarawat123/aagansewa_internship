// components/profile/QuickLinks.jsx

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const links = [
  {
    label: "Review Dashboard",
    to: "/admin/review-dashboard",
  },
  {
    label: "Inquiry Dashboard",
    to: "/admin/inquiry-dashboard",
  },
  {
    label: "Service Dashboard",
    to: "/admin/service-dashboard",
  },
];

const QuickLinks = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase text-slate-400">
        Quick Links
      </h3>

      <div className="space-y-2">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            {item.label}

            <ChevronRight size={15} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
