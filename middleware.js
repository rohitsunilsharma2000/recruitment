import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token') || '';  // Get token from cookies or default to empty string


  // Redirect if no token is found and trying to access protected routes
  if (!token && !req.url.includes('/authentication/card/sign-in')) {
    return NextResponse.redirect(new URL('/authentication/card/sign-in', req.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

// Configure the routes to apply middleware only on protected routes
export const config = {
  matcher: ['/', '/dashboard', '/interviews', '/job-openings'], // Protected routes, including the root page
};
