import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Building2,
} from "lucide-react";

const Contact = () => {
  // Mock data for branches - in a real app, you'd fetch this from your API
  const branches = [
    { branch_id: 1, name: "Dubai Main Branch" },
    { branch_id: 2, name: "Abu Dhabi Outlet" },
    { branch_id: 3, name: "Sharjah Service Center" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    description: "",
    branch_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    // Add your API call logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a2b4b] mb-2">Contact Us</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border border-gray-100">
          {/* Left Side: Form Section */}
          <div className="md:col-span-2 p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Send us a message
            </h3>
            <p className="text-gray-500 mb-8">
              Please select your nearest branch so we can assist you better.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name field (Maps to your SQL 'name') */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>

                {/* Branch Selection (Maps to your SQL 'branch_id') */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Branch *
                  </label>
                  <div className="relative">
                    <select
                      name="branch_id"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition bg-white"
                    >
                      <option value="">Choose a branch...</option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <Building2 size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>

                {/* Phone field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    required
                    onChange={handleChange}
                    type="tel"
                    placeholder="+971 00 000 0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Address field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residential Address *
                </label>
                <input
                  name="address"
                  required
                  onChange={handleChange}
                  type="text"
                  placeholder="Street, City, Country"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Description field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Inquiry
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  rows="3"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-secondary-blue text-white px-10 py-3 rounded-full font-semibold hover:bg-[#253d6b] transition-all shadow-lg active:scale-95"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Info Card (Same as before) */}
          <div className="bg-secondary-blue p-8 lg:p-10 text-white flex flex-col justify-between m-4 rounded-3xl">
            <div>
              <h3 className="text-xl font-bold mb-8 leading-tight">
                We are always here <br /> to help you.
              </h3>

              <div className="space-y-6">
                <ContactInfo
                  icon={<Phone size={18} />}
                  label="Hotline"
                  value="+971 50 430 3456"
                />
                <ContactInfo
                  icon={<MessageSquare size={18} />}
                  label="SMS / WhatsApp"
                  value="+971 52 312 6122"
                />
                <ContactInfo
                  icon={<Mail size={18} />}
                  label="Email"
                  value="support@zalomi.com"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Connect with us
              </p>
              <div className="flex space-x-5">
                <Facebook
                  size={20}
                  className="cursor-pointer hover:text-blue-400 transition"
                />
                <Instagram
                  size={20}
                  className="cursor-pointer hover:text-pink-400 transition"
                />
                <Youtube
                  size={20}
                  className="cursor-pointer hover:text-red-500 transition"
                />
                <Twitter
                  size={20}
                  className="cursor-pointer hover:text-blue-300 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the info side
const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-white/10 p-2.5 rounded-xl">{icon}</div>
    <div>
      <p className="text-[11px] uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
