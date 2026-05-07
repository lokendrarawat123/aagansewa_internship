import React from "react";

// Updated testimonials for Aagan Sewa
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    image: "https://readymadeui.com/team-2.webp",
    review:
      "Aagan Sewa made finding local services so convenient. I got quick response from nearby branches and excellent service delivery.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "https://readymadeui.com/team-3.webp",
    review:
      "The platform is intuitive and user-friendly. I found the service I needed in just a few clicks. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    image: "https://readymadeui.com/team-4.webp",
    review:
      "Connected me with reliable local services across different districts. The experience was smooth and hassle-free.",
    rating: 5,
  },
  {
    id: 4,
    name: "Neha Singh",
    image: "https://readymadeui.com/team-5.webp",
    review:
      "Aagan Sewa is a game-changer! No more struggling to find trusted services. Everything is available on one platform.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Das",
    image: "https://readymadeui.com/team-6.webp",
    review:
      "Fast, reliable, and transparent service. The local managers ensure quality delivery. I use it regularly now.",
    rating: 5,
  },
  {
    id: 6,
    name: "Ananya Gupta",
    image: "https://readymadeui.com/team-1.webp",
    review:
      "Best platform for accessing local services! Aagan Sewa connects citizens seamlessly with service providers.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 !leading-tight">
          What Our Users Say
        </h2>
        <p className="text-[15px] mt-6 leading-relaxed text-slate-600">
          Thousands of satisfied citizens and service providers trust Aagan Sewa
          for connecting with local services. See what they have to say.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20 max-w-6xl max-lg:max-w-3xl max-md:max-w-md mx-auto">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="w-full p-8 rounded-lg mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-white relative"
          >
            {/* Image */}
            <div
              className="w-[80px] h-[80px] rounded-full overflow-hidden absolute right-0 left-0 mx-auto -top-10 border-4"
              style={{ borderColor: "#FF6B35" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stars */}
            <div className="flex justify-center space-x-1 mt-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  style={{ color: "#FF6B35" }}
                  viewBox="0 0 14 13"
                  fill="currentColor"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>

            {/* Review */}
            <div className="text-center">
              <p className="text-[15px] text-slate-700 leading-relaxed italic">
                "{item.review}"
              </p>
            </div>

            {/* Name */}
            <div className="mt-6 text-center">
              <h4 className="text-slate-900 text-[16px] font-semibold">
                {item.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;