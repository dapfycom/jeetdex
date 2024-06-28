import {
  selectFromField,
  selectToField
} from '@/app/normie/views/SwapView/lib/swap-slice';
import { Button } from '@/components/ui/button';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { useAppSelector } from '@/hooks/useRedux';

import { useGetAggregate } from '@/app/normie/views/SwapView/lib/hooks';
import { useGetSlippage } from '@/hooks/useGetUserSettings';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { submitSwap, submitSwapWithAshAggregator } from '../../../../lib/calls';

interface IProps {
  poolAddres?: string;
}
const SubmitButton = ({ poolAddres }: IProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { slippage } = useGetSlippage();
  const { data: aggregatorData } = useGetAggregate();
  const { accountToken, mutate } = useGetAccountToken(fromField.selectedToken);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSuccess = () => {
    mutate();
  };
  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,

    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error('transactionId', transactionId);
      console.error('errorMessage', errorMessage);
    }
  });

  // useTxNotification({
  //   submittedTxCallback: () => {
  //     clearInputs();
  //   },
  //   onSuccess: () => {
  //     mutate();
  //   },
  //   sessionId,
  //   setSessionId,
  //   waitTx: true
  // });
  console.log(aggregatorData);
  console.log(poolAddres);

  const handleSwap = async () => {
    console.log(fromField);
    console.log(toField);
    if (!poolAddres) {
      // swap with ashswap aggregator
      if (aggregatorData && aggregatorData?.returnAmountWithDecimal) {
        console.log('swap with ashswap aggregator');

        const res = await submitSwapWithAshAggregator(aggregatorData, slippage);

        setSessionId(res?.sessionId);
      } else {
        throw new Error('No return amount with decimals');
      }
    } else {
      console.log('swap with sc');

      const res = await submitSwap(
        poolAddres,
        fromField.selectedToken,
        fromField.valueDecimals,
        toField.selectedToken,
        toField.valueDecimals,
        slippage
      );
      setSessionId(res.sessionId);
    }
  };

  const InsufficientBalance = new BigNumber(
    fromField.valueDecimals
  ).isLessThanOrEqualTo(accountToken.balance);

  const buttonText = isLoggedIn
    ? fromField.value !== ''
      ? InsufficientBalance
        ? 'Swap now'
        : 'Insufficient  balance'
      : 'Enter an amount'
    : 'Connect wallet';

  return (
    <>
      <Button
        onClick={handleSwap}
        className='w-full gap-3 mt-2'
        disabled={
          (!poolAddres && !aggregatorData) ||
          (!InsufficientBalance && isLoggedIn)
        }
      >
        [ {buttonText} ]
      </Button>
    </>
  );
};

export default SubmitButton;
