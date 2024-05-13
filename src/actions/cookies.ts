'use server';

import { cookies } from 'next/headers';

export async function createSiteModeCookie(mode: 'normie' | 'degen') {
  cookies().set('site-mode', mode);
}
