'use server';

import { revalidateTag } from 'next/cache';

export const revalidatePoolsPairs = () => {
  revalidateTag('poolsPairs');
};
