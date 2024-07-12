import { fetchAxiosJeetdex } from '@/services/rest/api';
import useSWR from 'swr';
import { useAuthentication } from './useAuthentication';

export const useGetUserSettings = () => {
  const { isLoggedIn } = useAuthentication();
  const { data, error, isLoading, mutate } = useSWR<{
    data: {
      id: string;
      slippage: number;
      userId: string;
      pools: {
        id: string;
        pool: {
          lpIdentifier: string;
          token1: string;
          token2: string;
        };
      }[];
    };
  }>(isLoggedIn ? '/user/settings' : null, fetchAxiosJeetdex);

  return {
    settings: data?.data,
    error,
    isLoading,
    mutate
  };
};

export const useGetSlippage = () => {
  const settings = useGetUserSettings();

  return {
    ...settings,
    slippage: settings.settings?.slippage || 5
  };
};

export const useGetLikedPools = () => {
  const settings = useGetUserSettings();

  return {
    ...settings,
    likedPools: settings.settings?.pools || []
  };
};
