import { isPathOrSubpath } from '@/utils/urls';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { siteModes } from './localConstants/globals';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Device detection
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);

  if (
    isPathOrSubpath(pathname, [
      '/manifest.json',
      '/sitemap.xml',
      '/feed.xml',
      '/robots.txt',
      '/favicon.ico',
      '/assets',
      '/static',
      '/admin-jeeter',
      '/api'
      // Your other files in `public`
    ])
  ) {
    const response = NextResponse.next();
    response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
    return response;
  }

  if (process.env.DEGEN_MODE !== 'true') {
    const pathnameIsMissingSiteMode =
      !pathname.startsWith(`/normie/`) && pathname !== `/normie`;
    // Redirect if there is no locale
    if (pathnameIsMissingSiteMode) {
      const response = NextResponse.redirect(
        new URL(
          `/normie${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
          request.url
        )
      );
      response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
      return response;
    }
  } else {
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingSiteMode = siteModes.every(
      (mode) => !pathname.startsWith(`/${mode}/`) && pathname !== `/${mode}`
    );
    console.log(pathnameIsMissingSiteMode);

    // Redirect if there is no locale
    if (pathnameIsMissingSiteMode) {
      const cookie = request.cookies.get('site-mode');
      const mode = cookie?.value || 'degen';

      const response = NextResponse.redirect(
        new URL(
          `/${mode}${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
          request.url
        )
      );
      response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop');
  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
