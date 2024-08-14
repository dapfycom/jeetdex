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
  website,
  tokenIdentifier
}: {
  identifier: string;
  title: string;
  description: string;
  twitter: string;
  telegram: string;
  website: string;
  tokenIdentifier?: string;
}) => {
  const tokenId = tokenIdentifier ?? identifier;
  console.log(tokenId);

  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  const { address } = session;

  // If there is no token identifier means is on normie mode because token identifier is only used on degen mode
  if (!tokenIdentifier) {
    const tokenDetails = await fetchTokenById(tokenId);

    if (tokenDetails.owner !== address) {
      throw new Error('You are not the owner of this token');
    }
  } else {
    const coin = await prisma.coins.findUnique({
      where: {
        identifier: tokenId
      },
      select: {
        owner: true
      }
    });

    if (coin.owner.address !== address) {
      throw new Error('You are not the owner of this token');
    }
  }

  try {
    const coin = await prisma.coins.upsert({
      create: {
        identifier: tokenId,
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
        identifier: tokenId,
        title,
        description,
        twitter,
        telegram,
        website
      },
      where: {
        identifier: tokenId
      }
    });

    revalidateTag('CoinsPairs');

    return coin;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const degenNewCoin = async ({
  name,
  description,
  telegram,
  twitter,
  website,
  image,
  degenId
}) => {
  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  try {
    const coin = await prisma.coins.findFirst({
      where: {
        img: image
      }
    });

    if (coin) {
      return coin;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  try {
    const coin = await prisma.coins.create({
      data: {
        identifier: degenId,
        title: name,
        description,
        twitter,
        telegram,
        website,
        img: image,
        degenId,
        owner: {
          connect: {
            address: session.address
          }
        }
      }
    });
    return coin;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const addImageToDegenCoin = async ({ identifier, image }) => {
  try {
    const coin = await prisma.coins.update({
      where: {
        identifier
      },
      data: {
        img: image
      }
    });
    return coin;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCoinIdentifier = async (
  tokenIdentifier: string,
  id: string
) => {
  return await prisma.coins.update({
    data: {
      identifier: tokenIdentifier
    },
    where: {
      id: id
    }
  });
};
