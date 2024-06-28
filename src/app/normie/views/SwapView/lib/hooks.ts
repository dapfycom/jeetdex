import { useAppDispatch, useAppSelector } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { pairContractAbi } from '@/localConstants/globals';
import { fetchAggregatorData } from '@/services/rest/ash';
import { fetchAggregate } from '@/services/rest/ash/aggregate';
import {
  fetchScSimpleData,
  fetchScSimpleDataWithContract
} from '@/services/sc/query';
import { IElrondToken } from '@/types/scTypes';
import { getRealBalance } from '@/utils/mx-utils';
import { errorToast } from '@/utils/toast';
import {
  Address,
  BigUIntValue,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import useSWR from 'swr';
import { clearToInputs } from './functions';
import {
  onChangeToField,
  onChangeToFieldValueDecimals,
  selectFromFieldSelectedToken,
  selectFromFieldValueDecimals,
  selectToFieldSelectedToken
} from './swap-slice';

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

  console.log(tokenOutDetails);
  console.log(tokenIdentifier);
  console.log(bigUIntValue.toString());
  console.log(pair);

  if (
    tokenIdentifier.length === 0 ||
    bigUIntValue.isNaN() ||
    bigUIntValue.isZero() ||
    !pair
  ) {
    swrKey = null;
  } else {
    swrKey = `${pair.address}:getAmountOut:${bigUIntValue.toString()}:${
      pair.firstToken
    }`;
  }
  console.log(swrKey);

  const { data } = useSWR(swrKey, async (key) => {
    const { data, returnMessage } = await fetchScSimpleDataWithContract(
      key,
      pairContractAbi,
      [
        new TokenIdentifierValue(tokenIdentifier),
        new BigUIntValue(bigUIntValue)
      ]
    );

    console.log(returnMessage);

    return { data, returnMessage };
  });

  console.log(data);

  useEffect(() => {
    if (data?.data && tokenOutDetails.elrondToken) {
      const displayValue = getRealBalance(
        data?.data as BigNumber,
        tokenOutDetails?.elrondToken.decimals,
        true
      ).toString();
      console.log(displayValue);

      dispatch(onChangeToField(displayValue));
      dispatch(onChangeToFieldValueDecimals(data?.data?.toString()));
    } else {
      if (data?.returnMessage) {
        errorToast(data?.returnMessage);
      }

      clearToInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.data,
    data?.returnMessage,
    dispatch,
    tokenOutDetails?.elrondToken?.decimals
  ]);

  return {
    returnAmount: data?.toString() || '0'
  };
};

export const useGetAggregate = (pair?: {
  firstToken: string;
  secondToken: string;
  address: string;
}) => {
  const token1 = useAppSelector(selectFromFieldSelectedToken);
  const token2 = useAppSelector(selectToFieldSelectedToken);
  const token1Value = useAppSelector(selectFromFieldValueDecimals);
  const dispatch = useAppDispatch();
  console.log(token1);
  console.log(token2);
  console.log(token1Value);

  let swrKey = null;

  if (!pair) {
    swrKey = ['aggregate', token1, token2, token1Value];
  }

  console.log(swrKey);

  const { data, isLoading, error } = useSWR(
    token1 && token2 && token1Value && token1Value !== '0' ? swrKey : null,
    async () => {
      const res = await fetchAggregate({
        from: token1,
        to: token2,
        amount: token1Value
      });
      return res;
    }
  );
  console.log(data);

  useEffect(() => {
    if (data?.returnAmount) {
      dispatch(onChangeToField(data.returnAmount));
      dispatch(onChangeToFieldValueDecimals(data.returnAmountWithDecimal));
    }
  }, [
    data?.tokenOut,
    data?.returnAmount,
    data?.returnAmountWithDecimal,
    dispatch
  ]);

  return {
    data,
    isLoading,
    error
  };
};

export const useGetSwapbleAggregatorTokens = () => {
  const { data, error, isLoading } = useSWR<
    {
      id: string;
      coingeckoId: string;
      decimals: number;
    }[]
  >('/tokens', fetchAggregatorData);

  return {
    ashTokens: data || [],
    error,
    isLoading
  };
};
