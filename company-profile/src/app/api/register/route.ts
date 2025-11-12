import { NextResponse } from 'next/server';

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/users/register`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (err) {
      try {
        data = await res.text();
      } catch (e) {
        data = null;
      }
    }

    if (!res.ok) {
      console.error('[register] Backendless register failed', { status: res.status, body: data });
      const message = (data && (data.message || data.error || JSON.stringify(data))) || 'Registration failed';
      return NextResponse.json({ error: message, debug: { status: res.status, body: data } }, { status: res.status });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('[register] Unexpected server error', err);
    return NextResponse.json({ error: 'Server error', detail: String(err) }, { status: 500 });
  }
}
