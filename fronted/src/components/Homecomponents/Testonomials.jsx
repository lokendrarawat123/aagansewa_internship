import React from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://readymadeui.com/team-2.webp",
    review:
      "ReadymadeUI made it so easy to launch my website. The components are clean, fast to use, and saved me hours of development time.",
  },
  {
    id: 2,
    name: "Karolina Adair",
    image: "https://readymadeui.com/team-3.webp",
    review:
      "I love how professional everything looks with ReadymadeUI. The templates are modern, responsive, and easy to customize.",
  },
  {
    id: 3,
    name: "Simon Konecki",
    image: "https://readymadeui.com/team-4.webp",
    review:
      "ReadymadeUI gave my project a polished look without the hassle. The layouts are beautifully designed and ready to go.",
  },
  {
    id: 4,
    name: "Emily Chen",
    image: "https://readymadeui.com/team-5.webp",
    review:
      "Amazing quality and attention to detail! Every component is thoughtfully crafted, and it made my site look like it was built by a pro.",
  },
  {
    id: 5,
    name: "Marcus Rodriguez",
    image: "https://readymadeui.com/team-6.webp",
    review:
      "So many design options! ReadymadeUI has something for every use case, and it’s super easy to mix and match components.",
  },
  {
    id: 6,
    name: "Sarah Thompson",
    image: "https://readymadeui.com/team-1.webp",
    review:
      "As a repeat user, I’m always impressed by the updates and new layouts. ReadymadeUI just keeps getting better and better.",
  },
];

const Testimonials = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 !leading-tight">
          What our happy client say
        </h2>
        <p className="text-[15px] mt-6 leading-relaxed text-slate-600">
          See what our happy clients have to say. They’ve shared how our
          templates helped them launch quickly, look professional, and grow with
          ease.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20 max-w-6xl max-lg:max-w-3xl max-md:max-w-md mx-auto mt-24">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="w-full p-6 rounded-md mx-auto shadow-md border border-gray-200 bg-white relative"
          >
            {/* Image */}
            <div className="w-[76px] h-[76px] rounded-full overflow-hidden absolute right-0 left-0 mx-auto -top-10 border-2 border-purple-600">
              <img src={item.image} alt={item.name} className="w-full h-full" />
            </div>

            {/* Review */}
            <div className="mt-8 text-center">
              <p className="text-[15px] text-slate-700 leading-relaxed">
                {item.review}
              </p>
            </div>

            {/* Name */}
            <div className="mt-4 text-center">
              <h4 className="text-slate-900 text-[15px] font-semibold">
                {item.name}
              </h4>
            </div>

            {/* Stars */}
            <div className="flex justify-center space-x-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < 4 ? "fill-purple-600" : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
