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
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { changeField, clearInputs } from '../../lib/functions';
import {
  useGetAggregate,
  useGetTokenRatio,
  useGetTokensSuggested
} from '../../lib/hooks';
import SwapCard from './SwapCard';

const SwapCardContainer = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const normalDirection = useAppSelector(selectNormalDirection);

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
  };
  const handleChangeToToken = (token: IElrondToken) => {
    dispatch(changeToFieldToken(token.identifier));
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

  const tokensPairs = useAppSelector(selectGlobalData).pools;

  const pairSelected = tokensPairs.find((t) =>
    normalDirection
      ? t.firstTokenId === fromField.selectedToken &&
        t.secondTokenId === toField.selectedToken
      : t.secondTokenId === fromField.selectedToken &&
        t.firstTokenId === toField.selectedToken
  );

  useGetTokenRatio(
    pairSelected,
    fromField.selectedToken,
    new BigNumber(fromField.valueDecimals),
    normalDirection ? 'first' : 'second'
  );

  const tokensSuggested = useGetTokensSuggested();
  useGetAggregate(pairSelected);

  const fromFieldElrondToken =
    fromField.selectedToken === pairSelected?.firstTokenId
      ? {
          ...pairSelected?.firstToken,
          price: pairSelected?.firstTokenJeetdexPrice
        }
      : pairSelected?.secondToken;
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
      pairSelected={
        pairSelected
          ? {
              address: pairSelected.address,
              firstToken: pairSelected.firstTokenId,
              secondToken: pairSelected.secondTokenId
            }
          : null
      }
      swapFields={swapFields}
      toField={toField}
      fromFieldElrondToken={fromFieldElrondToken}
      tokensSuggested={tokensSuggested}
    />
  );
};

export default SwapCardContainer;
