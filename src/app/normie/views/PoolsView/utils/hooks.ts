import { likePool } from '@/actions/preferences';
import { useAppSelector } from '@/hooks';
import { useGetLikedPools } from '@/hooks/useGetUserSettings';
import { generateRandomString } from '@/utils/strings';
import { errorToast } from '@/utils/toast';
import { selectSearchPoolsInput } from './pools-slice';
import { IPoolPair } from './types';

export const useListPools = (
  pools: IPoolPair[]
): (IPoolPair & { liked: boolean })[] => {
  const { likedPools } = useGetLikedPools();

  const likedPoolIdentifiers = likedPools.map((lp) => lp.pool.lpIdentifier);
  const liked = pools
    .filter((pool) => likedPoolIdentifiers.includes(pool.lpTokenIdentifier))
    .map((pool) => ({ ...pool, liked: true }));
  const notLiked = pools
    .filter((pool) => !likedPoolIdentifiers.includes(pool.lpTokenIdentifier))
    .map((pool) => ({ ...pool, liked: false }));

  return [...liked, ...notLiked];
};

export const useSearchPool = (pools: (IPoolPair & { liked: boolean })[]) => {
  const searchInput = useAppSelector(selectSearchPoolsInput);

  const filteredPools = pools.filter((pool) => {
    const poolName = `${pool.firstToken.ticker}-${pool.secondToken.ticker}-${pool.lpTokenIdentifier}`;
    return poolName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return filteredPools;
};

export const useLikePool = (pool: IPoolPair & { liked: boolean }) => {
  const { mutate, settings } = useGetLikedPools();

  const handleLikePool = async () => {
    try {
      const newSettings = settings || {
        id: generateRandomString(10),
        pools: [],
        slippage: 5,
        userId: generateRandomString(10)
      };
      const newLikedPool = {
        id: generateRandomString(10),
        userSettingId: generateRandomString(10),
        poolId: generateRandomString(10),
        pool: {
          id: generateRandomString(10),
          lpIdentifier: pool.lpTokenIdentifier,
          token1: pool.firstTokenId,
          token2: pool.secondTokenId
        }
      };
      let data = {
        ...newSettings,
        pools: [...newSettings.pools, newLikedPool]
      };
      if (pool.liked) {
        data = {
          ...newSettings,
          pools: [
            ...newSettings.pools.filter(
              (p) => p.pool.lpIdentifier !== pool.lpTokenIdentifier
            )
          ]
        };
      }

      mutate(
        async () => {
          await likePool(
            pool.lpTokenIdentifier,
            pool.firstTokenId,
            pool.secondTokenId
          );

          return {
            data: data
          };
        },
        {
          optimisticData: { data: data },
          rollbackOnError: true,
          populateCache: true,
          revalidate: false
        }
      );
    } catch (error) {
      errorToast(error.message);
    }
  };

  return {
    handleLikePool,
    isLiked: pool.liked
  };
};
