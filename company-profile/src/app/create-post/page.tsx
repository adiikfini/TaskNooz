import React from 'react';
import { auth } from '@/auth'; 
import { redirect } from 'next/navigation';

export default async function CreatePostPage() {
  
  const session = await auth();

  if ((session?.user as any)?.role !== "admin") {
    redirect('/');
  }

  return (
    <div className="pt-20 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8">
          Admin Panel: Create New Post
        </h1>
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Top 5 RPA Trends"
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-300">
              Summary
            </label>
            <textarea
              id="summary"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="A brief summary of the post..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/50 transition duration-300 hover:bg-orange-700"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}