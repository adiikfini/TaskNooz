import React from "react";

function CoreServices() {
  const services = [
    {
      title: "RPA Strategy & Consulting",
      icon: (
        <img
          src="/compass.png"
          alt="Compass"
          className="h-8 w-8 object-contain"
        />
      ),
      description:
        "End-to-end process assessment, identification of high-value automation opportunities, and creation of a customized implementation roadmap for maximum ROI.",
    },
    {
      title: "Custom Bot Development",
      icon: (
        <img src="/robot.png" alt="Robot" className="h-8 w-8 object-contain" />
      ),
      description:
        "Design, development, and testing of tailored software bots to automate specific tasks, integrated seamlessly with your existing systems.",
    },
    {
      title: "Managed Automation Services",
      icon: (
        <img
          src="/settings.png"
          alt="Settings"
          className="h-8 w-8 object-contain"
        />
      ),
      description:
        "Full 24/7 management and maintenance services for deployed bots. We handle monitoring, troubleshooting, and routine updates for optimal performance.",
    },
  ];

  return (
    <section className="bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-sm font-semibold tracking-wider text-orange-600 uppercase">
            Service Pillars
          </h2>
          <h3 className="text-4xl font-extrabold text-white sm:text-5xl">
            Core <span className="text-orange-600">Intelligent Automation</span>{" "}
            Solutions
          </h3>
        </div>

        {/* Service Card Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="transform rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-xl transition duration-300 hover:scale-[1.02] hover:border-orange-600 hover:shadow-orange-700/50"
            >
              {/* Icon Container */}
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-600 bg-orange-600 p-3">
                {service.icon}
              </div>
              <h4 className="mb-3 text-2xl font-bold text-white">
                {service.title}
              </h4>
              <p className="text-gray-400">{service.description}</p>
              <a
                href="#"
                className="mt-6 inline-flex items-center font-semibold text-orange-500 transition duration-150 hover:text-orange-400"
              >
                Learn More
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreServices;
