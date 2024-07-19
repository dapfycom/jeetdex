import { fetchAxiosJeetdex } from '@/services/rest/api';
import { fetchAllBondingData } from '@/services/sc/degen_master/queries';
import { IBoundingData } from '@/types/degenMasterTypes';
import useSWR from 'swr';

type Coin = {
  id: string;
  identifier: string;
  img: string | null;
  ownerId: string;
  twitter: string | null;
  telegram: string | null;
  website: string | null;
  title: string | null;
  description: string | null;
  degenId: string | null;
};

type Bonding = Coin & {
  owner: {
    id: string;
    username: string;
    address: string;
  };
};
// backend
export const useFetchExtraCoinInfo = (boundingLength) => {
  const { data, error, isLoading, mutate } = useSWR<{
    data: Bonding[];
  }>(boundingLength ? `/coins/degen/${boundingLength}}` : null, async () => {
    return await fetchAxiosJeetdex<{
      data: Bonding[];
    }>('/coins/degen/');
  });

  return {
    coinsInfo: data?.data || [],
    error,
    isLoading,
    mutate
  };
};

// sc
export const useFetchAllBondingData = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'degenMaster:getAllBondingData',
    fetchAllBondingData
  );

  return {
    boundingData: data || [],
    error,
    isLoading,
    mutate
  };
};
export type BondingData = IBoundingData & Bonding;
export const useFetchCoinsData = () => {
  const {
    boundingData,
    isLoading: isLoadingBoundingData,
    error: errorBoundingData,
    mutate: BoundingData
  } = useFetchAllBondingData();

  const {
    coinsInfo,
    error: errorCoinsInfo,
    isLoading: isLoadingCoinsInfo,
    mutate: mutateCoinsInfo
  } = useFetchExtraCoinInfo(boundingData.length);

  const coinsData: BondingData[] = boundingData
    .map((item) => {
      const coin = coinsInfo.find((coin) => coin.degenId === item.dbId);
      return {
        ...item,
        ...coin
      };
    })
    .filter((item) => !!item.degenId);

  return {
    coinsData,
    error: errorBoundingData || errorCoinsInfo,
    isLoading: isLoadingBoundingData || isLoadingCoinsInfo,
    mutate: () => {
      BoundingData();
      mutateCoinsInfo();
    }
  };
};
