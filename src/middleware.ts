import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow all routes - no authentication required
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};