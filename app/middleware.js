// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("authToken"); // Assuming you're storing the auth token in cookies.

//   // If the user is not logged in and tries to access /dashboard, redirect to /login
//   if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
//     const loginUrl = new URL("/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],

import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
