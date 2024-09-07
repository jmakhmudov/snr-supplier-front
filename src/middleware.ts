import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser, refreshToken, verifyToken } from './utils/api/auth';

export async function middleware(request: NextRequest) {
  try {
    const isAuthenticated = await verifyToken(request.cookies.get('access')?.value as string);
    console.log('isAuthenticated', isAuthenticated);
    const user = await getUser();

    if (!isAuthenticated) {
      const token = await refreshToken(request.cookies.get('refresh')?.value as string);

      if (!token) {
        request.cookies.delete('access');
        request.cookies.delete('refresh');
        return NextResponse.rewrite(new URL('/login', request.url));
      }

      const response = NextResponse.next();

      response.cookies.set('access', token, {
        httpOnly: true,
        path: '/',
      });

      return response;
    }
    if (!user.company) {
      const url = request.nextUrl.pathname;

      if (url.startsWith('/join/')) {
        return NextResponse.next();
      }
      
      return NextResponse.rewrite(new URL('/waiting', request.url));
    }
  } catch (error) {
    console.error('Middleware error:', error);
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|signup|media|images).*)(.+)',
    '/'
  ],
};
