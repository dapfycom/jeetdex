import { IElrondToken } from '@/types/scTypes';
import useSWR from 'swr';

export const useSearchToken = (tokens: IElrondToken[], searchKey: string) => {
  let filteredTokens: IElrondToken[] = [];

  if (searchKey === '') {
    filteredTokens = tokens;
  } else {
    filteredTokens = tokens.filter((token) => {
      return (
        token.ticker.toString().toLowerCase().indexOf(searchKey.toLowerCase()) >
        -1
      );
    });
  }
  return filteredTokens;
};

export const useGetSwapbleAggregatorTokens = () => {
  const { data, error, isLoading } = useSWR('/tokens');

  return {
    ashTokens: data || [],
    error,
    isLoading
  };
};
