import { useAppSelector } from '@/hooks';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { fetchAmountOut } from '@/services/sc/bonding/queries';
import BigNumber from 'bignumber.js';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useFetchCoinsData } from '../../hooks';

const swrMainKey = 'bonding_sc';

export const useGetBoundingPair = () => {
  const { address } = useParams();

  const { coinsData, error, isLoading } = useFetchCoinsData();

  const coin = coinsData.find((coin) => coin.address === address);

  return {
    coin,
    error,
    isLoading
  };
};

export const useGetBoundingPairByUser = (customAddress?: string) => {
  const address = useAppSelector(selectUserAddress);

  const { coinsData, error, isLoading } = useFetchCoinsData();

  const coins = coinsData.filter(
    (coin) => coin.owner.address === (customAddress || address)
  );

  return {
    coins,
    error,
    isLoading
  };
};

export const useGetAmountOut = (
  address: string,
  amountIn: string,
  tokenIn: string
) => {
  const swrKey =
    address && amountIn && tokenIn && new BigNumber(amountIn).gt(0)
      ? `${swrMainKey}:getAmountOut:${address}:${amountIn}:${tokenIn}`
      : null;

  const { data, error, isLoading, mutate } = useSWR(swrKey, async () => {
    return fetchAmountOut({
      address,
      amountIn,
      tokenIn
    });
  });

  return {
    amountOut: data || '',
    error,
    isLoading,
    mutate
  };
};

export const useIsMaxCap = () => {
  const { coin, error, isLoading } = useGetBoundingPair();

  return {
    isMaxCap: coin?.state === 'Finished',
    error,
    isLoading
  };
};
