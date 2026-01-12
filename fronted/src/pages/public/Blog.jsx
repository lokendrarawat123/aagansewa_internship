import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Agan Sewa Blog</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Latest updates, notices, and information about public and government
            services
          </p>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "How to Access Services from Agan Sewa Branch",
                date: "Jan 10, 2026",
                desc: "A step-by-step guide to finding and using services available at your nearest Agan Sewa branch.",
              },
              {
                title: "Required Documents for Citizenship Services",
                date: "Dec 28, 2025",
                desc: "Learn about the essential documents needed when applying for citizenship-related services.",
              },
              {
                title: "Digital Transformation of Public Services",
                date: "Dec 15, 2025",
                desc: "How digital platforms like Agan Sewa are making public services faster and more transparent.",
              },
            ].map((blog, index) => (
              <div
                key={index}
                className="bg-white border rounded-2xl p-6 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600">
                  {blog.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Calendar size={16} />
                  <span>{blog.date}</span>
                </div>

                <p className="mt-4 text-gray-600">{blog.desc}</p>

                <button className="mt-6 flex items-center gap-2 text-indigo-600 font-semibold hover:underline">
                  Read More <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Stay informed about service updates and public notices through Agan
            Sewa.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
