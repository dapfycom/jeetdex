'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

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
import { Button } from '@/components/ui/button';
import { SwapIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { changeField } from '../../lib/functions';
import { useGetSwapbleTokens, useGetTokenRatio } from '../../lib/hooks';
import InputBox from './commons/InputBox';
import SubmitButton from './commons/SubmitButton';

const SwapCard = () => {
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
    <Card className='text-left'>
      <CardHeader>
        <CardTitle className='flex justify-end items-center gap-2'>
          Slippage:{' '}
          <span className='flex items-center gap-2'>
            <Input
              className='w-[40px]'
              value={slippage}
              onChange={(e) => handleChangeSlippage(e.target.value)}
            />
            %
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <InputBox
          selectedTokenI={fromField.selectedToken}
          value={fromField.value}
          onChange={handleChangeFromField}
          onChangeToken={handleChangeFromToken}
          isLoadingInput={loadingAggregatorData}
          onMax={handleMax}
          clear={handleClear}
          tokensIdentifiers={tokensPairs.map((t) =>
            normalDirection ? t.firstToken : t.secondToken
          )}
        />

        <div className='flex justify-center'>
          <div className='w-10 h-10'>
            <Button size={'icon'} variant={'ghost'} onClick={swapFileds}>
              <SwapIcon />
            </Button>
          </div>
        </div>

        <InputBox
          selectedTokenI={toField.selectedToken}
          value={toField.value}
          onChange={handleChangeToField}
          onChangeToken={handleChangeToToken}
          isLoadingInput={loadingAggregatorData}
          tokensIdentifiers={Array.from(
            new Set([...secondTokensForFirstToken])
          )}
        />
      </CardContent>
      <CardFooter>
        <SubmitButton poolAddres={pairSelected?.address} />
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
