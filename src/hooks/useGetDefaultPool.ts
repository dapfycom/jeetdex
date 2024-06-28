import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { tokensID } from '@/config';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { useAppSelector } from './useRedux';

const useGetDefaultPool = (poolPair: IPoolPair) => {
  const global = useAppSelector(selectGlobalData);

  const poolsInfo = global.pools;

  if (poolPair) {
    return poolPair;
  } else {
    return poolsInfo.find(
      (p) =>
        p.firstTokenId === tokensID.bsk && p.secondTokenId === tokensID.jeet
    );
  }
};

export default useGetDefaultPool;
