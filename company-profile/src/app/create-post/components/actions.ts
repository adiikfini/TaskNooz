"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Skema validasi untuk postingan baru
const PostSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters." }),
  category: z.enum(["RPA", "AI/ML", "Case Studies", "Industry News"] as const),
  published: z.preprocess((v) => {
    // Accept boolean or string-like values
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (typeof v === 'string') return v;
    return undefined;
  }, z.string().optional()),
});

// Tipe state formulir
export type CreatePostFormState = {
  success: boolean;
  message: string;
};

// FUNGSI SERVER ACTION UTAMA
export async function createPost(
  prevState: CreatePostFormState,
  payload: { title: string; summary: string; category: string; published?: boolean | string; imageUrl?: string }
): Promise<CreatePostFormState> {

  // Periksa Sesi Pengguna
  const session = await auth();
  const user = (session as any)?.user;
  if (!user) return { success: false, message: 'Unauthorized. Please log in.' };
  const role = (user as any)?.role ?? 'user';

  // Validasi payload
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

  try {
    console.info('[createPost] validated payload', { title, summary: summary.slice(0, 200), category, published });
    if (payload.imageUrl) console.info('[createPost] imageUrl provided:', payload.imageUrl);
  } catch (e) {
    // swallow logging errors
  }

  const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
  const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
  const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";
  const postUrl = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/Blogs`;

  const dataToSend: any = {
    title,
    summary,
    category,
    published: role === 'admin' ? Boolean(published && String(published) === 'true') : false,
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
    console.info('[createPost] sending to Backendless', { url: postUrl, payloadSummary: dataToSend.title });
    const res = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    const text = await res.text().catch(() => '');
    let parsed: any = null;
    try { parsed = text ? JSON.parse(text) : null; } catch (e) { parsed = text; }

    if (!res.ok) {
      console.error('[createPost] Backendless POST failed', { status: res.status, body: parsed });
      const serverMessage = parsed?.message || (typeof parsed === 'string' ? parsed : 'Failed to create blog post.');
      return { success: false, message: serverMessage };
    }

    // Success: log created record id if available
    try {
      const createdId = parsed?.objectId ?? parsed?.id ?? null;
      console.info('[createPost] created blog id=', createdId);
    } catch (e) {
      // ignore
    }
  } catch (err) {
    console.error('[createPost] exception while creating post', String(err));
    return { success: false, message: 'A server error occurred.' };
  }

  revalidatePath('/blog');
  redirect('/blog');
}