import React from "react";

function Jumbotron() {
  const heroBackgroundStyle = {
    backgroundColor: "#121212",
    backgroundImage: `radial-gradient(at 0% 0%, rgba(20, 10, 0, 0.4) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(10, 10, 10, 0.9) 0%, transparent 70%)`,
  };

  return (
    <section
      className="relative flex min-h-fit items-center justify-center overflow-hidden py-20 pt-28 text-white sm:pt-20"
      style={heroBackgroundStyle}
    >
      <div className="mx-auto w-full max-w-7xl px-6 text-center sm:px-10 lg:px-8">
        {/* Konten Teks Hero */}
        <div className="mx-auto md:max-w-4xl">
          {/* Main Heading*/}
          <h1 className="mb-8 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-6xl">
            Automate Your Business, Elevate Your Efficiency with Our
            <span className="text-orange-600"> Tectnooz Solution</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-base text-gray-400 sm:text-lg">
            Boost productivity and eliminate repetitive tasks with our advanced
            Robotic Process Automation (RPA) solutions. Streamline operations,
            reduce errors, and focus on growing your business.
          </p>

          {/* Action Button - w-full di mobile, sm:w-auto di desktop */}
          <div className="mb-10 flex justify-center">
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-700/50 transition duration-300 hover:bg-orange-700 sm:w-auto"
            >
              Discover RPA Services →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Jumbotron;
