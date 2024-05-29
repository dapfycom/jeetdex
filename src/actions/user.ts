'use server';

import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';
import { generateRandomString } from '@/utils/strings';
import { cookies } from 'next/headers';
import { createAlreadyProfiledCookie } from './cookies';

export const createProfile = async ({
  address,
  herotag
}: {
  address: string;
  herotag?: string;
}) => {
  const session = await getSession();
  const alreadyProfileCookie = cookies().get('already-profiled');

  if (!session || address !== session.address) {
    return;
  }

  if (alreadyProfileCookie?.value === address) {
    return;
  }

  console.log('Creating profile for', address);

  const nickname = herotag || generateRandomString(6);

  const img = '/assets/img/logo-jeeter.png';

  await prisma.users.create({
    data: {
      address: address,
      username: nickname,
      img: img
    }
  });

  createAlreadyProfiledCookie(address);
};
