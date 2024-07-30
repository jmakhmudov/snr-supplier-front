import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/auth';

const API_URL = process.env.API_URL;

export async function middleware(request: NextRequest) {
  const isAuthenticated = await verifyToken();
  console.log('isAuthenticated', isAuthenticated);
  
  if (!isAuthenticated) {
    request.cookies.delete('access');
    request.cookies.delete('refresh');
    return NextResponse.rewrite(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|signup|images).*)(.+)',
    '/'
  ],
};
