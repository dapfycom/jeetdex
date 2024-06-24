'use server';

import prisma from '@/db';
import { fetchTokenById } from '@/services/rest/elrond/tokens';
import { getSession } from '@/utils/server-utils/sessions';
import { revalidateTag } from 'next/cache';

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

  const tokenDetails = await fetchTokenById(identifier);

  if (tokenDetails.owner !== address) {
    throw new Error('You are not the owner of this token');
  }

  const coin = await prisma.coins.upsert({
    create: {
      identifier,
      title,
      description,
      twitter,
      telegram,
      website,
      owner: {
        connect: {
          address: address
        }
      }
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

  revalidateTag('CoinsPairs');

  return coin;
};
