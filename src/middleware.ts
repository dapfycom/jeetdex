import { isPathOrSubpath } from '@/utils/urls';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { siteModes } from './localConstants/globals';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  if (
    isPathOrSubpath(pathname, [
      '/manifest.json',
      '/sitemap.xml',
      '/feed.xml',
      '/robots.txt',
      '/favicon.ico',
      '/assets'

      // Your other files in `public`
    ])
  ) {
    return NextResponse.next();
  }

  if (process.env.DEGEN_MODE !== 'true') {
    const pathnameIsMissingSiteMode =
      !pathname.startsWith(`/normie/`) && pathname !== `/normie`;
    // Redirect if there is no locale
    if (pathnameIsMissingSiteMode) {
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(
        new URL(
          `/normie${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
          request.url
        )
      );
    }
  } else {
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingSiteMode = siteModes.every(
      (mode) => !pathname.startsWith(`/${mode}/`) && pathname !== `/${mode}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingSiteMode) {
      const cookie = request.cookies.get('site-mode');
      const mode = cookie?.value || 'degen';

      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(
        new URL(
          `/${mode}${pathname.startsWith('/') ? '' : '/'}${pathname}${search}`,
          request.url
        )
      );
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
