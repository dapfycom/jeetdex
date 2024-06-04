import {
  selectFromField,
  selectToField
} from '@/app/normie/views/SwapView/lib/swap-slice';
import { Button } from '@/components/ui/button';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { useAppSelector } from '@/hooks/useRedux';

import { useGetSlippage } from '@/hooks/useGetUserSettings';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { submitSwap } from '../../../../lib/calls';
import useTxNotification from '../../../../useTxNotification';

interface IProps {
  poolAddres?: string;
}
const SubmitButton = ({ poolAddres }: IProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { slippage } = useGetSlippage();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { accountToken } = useGetAccountToken(fromField.selectedToken);
  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId
  });
  const { toastTxNotification } = useTxNotification();
  const ref = useRef(false);

  const handleSwap = async () => {
    const res = await submitSwap(
      poolAddres,
      fromField.selectedToken,
      fromField.valueDecimals,
      toField.selectedToken,
      toField.valueDecimals,
      slippage
    );
    ref.current = false;
    setSessionId(res.sessionId);
  };
  useEffect(() => {
    if (!ref.current) {
      if (transactions && transactions[0]?.hash) {
        toastTxNotification(transactions[0]?.hash);
        ref.current = true;
      }
    }
  }, [transactions]);
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
        disabled={!poolAddres || (!InsufficientBalance && isLoggedIn)}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SubmitButton;
