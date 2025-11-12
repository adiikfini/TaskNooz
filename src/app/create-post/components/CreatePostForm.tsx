"use client";

import React, { useState, startTransition } from "react";
import { useActionState } from "react";
import { createPost, type CreatePostFormState } from "./actions";
import { useRouter } from "next/navigation";
import Toast, { type ToastItem } from "@/components/Toast";

// initial state for server action
const initialState: CreatePostFormState = { success: false, message: "" };

function SubmitButton({ disabled, label = "Publish Post" }: { disabled: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/50 transition duration-300 hover:bg-orange-700 disabled:opacity-50"
    >
      {disabled ? "Publishing..." : label}
    </button>
  );
}

export default function CreatePostForm() {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  // tags removed per request
  const [published, setPublished] = useState(true);

  const [state, formAction] = useActionState(createPost, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (t: Omit<ToastItem, 'id'>) => {
    const id = String(Date.now()) + Math.random().toString(16).slice(2);
    const item: ToastItem = { id, ...t };
    setToasts((s) => [item, ...s]);
  };

  const removeToast = (id: string) => setToasts((s) => s.filter((t) => t.id !== id));

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setImageUrl(v);
    setImagePreview(v || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);

    if (title.trim().length < 5) return setClientError('Title must be at least 5 characters');
    if (summary.trim().length < 20) return setClientError('Summary must be at least 20 characters');
    if (!category) return setClientError('Please select a category');

    setIsSubmitting(true);

    try {
      // 1) Use imageUrl from input if provided
      const payload = {
        title,
        summary,
        category,
        published: published ? 'true' : 'false',
        ...(imageUrl ? { imageUrl } : {}),
      };

      startTransition(() => {
        try {
          (formAction as unknown as (p: any) => void)(payload as any);
        } catch (e) {
          // If calling the action throws synchronously, handle it
          const msg = (e as any)?.message || 'Action call failed';
          setClientError(msg);
          addToast({ type: 'error', message: 'Submission failed', details: msg });
          setIsSubmitting(false);
        }
      });
    } catch (err) {
      const msg = (err as any)?.message || 'Server error';
      setClientError(msg);
      addToast({ type: 'error', message: 'Submission failed', details: msg });
      setIsSubmitting(false);
    }
  };

  // React to server action state changes (useActionState updates `state`)
  React.useEffect(() => {
    if (!state) return;
    if (state.success) {
      addToast({ type: 'success', message: 'Post created', details: state.message || 'Redirecting to blog' });
      // action succeeded — redirect
      router.push('/blog');
    } else if (state.message) {
      // show server-side error
      setClientError(state.message);
      addToast({ type: 'error', message: 'Server error', details: state.message });
    }
    if (state.message || state.success) {
      setIsSubmitting(false);
    }
  }, [state, router]);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">

     

      {/* Input Gambar/Featured Image */}

      <div>

        <label htmlFor="image" className="block text-sm font-medium text-gray-300">

          Featured Image (optional)

        </label>

        <input
          type="text"
          id="image"
          name="image"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-gray-300 shadow-sm sm:text-sm p-3"
        />

        {imagePreview && (

          <div className="mt-4">

            <p className="text-xs text-gray-400 mb-2">Image Preview:</p>

            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-48 rounded-md border border-gray-700"
            />

            {/* no upload progress for URL input */}

          </div>

        )}

      </div>

     

      {/* Input Judul */}

      <div>

        <label htmlFor="title" className="block text-sm font-medium text-gray-300">

          Post Title

        </label>

        <input

          type="text"

          id="title"

          name="title"

          required

          value={title}

          onChange={(e) => setTitle(e.target.value)}

          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"

          placeholder="Top 5 RPA Trends"

        />

        {/* Slug preview */}

        <p className="text-xs text-gray-400 mt-2">Slug: <span className="font-mono text-gray-200">{title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') : 'n/a'}</span></p>

      </div>



      {/* Input Kategori (Dropdown) */}

      <div>

        <label htmlFor="category" className="block text-sm font-medium text-gray-300">

          Category

        </label>

        <select

          id="category"

          name="category"

          required

          value={category}

          onChange={(e) => setCategory(e.target.value)}

          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"

        >

          <option value="">Select a category</option>

          <option value="RPA">RPA</option>

          <option value="AI/ML">AI/ML</option>

          <option value="Case Studies">Case Studies</option>

          <option value="Industry News">Industry News</option>

        </select>

      </div>



      {/* Input Konten (Text Area) */}

      <div>

        <label htmlFor="summary" className="block text-sm font-medium text-gray-300">

          Summary (a short excerpt)

        </label>

        <textarea

          id="summary"

          name="summary"

          required

          rows={6}

          value={summary}

          onChange={(e) => setSummary(e.target.value)}

          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"

          placeholder="A brief summary of the post..."

        ></textarea>

      </div>



      {/* Tags and published */}

      <div className="flex items-center gap-4">
        <div className="flex-1">
          {/* tags removed */}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="published" className="text-sm text-gray-300">Published</label>
          <input id="published" name="published" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4" />
        </div>
      </div>

     

      {/* Tampilkan pesan Error jika 'createPost' mengembalikannya atau client-side */}

      {clientError && <p className="text-sm text-red-500 text-center font-medium">{clientError}</p>}

      {!state.success && state.message && (

        <p className="text-sm text-red-500 text-center font-medium">{state.message}</p>

      )}



      {/* Tombol Submit */}

      <div>

        <SubmitButton disabled={isSubmitting} />

      </div>

      {/* Toasts container */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={removeToast} />
        ))}
      </div>

    </form>

  );

}