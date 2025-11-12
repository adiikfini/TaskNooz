import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/nextAuthOptions";

export async function auth() {
  return await getServerSession(nextAuthOptions as any);
}
