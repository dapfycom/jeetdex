import prisma from '@/db';
import { unstable_cache } from 'next/cache';

export const fetchCoinsData = unstable_cache(
  async (): Promise<
    ({
      owner: {
        id: string;
        username: string;
        address: string;
        img: string;
        bio: string;
        createdAt: Date;
        updatedAt: Date;
      };
    } & {
      id: string;
      identifier: string;
      img: string;
      ownerId: string;
    })[]
  > => {
    const coins = await prisma.coins.findMany({
      include: {
        owner: true
      }
    });

    return coins;
  },
  ['CoinsPairs'],
  {
    tags: ['CoinsPairs']
  }
);
