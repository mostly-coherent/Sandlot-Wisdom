import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Session duration: 2 days (rolling — refreshed on every authenticated request)
const SESSION_MAX_AGE = 60 * 60 * 24 * 2; // 2 days in seconds

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/api/login',       // Login endpoint
  '/api/logout',      // Logout endpoint
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('sandlot-wisdom-auth');
  const isAuthenticated = authCookie?.value === 'authenticated';

  // If not authenticated and trying to access protected route
  if (!isAuthenticated && !pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page, redirect to home
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rolling session: refresh cookie on every authenticated request
  if (isAuthenticated) {
    const response = NextResponse.next();
    response.cookies.set('sandlot-wisdom-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

