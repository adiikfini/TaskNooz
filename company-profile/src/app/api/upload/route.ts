import { NextResponse } from 'next/server';
import { uploadImageToBackendless } from '@/lib/backendlessFileHelper';
import * as fs from 'fs';
import path from 'path';

// Ensure this route runs in the Node runtime (Buffer and Node blobs used in helper)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null || form.get('image') as File | null;
    if (!file) {
      console.warn('Upload called without a file');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Diagnostic logs
    try {
      console.log('Upload request received. fileName=', file.name, 'size=', (file as any).size, 'type=', file.type);
    } catch (e) {
      console.log('Upload request received (could not read file metadata)');
    }

  const arrayBuf = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  // let helper generate its own timestamped unique filename — pass the original name
  const fileName = file.name.replace(/\s+/g, '-');

    // Log environment presence for quicker debugging
    console.log('Backendless env:', {
      BACKENDLESS_API_URL: process.env.BACKENDLESS_API_URL ? '<set>' : '<missing>',
      BACKENDLESS_APP_ID: process.env.BACKENDLESS_APP_ID ? '<set>' : '<missing>',
      BACKENDLESS_REST_KEY: process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY ? '<set>' : '<missing>',
    });

    const result = await uploadImageToBackendless(buffer, fileName);
    // result is now { url: string | null, debug?: string[] }
    if (result && result.url) {
      console.log('Upload succeeded to Backendless, url=', result.url);
      return NextResponse.json({ url: result.url });
    }

    // Fallback: save to local public/uploads directory so uploads always work in dev
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      // create unique filename
      const ext = path.extname(fileName) || '';
      const base = path.basename(fileName, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
      const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}${ext}`;
      const savePath = path.join(uploadsDir, unique);
      fs.writeFileSync(savePath, buffer);

      const publicUrl = `/uploads/${unique}`;
      console.log('Backendless upload failed; saved locally at', savePath, 'publicUrl=', publicUrl, 'debug=', result?.debug ?? []);
      return NextResponse.json({ url: publicUrl, fallback: 'local', debug: result?.debug ?? [] });
    } catch (fsErr) {
      console.error('Local fallback failed:', fsErr, 'backendless debug=', result?.debug ?? []);
      return NextResponse.json({ error: 'Upload failed', debug: result?.debug ?? [] }, { status: 500 });
    }
  } catch (err) {
    console.error('Upload route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
