import { fetchAxiosJeetdex } from '@/services/rest/api';
import useSWR from 'swr';

export const useGetCoins = (tokenIdentifier) => {
  const {
    data: coinRes,
    mutate,
    error,
    isLoading
  } = useSWR<{
    data: {
      id: string;
      identifier: string;
      img: string;
      ownerId: string;
      twitter?: string;
      telegram?: string;
      website?: string;
      title?: string;
      description?: string;
    };
  }>(tokenIdentifier ? `/coins/${tokenIdentifier}` : null, fetchAxiosJeetdex);

  return {
    coinRes,
    mutate,
    error,
    isLoading
  };
};
