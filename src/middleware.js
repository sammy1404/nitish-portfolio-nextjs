import { NextResponse } from "next/server";

export function middleware(req) {
  // Read the "auth" cookie
  const authCookie = req.cookies.get("auth");

  // Define protected routes (customize this based on your needs)
  const protectedRoutes = ["/admin", "/dashboard"];

  // Check if the user is trying to access a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
    }
  }

  return NextResponse.next(); // Continue if authenticated
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // Adjust this based on your protected routes
};
