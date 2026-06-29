import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthPath, isProtectedPath, SESSION_COOKIE } from "@/lib/auth/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (isProtectedPath(pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isAuthPath(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/copilot/:path*",
    "/prd/:path*",
    "/analytics/:path*",
    "/onboarding",
    "/login",
    "/signup",
  ],
};
