import {
  selectFromField,
  selectToField
} from '@/app/normie/views/SwapView/lib/swap-slice';
import { Button } from '@/components/ui/button';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { useAppSelector } from '@/hooks/useRedux';

import { useGetSlippage } from '@/hooks/useGetUserSettings';
import useTxNotification from '@/hooks/useTxNotification';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import BigNumber from 'bignumber.js';
import { submitSwap } from '../../../../lib/calls';
import { clearInputs } from '../../../../lib/functions';

interface IProps {
  poolAddres?: string;
}
const SubmitButton = ({ poolAddres }: IProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const toField = useAppSelector(selectToField);
  const { slippage } = useGetSlippage();

  const { accountToken, mutate } = useGetAccountToken(fromField.selectedToken);

  const { ref, setSessionId } = useTxNotification({
    submittedTxCallback: () => {
      clearInputs();
    },
    onSuccess: () => {
      mutate();
    }
  });

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
        [ {buttonText} ]
      </Button>
    </>
  );
};

export default SubmitButton;
