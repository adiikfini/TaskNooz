// src/app/about/components/AboutHero.tsx

import React from 'react';

function AboutHero() {
  return (
    <section 
      className="relative flex items-center justify-center text-white text-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/tangan.jpg')" }} // <-- Ganti dengan path gambar Anda
    >
      {/* Overlay Gelap - Opacity ditingkatkan menjadi 80 */}
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      
      {/* Konten (Judul & Teks) */}
      {/* - Menggunakan min-h-[60vh] agar section bisa Tumbuh jika konten lebih tinggi
        - py-20 untuk padding vertikal internal
        - px-6 untuk padding horizontal mobile yang lebih baik
        - flex flex-col justify-center untuk memusatkan konten secara vertikal
      */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-20 min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center">
        
        {/* Ukuran font judul dikecilkan di mobile (text-3xl) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-orange-500">Teknoz</span>
        </h1>
        
        {/* Ukuran font paragraf dikecilkan di mobile (text-sm) */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-4 max-w-3xl mx-auto">
          <strong className="text-white">PT Tectnooz Cipta Teknologi</strong> is an IT consulting, outsourcing company, and automation services provider. We deliver IT solutions to any business on a global scale by providing IT experts and scrum teams with flexible arrangements to help our clients adapt to the digital world. We have over 900+ dedicated IT talents and continuously source.
        </p>
        
        <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl mx-auto">
          We are building future leaders by educating young individuals in developing their skills and becoming professionals to meet the current demand in their respective industries in this era of technology through classes, trainings, and events.
        </p>
      </div>
    </section>
  );
}

export default AboutHero;