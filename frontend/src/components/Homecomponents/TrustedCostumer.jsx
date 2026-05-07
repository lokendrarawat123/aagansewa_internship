import React from "react";

const CustomerScroll = () => {
  const customers = [
    { name: "Ram Shrestha", img: "https://i.pravatar.cc/150?u=ram" },
    { name: "Sita Thapa", img: "https://i.pravatar.cc/150?u=sita" },
    { name: "Hari Pandey", img: "https://i.pravatar.cc/150?u=hari" },
    { name: "Gita Rai", img: "https://i.pravatar.cc/150?u=gita" },
    { name: "Anil Gurung", img: "https://i.pravatar.cc/150?u=anil" },
    { name: "Pratiksha KC", img: "https://i.pravatar.cc/150?u=pkc" },
    { name: "Suman Lama", img: "https://i.pravatar.cc/150?u=suman" },
    { name: "Nabina Sharma", img: "https://i.pravatar.cc/150?u=nabina" },
    { name: "Rohan Chaudhary", img: "https://i.pravatar.cc/150?u=rohan" },
    { name: "Ishwor Neupane", img: "https://i.pravatar.cc/150?u=ishwor" },
    { name: "Maya Tamang", img: "https://i.pravatar.cc/150?u=maya" },
    { name: "Suresh Magar", img: "https://i.pravatar.cc/150?u=suresh" },
    { name: "Deepa Joshi", img: "https://i.pravatar.cc/150?u=deepa" },
    { name: "Binod Acharya", img: "https://i.pravatar.cc/150?u=binod" },
    { name: "Kabita Yadav", img: "https://i.pravatar.cc/150?u=kabita" },
  ];

  // Seamless loop ko lagi array double garne
  const fullList = [...customers, ...customers];

  return (
    <div className="w-full py-16 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "#0a1628" }}>
          Our Trusted Customers
        </h2>
      </div>

      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10"
          style={{
            background: "linear-gradient(to right, #f8fafc, transparent)",
          }}
        />

        {/* Gradient Right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10"
          style={{
            background: "linear-gradient(to left, #f8fafc, transparent)",
          }}
        />

        {/* Scrolling Content */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            display: flex;
            animation: scroll 40s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="animate-scroll">
          {fullList.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center mx-6 min-w-[140px] transition-transform duration-300 hover:scale-110"
            >
              {/* Profile Image */}
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-3 shadow-lg mb-3 hover:shadow-xl transition-shadow"
                style={{ borderColor: "#FF6B35" }}
              >
                <img
                  src={customer.img}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name Below Profile */}
              <span className="text-gray-700 font-semibold text-sm text-center whitespace-nowrap">
                {customer.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
    </div>
  );
};

export default CustomerScroll;