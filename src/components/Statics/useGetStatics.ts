import { fetchEventsApiData } from '@/services/rest/events';
import useSWR from 'swr';

const useGetStatics = () => {
  return useSWR<{
    topGainers: {
      token: string;
      pastPrice: number;
      currentPrice: number;
      percentageChange: number;
    }[];
    topLosers: {
      token: string;
      pastPrice: number;
      currentPrice: number;
      percentageChange: number;
    }[];
    volume: string;
  }>('/statistics', fetchEventsApiData);
};

export default useGetStatics;
