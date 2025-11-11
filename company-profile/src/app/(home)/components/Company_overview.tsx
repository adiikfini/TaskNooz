import React from "react";

function Company_overview() {
  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Konten dibagi menjadi 2 kolom (Gambar & Teks) */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
          {/* KOLOM KIRI: GAMBAR DENGAN AKSEN ORANYE */}
          <div className="relative mb-10 flex w-full justify-center md:mb-0 md:w-1/2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Gambar Utama (relative z-10) */}
              <div className="relative z-10 w-full overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/meeting.jpg"
                  alt="Business team celebrating"
                  className="h-auto max-h-[400px] w-full object-cover"
                />
              </div>
              {/* Aksen Oranye di belakang gambar */}
              <div className="absolute top-0 left-0 z-0 h-full w-full translate-x-3 translate-y-3 transform rounded-xl bg-orange-600"></div>
            </div>
          </div>

          {/* Kolom Kanan: Teks Overview */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-6 text-4xl font-extrabold text-white">
              Company <span className="text-orange-600">Overview</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-200">
              <p>
                <strong className="text-xl text-white">
                  RPA Tech Solutions
                </strong>{" "}
                is a
                <span className="font-semibold text-orange-400">
                  {" "}
                  Robotic Process Automation (RPA){" "}
                </span>{" "}
                solution provider that helps businesses transform digitally
                through intelligent workflow automation. We combine technologies
                like
                <em className="text-orange-500"> AI</em>,
                <em className="text-orange-500"> machine learning</em>, and
                <em className="text-orange-500"> automation</em> to reduce
                manual work, improve accuracy, and accelerate productivity.
              </p>
              <p>
                With experience in various industries ranging from finance,
                logistics, manufacturing, to public services, we help clients
                build efficient, secure, and scalable digital workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Team, Mission & Vision (Tidak ada perubahan di sini) */}
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <h3 className="mb-10 py-5 text-center text-4xl font-extrabold text-white">
          Team & Culture
        </h3>
        <div className="mb-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg border border-orange-600/30 bg-gray-800/50 p-4 shadow-lg">
            <img
              src="/deal.png"
              alt="Partnership Icon"
              className="mx-auto mb-3 h-14 w-14 rounded-md border border-orange-400 bg-gray-200 object-cover"
            />
            <h4 className="mb-1 text-lg font-bold text-orange-400">
              Collaboration
            </h4>
            <p className="text-sm text-gray-400">
              We believe that the best ideas come from solid teamwork and open
              communication.
            </p>
          </div>
          <div className="rounded-lg border border-orange-600/30 bg-gray-800/50 p-4 shadow-lg">
            <img
              src="/enthusiasm.png"
              alt="Partnership Icon"
              className="mx-auto mb-3 h-14 w-14 rounded-md border border-orange-400 bg-gray-200 object-cover"
            />
            <h4 className="mb-1 text-lg font-bold text-orange-400">
              Innovation
            </h4>
            <p className="text-sm text-gray-400">
              We are always experimenting with the latest technology to provide
              cutting-edge solutions.
            </p>
          </div>
          <div className="rounded-lg border border-orange-600/30 bg-gray-800/50 p-4 shadow-lg">
            <img
              src="/idea.png"
              alt="Partnership Icon"
              className="mx-auto mb-3 h-14 w-14 rounded-md border border-orange-400 bg-gray-200 object-cover"
            />
            <h4 className="mb-1 text-lg font-bold text-orange-400">
              Growth Mindset
            </h4>
            <p className="text-sm text-gray-400">
              Every challenge is an opportunity to grow and learn new things.
            </p>
          </div>
        </div>
        <blockquote className="mx-auto mt-12 mb-10 max-w-2xl border-l-4 border-orange-600 pl-4 text-center text-gray-400 italic">
          “We don't just build automated systems, we help businesses evolve.”
        </blockquote>
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-gray-700 pt-10 text-center md:grid-cols-2">
          <div className="rounded-lg bg-gray-800/50 p-4">
            <h4 className="mb-3 border-b border-orange-500/50 pb-2 text-2xl font-bold text-orange-500">
              Mission
            </h4>
            <p className="text-gray-300">
              Improving global business efficiency through intelligent
              automation and human-centered digital technology.
            </p>
          </div>
          <div className="rounded-lg bg-gray-800/50 p-4">
            <h4 className="mb-3 border-b border-orange-500/50 pb-2 text-2xl font-bold text-orange-500">
              Vision
            </h4>
            <p className="text-gray-300">
              Becoming the leading partner for digital transformation in
              Southeast Asia through innovative, secure, and easy-to-adopt RPA
              solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Company_overview;
