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
  console.log(`${contractAddress}:getEquivalent:${tokenI}:${tokenAmount}`);

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
            ).amountAsBigInteger
          )
        ]
      );
    }
  );
  const data = res?.firstValue?.valueOf();
  console.log(
    TokenTransfer.fungibleFromAmount(
      tokenI,
      tokenAmount,
      decimals
    ).amountAsBigInteger.toString()
  );

  console.log(data);
  console.log(error);

  return {
    data: data?.toString(),
    error,
    isLoading,
    mutate
  };
};
