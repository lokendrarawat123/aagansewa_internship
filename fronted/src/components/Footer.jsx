import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/logo1.jpg";

const FOOTER_DATA = {
  quickLinks: ["About", "Services", "Clients", "Gallery", "Partner", "Contact"],

  socialLinks: [
    { icon: FaTwitter, link: "#" },
    { icon: FaLinkedinIn, link: "#" },
    { icon: FaGithub, link: "#" },
    { icon: FaFacebookF, link: "#" },
    { icon: FaInstagram, link: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#001f3f] text-white py-14 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="Logo" className="h-16 cursor-pointer" />
            <span className="font-bold text-2xl uppercase text-primary-orange">
              AnganSewa
            </span>
          </div>
        </div>

        {/* Quick Links using map */}
        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-6">
            {FOOTER_DATA.quickLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="text-primary-orange ">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full border-t border-gray-500 mb-10 opacity-30"></div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-0 md:justify-between px-9">
          {/* Left */}
          <p className="text-sm text-left">
            © 2026 AnganSewa. All rights reserved.
          </p>

          {/* Center (Social Icons) */}
          <div className="flex gap-5 my-4 md:my-0">
            {FOOTER_DATA.socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <a key={index} href={item.link}>
                  <Icon size={20} className="hover:text-primary-orange" />
                </a>
              );
            })}
          </div>

          {/* Right */}
          <p className="text-sm text-right">
            Powered by <span className="text-[#daac13]">Next Infosys</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
