import React from "react";

// Komponen Utama
function VisionMission() {
  return (
    <>
      {/* === SECTION 1: OUR VISION === */}
      {/* Padding dikecilkan di mobile (py-16) */}
      <section className="overflow-hidden bg-gray-900 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
            {/* --- Kolom Gambar (Kiri di Desktop) --- */}
            <div className="flex w-full justify-center md:w-1/2">
              {/* Ukuran max-w-sm (384px) lebih baik untuk mobile */}
              <div className="relative w-full max-w-sm">
                <div className="relative z-10 w-full overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src="/diskusi1.jpg"
                    alt="Our Vision Team"
                    className="h-auto max-h-[350px] w-full object-cover"
                  />
                </div>
                {/* Offset aksen dikecilkan*/}
                <div className="absolute top-0 left-0 -z-0 h-full w-full translate-x-2 translate-y-2 transform rounded-xl bg-orange-600"></div>
              </div>
            </div>

            {/* --- Kolom Teks */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              {/* Ukuran font dikecilkan di mobile (text-3xl) */}
              <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Our <span className="text-orange-600">Vision</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-400">
                We aspire to see a digital-ready generation that innovates and
                leads smart businesses across Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: OUR MISSION === */}
      <section className="overflow-hidden bg-gray-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 md:flex-row-reverse md:gap-16">
            {/* --- Kolom Gambar */}
            <div className="flex w-full justify-center md:w-1/2">
              {/* Ukuran max-w-sm (384px) */}
              <div className="relative w-full max-w-sm">
                <div className="relative z-10 w-full overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src="/diskusi2.jpg"
                    alt="Our Mission Team"
                    className="h-auto max-h-[350px] w-full object-cover"
                  />
                </div>
                {/* Offset aksen dikecilkan  */}
                <div className="absolute top-0 left-0 -z-0 h-full w-full translate-x-2 translate-y-2 transform rounded-xl bg-orange-600"></div>
              </div>
            </div>

            {/* --- Kolom Teks  --- */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Our <span className="text-orange-600">Mission</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-400">
                To Build, Accelerate, Support, and Empower every organization
                business transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VisionMission;
