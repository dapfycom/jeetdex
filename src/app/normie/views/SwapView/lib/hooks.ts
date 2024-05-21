import { useAppDispatch } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { pairContractAbi } from '@/localConstants/globals';
import {
  fetchScSimpleData,
  fetchScSimpleDataWithContract
} from '@/services/sc/query';
import { IElrondToken } from '@/types/scTypes';
import { getRealBalance } from '@/utils/mx-utils';
import {
  Address,
  BigUIntValue,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import useSWR from 'swr';
import { onChangeToField, onChangeToFieldValueDecimals } from './swap-slice';

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

export const useGetSwapbleTokens = () => {
  const { data, error, isLoading } = useSWR(
    'mainRouter:getAllPairContractMetadata',
    async (key) => {
      const data = await fetchScSimpleData<
        {
          first_token_id: string;
          second_token_id: string;
          address: Address;
        }[]
      >(key);

      return data.map((pair) => {
        return {
          firstToken: pair.first_token_id,
          secondToken: pair.second_token_id,
          address: pair.address.bech32()
        };
      });
    }
  );

  return {
    tokensPairs: data || [],
    error,
    isLoading
  };
};

export const useGetTokenRatio = (
  pair: {
    firstToken: string;
    secondToken: string;
    address: string;
  },
  tokenIdentifier: string,
  bigUIntValue: BigNumber,
  type: 'first' | 'second'
) => {
  const dispatch = useAppDispatch();
  let swrKey = null;
  const tokenOutDetails = useGetElrondToken(
    pair ? (type === 'first' ? pair.secondToken : pair.firstToken) : null
  );

  if (
    tokenIdentifier.length === 0 ||
    bigUIntValue.isNaN() ||
    bigUIntValue.isZero() ||
    !pair
  ) {
    swrKey = null;
  } else {
    swrKey =
      type === 'first'
        ? `${pair.address}:getAmountOut:${bigUIntValue.toString()}:${
            pair.firstToken
          }`
        : `${pair.address}:getAmountIn${bigUIntValue.toString()}:${
            pair.firstToken
          }`;
  }
  const { data } = useSWR(swrKey, async (key) => {
    console.log(key);

    const data = await fetchScSimpleDataWithContract(key, pairContractAbi, [
      new TokenIdentifierValue(tokenIdentifier),
      new BigUIntValue(bigUIntValue)
    ]);

    console.log(data);

    return data;
  });

  useEffect(() => {
    if (data) {
      const displayValue = getRealBalance(
        data as BigNumber,
        tokenOutDetails.elrondToken.decimals,
        true
      ).toString();

      console.log(displayValue);

      dispatch(onChangeToField(displayValue));
      dispatch(onChangeToFieldValueDecimals(data.toString()));
    }
  }, [data, dispatch, tokenOutDetails?.elrondToken?.decimals]);

  return {
    returnAmount: data?.toString() || '0'
  };
};