'use server';

import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export const addSocialsCoin = async ({
  identifier,
  title,
  description,
  twitter,
  telegram,
  website
}) => {
  console.log(identifier);

  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  const { address } = session;

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      address: address,
      coins: {
        some: {
          identifier
        }
      }
    }
  });

  const coin = await prisma.coins.upsert({
    create: {
      identifier,
      title,
      description,
      twitter,
      telegram,
      website,
      ownerId: user.id
    },
    update: {
      title,
      description,
      twitter,
      telegram,
      website
    },
    where: {
      identifier
    }
  });

  return coin;
};
