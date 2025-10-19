import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/actions';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- NEW FIX ---
  // Manually ignore all API routes to prevent an infinite loop.
  // This includes the health check (/api/health) and auth routes.
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  // --- END FIX ---

  const user = await getCurrentUser();
  const publicRoutes = ['/sign-in', '/sign-up'];

  if (user && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!user && !publicRoutes.includes(pathname)) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Your original matcher is fine, but the check above is more explicit.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
  runtime: 'nodejs',
};