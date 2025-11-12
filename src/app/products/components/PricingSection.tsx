// src/app/(home)/components/PricingSection.tsx

import React from 'react';

// Helper kecil untuk ikon centang oranye
const CheckIcon = () => (
  <svg className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

// Helper kecil untuk pola titik
const DotPattern = () => (
  <div className="absolute top-8 right-8 z-0 hidden md:block">
    <div className="grid grid-cols-4 gap-1.5 w-16">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-20"></div>
      ))}
    </div>
  </div>
);

// Data (Tetap sama)
const pricingPlans = [
  {
    name: "Personal", price: "$59", duration: "/ year",
    description: "Perfect for using in a personal website or a client project.",
    features: ["2 team members", "20GB cloud storage", "Basic analytics", "Email support", "1 project"],
    isHighlighted: false, buttonText: "Choose Personal"
  },
  {
    name: "Professional", price: "$199", duration: "/ year",
    description: "Perfect for using in a personal website or a client project.",
    features: ["10 team members", "100GB cloud storage", "Advanced analytics", "Priority email support", "Unlimited projects", "API access", "Custom integration"],
    isHighlighted: true, buttonText: "Choose Professional"
  },
  {
    name: "Business", price: "$256", duration: "/ year",
    description: "Perfect for using in a personal website or a client project.",
    features: ["Unlimited team members", "500GB cloud storage", "Advanced analytics & reporting", "24/7 dedicated support", "Unlimited projects", "Full API access", "Custom integration", "SSO Authentication", "Dedicated account manager"],
    isHighlighted: false, buttonText: "Choose Business"
  },
];

function PricingSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Judul Section --- */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-2">
            PRICING
          </h2>
          <h3 className="text-4xl sm:text-5xl font-extrabold text-white">
            Our Pricing Plan
          </h3>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
          </p>
        </div>

        {/* --- Grid Kartu Harga (Responsif) --- */}
        {/* 1. HAPUS 'items-center' DARI SINI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`
                bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700
                relative overflow-hidden transition-transform duration-300
                ${plan.isHighlighted ? 'transform md:scale-110 border-orange-600 shadow-orange-700/30' : 'hover:scale-105'}
                h-full flex flex-col  /* <-- 2. TAMBAHKAN h-full flex flex-col */
              `}
            >
              <DotPattern />
              
              {/* 3. TAMBAHKAN h-full flex flex-col DI SINI */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Nama Paket */}
                <h4 className="text-lg font-semibold text-orange-500 uppercase mb-4">
                  {plan.name}
                </h4>

                {/* Harga */}
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="ml-1 text-lg text-gray-400">{plan.duration}</span>
                </div>
                
                {/* Deskripsi */}
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                {/* Garis Pemisah */}
                <hr className="border-gray-700 mb-6" />

                {/* 4. TAMBAHKAN flex-grow DI SINI */}
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Aksi (Otomatis terdorong ke bawah) */}
                <button 
                  className={`
                    w-full py-3 px-6 mt-8 rounded-lg font-semibold transition duration-300
                    ${plan.isHighlighted 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'}
                  `}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default PricingSection;