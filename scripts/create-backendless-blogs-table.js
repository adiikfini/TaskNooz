// Script to create the 'Blogs' table in Backendless by inserting a seed record.
// Usage: node scripts/create-backendless-blogs-table.js

const fetch = global.fetch || require('node-fetch');

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || '71966029-41AC-4ADD-93F6-07BE88132275';
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY || '22309958-AC30-44D3-9E86-CC2190106F5D';
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';

const TABLE = 'Blogs';

async function createSeedBlog() {
  try {
    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
    console.log('Posting seed blog to:', url);

    const payload = {
      title: 'Welcome — Blog Table Created',
      summary: 'This is a seed post created by scripts/create-backendless-blogs-table.js to ensure the Blogs table exists.',
      tags: ['seed', 'system'],
      author: 'system',
      authorId: 'system',
      createdAt: new Date().toISOString(),
      published: true,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to create seed blog:', data);
      process.exitCode = 2;
      return;
    }

    console.log('Seed blog created successfully:');
    console.log(JSON.stringify(data, null, 2));

  console.log("\nYou can remove this seed record from Backendless Console if you don't need it.");
  } catch (err) {
    console.error('Error creating seed blog:', err);
    process.exitCode = 1;
  }
}

createSeedBlog();
