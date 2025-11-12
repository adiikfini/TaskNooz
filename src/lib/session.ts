import "server-only"; // Memastikan file ini HANYA berjalan di server
import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// Ambil kunci rahasia dari .env
const secretKey = process.env.AUTH_SECRET;
if (!secretKey) {
  throw new Error("AUTH_SECRET is not set in .env.local");
}
const key = new TextEncoder().encode(secretKey);

/**
 * Tipe data payload yang AKAN KITA ENKRIPSI
 */
interface UserPayload {
  objectId: string;
  email: string;
  name: string;
  // 'role' bisa ditambahkan di sini jika Anda butuh admin
}

/**
 * Mengenkripsi data pengguna (UserPayload) menjadi JWT (Token)
 */
async function encrypt(payload: UserPayload) {
  // 'jose' menerima object "datar" (flat object)
  // Kita tidak lagi mengirim 'expires' di sini
  // jose.SignJWT expects a JWTPayload-like object; cast to any to satisfy types
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token berlaku selama 24 jam
    .sign(key);
}

/**
 * Mendekripsi token (JWT) dan memverifikasinya
 * Ini akan mengembalikan payload penuh (termasuk 'iat' dan 'exp')
 */
async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload; // Mengembalikan { objectId, email, name, iat, exp }
  } catch (error) {
    // Token tidak valid atau kadaluwarsa
    return null;
  }
}

/**
 * [FUNGSI LOGIN]
 * Dipanggil oleh Server Action 'login'
 * Membuat token dan menyimpannya di cookie.
 */
export async function createSession(user: { objectId: string, email: string, name: string }) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam dari sekarang
  
  // 1. Buat token JWT hanya dengan data user
  const sessionToken = await encrypt({ 
    objectId: user.objectId, 
    email: user.email, 
    name: user.name 
  });

  // 2. Simpan token di HttpOnly cookie
  const cookieStore: any = cookies();
  if (typeof cookieStore.set === 'function') {
    cookieStore.set("session", sessionToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } else {
    // Fallback: set cookie via Set-Cookie header (best-effort)
    // Note: this fallback may not work in all runtimes; prefer cookieStore.set.
    const cookieHeader = `session=${sessionToken}; Path=/; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}Max-Age=${24*60*60}`;
    try {
      const h = await headers();
      // headers() may be ReadonlyHeaders; some runtimes don't allow mutation — best-effort
      (h as any).set?.('Set-Cookie', cookieHeader);
    } catch (e) {
      /* best-effort */
    }
  }
  
  // (Server Action 'login' yang memanggil ini akan menangani redirect)
}

/**
 * [FUNGSI LOGOUT]
 * Menghapus cookie sesi.
 */
export async function deleteSession() {
  "use server"; 
  const cookieStore: any = cookies();
  if (typeof cookieStore.delete === 'function') {
    cookieStore.delete("session");
  } else {
    try {
      const h = await headers();
      (h as any).set?.('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0');
    } catch (e) {}
  }
  redirect('/login');
}

/**
 * [FUNGSI CEK SESI]
 * Membaca cookie dan memverifikasi token untuk mendapatkan data pengguna.
 */
export async function getSession(): Promise<UserPayload | null> {
  // Robust cookie reading: support several runtimes/shapes of the cookies() return
  const cookieStore: any = cookies();
  let sessionCookie: string | undefined | null = null;

  if (cookieStore) {
    if (typeof cookieStore.get === 'function') {
      sessionCookie = cookieStore.get('session')?.value;
    } else if (typeof cookieStore.getAll === 'function') {
      const all = cookieStore.getAll();
      const found = Array.isArray(all) ? all.find((c: any) => c.name === 'session') : undefined;
      sessionCookie = found?.value;
    }
  }

  // Fallback: parse Cookie header
  if (!sessionCookie) {
    try {
      const h = await headers();
      const cookieHeader = (h as any).get?.('cookie') ?? (h as any)['cookie'];
      if (cookieHeader && typeof cookieHeader === 'string') {
        const match = cookieHeader.split(';').map((s: string) => s.trim()).find((s: string) => s.startsWith('session='));
        if (match) sessionCookie = match.replace('session=', '');
      }
    } catch (e) {
      // ignore
    }
  }
  if (!sessionCookie) return null; // Tidak ada sesi

  const sessionPayload = await decrypt(sessionCookie);
  
  // 'decrypt' mengembalikan payload penuh (termasuk iat/exp)
  if (!sessionPayload) {
    return null; // Token tidak valid
  }
  
  // Cek kadaluwarsa secara manual (meskipun 'jwtVerify' sudah melakukannya)
  if (sessionPayload.exp && sessionPayload.exp * 1000 < Date.now()) {
    (cookies() as any).delete("session");
    return null; 
  }

  // Kembalikan HANYA data user, bukan 'iat' atau 'exp'
  return {
    objectId: sessionPayload.objectId as string,
    email: sessionPayload.email as string,
    name: sessionPayload.name as string
  };
}