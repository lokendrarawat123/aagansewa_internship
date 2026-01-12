const About = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Agan Sewa</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Agan Sewa is a digital platform designed to make government and
            public services accessible, transparent, and efficient for everyone.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <p className="mt-4 text-gray-600">
              Agan Sewa connects citizens with government and public services
              through a network of branches across different provinces and
              districts. Our goal is to reduce complexity, save time, and
              improve service delivery.
            </p>
            <p className="mt-4 text-gray-600">
              By using modern digital technology, we ensure that people can
              easily find the right service at the right branch.
            </p>
          </div>

          <div className="bg-indigo-100 rounded-2xl h-72 flex items-center justify-center text-indigo-600 font-semibold">
            Illustration / Image
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-600">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600">
              To provide a unified digital platform where citizens can easily
              access branch-based government and public services with clarity
              and confidence.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-600">
              Our Vision
            </h3>
            <p className="mt-4 text-gray-600">
              To become a trusted digital gateway for public services across all
              provinces, promoting transparency and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Our Core Values</h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              "Transparency",
              "Accessibility",
              "Efficiency",
              "Trust & Security",
            ].map((value, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 hover:shadow-md transition"
              >
                <p className="font-semibold text-indigo-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Serving Citizens Through Digital Innovation
          </h2>
          <p className="mt-4 text-indigo-100">
            Discover services available at your nearest Agan Sewa branch.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
