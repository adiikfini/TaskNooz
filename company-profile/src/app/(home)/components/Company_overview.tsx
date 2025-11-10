import React from "react";

function Company_overview() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Konten dibagi menjadi 2 kolom (Gambar & Teks) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* KOLOM KIRI: GAMBAR DENGAN AKSEN ORANYE */}
          <div className="w-full md:w-1/2 flex justify-center relative mb-10 md:mb-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">            
              {/* Gambar Utama (relative z-10) */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl w-full">
                <img
                  src="/meeting.jpg" 
                  alt="Business team celebrating"
                  className="w-full h-auto object-cover max-h-[400px]" 
                />
              </div>
              {/* Aksen Oranye di belakang gambar */}
              <div className="absolute top-0 left-0 w-full h-full bg-orange-600 rounded-xl 
                                transform translate-x-3 translate-y-3 z-0"> 
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Teks Overview */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Company <span className="text-orange-600">Overview</span>
            </h2>
            <div className="space-y-6 text-gray-200 leading-relaxed text-lg"> 
              <p>
                <strong className="text-white text-xl">RPA Tech Solutions</strong>{" "} is a
                <span className="font-semibold text-orange-400"> Robotic Process Automation (RPA) </span>{" "}
                solution provider that helps businesses transform digitally through intelligent workflow automation. We combine technologies like
                <em className="text-orange-500"> AI</em>,
                <em className="text-orange-500"> machine learning</em>, and
                <em className="text-orange-500"> automation</em>
                {" "} to reduce manual work, improve accuracy, and accelerate productivity.
              </p>
              <p>
                With experience in various industries ranging from finance, logistics, manufacturing, to public services, we help clients build efficient, secure, and scalable digital workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bagian Bawah: Team, Mission & Vision (Tidak ada perubahan di sini) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"> 
        <h3 className="text-4xl py-5 font-extrabold text-center text-white mb-10">
          Team & Culture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center mb-12">
          <div className="p-4 rounded-lg bg-gray-800/50 shadow-lg border border-orange-600/30">
            <img src="/deal.png" alt="Partnership Icon" className="w-14 h-14 mb-3 mx-auto border border-orange-400 rounded-md bg-gray-200 object-cover" />
            <h4 className="text-lg font-bold text-orange-400 mb-1">Collaboration</h4>
            <p className="text-gray-400 text-sm">We believe that the best ideas come from solid teamwork and open communication.</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/50 shadow-lg border border-orange-600/30">
            <img src="/enthusiasm.png" alt="Partnership Icon" className="w-14 h-14 mb-3 mx-auto border border-orange-400 rounded-md bg-gray-200 object-cover" />
            <h4 className="text-lg font-bold text-orange-400 mb-1">Innovation</h4>
            <p className="text-gray-400 text-sm">We are always experimenting with the latest technology to provide cutting-edge solutions.</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/50 shadow-lg border border-orange-600/30">
            <img src="/idea.png" alt="Partnership Icon" className="w-14 h-14 mb-3 mx-auto border border-orange-400 rounded-md bg-gray-200 object-cover" />
            <h4 className="text-lg font-bold text-orange-400 mb-1">Growth Mindset</h4>
            <p className="text-gray-400 text-sm">Every challenge is an opportunity to grow and learn new things.</p>
          </div>
        </div>
        <blockquote className="border-l-4 border-orange-600 pl-4 italic text-gray-400 mt-12 mb-10 mx-auto max-w-2xl text-center">
          “We don't just build automated systems, we help businesses evolve.”
        </blockquote>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-700 pt-10 text-center">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-2xl font-bold text-orange-500 mb-3 border-b border-orange-500/50 pb-2">Mission</h4>
            <p className="text-gray-300">Improving global business efficiency through intelligent automation and human-centered digital technology.</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-2xl font-bold text-orange-500 mb-3 border-b border-orange-500/50 pb-2">Vision</h4>
            <p className="text-gray-300">Becoming the leading partner for digital transformation in Southeast Asia through innovative, secure, and easy-to-adopt RPA solutions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Company_overview;