import { adaptAllPairsContractData } from '@/adapters/routerAdapter';
import prisma from '@/db';
import { getFromAllTokens } from '@/services/rest/elrond/tokens';
import { scQuery } from '@/services/sc/query';
import BigNumber from 'bignumber.js';
import { unstable_cache } from 'next/cache';
import { IPoolPair } from '../../app/normie/views/PoolsView/utils/types';

export const fetchPoolsData = unstable_cache(
  async (): Promise<IPoolPair[]> => {
    const { firstValue } = await scQuery(
      'mainRouter',
      'getAllPairContractData'
    );

    console.log(firstValue.valueOf());

    const pools = adaptAllPairsContractData(firstValue.valueOf());
    const newPools: IPoolPair[] = [
      ...pools.filter((pool) => pool.lpTokenIdentifier !== '')
    ];

    const tokensIds = pools
      .map((pool) => pool.firstTokenId)
      .concat(pools.map((pool) => pool.secondTokenId));

    const uniqueTokensIds = Array.from(new Set(tokensIds));

    const tokensInfos = await getFromAllTokens([
      null,
      {
        identifiers: uniqueTokensIds.join(',')
      }
    ]);

    newPools.forEach((pool) => {
      const firstToken = tokensInfos.data.find(
        (token) => token.identifier === pool.firstTokenId
      );
      const secondToken = tokensInfos.data.find(
        (token) => token.identifier === pool.secondTokenId
      );

      pool.firstToken = firstToken;
      pool.secondToken = secondToken;

      const secondTokenReserve = new BigNumber(
        pool.secondTokenReserve
      ).dividedBy(10 ** pool.secondToken.decimals);

      console.log(secondTokenReserve.toString());

      const firstTokenReserve = new BigNumber(pool.firstTokenReserve).dividedBy(
        10 ** pool.firstToken.decimals
      );

      console.log(firstTokenReserve.toString());

      const price = secondTokenReserve
        .dividedBy(firstTokenReserve)
        .multipliedBy(secondToken.price)
        .toNumber();

      console.log(price);

      pool.firstTokenJeetdexPrice = price;
    });

    console.log(newPools);

    return newPools;
  },
  ['poolsPairs'],
  {
    tags: ['poolsPairs']
  }
);

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

export const fetchUsersData = unstable_cache(
  async () => {
    const users = await prisma.users.findMany({
      select: {
        _count: {
          select: {
            likesReceived: true
          }
        },
        bio: true,
        id: true,
        username: true,
        img: true,
        followed: {
          include: {
            followed: true,
            following: true
          }
        },
        following: {
          include: {
            followed: true,

            following: true
          }
        },
        address: true
      }
    });
    console.log(users);

    return users;
  },
  ['users'],
  {
    tags: ['users']
  }
);
