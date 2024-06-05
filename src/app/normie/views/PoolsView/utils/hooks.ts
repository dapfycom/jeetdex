import { likePool } from '@/actions/preferences';
import { useGetLikedPools } from '@/hooks/useGetUserSettings';
import { generateRandomString } from '@/utils/strings';
import { errorToast } from '@/utils/toast';
import { IPoolPair } from './types';

export const useListPools = (
  pools: IPoolPair[]
): (IPoolPair & { liked: boolean })[] => {
  const { likedPools } = useGetLikedPools();
  console.log(likedPools);

  const likedPoolIdentifiers = likedPools.map((lp) => lp.pool.lpIdentifier);
  const liked = pools
    .filter((pool) => likedPoolIdentifiers.includes(pool.lpTokenIdentifier))
    .map((pool) => ({ ...pool, liked: true }));
  const notLiked = pools
    .filter((pool) => !likedPoolIdentifiers.includes(pool.lpTokenIdentifier))
    .map((pool) => ({ ...pool, liked: false }));

  return [...liked, ...notLiked];
};

export const useLikePool = (pool: IPoolPair & { liked: boolean }) => {
  const { mutate, settings } = useGetLikedPools();

  const handleLikePool = async () => {
    try {
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
        ...settings,
        pools: [...settings.pools, newLikedPool]
      };
      if (pool.liked) {
        data = {
          ...settings,
          pools: [
            ...settings.pools.filter(
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
