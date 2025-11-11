// src/app/blog/page.tsx
"use client"; // Ini adalah Client Component karena kita butuh state untuk filter

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Tipe data untuk Postingan Blog
interface Post {
  id: number;
  slug: string;
  title: string;
  summary: string;
  author: string;
  publishDate: string;
  category: 'RPA' | 'AI/ML' | 'Case Studies' | 'Industry News';
  imageUrl: string;
}

// --- Data Dummy untuk Blog ---
const allPosts: Post[] = [
  {
    id: 1,
    slug: "top-5-rpa-trends-in-2025",
    title: "Top 5 RPA Trends to Watch in 2025",
    summary: "Robotic Process Automation is evolving. Discover the key trends, from hyperautomation to AI integration, that will shape the industry next year.",
    author: "Jane Doe",
    publishDate: "Oct 28, 2025",
    category: "RPA",
    imageUrl: "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    slug: "how-ai-is-revolutionizing-document-processing",
    title: "How AI is Revolutionizing Document Processing (IDP)",
    summary: "Learn how Intelligent Document Processing (IDP) uses AI and ML to read, extract, and process data from any document, eliminating manual entry.",
    author: "John Smith",
    publishDate: "Oct 25, 2025",
    category: "AI/ML",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    slug: "case-study-manufacturing-cost-saving",
    title: "Case Study: How We Saved a Client $200k in Manufacturing",
    summary: "A deep dive into how our custom automation solution streamlined the supply chain for a major manufacturing client, resulting in significant ROI.",
    author: "Alice Johnson",
    publishDate: "Oct 22, 2025",
    category: "Case Studies",
    imageUrl: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    slug: "future-of-work-automation-and-human-collaboration",
    title: "The Future of Work: Automation and Human Collaboration",
    summary: "Automation isn't about replacing humans; it's about augmenting them. We explore how bots and employees can work together to drive productivity.",
    author: "David Lee",
    publishDate: "Oct 20, 2025",
    category: "Industry News",
    imageUrl: "https://images.pexels.com/photos/8728381/pexels-photo-8728381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    slug: "getting-started-with-rpa-a-beginners-guide",
    title: "Getting Started with RPA: A Beginner's Guide",
    summary: "New to automation? This guide breaks down the basics of RPA, what it can do for your business, and how to start your first project.",
    author: "Jane Doe",
    publishDate: "Oct 18, 2025",
    category: "RPA",
    imageUrl: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 6,
    slug: "case-study-finance-department-automation",
    title: "Case Study: Automating the Finance Department",
    summary: "See how our RPA bots automated invoice processing and financial reporting for a leading fintech company, ensuring 100% accuracy.",
    author: "Michael Brown",
    publishDate: "Oct 15, 2025",
    category: "Case Studies",
    imageUrl: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];

// Daftar kategori untuk filter
const categories = ['All', 'RPA', 'AI/ML', 'Case Studies', 'Industry News'];


export default function BlogPage() {
  
  // --- State Management ---
  // Menyimpan kategori yang sedang dipilih. Default-nya 'All'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Logika untuk memfilter postingan
  const filteredPosts = allPosts.filter(post => {
    if (selectedCategory === 'All') {
      return true; // Tampilkan semua jika 'All' dipilih
    }
    return post.category === selectedCategory; // Tampilkan yang cocok
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <main className="pt-20">
        
        {/* --- Hero Section --- */}
        <section className="bg-gray-800 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Our <span className="text-orange-600">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              News, insights, and updates on the future of intelligent automation and business transformation.
            </p>
          </div>
        </section>

        {/* --- Filter Section --- */}
        <section className="py-8 bg-gray-900 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                    ${selectedCategory === category
                      ? 'bg-orange-600 text-white' // Tombol Aktif
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600' // Tombol Inaktif
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- Blog Grid Section --- */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Grid Responsif */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  // Kartu Blog
                  <div 
                    key={post.id}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col
                               transform transition duration-300 hover:scale-[1.03] hover:shadow-orange-700/50"
                  >
                    {/* Gambar */}
                    <Link href={`/blog/${post.slug}`} className="block h-48 w-full relative">
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                      <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </Link>
                    
                    {/* Konten Teks */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Author & Date */}
                      <div className="text-sm text-gray-400 mb-2">
                        By <span className="font-medium text-gray-300">{post.author}</span> on {post.publishDate}
                      </div>
                      
                      {/* Judul */}
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold text-white mb-3 hover:text-orange-400 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      
                      {/* Summary */}
                      <p className="text-gray-400 text-sm mb-6 flex-grow">
                        {post.summary}
                      </p>
                      
                      {/* Tombol "Read More" */}
                      <div className="mt-auto">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Tampilan jika tidak ada postingan
                <div className="col-span-full text-center py-12">
                  <h3 className="text-2xl font-bold text-gray-400">No posts found</h3>
                  <p className="text-gray-500">There are no articles in the "{selectedCategory}" category yet.</p>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}