import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Public admin creation and login pages. Backend owns the DB role decision.
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/register" || pathname.startsWith("/admin/register/")) {
    return NextResponse.next();
  }

  // Protect every /admin page, including the root /admin entry.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const jwt = request.cookies.get("jwt")?.value;
    const role = (request.cookies.get("role")?.value || "").toLowerCase();

    if (!jwt || !["admin", "superAdmin"].includes(role)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
