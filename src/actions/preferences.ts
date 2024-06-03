'use server';

import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';

export const updateSlippage = async (slippage: number) => {
  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  const { address } = session;

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      address: address
    }
  });

  await prisma.userSettings.upsert({
    create: {
      slippage,
      user: {
        connect: {
          address
        }
      }
    },
    update: {
      slippage
    },
    where: {
      userId: user.id
    }
  });
};

export const likePool = async (
  poolIdentifier: string,
  token1: string,
  token2: string
) => {
  const session = await getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  const { address } = session;
  const user = await prisma.users.findUniqueOrThrow({
    where: {
      address: address
    }
  });
  console.log(poolIdentifier);

  const poolLike = await prisma.poolsLikes.findFirst({
    where: {
      pool: {
        lpIdentifier: poolIdentifier
      },
      userSetting: {
        userId: user.id
      }
    }
  });

  console.log(poolLike);

  if (!poolLike) {
    await prisma.poolsLikes.create({
      data: {
        pool: {
          connectOrCreate: {
            create: {
              lpIdentifier: poolIdentifier,
              token1,
              token2
            },
            where: {
              lpIdentifier: poolIdentifier
            }
          }
        },
        userSetting: {
          connect: {
            userId: user.id
          }
        }
      }
    });

    return { message: `Pool ${poolIdentifier} liked` };
  } else {
    await prisma.poolsLikes.delete({
      where: {
        id: poolLike.id
      }
    });

    return { message: `Pool ${poolIdentifier} unliked` };
  }
};
