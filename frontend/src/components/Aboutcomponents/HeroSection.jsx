import React from "react";
const AboutHero = () => {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center text-white overflow-hidden">
      
      {/* Background Image - Full cover image behind all content */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-4b46a572b786')",
        }}
      />

      {/* Gradient Overlay - Blue transparent layer over background image */}
      <div className="absolute inset-0 bg-secondary-blue/70"></div>

      {/* Main Content - Centered text and buttons */}
      <div className="relative z-10 max-w-5xl px-6 text-center">

        {/* Badge - Small label shown above the title */}
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm tracking-wide border border-white/20">
          Trusted Service Platform
        </div>

        {/* Title - Main heading with brand name */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          About <span className="text-primary-orange">Aagan Sewa</span>
        </h1>

        {/* Tagline - Short description below title */}
        <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
          Connecting citizens with local services across every district.
        </p>

        {/* Description - Detailed info about the platform */}
        <p className="mt-4 text-indigo-200 max-w-2xl mx-auto leading-relaxed">
          Aagan Sewa simplifies access to essential services by connecting users
          directly with nearby branches. Send your request, and our local
          managers ensure quick and reliable service delivery.
        </p>

        {/* Buttons - Call to action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-secondary-blue text-white font-semibold shadow hover:bg-blue-950 transition">
            Explore Services
          </button>
          <button className="px-6 py-3 border border-white/40 bg-orange-600 hover:bg-orange-700 transition">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;