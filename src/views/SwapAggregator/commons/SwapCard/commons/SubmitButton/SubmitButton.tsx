import { Button } from '@/components/ui/button';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { useAppSelector } from '@/hooks/useRedux';
import { selectFromField } from '@/views/SwapAggregator/lib/swap-slice';

import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import BigNumber from 'bignumber.js';

const SubmitButton = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const fromField = useAppSelector(selectFromField);
  const aggregatorData = [];

  const { accountToken } = useGetAccountToken(fromField.selectedToken);

  const handleSwap = async () => {};
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
        className='w-full   text-white gap-3'
        disabled={(!aggregatorData || !InsufficientBalance) && isLoggedIn}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SubmitButton;
