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
  console.log(contractAddress);
  console.log(tokenI);
  console.log(tokenAmount);
  console.log(decimals);

  const { data, error, isLoading, mutate } = useSWR(
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

  console.log(data);

  return {
    data: data?.toString(),
    error,
    isLoading,
    mutate
  };
};
