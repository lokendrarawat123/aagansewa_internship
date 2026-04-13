import React from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-900 mb-2">Contact Us</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
          {/* Left Side: Form Section */}
          <div className="md:col-span-2 p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Send us a message
            </h3>
            <p className="text-gray-500 mb-8">
              Do you have a question? A complaint? Or need any help to choose
              the right product? Feel free to contact us.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Details
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                      +971
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter your contact number"
                      className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter your message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button className="bg-[#061a32] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition shadow-lg">
                  Send a Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Info Card */}
          <div className="bg-[#061a32] p-8 lg:p-12 text-white flex flex-col justify-between m-4 rounded-2xl">
            <div>
              <h3 className="text-xl font-bold mb-6">
                Hi! We are always here to help you.
              </h3>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hotline</p>
                    <p className="font-medium">+971 50 430 3456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">SMS / WhatsApp</p>
                    <p className="font-medium">+971 52 312 6122</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium underline">support@zalomi.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-gray-400 mb-4">Connect with us</p>
              <div className="flex space-x-4">
                <Facebook
                  size={20}
                  className="cursor-pointer hover:text-blue-400"
                />
                <Instagram
                  size={20}
                  className="cursor-pointer hover:text-pink-400"
                />
                <Youtube
                  size={20}
                  className="cursor-pointer hover:text-red-500"
                />
                <Twitter
                  size={20}
                  className="cursor-pointer hover:text-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
