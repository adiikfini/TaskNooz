import React from 'react';

const testimonialsData = [
  {
    quote: "Teknoz has revolutionized our workflow. Their RPA solutions are incredibly efficient, saving us countless hours and significantly reducing errors. A truly transformative partner!",
    author: "Sarah Chen",
    title: "Operations Director, Global Logistics Inc.",
    ratingElement: "⭐️⭐️⭐️⭐️⭐️",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "The team at Teknoz is exceptional. They understood our complex needs perfectly and delivered a tailored automation solution that exceeded our expectations. Highly recommend!",
    author: "David Lee",
    title: "CFO, FinTech Innovations",
    ratingElement: "⭐️⭐️⭐️⭐️⭐️",
  },
  {
    quote: "Their customer support is outstanding. Teknoz not only provides cutting-edge technology but also ensures we're fully supported throughout the integration process. A true partner in success.",
    author: "Maria Garcia",
    title: "HR Manager, Tech Solutions Ltd.",
    ratingElement: "⭐️⭐️⭐️⭐️",
    avatar: "https://i.pravatar.cc/150?img=13"
  },
];

function Testimonials() {

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
           What our <span className="text-orange-600">Clients Say</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Hear directly from those who have experienced our automation impact.
          </p>
        </div>

        {/* Grid Testimoni (Responsif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-orange-500 transition-colors duration-300 flex flex-col h-full"
            >
              {/* Rating Bintang (Menggunakan data dummy) */}
              <div className="flex justify-center mb-4 text-2xl">
                {testimonial.ratingElement}
              </div>

              {/* Kutipan */}
              <p className="italic text-gray-300 text-lg mb-6 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Avatar & Info Klien */}
              <div className="flex items-center justify-center mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials