// src/app/about/components/Culture.tsx

import React from 'react'

const values = [
  {
    icon: "🚀",
    title: "Innovation at the Core",
    description: "We don't just use the latest tech; we build it. We foster a culture of experimentation, challenging the status quo to deliver cutting-edge automation solutions that drive real-world results."
  },
  {
    icon: "🤝",
    title: "Radical Collaboration",
    description: "Silos don't exist here. We believe the best ideas are born from diverse perspectives working in unison. We practice open communication, both internally and with our clients, as a single, unified team."
  },
  {
    icon: "💡",
    title: "Relentless Growth",
    description: "Every challenge is a stepping stone. We are a team of lifelong learners who embrace ambiguity and adapt quickly. We believe that personal and professional growth is not optional—it's essential to our success."
  },
  {
    icon: "🎯",
    title: "Own the Outcome",
    description: "We take full responsibility for our work, from the initial concept to the final implementation. We are accountable for the results we deliver to our clients, ensuring reliability and trust at every step."
  },
];

function Culture() {
  return (
    <section className="py-20 bg-gray-800"> {/* Warna latar berbeda untuk kontras */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Our Culture & <span className="text-orange-600">Values</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            This is what drives us every single day.
          </p>
        </div>

        {/* Grid Kartu Nilai (Responsif):
          - 1 kolom di mobile (default)
          - 2 kolom di tablet (md)
          - 4 kolom di desktop (lg)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-gray-900 p-8 rounded-xl shadow-lg border-l-4 border-orange-500 transition-transform transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Culture