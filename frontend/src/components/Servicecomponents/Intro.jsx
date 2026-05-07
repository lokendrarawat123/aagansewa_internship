import React from "react";

const AboutAaganSewa = () => {
  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0a1628" }}>
            About <span style={{ color: "#FF6B35" }}>Aagan Sewa</span>
          </h2>

          <p className="text-lg font-medium mb-6" style={{ color: "#FF6B35" }}>
            "Connecting citizens with local services across every district."
          </p>

          <p className="text-gray-700 leading-relaxed text-base mb-6">
            Aagan Sewa is a digital platform designed to simplify how people
            access local government services. Whether it's municipality updates,
            ward-level services, or district information, everything is now
            accessible in one place—fast, reliable, and user-friendly.
          </p>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B35" }} />
              <span className="text-gray-700">Quick access to local services</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B35" }} />
              <span className="text-gray-700">Connect with nearby branches instantly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B35" }} />
              <span className="text-gray-700">Reliable and transparent service delivery</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white group"
            style={{ backgroundColor: "#FF6B35" }}
          >
            Explore Services
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Aagan Sewa"
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />

          {/* Orange Glow Effect */}
          <div
            className="absolute -bottom-8 -right-8 w-48 h-48 blur-3xl rounded-full"
            style={{ backgroundColor: "rgba(255, 107, 53, 0.2)" }}
          />

          {/* Navy Blue Accent Card */}
          
        </div>
      </div>
    </section>
  );
};

export default AboutAaganSewa;