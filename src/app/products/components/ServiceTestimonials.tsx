// src/app/products/components/ServiceTestimonials.tsx
"use client"; // Diperlukan karena Swiper adalah komponen interaktif

import React from 'react';

// Impor Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Impor modul Swiper yang diperlukan (Navigasi & Paginasi)
import { Navigation, Pagination } from 'swiper/modules';

// Impor CSS dasar Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Data testimoni Anda (tidak berubah)
const testimonials = [
  {
    quote: "Teknoz's RPA implementation reduced our invoice processing time by 70%. The ROI was achieved in just 6 months. Truly a game-changer for our finance department.",
    author: "Budi Santoso",
    role: "Finance Director, PT Mega Logistik",
    service: "RPA Implementation"
  },
  {
    quote: "Their IDP solution is incredibly accurate. We now process thousands of unstructured customer forms daily with minimal human intervention, drastically reducing errors.",
    author: "Siti Aminah",
    role: "Head of Operations, Bank Digital Sejahtera",
    service: "Intelligent Document Processing"
  },
  {
    quote: "The automation consultancy helped us identify hidden bottlenecks. Their roadmap was clear, actionable, and has already saved us over $100k in operational costs this quarter.",
    author: "Michael Chen",
    role: "CTO, Future Retail Group",
    service: "Automation Consultancy"
  },
  {
    quote: "We needed specialized IT talent fast. Teknoz provided a scrum team within weeks that integrated perfectly with our in-house developers. Highly professional and skilled.",
    author: "Sarah Johnson",
    role: "VP of Engineering, TechStream Inc.",
    service: "IT Outsourcing"
  },
  {
    quote: "Their training program empowered our internal team to build their own simple bots. It fostered a culture of innovation we didn't have before.",
    author: "David Wijaya",
    role: "HR Director, Nusantara Manufacturing",
    service: "Training & Enablement"
  }
];

function ServiceTestimonials() {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our solutions have delivered real-world impact for businesses across Asia.
          </p>
        </div>

        {/* --- CAROUSEL SWIPER DIMULAI --- */}
        <Swiper
          // Instal modul Navigasi (panah) dan Paginasi (titik)
          modules={[Navigation, Pagination]}
          
          // Tampilkan panah navigasi
          navigation={true}
          
          // Tampilkan titik paginasi (dan bisa diklik)
          pagination={{ clickable: true }}
          
          // Jarak antar slide
          spaceBetween={30}
          
          // --- Kunci Responsivitas ---
          // Default (Mobile): 1 slide
          slidesPerView={1}
          
          // Breakpoints untuk layar lebih besar
          breakpoints={{
            // Tablet (640px ke atas): 2 slide
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Desktop (1024px ke atas): 3 slide
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-16" // Beri padding bawah untuk ruang titik paginasi
        >
          {testimonials.map((item, index) => (
            // Setiap kartu sekarang adalah SwiperSlide
            <SwiperSlide key={index} className="h-full">
              
              {/* Ini adalah kartu Anda, tambahkan h-full agar tingginya sama */}
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col relative hover:border-orange-500 transition-colors duration-300">
                
                <span className="absolute top-6 left-6 text-7xl text-orange-600 opacity-10 leading-none font-serif">
                  “
                </span>
                
                <p className="text-lg text-gray-300 italic mb-8 relative z-10 leading-relaxed flex-grow">
                  "{item.quote}"
                </p>
                
                <div className="border-t border-gray-700 pt-6 mt-auto">
                  <h4 className="font-bold text-white text-lg">{item.author}</h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                  <div className="mt-3 inline-block bg-orange-900/30 text-orange-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {item.service}
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* --- CAROUSEL SWIPER SELESAI --- */}

      </div>
    </section>
  );
}

export default ServiceTestimonials;