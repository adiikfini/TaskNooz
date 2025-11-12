// Script to migrate existing 'authorName' values to new 'author' column in Blogs table.
// Usage: node scripts/migrate-authorName-to-author.js

const fetch = global.fetch || require('node-fetch');

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || '71966029-41AC-4ADD-93F6-07BE88132275';
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY || '22309958-AC30-44D3-9E86-CC2190106F5D';
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';

const TABLE = 'Blogs';

async function migrate() {
  try {
    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
    console.log('Fetching records from:', url);
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Failed to fetch records:', res.status);
      process.exitCode = 2;
      return;
    }
    const records = await res.json();
    console.log(`Fetched ${records.length} records. Scanning for authorName...`);

    let migrated = 0;
    for (const r of records) {
      if (r.authorName && !r.author) {
        const patchUrl = `${url}/${r.objectId}`;
        const body = { author: r.authorName };
        const p = await fetch(patchUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!p.ok) {
          console.error(`Failed to update record ${r.objectId}:`, await p.text());
          continue;
        }
        migrated++;
        console.log(`Migrated ${r.objectId} -> author='${r.authorName}'`);
      }
    }

    console.log(`Migration finished. ${migrated} records migrated.`);
  } catch (err) {
    console.error('Migration error:', err);
    process.exitCode = 1;
  }
}

migrate();
