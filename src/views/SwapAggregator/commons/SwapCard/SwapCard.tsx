'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { SwapIcon } from '@/components/ui/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance } from '@/utils/mx-utils';
import {
  changeFromFieldToken,
  changeToFieldToken,
  onChageFromFieldValue,
  onChageFromFieldValueDecimals,
  onChangeToField,
  onChangeToFieldValueDecimals,
  onSwapFields,
  selectFromField,
  selectToField
} from '@/views/SwapAggregator/lib/swap-slice';
import { changeField } from '../../lib/functions';
import InputBox from './commons/InputBox';
import SubmitButton from './commons/SubmitButton';
import SwapInfo from './commons/SwapInfo/SwapInfo';

const SwapCard = () => {
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const loadingAggregatorData = false;
  const dispatch = useAppDispatch();
  const handleChangeFromField = () => {
    changeField();
  };
  const handleChangeToField = () => {
    changeField();
  };
  const swapFileds = () => {
    dispatch(onSwapFields());
  };

  const handleChangeFromToken = (token: IElrondToken) => {
    dispatch(changeFromFieldToken(token.identifier));
    handleChangeFromField();
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
    dispatch(onChageFromFieldValue('0'));
    dispatch(onChageFromFieldValueDecimals('0'));
    dispatch(onChangeToFieldValueDecimals('0'));
    dispatch(onChangeToField('0'));
  };

  return (
    <Card className='text-left'>
      <CardHeader>
        <CardTitle>Swap</CardTitle>
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
        />
        <SwapInfo />
      </CardContent>
      <CardFooter>
        <SubmitButton />
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
