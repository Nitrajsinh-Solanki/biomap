// biomap\src\middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isPublicPath = 
    path === '/' || 
    path === '/login' || 
    path === '/register' || 
    path === '/verify-otp' || 
    path.startsWith('/api/');
  
  const token = request.headers.get('Authorization')?.split(' ')[1] || '';
  
  const cookieToken = request.cookies.get('token')?.value;
  
  const hasToken = token || cookieToken;

  if (!isPublicPath && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((path === '/login' || path === '/register' || path === '/verify-otp') && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/verify-otp',
    '/dashboard/:path*',
  ],
};
