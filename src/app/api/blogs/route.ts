import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

const TABLE = "Blogs";

export async function GET() {
	try {
		console.info('[GET /api/blogs] incoming request');
		if (!process.env.BACKENDLESS_REST_API_KEY && !process.env.BACKENDLESS_API_KEY) {
			console.warn('WARNING: No BACKENDLESS_REST_API_KEY or BACKENDLESS_API_KEY env var found — using built-in default which may be invalid for your app');
		}
		const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
		console.info('[GET /api/blogs] fetching from Backendless', { url });
		const res = await fetch(url);
		const raw = await res.text().catch(() => '');
		let parsed: any = null;
		try { parsed = raw ? JSON.parse(raw) : null; } catch (e) { parsed = raw; }
		if (!res.ok) {
			console.error('[GET /api/blogs] Backendless /data/Blogs returned non-ok', res.status, parsed ?? raw);
			return NextResponse.json({ data: [], error: parsed?.message || 'Failed to fetch blogs', debug: parsed ?? raw }, { status: 200 });
		}
		let postsArray: any[] = [];
		if (Array.isArray(parsed)) postsArray = parsed;
		else if (parsed && Array.isArray(parsed.data)) postsArray = parsed.data;
		else if (parsed && typeof parsed === 'object') {
			postsArray = [parsed];
		}
		if (postsArray.length > 0) {
			const normalized = postsArray.map((item: any) => {
				const objectId = item.objectId ?? item.objectID ?? item.id ?? item.object_id ?? null;
				const title = item.title ?? item.name ?? '';
				const summary = item.summary ?? item.excerpt ?? item.content ?? '';
				const author = item.author ?? item.authorName ?? item.authorEmail ?? item.ownerId ?? 'Unknown';
				const publishDate = item.publishDate ?? item.createdAt ?? item.created ?? item.publishedAt ?? null;
				const categoryRaw = (item.category ?? '').toString();
				let category = 'Uncategorized';
				const cr = categoryRaw.toLowerCase();
				if (cr.includes('rpa')) category = 'RPA';
				else if (cr.includes('ai') || cr.includes('ml')) category = 'AI/ML';
				else if (cr.includes('case')) category = 'Case Studies';
				else if (cr.includes('industry') || cr.includes('news')) category = 'Industry News';
				else if (categoryRaw) category = categoryRaw;
				const imageUrl = item.imageUrl ?? item.image ?? item.imageURL ?? item.featuredImage ?? null;
				const published = item.published === true || String(item.published) === 'true' || !!item.published;
				const createdAt = item.createdAt ?? item.created ?? null;
				return {
					objectId,
					title,
					summary,
					author,
					publishDate,
					category,
					imageUrl,
					published,
					createdAt,
				};
			});
			console.info('[GET /api/blogs] returning', { count: normalized.length, source: 'backendless' });
			return NextResponse.json({ data: normalized, source: 'backendless' });
		}
		console.warn('[GET /api/blogs] Backendless returned no posts; attempting local fallback');
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
