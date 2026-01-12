const Services = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Agan Sewa Services</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Explore public and government services available across different
            Agan Sewa branches.
          </p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm grid gap-4 md:grid-cols-4">
            <select className="border rounded-lg px-4 py-2">
              <option>Select Province</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option>Select District</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option>Select Branch</option>
            </select>
            <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
              Find Services
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center">Available Services</h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Citizenship Services",
              "Birth Registration",
              "Passport Application",
              "Business Registration",
              "Tax Related Services",
              "Social Security Allowance",
              "Land Record Services",
              "Driving License Assistance",
            ].map((service, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-indigo-600">{service}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Available in selected branches
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Service availability may vary depending on province, district, and
            branch. Please select your location to view accurate services.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Need Help Finding a Service?</h2>
          <button className="mt-6 px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
