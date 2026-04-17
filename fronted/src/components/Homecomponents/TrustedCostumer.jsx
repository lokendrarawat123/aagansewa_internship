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
    <div className="w-full bg-white py-12 overflow-hidden scroll-container">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
        Our Trusted Customers
      </h2>

      <div className="animate-scroll">
        {fullList.map((customer, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-6 min-w-[120px] transition-transform duration-300 hover:scale-110"
          >
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md mb-3">
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
  );
};

export default CustomerScroll;
