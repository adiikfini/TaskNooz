// src/app/blog/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Tipe data untuk Postingan Blog
interface Post {
  objectId: string;
  title: string;
  summary: string;
  author: string;
  publishDate: string;
  category: 'RPA' | 'AI/ML' | 'Case Studies' | 'Industry News';
  imageUrl?: string;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
}

// Daftar kategori untuk filter
const categories = ['All', 'RPA', 'AI/ML', 'Case Studies', 'Industry News'];


export default function BlogPage() {
  
  //State Management
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: session } = useSession();
  const rawRole = (session as any)?.user?.role;
  const isAdmin = Boolean(
    (typeof rawRole === 'string' && rawRole.toLowerCase() === 'admin') ||
    (session as any)?.user?.name === 'Admin'
  );

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/blogs');
        const json = await res.json().catch(() => null);
        console.log('GET /api/blogs status=', res.status, 'ok=', res.ok, 'body=', json);
        let postsData: any[] = [];
          setRawResponse(json);
        if (json == null) {
          postsData = [];
        } else if (Array.isArray(json)) {
          postsData = json;
        } else if (Array.isArray(json.data)) {
          postsData = json.data;
        } else if (json.data && typeof json.data === 'object') {
          postsData = [json.data];
        }

  setPosts(postsData || []);
  console.log('normalized postsData length=', (postsData || []).length, 'postsData=', postsData);
        if (!res.ok && json?.error) {
          setError(String(json.error));
        } else if (json && typeof json === 'object' && json.error) {
          setError(String(json.error));
        } else {
          setError(null);
        }
      } catch (err: any) {
        console.error('fetchPosts error', err);
        setError(err.message || 'Error loading blogs');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Logika untuk memfilter postingan
  const filteredPosts = posts.filter((post: Post) => {
    if (selectedCategory === 'All') {
      return true;
    }
    return post.category === selectedCategory;
  });

  const isAbsoluteHttpUrl = (value?: string) => {
    if (!value || typeof value !== 'string') return false;
    try {
      const u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const isLocalOrDataUrl = (value?: string) => {
    if (!value || typeof value !== 'string') return false;
    return value.startsWith('/') || value.startsWith('data:');
  };

  const formatDateOnly = (value?: string | null) => {
    if (!value) return '';
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      }
    } catch (e) {
    }
    if (typeof value === 'string' && value.includes('T')) return value.split('T')[0];
    return value;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />

      <main className="pt-20">
        
        {/*Hero Section*/}
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

        {/*Filter Section*/}
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

        {/*Blog Grid Section*/}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {loading && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-400">Loading blogs...</h3>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-red-400">Error: {error}</h3>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post: Post) => {
                    const slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                    return (
                      // Kartu Blog
                      <div 
                        key={post.objectId}
                        className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col
                                   transform transition duration-300 hover:scale-[1.03] hover:shadow-orange-700/50"
                      >
                        {/* Gambar */}
                        <Link href={`/blog/${slug}`} className="block h-48 w-full relative">
                          {(() => {
                            const src = post.imageUrl as string | undefined;
                            if (isAbsoluteHttpUrl(src)) {
                              return (
                                <Image
                                  src={src as string}
                                  alt={post.title}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                              );
                            }
                            if (isLocalOrDataUrl(src)) {
                              return (
                                <img src={src} alt={post.title} className="w-full h-full object-cover" />
                              );
                            }
  
                            return (
                              <div className="w-full h-full bg-gradient-to-r from-orange-600 to-orange-700 flex items-center justify-center">
                                <span className="text-white text-center px-4">📰 No Image</span>
                              </div>
                            );
                          })()}
                          <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                            {post.category}
                          </span>
                        </Link>
                        
                        {/* Konten Teks */}
                        <div className="p-6 flex flex-col grow relative">
                          {isAdmin && (
                            <div className="absolute top-4 right-4">
                              <button
                                onClick={async () => {
                                  if (!confirm('Delete this post? This cannot be undone.')) return;
                                  try {
                                    const res = await fetch(`/api/blogs/${encodeURIComponent(post.objectId as string)}`, {
                                      method: 'DELETE',
                                      credentials: 'include',
                                    });
                                    const json = await res.json().catch(() => ({}));
                                    if (!res.ok) {
                                      alert('Delete failed: ' + (json?.error || JSON.stringify(json)));
                                      return;
                                    }
                                    // remove from local state
                                    setPosts((p) => p.filter((x) => x.objectId !== post.objectId));
                                  } catch (e) {
                                    alert('Delete failed: ' + String(e));
                                  }
                                }}
                                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          {/* Author & Date */}
                          <div className="text-sm text-gray-400 mb-2">
                            By <span className="font-medium text-gray-300">{post.author}</span> on {formatDateOnly(post.publishDate)}
                          </div>
                          
                          {/* Judul */}
                          <Link href={`/blog/${slug}`}>
                            <h3 className="text-xl font-bold text-white mb-3 hover:text-orange-400 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          
                          {/* Summary */}
                          <p className="text-gray-400 text-sm mb-6 grow">
                            {post.summary}
                          </p>
                          
                          {/* Tombol "Read More" */}
                          <div className="mt-auto">
                            <Link 
                              href={`/blog/${slug}`}
                              className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Tampilan jika tidak ada postingan
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-2xl font-bold text-gray-400">No posts found</h3>
                    <p className="text-gray-500">There are no articles in the "{selectedCategory}" category yet.</p>
                    <div className="mt-6 text-left text-xs text-gray-400 max-w-4xl mx-auto px-4">
                      <div className="font-semibold text-sm text-gray-300 mb-2">Debug: /api/blogs response</div>
                      <pre className="whitespace-pre-wrap break-words bg-gray-800 p-3 rounded text-[11px]">
                        {JSON.stringify(rawResponse ?? '(no JSON response)', null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}