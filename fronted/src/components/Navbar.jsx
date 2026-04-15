import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo1 from "../assets/logo1.jpg";
import { NavLink } from "react-router-dom";

const AGENCIES = [
  {
    province: "Koshi Province",
    districts: ["Jhapa", "Morang", "Sunsari", "Ilam"],
  },
  {
    province: "Madhesh Province",
    districts: ["Janakpur", "Birgunj", "Sarlahi", "Siraha"],
  },
  {
    province: "Bagmati Province",
    districts: ["Kathmandu", "Lalitpur", "Bhaktapur", "Chitwan"],
  },
  {
    province: "Gandaki Province",
    districts: ["Pokhara", "Lamjung", "Gorkha", "Baglung"],
  },
  {
    province: "Lumbini Province",
    districts: ["Butwal", "Dang", "Kapilvastu", "Palpa"],
  },
];

const MENU_ITEMS = [
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  // Compact padding, bold text, orange bg on hover
  const navItem =
    "px-4 py-2 font-bold text-gray-700 hover:bg-orange-500 hover:text-white transition-all duration-200 flex items-center cursor-pointer text-[13px] uppercase tracking-wider";

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-25">
        {/* Logo - Paila kai size ma back! */}
        <NavLink to="/">
          <img src={logo1} alt="Logo" className="w-28 h-20 object-contain" />
        </NavLink>

        {/* MENU */}
        <div
          className={`${menuOpen ? "block" : "hidden"} lg:block max-lg:fixed max-lg:inset-0 max-lg:bg-black/40`}
        >
          <ul className="lg:flex lg:items-center lg:gap-1 max-lg:bg-white max-lg:w-2/3 max-lg:h-full max-lg:p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="lg:hidden absolute top-4 right-4"
            >
              <FaTimes />
            </button>

            {/* Home */}
            <li>
              <NavLink to="/" className={navItem}>
                Home
              </NavLink>
            </li>

            {/* BRANCHES - Full Rectangle Dropdown */}
            <li
              className="relative h-full flex items-center"
              onMouseEnter={() => setBranchOpen(true)}
              onMouseLeave={() => setBranchOpen(false)}
            >
              <div
                className={`${navItem} gap-1 ${branchOpen ? "bg-orange-500 text-white" : ""}`}
              >
                Branches{" "}
                <FaChevronDown
                  className={`text-[10px] transition-transform ${branchOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* DROPDOWN - Sharp Borders & Clean Text */}
              <div
                className={`absolute left-0 top-full w-[700px] bg-white shadow-2xl border border-gray-200 p-8 grid grid-cols-3 gap-8 origin-top transition-all duration-200
                ${branchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                {AGENCIES.map((item) => (
                  <div key={item.province}>
                    <h4 className="font-black text-gray-900 text-[11px] tracking-[0.15em] uppercase border-b-2 border-orange-500 mb-4 pb-1 w-fit">
                      {item.province}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {item.districts.map((d) => (
                        <p
                          key={d}
                          className="text-[14px] text-gray-600 hover:text-orange-600 hover:pl-2 transition-all cursor-pointer font-medium tracking-wide"
                        >
                          {d}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </li>

            {/* Others */}
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink to={item.path} className={navItem}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Login - Sharp Rectangle */}
        <div className="flex items-center gap-4">
          <button className="bg-orange-500 text-white px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
            Login
          </button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden">
            <FaBars size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
