"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Skema validasi untuk postingan baru
const PostSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  published: z.string().optional(),
});

// Tipe state formulir
export type CreatePostFormState = {
  success: boolean;
  message: string;
};

// Use the centralized helper that supports PUT then POST fallback
// upload helper removed — we now accept imageBase64 from the client

// FUNGSI SERVER ACTION UTAMA
export async function createPost(
  prevState: CreatePostFormState,
  payload: { title: string; summary: string; category: string; published?: boolean | string; imageUrl?: string }
): Promise<CreatePostFormState> {

  // 1. Periksa Sesi Pengguna
  const session = await auth();
  const user = (session as any)?.user;
  if (!user) return { success: false, message: 'Unauthorized. Please log in.' };

  // 2. Validasi payload
  const validated = PostSchema.safeParse({
    title: payload.title,
    summary: payload.summary,
    category: payload.category,
    published: payload.published ? String(payload.published) : undefined,
  });

  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const { title, summary, category, published } = validated.data;

  // 3. Siapkan payload untuk Backendless (image already uploaded by client to /api/upload)
  const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
  const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
  const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";
  const postUrl = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/Blogs`;

  const dataToSend: any = {
    title,
    summary,
    category,
    published: Boolean(published && String(published) === 'true'),
    author: user.name,
    authorEmail: user.email,
    ownerId: (user as any).id || (user as any).objectId,
    slug: title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    publishDate: new Date().toISOString(),
  };

  if ((payload as any).imageUrl) {
    dataToSend.imageUrl = (payload as any).imageUrl;
  }

  try {
    const res = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      return { success: false, message: d.message || 'Failed to create blog post.' };
    }
  } catch (err) {
    return { success: false, message: 'A server error occurred.' };
  }

  revalidatePath('/blog');
  redirect('/blog');
}