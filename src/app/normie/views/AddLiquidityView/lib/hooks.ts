import { pairContractAbi } from '@/localConstants/globals';
import { scQueryWithContract } from '@/services/sc/query';
import {
  BigUIntValue,
  TokenIdentifierValue,
  TokenTransfer
} from '@multiversx/sdk-core/out';
import useSWR from 'swr';

export const useGetEquivalent = (
  contractAddress: string,
  tokenI: string,
  tokenAmount: number,
  decimals: number
) => {
  const {
    data: res,
    error,
    isLoading,
    mutate
  } = useSWR(
    `${contractAddress}:getEquivalent:${tokenI}:${tokenAmount}`,
    async () => {
      return scQueryWithContract(
        contractAddress,
        pairContractAbi,
        'getEquivalent',
        [
          new TokenIdentifierValue(tokenI),
          new BigUIntValue(
            TokenTransfer.fungibleFromAmount(
              tokenI,
              tokenAmount,
              decimals
            ).amount
          )
        ]
      );
    }
  );
  const data = res?.firstValue?.valueOf();

  return {
    data: data?.toString(),
    error,
    isLoading,
    mutate
  };
};
