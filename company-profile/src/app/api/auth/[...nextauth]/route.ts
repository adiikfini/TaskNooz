import NextAuth from "next-auth";
import nextAuthOptions from "@/lib/nextAuthOptions";

const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID ?? "71966029-41AC-4ADD-93F6-07BE88132275";
const BACKENDLESS_REST_KEY = process.env.BACKENDLESS_REST_API_KEY ?? "22309958-AC30-44D3-9E86-CC2190106F5D";
const BACKENDLESS_API_URL = process.env.BACKENDLESS_API_URL ?? "https://api.backendless.com";

async function backendlessLogin(email?: string, password?: string) {
  if (!email || !password) return null;
  const url = `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_KEY}/users/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: email, password }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const userToken = res.headers.get("user-token") || (data && (data['user-token'] || data['userToken']));
  return { data, userToken };
}

const handler = NextAuth(nextAuthOptions as any);

export { handler as GET, handler as POST };