'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function createSiteModeCookie(mode: 'normie' | 'degen') {
  createCookie('site-mode', mode);
}

export async function createAlreadyProfiledCookie(address: string) {
  createCookie('already-profiled', address);
}

export async function createAuthTokenCookie(token: string) {
  createCookie('auth-token', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
  });
}

export async function createCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) {
  cookies().set(key, value, options);
}
