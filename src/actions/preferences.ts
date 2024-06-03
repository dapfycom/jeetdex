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
