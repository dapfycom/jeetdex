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

    const pools = adaptAllPairsContractData(firstValue.valueOf());
    console.log(pools);

    const newPools: IPoolPair[] = [
      ...pools.filter((pool) => pool.lpTokenSupply !== '0')
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

      const firstTokenReserve = new BigNumber(pool.firstTokenReserve).dividedBy(
        10 ** pool.firstToken.decimals
      );

      const price = secondTokenReserve
        .dividedBy(firstTokenReserve)
        .multipliedBy(secondToken.price)
        .toNumber();

      pool.firstTokenJeetdexPrice = price;
      pool.ratio = secondTokenReserve.dividedBy(firstTokenReserve).toString();
    });

    return newPools;
  },
  ['poolsPairs'],
  {
    tags: ['poolsPairs'],
    revalidate: 60 * 60 * 1 // 1 hours
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
    tags: ['CoinsPairs'],
    revalidate: 60 * 60 * 6 // 6 hours
  }
);

export const fetchUsersData = unstable_cache(
  async () => {
    try {
      const users = await prisma.users.findMany();

      return users;
    } catch (error) {
      console.log(error);
    }
  },
  ['users'],
  {
    tags: ['users'],
    revalidate: 60 * 60 * 6 // 6 hours
  }
);

export const fetchSingleUserData = unstable_cache(
  async (id: string) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id
        }
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  ['single-users'],
  {
    tags: ['single-users']
  }
);
