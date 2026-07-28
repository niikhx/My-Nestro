import { NextResponse } from "next/server";

export function proxy(request) {
  // Get token from cookie
  const token = request.cookies.get("jwt")?.value;

  const { pathname } = request.nextUrl;
  // Protected routes
  const protectedRoutes = ["/checkout", "/profile"];

  const isProtected = protectedRoutes.includes(pathname);

  // If user is not logged in
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*"],
};