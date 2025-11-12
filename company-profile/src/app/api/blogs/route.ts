import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
// Accept either BACKENDLESS_REST_API_KEY or BACKENDLESS_API_KEY (some scripts set the latter)
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

const TABLE = "Blogs";

export async function GET() {
	try {
		if (!process.env.BACKENDLESS_REST_API_KEY && !process.env.BACKENDLESS_API_KEY) {
			console.warn('WARNING: No BACKENDLESS_REST_API_KEY or BACKENDLESS_API_KEY env var found — using built-in default which may be invalid for your app');
		}
		const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
		const res = await fetch(url);
		const raw = await res.text().catch(() => '');
		let parsed: any = null;
		try { parsed = raw ? JSON.parse(raw) : null; } catch (e) { parsed = raw; }
		if (!res.ok) {
			// If Backendless is unavailable or returns an error, return an empty list so the UI shows "No posts"
			console.error('Backendless /data/Blogs returned non-ok', res.status, parsed ?? raw);
			return NextResponse.json({ data: [], error: parsed?.message || 'Failed to fetch blogs', debug: parsed ?? raw }, { status: 200 });
		}
		// Normalize backendless response into an array of posts
		let postsArray: any[] = [];
		if (Array.isArray(parsed)) postsArray = parsed;
		else if (parsed && Array.isArray(parsed.data)) postsArray = parsed.data;
		else if (parsed && typeof parsed === 'object') {
			// sometimes backendless returns a single object
			postsArray = [parsed];
		}
		if (postsArray.length > 0) {
			return NextResponse.json({ data: postsArray, source: 'backendless' });
		}
		// If backendless returned empty list, we'll fall back to local sample data (dev convenience)
		console.warn('Backendless returned no posts; attempting local fallback');
		const fallbackPath = path.join(process.cwd(), 'data', 'blogs-fallback.json');
		if (fs.existsSync(fallbackPath)) {
			try {
				const raw = fs.readFileSync(fallbackPath, 'utf8');
				const fallback = JSON.parse(raw);
				if (Array.isArray(fallback)) {
					return NextResponse.json({ data: fallback, source: 'fallback' });
				}
			} catch (e) {
				console.error('Failed to read fallback file', e);
			}
		}
		return NextResponse.json({ data: [] });
	} catch (err) {
		return NextResponse.json({ error: 'Server error', debug: String(err) }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!(session as any)?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();
	const { title, summary, category, published, imageUrl } = body;
	if (!title || !summary) return NextResponse.json({ error: 'Title and summary required' }, { status: 400 });

			const s = session as any;
			const payload: any = {
				title,
				summary,
				category: category || 'Uncategorized',
				published: published === 'true' || published === true,
				imageUrl: imageUrl || null,
				author: s.user?.name || s.user?.email,
				authorId: s.user?.id,
				createdAt: new Date().toISOString(),
			};

		const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await res.json();
		if (!res.ok) return NextResponse.json({ error: data.message || data }, { status: res.status });
		return NextResponse.json({ ok: true, data });
	} catch (err) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
