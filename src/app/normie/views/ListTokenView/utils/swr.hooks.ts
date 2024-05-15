import pairContractAbi from '@/assets/abis/pair-full.abi.json';
import { useAppSelector } from '@/hooks';
import {
  fetchScSimpleData,
  fetchScSimpleDataWithContract
} from '@/services/sc/query';
import { Address, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import useSWR from 'swr';
import { selectToken1, selectToken2 } from './slice';

export const useGetAllowedPoolTokens = () => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    {
      identifier: string;
      decimals: number;
    }[]
  >('mainRouter:getAllowedTokensForPairs', async (key: string) => {
    const data: any = await fetchScSimpleData(key);

    return data.map((token) => {
      return {
        identifier: token[0],
        minimumToLock: token[1].toNumber()
      };
    });
  });

  return {
    allowedPoolTokens: data || [],
    isLoading,
    error,
    isValidating,
    mutate
  };
};

export const useGetPoolPair = () => {
  const token1 = useAppSelector(selectToken1);
  const token2 = useAppSelector(selectToken2);
  const { data, error, isValidating, isLoading, mutate } = useSWR<string>(
    token1.length !== 0 && token2.length !== 0
      ? `mainRouter:getPair:${token1}:${token2}`
      : null,
    async (key: string) => {
      const data: any = await fetchScSimpleData(key, [
        new TokenIdentifierValue(token1),
        new TokenIdentifierValue(token2)
      ]);

      return data.bech32();
    }
  );

  const finalData = data || Address.Zero().bech32();
  return {
    pair: finalData,
    tokens: {
      token1,
      token2
    },
    isLoading,
    error,
    isValidating,
    mutate,
    exists: finalData !== Address.Zero().bech32()
  };
};

export const useGetLpIdentifier = (pairAddress: string) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<string>(
    pairAddress !== Address.Zero().bech32()
      ? `${pairAddress}:getLpTokenIdentifier`
      : null,
    async (key: string) => {
      const data: any = await fetchScSimpleDataWithContract(
        key,
        pairContractAbi
      );

      return data;
    }
  );

  return {
    lpIdentifier: data || '',
    isLoading,
    error,
    isValidating,
    mutate
  };
};
