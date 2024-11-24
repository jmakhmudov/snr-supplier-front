import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser, refreshToken, verifyToken } from './utils/api/auth';
import { User } from './types';

export async function middleware(request: NextRequest) {
  try {
    const isAuthenticated = await verifyToken(request.cookies.get('access_sup')?.value as string);
    console.log('user');
    const user: User = await getUser();

    if (!isAuthenticated) {
      const token = await refreshToken(request.cookies.get('refersh_sup')?.value as string);

      if (!token) {
        request.cookies.delete('access_sup');
        request.cookies.delete('refersh_sup');
        return NextResponse.rewrite(new URL('/login', request.url));
      }

      const response = NextResponse.next();

      response.cookies.set('access_sup', token, {
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
    request.cookies.delete('access_sup');
    request.cookies.delete('refersh_sup');
    return NextResponse.rewrite(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|signup|media|images).*)(.+)',
    '/'
  ],
};
