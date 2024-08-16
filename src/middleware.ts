import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/auth';

export async function middleware(request: NextRequest) {
  try {
    const isAuthenticated = await verifyToken();
    console.log('isAuthenticated', isAuthenticated);

    if (!isAuthenticated) {
      request.cookies.delete('access');
      request.cookies.delete('refresh');
      return NextResponse.rewrite(new URL('/login', request.url));
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
