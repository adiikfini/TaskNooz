import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware that allows requests to continue.
// Update or remove this file if you need custom routing or proxy behavior.
export function middleware(request: NextRequest) {
	return NextResponse.next();
}

export const config = {
	matcher: "/(.*)",
};
