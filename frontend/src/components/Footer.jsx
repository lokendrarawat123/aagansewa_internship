import React from "react";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import logo1 from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-3 sm:px-11 pt-12 pb-6 font-sans" style={{ backgroundColor: "#0a1628" }}>
      {/* Main Footer Grid - 5 columns */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* Column 1 - Logo & Description */}
        <div className="space-y-4">
          <img src={logo1} alt="Aagan Sewa Logo" className="w-36" />
          <p className="text-[13px] text-gray-300 leading-relaxed">
            Connecting citizens with local services across every district of Nepal.
          </p>
        </div>

        {/* Column 2 - Our Services */}
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium border-b-2 pb-1 inline-block" style={{ borderColor: "#FF6B35" }}>
            OUR SERVICES
          </h6>
          <ul className="space-y-2.5">
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">Website Development</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">Software Development</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">Mobile App Development</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">Digital Marketing</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">CCTV Installation</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">Web Hosting & Domain</a></li>
            <li><a className="text-[13px] text-gray-300 hover:text-orange-500 cursor-pointer transition">IT Consulting & Services</a></li>
          </ul>
        </div>

        {/* Column 3 - Helpful Links */}
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium border-b-2 pb-1 inline-block" style={{ borderColor: "#FF6B35" }}>
            HELPFUL LINKS
          </h6>
          <ul className="space-y-2.5">
            <li><a href="/about" className="text-[13px] text-gray-300 hover:text-orange-500 transition">About Us</a></li>
            <li><a href="/services" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Services</a></li>
            <li><a href="/contact" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Contact</a></li>
            <li><a href="/career" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Career Opportunities</a></li>
            <li><a href="/blog" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Latest Articles</a></li>
          </ul>
        </div>

        {/* Column 4 - Policies */}
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium border-b-2 pb-1 inline-block" style={{ borderColor: "#FF6B35" }}>
            POLICIES
          </h6>
          <ul className="space-y-2.5">
            <li><a href="/" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Terms & Conditions</a></li>
            <li><a href="/privacy-policy" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Data Privacy Policy</a></li>
            <li><a href="#" className="text-[13px] text-gray-300 hover:text-orange-500 transition">Copyright Notice</a></li>
          </ul>
        </div>

        {/* Column 5 - Social Media */}
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium border-b-2 pb-1 inline-block" style={{ borderColor: "#FF6B35" }}>
            SOCIAL MEDIA
          </h6>
          <ul className="flex space-x-4">
            <li>
              <a href="https://facebook.com">
                <FaFacebook className="w-7 h-7 hover:scale-110 transition" style={{ color: "#FF6B35" }} />
              </a>
            </li>
            <li>
              <a href="https://tiktok.com">
                <FaTiktok className="w-7 h-7 hover:scale-110 transition" style={{ color: "#FF6B35" }} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <FaInstagram className="w-7 h-7 hover:scale-110 transition" style={{ color: "#FF6B35" }} />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <hr className="my-6" style={{ borderColor: "#1e293b" }} />

      {/* Copyright */}
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-gray-400 text-[13px]">
          Aagan Sewa Copyright © 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;