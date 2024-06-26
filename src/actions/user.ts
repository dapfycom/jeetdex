'use server';

import prisma from '@/db';
import { getSession, removeSession } from '@/utils/server-utils/sessions';
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

  const nickname = herotag ? herotag.split('.')[0] : generateRandomString(6);

  const img = '/assets/img/logo-jeeter.png';

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
  const session = await getSession();
  console.log('Get here', session);

  if (!session) {
    console.log('no session');

    return {
      error: 'No session found'
    };
  }
  try {
    console.log('updating user profile');
    const user = await prisma.users.update({
      where: {
        address: session.address
      },
      data: {
        username: username,
        bio: bio,
        img: img
      }
    });
    console.log(user);

    return user;
  } catch (error) {
    console.log(error);

    throw new Error('User failed to update');
  }
};

export const followUser = async (followedId: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('No session found');
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
  const following = user.following.find(
    (follow) => follow.followedId === followedId
  );

  if (following) {
    await prisma.follows.delete({
      where: {
        id: following.id
      }
    });

    return {
      message: 'User unfollowed'
    };
  } else {
    await prisma.follows.create({
      data: {
        followedId: followedId,
        followingId: user.id
      }
    });

    return {
      message: 'User followed'
    };
  }
};
