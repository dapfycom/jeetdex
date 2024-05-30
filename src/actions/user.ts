'use server';

import prisma from '@/db';
import { getSession, removeSession } from '@/utils/server-utils/sessions';
import { generateRandomString } from '@/utils/strings';
import { revalidatePath } from 'next/cache';
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
  console.log('createProfile', session, alreadyProfileCookie);

  if (!session || address !== session.address) {
    return;
  }

  if (alreadyProfileCookie?.value === address) {
    return;
  }

  const nickname = herotag || generateRandomString(6);

  const img = '/assets/img/logo-jeeter.png';

  console.log('Creating profile for', address, nickname, img);

  try {
    await prisma.users.create({
      data: {
        address: address,
        username: nickname,
        img: img
      }
    });

    createAlreadyProfiledCookie(address);
  } catch (error) {
    console.log('Error creating profile', error);
  }
};

export const logoutFromSession = () => {
  removeSession();
};

export const updateUserProfile = async ({
  username,
  bio,
  img
}: {
  username: string;
  bio?: string;
  img?: string;
}) => {
  console.log('updateUserProfile', username, bio, img);

  const session = await getSession();
  console.log(session);

  if (!session) {
    return {
      error: 'No session found'
    };
  }

  await prisma.users.update({
    where: {
      address: session.address
    },
    data: {
      username: username,
      bio: bio,
      img: img
    }
  });

  console.log('Profile updated');

  revalidatePath('/profile');
};
