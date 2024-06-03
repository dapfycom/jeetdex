import { likePool } from '@/actions/preferences';
import useDisclosure from '@/hooks/useDisclosure';
import { useGetLikedPools } from '@/hooks/useGetUserSettings';
import { errorToast } from '@/utils/toast';
import { mutate } from 'swr';
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
  const {
    isOpen: clickStar,
    onToggle: onToggleStar,
    setOpen
  } = useDisclosure();

  const handleLikePool = async () => {
    try {
      onToggleStar();
      await likePool(
        pool.lpTokenIdentifier,
        pool.firstTokenId,
        pool.secondTokenId
      );
      mutate('/user/settings');
    } catch (error) {
      errorToast(error.message);
      setOpen(pool.liked);
    }
  };

  return {
    handleLikePool,
    isLiked: pool.liked || clickStar
  };
};
