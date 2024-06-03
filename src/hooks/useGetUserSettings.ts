import { fetchAxiosJeetdex } from '@/services/rest/api';
import useSWR from 'swr';

export const useGetUserSettings = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    data: {
      id: string;
      slippage: number;
      userId: string;
    };
  }>('/user/settings', fetchAxiosJeetdex);

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
