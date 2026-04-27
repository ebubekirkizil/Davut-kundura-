import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  // Admin rotaları koruma
  const isAdminRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/orders") ||
    nextUrl.pathname.startsWith("/inventory") ||
    nextUrl.pathname.startsWith("/crm") ||
    nextUrl.pathname.startsWith("/settings");

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Giriş yapmış admin'i login sayfasından ana panele yönlendir
  if (nextUrl.pathname === "/admin/login" && isLoggedIn && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/inventory/:path*",
    "/crm/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};
