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

      {/* Gradient Overlay - Navy blue with subtle orange accent */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(25, 45, 85, 0.6) 0%, rgba(25, 45, 85, 0.5) 60%, rgba(255, 107, 53, 0.2) 100%)"
        }}
      />

      {/* Main Content - Centered text and buttons */}
      <div className="relative z-10 max-w-5xl px-6 text-center">

        {/* Badge - Small label shown above the title */}
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm tracking-wide border border-white/20 animate-fade-in">
          Trusted Service Platform
        </div>

        {/* Title - Main heading with brand name */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight animate-fade-in">
          About <span style={{ color: "#FF6B35" }}>Aagan Sewa</span>
        </h1>

        {/* Tagline - Short description below title */}
        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto animate-fade-in">
          Connecting citizens with local services across every district.
        </p>

        {/* Description - Detailed info about the platform */}
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto leading-relaxed text-base md:text-lg animate-fade-in">
          Aagan Sewa simplifies access to essential services by connecting users
          directly with nearby branches. Send your request, and our local
          managers ensure quick and reliable service delivery.
        </p>

        {/* Buttons - Call to action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button - Orange */}
          <button
            className="px-8 py-3 font-semibold text-base rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-white group"
            style={{ backgroundColor: "#FF6B35" }}
          >
            Explore Services
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </button>

          {/* Secondary Button - Outline */}
          <button
            className="px-8 py-3 font-semibold text-base rounded-lg transition-all duration-300 border-2 hover:bg-white/5 hover:-translate-y-1"
            style={{ borderColor: "#FF6B35", color: "#FF6B35" }}
          >
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;