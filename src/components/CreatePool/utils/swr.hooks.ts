import { useAppSelector } from '@/hooks';
import { pairContractAbi } from '@/localConstants/globals';
import { fetchElrondData } from '@/services/rest/elrond';
import { fetchTransactions } from '@/services/rest/elrond/transactions';
import {
  fetchScSimpleData,
  fetchScSimpleDataWithContract
} from '@/services/sc/query';
import { ITransaction } from '@/types/scTypes';
import { Address, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import useSWR from 'swr';
import { IAccountRoles } from '../components/SetLocalRoles/SetLocalRoles';
import { fetchNewPairFee } from './sc.queries';
import { selectToken1, selectToken2 } from './slice';

export const useGetAllowedPoolTokens = () => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    {
      identifier: string;
      minimumToLock: number;
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

export const useGetPoolPair = (token1Arg?: string, token2Arg?: string) => {
  const token1Redux = useAppSelector(selectToken1);
  const token2Redux = useAppSelector(selectToken2);

  const token1 = token1Arg || token1Redux;
  const token2 = token2Arg || token2Redux;

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
  const { data, error, isValidating, isLoading, mutate } = useSWR(
    pairAddress !== Address.Zero().bech32()
      ? `${pairAddress}:getLpTokenIdentifier`
      : null,
    async (key: string) => {
      const data = await fetchScSimpleDataWithContract<string>(
        key,
        pairContractAbi
      );

      return data;
    }
  );

  return {
    lpIdentifier: data?.data || '',
    isLoading,
    error,
    isValidating,
    mutate
  };
};

export const useGetNewPairFee = () => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<string>(
    'mainRouter:getNewPairFee',
    fetchNewPairFee
  );

  return {
    newPairFee: data || '0',
    isLoading,
    error,
    isValidating,
    mutate
  };
};

export const usePoolHaveSwaps = (poolAddress: string) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<
    ITransaction[]
  >(poolAddress !== Address.Zero().bech32() ? `${poolAddress}` : null, () => {
    return fetchTransactions({
      receiver: poolAddress,
      status: 'success',
      function: 'addInitialLiquidity',
      size: 1
    });
  });
  console.log(poolAddress);

  console.log(data);

  return {
    haveSwaps: data?.length > 0,
    isLoading,
    error,
    isValidating,
    mutate
  };
};

export const usePoolHaveLocalRoles = (pair: string) => {
  const data = useSWR<IAccountRoles[]>(
    `/accounts/${pair}/roles/tokens`,
    fetchElrondData
  );
  console.log(data);

  return {
    ...data,
    haveLocales: (data?.data &&
      data.data[0]?.canLocalMint &&
      data.data[0]?.canLocalBurn) as boolean
  };
};
