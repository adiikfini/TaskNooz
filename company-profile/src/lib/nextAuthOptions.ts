import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
// Accept either BACKENDLESS_REST_API_KEY or BACKENDLESS_API_KEY for compatibility
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? process.env.BACKENDLESS_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

async function backendlessLogin(email?: string, password?: string) {
  if (!email || !password) return null;
  const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/users/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: email, password }),
  });
  // If login failed, log response body to help debugging (401/403 etc.)
  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch (e) {
      try { body = await res.text(); } catch (e) { body = null; }
    }
    console.error('[auth] Backendless login failed', { status: res.status, body, url });
    return null;
  }
  const data = await res.json();
  const userToken = res.headers.get("user-token") || (data && (data['user-token'] || data['userToken']));
  return { data, userToken };
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await backendlessLogin(credentials?.email, credentials?.password);
        if (!result) return null;
        const { data, userToken } = result as any;
        return {
          id: data.objectId || data.objectID || data.object_id || data.userId || data.objectId,
          name: data.name || data.email,
          email: data.email,
          backendlessToken: userToken,
          // Ensure we surface any role returned by Backendless so NextAuth callbacks can map it into the session
          role: data.role ?? data.userRole ?? (Array.isArray(data.roles) ? data.roles[0] : undefined),
          backendlessUser: data,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        token.backendlessToken = (user as any).backendlessToken;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).backendlessToken = token.backendlessToken as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
};

export default nextAuthOptions;
