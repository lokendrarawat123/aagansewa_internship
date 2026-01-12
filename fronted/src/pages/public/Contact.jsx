import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Agan Sewa</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Need help or have questions? Reach out to us and we’ll assist you as
            soon as possible.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* CONTACT INFO */}
          <div>
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="mt-4 text-gray-600">
              You can contact Agan Sewa through the following channels. For
              branch-specific services, please contact your nearest branch.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Office Address</p>
                  <p className="text-gray-600">
                    Agan Sewa Head Office, Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+977-01-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-indigo-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">support@agansewa.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg">
            For service availability, please visit your nearest Agan Sewa
            branch.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
