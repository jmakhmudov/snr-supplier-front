import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshToken, verifyToken } from './utils/api/auth';

export async function middleware(request: NextRequest) {
  try {
    const isAuthenticated = await verifyToken(request.cookies.get('access')?.value as string);
    console.log('isAuthenticated', isAuthenticated);

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
  } catch (error) {
    console.error('Middleware error:', error);
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|signup|images).*)(.+)',
    '/'
  ],
};
