import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const runtime = 'nodejs';

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

async function getBackendlessUrl(id?: string) {
  return `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/Blogs${id ? '/' + encodeURIComponent(id) : ''}`;
}

export async function DELETE(req: Request, context: any) {
  try {
		console.info('[DELETE /api/blogs/[id]] incoming request');
    const session = await auth();
    const user = (session as any)?.user;
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const role = (user as any)?.role ?? 'user';
    if (role !== 'admin') return NextResponse.json({ error: 'Forbidden: admin only' }, { status: 403 });

  const rawParams = (context as any)?.params;
  const params = rawParams && typeof rawParams.then === 'function' ? await rawParams : rawParams;
  const id = params?.id as string | undefined;
  if (!id) {
    console.warn('[DELETE /api/blogs/[id]] missing id in params', { params });
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }
    const url = await getBackendlessUrl(id);
    console.info('[DELETE /api/blogs/[id]] deleting id=', id, { url, by: user?.email || user?.name });
    const res = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({}) });
  const text = await res.text().catch(() => '');
  let parsed: any = null;
  try { parsed = text ? JSON.parse(text) : null; } catch (e) { parsed = text; }
  console.info('[DELETE /api/blogs/[id]] backendless response', { status: res.status, body: parsed });
    if (!res.ok) return NextResponse.json({ error: parsed?.message || parsed || 'Delete failed' }, { status: res.status });
    console.info('[DELETE /api/blogs/[id]] delete succeeded', { id });
    return NextResponse.json({ ok: true });
  } catch (err) {
		console.error('[DELETE /api/blogs/[id]] exception', String(err));
    return NextResponse.json({ error: 'Server error', debug: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  try {
		console.info('[PATCH /api/blogs/[id]] incoming request');
    const session = await auth();
    const user = (session as any)?.user;
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const role = (user as any)?.role ?? 'user';
    if (role !== 'admin') return NextResponse.json({ error: 'Forbidden: admin only' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    // Only allow certain fields to be updated
    const allowed: any = {};
    if (typeof body.title === 'string') allowed.title = body.title;
    if (typeof body.summary === 'string') allowed.summary = body.summary;
    if (typeof body.category === 'string') allowed.category = body.category;
    if (typeof body.imageUrl === 'string') allowed.imageUrl = body.imageUrl;
    if (typeof body.published !== 'undefined') allowed.published = body.published === true || String(body.published) === 'true';

  const rawId = context?.params?.id;
  const id = typeof rawId === 'string' ? rawId : await rawId;
    const url = await getBackendlessUrl(id);
    console.info('[PATCH /api/blogs/[id]] updating id=', id, { allowed });
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allowed),
    });
    const text = await res.text().catch(() => '');
    let parsed: any = null;
    try { parsed = text ? JSON.parse(text) : null; } catch (e) { parsed = text; }
    if (!res.ok) return NextResponse.json({ error: parsed?.message || parsed || 'Update failed' }, { status: res.status });
    console.info('[PATCH /api/blogs/[id]] update succeeded', { id });
    return NextResponse.json({ ok: true, data: parsed });
  } catch (err) {
		console.error('[PATCH /api/blogs/[id]] exception', String(err));
    return NextResponse.json({ error: 'Server error', debug: String(err) }, { status: 500 });
  }
}
