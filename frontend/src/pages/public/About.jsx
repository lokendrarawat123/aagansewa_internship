import AboutHero from "../../components/Aboutcomponents/HeroSection";
import AboutAaganSewa from "../../components/Servicecomponents/Intro";
import Intro from "../../components/Servicecomponents/Intro";

const About = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <AboutHero />

     

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
