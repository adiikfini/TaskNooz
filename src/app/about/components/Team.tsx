import React from "react";

const teamMembers = [
  {
    name: "Arifa Tan",
    role: "Commissioner",
    bio: "Guides our strategic vision with decades of industry expertise.",
    imageUrl: "/arifa-tan.jpeg", 
  },
  {
    name: "Ferdinand Prasetyo",
    role: "Chief Executive Officer (CEO)",
    bio: "Leads the company's mission to revolutionize business automation.",
    imageUrl: "/ferdinand.jpeg",
  },
  {
    name: "Kartika Sari",
    role: "Chief Operating Officer (COO)",
    bio: "Ensures operational excellence and seamless client delivery.",
    imageUrl: "/kartika.jpeg",
  },
  {
    name: "Erwin Hardijanto",
    role: "Chief Growth Officer (CGO)",
    bio: "Drives our market expansion and builds lasting client partnerships.",
    imageUrl: "/erwin.jpg",
  },
  {
    name: "Dyah Prastiti",
    role: "Chief Commercial Officer (CCO)",
    bio: "Aligns our innovative solutions with the commercial needs of our clients.",
    imageUrl: "/dummy2.jpg",
  },
  {
    name: "Muhammad Miqdam",
    role: "Chief Finance Officer (CFO)",
    bio: "Manages our financial strategy to ensure sustainable, long-term growth.",
    imageUrl: "/dummy1.jpg",
  },
];
// ------------------------

function Team() {
  return (
    <section className="bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- Judul Section --- */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Meet Our <span className="text-orange-600">Team</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            The experts driving our mission forward.
          </p>
        </div>

        {/* --- Grid Profil Tim --- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="transform overflow-hidden rounded-lg bg-gray-800 text-center shadow-xl transition duration-300 hover:scale-105 hover:shadow-orange-700/50"
            >
              {/* Gambar */}
              <div className="bg-gray-700">
                {" "}
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-80 w-full object-cover object-top" 
                />
              </div>

              {/* Konten Teks */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold tracking-wider text-orange-500 uppercase">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
