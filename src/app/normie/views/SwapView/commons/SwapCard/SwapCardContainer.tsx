'use client';
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  onChangeToFieldValueDecimals,
  onSwapFields,
  selectFromField,
  selectNormalDirection,
  selectToField
} from '@/app/normie/views/SwapView/lib/swap-slice';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { changeField, clearInputs } from '../../lib/functions';
import { useGetSwapbleTokens, useGetTokenRatio } from '../../lib/hooks';
import SwapCard from './SwapCard';

const SwapCardContainer = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const normalDirection = useAppSelector(selectNormalDirection);
  const { elrondToken } = useGetElrondToken(toField.selectedToken);
  const { currentParams, updateParams } = useUpdateUrlParams([
    'firstToken',
    'secondToken'
  ]);

  const [firstToken, secondToken] = currentParams;

  const dispatch = useAppDispatch();
  const handleChangeFromField = (value: string, token?: IElrondToken) => {
    changeField(
      value,
      onChageFromFieldValue,
      onChageFromFieldValueDecimals,
      token
    );
  };
  const handleChangeToField = (value: string, token?: IElrondToken) => {
    changeField(value, onChangeToField, onChangeToFieldValueDecimals, token);
  };
  const swapFields = () => {
    dispatch(onSwapFields());
  };

  const handleChangeFromToken = (token: IElrondToken) => {
    dispatch(changeFromFieldToken(token.identifier));
    handleChangeFromField(fromField.value, token);

    updateParams('firstToken', token.identifier);
  };
  const handleChangeToToken = (token: IElrondToken) => {
    dispatch(changeToFieldToken(token.identifier));
    updateParams('secondToken', token.identifier);
  };
  const handlePercentAmount = (
    accountToken: IElrondAccountToken,
    percent: number
  ) => {
    const newAccount = { ...accountToken };
    newAccount.balance = new BigNumber(accountToken.balance)
      .multipliedBy(percent)
      .dividedBy(100)
      .toFixed();
    const userAmount = formatBalance(newAccount, true) as number;
    dispatch(onChageFromFieldValue(userAmount.toString()));
    dispatch(onChageFromFieldValueDecimals(newAccount.balance));
  };
  const handleClear = () => {
    clearInputs();
  };

  const { tokensPairs } = useGetSwapbleTokens();

  const secondTokensForFirstToken = tokensPairs
    .filter((t) =>
      normalDirection
        ? t.firstToken === fromField.selectedToken
        : t.secondToken === fromField.selectedToken
    )
    .map((t) => (normalDirection ? t.secondToken : t.firstToken));
  console.log(tokensPairs);

  const pairSelected = tokensPairs.find((t) =>
    normalDirection
      ? t.firstToken === fromField.selectedToken &&
        t.secondToken === toField.selectedToken
      : t.secondToken === fromField.selectedToken &&
        t.firstToken === toField.selectedToken
  );

  useEffect(() => {
    if (firstToken) {
      dispatch(changeFromFieldToken(firstToken));
    }

    if (secondToken) {
      dispatch(changeToFieldToken(secondToken));
    }
  }, [dispatch, firstToken, secondToken]);

  useGetTokenRatio(
    pairSelected,
    fromField.selectedToken,
    new BigNumber(fromField.valueDecimals),
    normalDirection ? 'first' : 'second'
  );

  return (
    <SwapCard
      fromField={fromField}
      handleChangeFromField={handleChangeFromField}
      handleChangeFromToken={handleChangeFromToken}
      handleChangeToField={handleChangeToField}
      handleChangeToToken={handleChangeToToken}
      handleClear={handleClear}
      handlePercentAmount={handlePercentAmount}
      isLoading={false}
      normalDirection={normalDirection}
      pairSelected={pairSelected}
      secondTokensForFirstToken={secondTokensForFirstToken}
      swapFields={swapFields}
      toField={toField}
      tokensPairs={tokensPairs}
      toFieldElrondToken={elrondToken}
    />
  );
};

export default SwapCardContainer;
