import React from "react";

const AboutAaganSewa = () => {
  return (
    <section className="w-full bg-[#0f0f0f] py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-orange-500">Aagan Sewa</span>
          </h2>

          <p className="text-lg text-orange-400 font-medium mb-4">
            “Connecting citizens with local services across every district.”
          </p>

          <p className="text-gray-300 leading-relaxed">
            Aagan Sewa is a digital platform designed to simplify how people
            access local government services. Whether it's municipality updates,
            ward-level services, or district information, everything is now
            accessible in one place—fast, reliable, and user-friendly.
          </p>

          {/* Optional Button */}
          <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-lg font-semibold">
            Explore Services
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Aagan Sewa"
            className="w-full h-100 object-cover rounded-2xl shadow-lg"
          />

          {/* Orange Glow Effect */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-orange-500/30 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutAaganSewa;
