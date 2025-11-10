import React from "react";

function Jumbotron() {
  const heroBackgroundStyle = {
    backgroundColor: "#121212", 
    backgroundImage: `radial-gradient(at 0% 0%, rgba(20, 10, 0, 0.4) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(10, 10, 10, 0.9) 0%, transparent 70%)`,
  };

  return (
    <section 
      className="min-h-fit flex items-center justify-center text-white py-20 pt-28 sm:pt-20 relative overflow-hidden" 
      style={heroBackgroundStyle}
    >
      
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-8 text-center max-w-7xl">
        
        {/* Konten Teks Hero */}
        <div className="mx-auto md:max-w-4xl"> 
          
          {/* Main Heading*/}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-8">
            Automate Your Business, Elevate Your Efficiency with Our
            <span className="text-orange-600"> Tectnooz Solution</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Boost productivity and eliminate repetitive tasks with our advanced
            Robotic Process Automation (RPA) solutions. Streamline operations,
            reduce errors, and focus on growing your business.
          </p>

          {/* Action Button - w-full di mobile, sm:w-auto di desktop */}
          <div className="flex justify-center mb-10">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-orange-700/50 transition duration-300 w-full sm:w-auto"
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