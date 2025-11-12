/*
Script: migrate-images-to-base64.js
- Fetches all records from Backendless `Blogs` table
- For each record that doesn't have `imageBase64`, tries to find an existing image in fields: imageBase64, imageUrl, Image, image
- If an image URL is found, downloads the bytes and converts to data URI (base64)
- Updates the record setting `imageBase64` and nulling the old fields

Usage (from repo root):
  set BACKENDLESS_APP_ID=...; set BACKENDLESS_REST_API_KEY=...; node scripts/migrate-images-to-base64.js

Note: requires network access to Backendless and to any external image URLs. Test on a small subset first.
*/

const APP_ID = process.env.BACKENDLESS_APP_ID;
const REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY;
const API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';
const TABLE = 'Blogs';

if (!APP_ID || !REST_KEY) {
  console.error('Please set BACKENDLESS_APP_ID and BACKENDLESS_REST_API_KEY (or BACKENDLESS_API_KEY) in the environment.');
  process.exit(1);
}

const listUrl = `${API_URL}/${APP_ID}/${REST_KEY}/data/${TABLE}`;

async function fetchJson(url) {
  const res = await fetch(url);
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
}

async function toDataUriFromUrl(url) {
  try {
    // allow relative local URLs by skipping conversion (can't fetch local files)
    if (url.startsWith('/')) {
      console.warn('Skipping local path conversion for', url);
      return null;
    }
    const r = await fetch(url);
    if (!r.ok) {
      console.warn('Failed to download image', url, 'status=', r.status);
      return null;
    }
    const contentType = r.headers.get('content-type') || 'application/octet-stream';
    const buffer = await r.arrayBuffer();
    const b = Buffer.from(buffer);
    const base64 = b.toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (e) {
    console.error('Error fetching image URL', url, e);
    return null;
  }
}

async function updateRecord(objectId, body) {
  const url = `${API_URL}/${APP_ID}/${REST_KEY}/data/${TABLE}/${objectId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch (e) { parsed = text; }
  return { ok: res.ok, status: res.status, body: parsed };
}

(async function main(){
  console.log('Fetching records from Backendless table', TABLE);
  const records = await fetchJson(listUrl);
  if (!Array.isArray(records)) {
    console.error('Unexpected response when listing records:', records);
    process.exit(1);
  }
  console.log('Found', records.length, 'records');

  for (const rec of records) {
    const id = rec.objectId || rec.objectID || rec.objectId;
    if (!id) {
      console.warn('Skipping record without objectId', rec);
      continue;
    }

    if (rec.imageBase64) {
      console.log('Skipping', id, 'already has imageBase64');
      continue;
    }

    // possible source fields
    const srcCandidates = [rec.imageUrl, rec.Image, rec.image, rec.photo, rec.file].filter(Boolean);
    const src = srcCandidates[0];
    if (!src) {
      console.log('No image found for', id);
      continue;
    }

    let dataUri = null;
    if (typeof src === 'string' && src.startsWith('data:')) {
      dataUri = src; // already a data URI - copy it
    } else if (typeof src === 'string') {
      dataUri = await toDataUriFromUrl(src);
      if (!dataUri) {
        console.warn('Could not convert image for', id, 'src=', src);
        continue;
      }
    }

    const updateBody = {
      imageBase64: dataUri,
      imageUrl: null,
      Image: null,
      image: null,
    };

    console.log('Updating', id, 'with imageBase64 (length=', dataUri?.length, ')');
    const r = await updateRecord(id, updateBody);
    if (r.ok) {
      console.log('Updated', id);
    } else {
      console.error('Failed to update', id, r.status, r.body);
    }

    // small delay to avoid hitting rate limits
    await new Promise((res) => setTimeout(res, 250));
  }

  console.log('Migration finished');
})();
