// src/components/Services.jsx
import React from "react";

// Dummy services data
const services = [
  {
    id: 1,
    title: "House Cleaning",
    description: "Professional home and apartment cleaning service.",
    icon: "🧹",
  },
  {
    id: 2,
    title: "Plumbing",
    description: "Leak fixing, pipe installation & maintenance.",
    icon: "🚰",
  },
  {
    id: 3,
    title: "Electrician",
    description: "Wiring, lighting & electrical repair services.",
    icon: "💡",
  },
  {
    id: 4,
    title: "AC Repair",
    description: "AC servicing, repair and installation.",
    icon: "❄️",
  },
  {
    id: 5,
    title: "Carpentry",
    description: "Furniture repair and custom wood work.",
    icon: "🪚",
  },
  {
    id: 6,
    title: "Painting",
    description: "Interior & exterior house painting service.",
    icon: "🎨",
  },
];

const Services = () => {
    
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-600 mb-12">
          Professional services at your doorstep
        </p>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100 mb-4">
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>

              {/* Service Description */}
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
