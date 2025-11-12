// Script to create an admin user in Backendless using the REST API.
// Usage: node scripts/create-backendless-admin.js
// It reads BACKENDLESS_APP_ID, BACKENDLESS_REST_API_KEY and BACKENDLESS_API_URL
// from environment variables or falls back to the project's defaults.

const fetch = global.fetch || require('node-fetch');

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || '71966029-41AC-4ADD-93F6-07BE88132275';
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY || process.env.BACKENDLESS_API_KEY || '22309958-AC30-44D3-9E86-CC2190106F5D';
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL || 'https://api.backendless.com';

// Default admin credentials - change as needed.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tasknooz.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin1234!';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

async function createAdmin() {
  try {
    const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/users/register`;
    console.log('Registering admin user to:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: ADMIN_NAME, role: 'admin' }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed to create admin:', data);
      process.exitCode = 2;
      return;
    }
    console.log('Admin user created successfully. Response:');
    console.log(JSON.stringify(data, null, 2));
    console.log('\nCredentials:');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('\nTip: If you want a different email/password, set ADMIN_EMAIL and ADMIN_PASSWORD environment variables when running the script.');
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exitCode = 1;
  }
}

createAdmin();
