'use server';

import prisma from '@/db';
import { getSession, removeSession } from '@/utils/server-utils/sessions';
import { generateRandomString } from '@/utils/strings';
import { revalidatePath, revalidateTag } from 'next/cache';
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
  revalidateTag('CoinsPairs');
};

export const followUser = async (followedId: string) => {
  const session = await getSession();
  console.log(session);

  if (!session) {
    return {
      error: 'No session found'
    };
  }
  const user = await prisma.users.findUnique({
    where: {
      address: session.address
    },
    include: {
      following: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if is the same user
  if (user.id === followedId) {
    throw new Error('You cannot follow yourself');
  }

  // Check if user is already following
  const isFollowing = user.following.some(
    (follow) => follow.followedId === followedId
  );

  if (isFollowing) {
    throw new Error('You are already following this user');
  }

  await prisma.follows.create({
    data: {
      followedId: followedId,
      followingId: user.id
    }
  });

  console.log('User followed');

  revalidateTag('users');
};
