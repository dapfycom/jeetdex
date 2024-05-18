'use client';
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeSlippage,
  onChangeToField,
  onChangeToFieldValueDecimals,
  onSwapFields,
  selectFromField,
  selectNormalDirection,
  selectSlippage,
  selectToField
} from '@/app/normie/views/SwapView/lib/swap-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { changeField } from '../../lib/functions';
import { useGetSwapbleTokens, useGetTokenRatio } from '../../lib/hooks';
import SwapCard from './SwapCard';

const SwapCardContainer = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const slippage = useAppSelector(selectSlippage);
  const normalDirection = useAppSelector(selectNormalDirection);
  const loadingAggregatorData = false;
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
  const swapFileds = () => {
    dispatch(onSwapFields());
  };

  const handleChangeFromToken = (token: IElrondToken) => {
    dispatch(changeFromFieldToken(token.identifier));
    handleChangeFromField(fromField.value, token);
  };
  const handleChangeToToken = (token: IElrondToken) => {
    dispatch(changeToFieldToken(token.identifier));
  };
  const handleMax = (accountToken: IElrondAccountToken) => {
    const userAmount = formatBalance(accountToken, true) as number;
    dispatch(onChageFromFieldValue(userAmount.toString()));
    dispatch(onChageFromFieldValueDecimals(accountToken.balance));
  };
  const handleClear = () => {
    dispatch(onChageFromFieldValue(''));
    dispatch(onChageFromFieldValueDecimals(''));
    dispatch(onChangeToFieldValueDecimals(''));
    dispatch(onChangeToField(''));
  };

  const handleChangeSlippage = (value: string) => {
    console.log('handleChangeSlippage', value);

    dispatch(onChangeSlippage(Number(value)));
  };

  const { tokensPairs } = useGetSwapbleTokens();

  const secondTokensForFirstToken = tokensPairs
    .filter((t) =>
      normalDirection
        ? t.firstToken === fromField.selectedToken
        : t.secondToken === fromField.selectedToken
    )
    .map((t) => (normalDirection ? t.secondToken : t.firstToken));

  const pairSelected = tokensPairs.find((t) =>
    normalDirection
      ? t.firstToken === fromField.selectedToken &&
        t.secondToken === toField.selectedToken
      : t.secondToken === fromField.selectedToken &&
        t.firstToken === toField.selectedToken
  );

  useGetTokenRatio(
    pairSelected,
    fromField.selectedToken,
    new BigNumber(fromField.valueDecimals),
    'first'
  );
  return (
    <SwapCard
      fromField={fromField}
      handleChangeFromField={handleChangeFromField}
      handleChangeFromToken={handleChangeFromToken}
      handleChangeSlippage={handleChangeSlippage}
      handleChangeToField={handleChangeToField}
      handleChangeToToken={handleChangeToToken}
      handleClear={handleClear}
      handleMax={handleMax}
      isLoading={loadingAggregatorData}
      normalDirection={normalDirection}
      pairSelected={pairSelected}
      secondTokensForFirstToken={secondTokensForFirstToken}
      slippage={slippage}
      swapFileds={swapFileds}
      toField={toField}
      tokensPairs={tokensPairs}
    />
  );
};

export default SwapCardContainer;
