import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CreatePostForm from './components/CreatePostForm';

export default async function CreatePostPage() {
  const session = await auth();
  if (!(session as any)?.user) redirect('/login');

  return (
    <div className="pt-20 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700">
            ‹ Back to Blog
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8">Create New Post</h1>
        <CreatePostForm />
      </div>
    </div>
  );
}