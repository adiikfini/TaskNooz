import React from 'react';

const CheckIcon = () => (
  <svg className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

type IconBoxProps = {
  icon: React.ReactNode;
  className?: string;
};
const IconBox = ({ icon, className = "" }: IconBoxProps) => (
  <div className={`
    w-full md:w-1/2 flex justify-center 
    ${className}
  `}>
    <div className="relative w-full max-w-xs flex items-center justify-center">
      <span className="text-9xl p-8 bg-gray-200 rounded-xl shadow-lg border border-gray-700">
        {icon}
      </span>
    </div>
  </div>
);

// Daftar Fitur untuk setiap layanan
const rpaFeatures = [
  "Process Assessment",
  "Custom Bot Development",
  "Integration with Legacy Systems",
  "24/7 Monitoring & Support"
];
const idpFeatures = [
  "AI-Powered OCR",
  "Automated Data Extraction",
  "Seamless ERP Integration",
  "High Accuracy Rates"
];
const consultancyFeatures = [
  "Strategic Roadmap",
  "CoE Setup Guidelines",
  "Developer & User Training",
  "Change Management"
];

function ServiceDetails() {
  return (
    <>
      {/* === SECTION 1: RPA IMPLEMENTATION === */}
      <section className="py-16 md:py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            <IconBox icon={<img src="/robot.png" alt="RPA Icon" className="w-40 h-40" />} />

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                RPA <span className="text-orange-600">Implementation</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                End-to-end Robotic Process Automation services, from strategy and assessment to development, deployment, and maintenance. We build custom bots that automate your repetitive tasks with precision.
              </p>
              
              <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Key Features</h4>
              <ul className="space-y-3">
                {rpaFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300 justify-center md:justify-start">
                    <CheckIcon /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION 2: INTELLIGENT DOCUMENT PROCESSING === */}
      <section className="py-16 md:py-20 bg-gray-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* md:flex-row-reverse untuk layout bergantian */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            
            {/* Beri background kontras untuk icon box */}
            <IconBox icon={<img src="/audit.png" alt="Audit Icon" className="w-40 h-40" />} />

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Intelligent Document <span className="text-orange-600">Processing (IDP)</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Extract data from unstructured documents (invoices, contracts, emails) using AI-powered OCR and machine learning models, turning raw data into actionable insights instantly.
              </p>
              
              <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Key Features</h4>
              <ul className="space-y-3">
                {idpFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300 justify-center md:justify-start">
                    <CheckIcon /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION 3: AUTOMATION CONSULTANCY & TRAINING === */}
      <section className="py-16 md:py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            <IconBox icon={<img src="/enthusiasm.png" alt="Enthusiasm Icon" className="w-40 h-40" />} />

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Automation Consultancy <span className="text-orange-600">& Training</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Empower your team with the knowledge and skills to manage automation internally. We provide strategic consulting and comprehensive training programs to build your in-house Center of Excellence (CoE).
              </p>
              
              <h4 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">Key Features</h4>
              <ul className="space-y-3">
                {consultancyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-300 justify-center md:justify-start">
                    <CheckIcon /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;