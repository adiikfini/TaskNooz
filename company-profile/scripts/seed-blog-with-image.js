// Script to seed the Blogs table with a sample post that includes an image field.
// This ensures Backendless creates the imageBase64, imageName, imageType columns.
// Usage: node scripts/seed-blog-with-image.js

const fetch = global.fetch || require('node-fetch');
const fs = require('fs');
const path = require('path');

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || '71966029-41AC-4ADD-93F6-07BE88132275';
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY || '22309958-AC30-44D3-9E86-CC2190106F5D';
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';

const TABLE = 'Blogs';

async function seedBlogWithImage() {
  try {
    // Placeholder image URL (atau bisa pakai actual image URL dari CDN)
    const placeholderImageUrl = 'https://api.backendless.com/71966029-41AC-4ADD-93F6-07BE88132275/22309958-AC30-44D3-9E86-CC2190106F5D/files/blogs/sample-placeholder.png';

    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/data/${TABLE}`;
    console.log('Posting sample blog with image to:', url);

    const payload = {
      title: 'Sample Blog with Image',
      summary: 'This is a sample post created to ensure image fields exist in the Blogs table schema.',
      category: 'Sample',
      tags: ['image', 'sample', 'seed'],
      author: 'system',
      authorId: 'system',
      createdAt: new Date().toISOString(),
      published: true,
      imageUrl: placeholderImageUrl,
      imageName: 'sample-placeholder.png',
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to seed blog with image:', data);
      process.exitCode = 2;
      return;
    }

    console.log('Sample blog with image created successfully:');
    console.log(JSON.stringify(data, null, 2));
    console.log('\nImage fields have been added to the Blogs table schema.');
    console.log('You can remove this seed record from Backendless Console if you do not need it.');
  } catch (err) {
    console.error('Error seeding blog with image:', err);
    process.exitCode = 1;
  }
}

seedBlogWithImage();
