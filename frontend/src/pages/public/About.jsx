import React from "react";
import AboutHero from "../../components/Aboutcomponents/HeroSection";

const About = () => {
  const missionVisionData = [
    {
      type: "mission",
      title: "Our Mission",
      icon: "🎯",
      description:
        "To provide a unified digital platform where citizens can easily access branch-based government and public services with clarity and confidence.",
      highlights: [
        "Simplify service access",
        "Ensure transparency",
        "Build citizen trust",
      ],
    },
    {
      type: "vision",
      title: "Our Vision",
      icon: "🚀",
      description:
        "To become a trusted digital gateway for public services across all provinces, promoting transparency and efficiency.",
      highlights: [
        "National coverage",
        "Digital transformation",
        "Citizen empowerment",
      ],
    },
  ];

  const coreValues = [
    {
      name: "Transparency",
      icon: "👁️",
      description: "Open and clear communication in all operations",
    },
    {
      name: "Accessibility",
      icon: "🤝",
      description: "Services available to everyone, everywhere",
    },
    {
      name: "Efficiency",
      icon: "⚡",
      description: "Quick and streamlined service delivery",
    },
    {
      name: "Trust & Security",
      icon: "🔒",
      description: "Protected data and reliable service",
    },
  ];

  const keyFeatures = [
    {
      title: "Branch Network",
      description: "Connected branches across all districts",
      icon: "🏢",
    },
    {
      title: "24/7 Support",
      description: "Always available to assist you",
      icon: "💬",
    },
    {
      title: "Easy Interface",
      description: "Simple and intuitive user experience",
      icon: "📱",
    },
    {
      title: "Secure Platform",
      description: "Your data is protected and encrypted",
      icon: "🛡️",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* HERO SECTION */}
      <AboutHero />

      {/* MISSION & VISION SECTION */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
              Our Purpose
            </h2>
            <div className="w-20 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: "#FF6B35" }} />
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {missionVisionData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group"
                style={{ borderColor: "#FF6B35" }}
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "#FF6B35" }}
                  >
                    <span className="text-white text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-3xl font-bold" style={{ color: "#0a1628" }}>
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#FF6B35" }}
                      />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
              Our Core <span style={{ color: "#FF6B35" }}>Values</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              These principles guide everything we do at Aagan Sewa
            </p>
            <div className="w-20 h-1 rounded-full mx-auto mt-6" style={{ backgroundColor: "#FF6B35" }} />
          </div>

          {/* Values Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer hover:-translate-y-2"
                style={{ borderColor: "#FF6B35" }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform inline-block">
                  {value.icon}
                </div>
                <h4 className="font-bold text-xl mb-3" style={{ color: "#0a1628" }}>
                  {value.name}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#0a1628" }}>
              Why Choose <span style={{ color: "#FF6B35" }}>Aagan Sewa</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the best in service delivery
            </p>
            <div className="w-20 h-1 rounded-full mx-auto mt-6" style={{ backgroundColor: "#FF6B35" }} />
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4 inline-block">{feature.icon}</div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: "#0a1628" }}>
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0a1628" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Serving Citizens Through Digital Innovation
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover services available at your nearest Aagan Sewa branch.
            Connect with us today and experience seamless service delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-3 font-semibold text-base rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-white group"
              style={{ backgroundColor: "#FF6B35" }}
            >
              Explore Services
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
            </button>

            <button
              className="px-8 py-3 font-semibold text-base rounded-lg border-2 transition-all duration-300 hover:bg-white/10 text-white"
              style={{ borderColor: "#FF6B35" }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;