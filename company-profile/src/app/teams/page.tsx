// src/app/teams/page.tsx

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Tipe data untuk anggota tim (setelah kita modifikasi)
interface TeamMember {
  id: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
  // Properti kustom yang akan kita tambahkan
  role: string;
  bio: string;
}

// Data dummy untuk Role dan Bio (karena API tidak menyediakannya)
const dummyRoles = [
  "Lead Automation Engineer",
  "AI/ML Specialist",
  "Senior RPA Developer",
  "Cloud Solutions Architect",
  "Project Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Business Analyst",
  "DevOps Engineer",
  "Data Scientist",
  "Security Specialist",
  "Client Success Manager",
];

const dummyBios = [
  "Passionate about optimizing workflows and building scalable automation solutions.",
  "Expert in machine learning models and intelligent document processing.",
  "Specializes in UiPath and Blue Prism, turning complex processes into simple bots.",
  "Certified AWS and Azure architect, ensuring our solutions are cloud-native and robust.",
  "Agile practitioner dedicated to delivering projects on time and on budget.",
  "Crafting intuitive and user-friendly interfaces for our automation platforms.",
  "Ensuring bug-free and reliable bot deployment through rigorous testing.",
  "Bridging the gap between business needs and technical implementation.",
  "Manages our CI/CD pipelines and ensures 99.9% uptime for managed services.",
  "Extracting valuable insights from process data to identify new automation opportunities.",
  "Guarding client data and ensuring all bots comply with security standards.",
  "Dedicated to ensuring our clients achieve their desired ROI and success.",
];

// Fungsi untuk mengambil dan memproses data tim
async function getTeamData() {
  try {
    const res = await fetch('https://randomuser.me/api/?results=12&nat=us,gb');
    if (!res.ok) {
      throw new Error('Failed to fetch team data');
    }
    const data = await res.json();
    
    // Menggabungkan data API dengan data dummy
    const processedTeam: TeamMember[] = data.results.map((user: any, index: number) => ({
      id: user.login.uuid,
      name: user.name,
      picture: user.picture,
      email: user.email,
      // Menambahkan data dummy
      role: dummyRoles[index % dummyRoles.length],
      bio: dummyBios[index % dummyBios.length],
    }));
    
    return processedTeam;
  } catch (error) {
    console.error(error);
    return []; // Mengembalikan array kosong jika terjadi error
  }
}


// Komponen Halaman (Async Server Component)
export default async function TeamsPage() {
  
  // Mengambil data saat server me-render halaman
  const teamMembers = await getTeamData();

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Wrapper pt-20 untuk memberi ruang di bawah Navbar fixed */}
      <main className="pt-20">
        
        {/* --- Hero Section --- */}
        <section className="bg-gray-800 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Meet Our <span className="text-orange-600">Experts</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              We are a team of passionate engineers, designers, and strategists dedicated to building the future of automation.
            </p>
          </div>
        </section>

        {/* --- Team Grid Section --- */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Grid Responsif */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden text-center
                               transform transition duration-300 hover:scale-105 hover:shadow-orange-700/50"
                  >
                    {/* Gambar */}
                    <div className="pt-6">
                      <Image 
                        src={member.picture.large} 
                        alt={`${member.name.first} ${member.name.last}`}
                        width={128} // w-32
                        height={128} // h-32
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500"
                      />
                    </div>
                    
                    {/* Konten Teks */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">
                        {member.name.first} {member.name.last}
                      </h3>
                      <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mt-1">
                        {member.role}
                      </p>
                      <p className="text-gray-400 text-sm mt-3">
                        {member.bio}
                      </p>
                      {/* Opsional: Tampilkan email sebagai "bio" jika ingin data asli */}
                      {/* <p className="text-gray-400 text-sm mt-3 break-words">{member.email}</p> */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  Could not load team members at this time.
                </p>
              )}

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}