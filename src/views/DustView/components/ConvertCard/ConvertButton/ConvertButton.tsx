import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useRedux';

import { useTrackTransactionStatus } from '@/hooks';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { selectConvertInfo, selectToTokenDust } from '../../../lib/dust-slice';
import { useGetAmountOut } from '../../../lib/hooks';
import { convertTokens } from '../../../lib/services';

const ConvertButton = () => {
  const selectedTokens = useAppSelector(selectConvertInfo);
  const toToken = useAppSelector(selectToTokenDust);
  const { data } = useGetAmountOut(selectedTokens);
  const [sessionId, setSessionId] = useState<string>();
  const { mutate } = useGetUserTokens();
  const onSuccess = () => {
    mutate();
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const handleSubmit = async () => {
    const slippage = 1;

    const bnAmountOut = new BigNumber(data?.amountOut || 0);
    const amountWithSlippage = new BigNumber(bnAmountOut).minus(
      new BigNumber(slippage / 100).multipliedBy(bnAmountOut)
    );
    const res = await convertTokens(
      data?.tokenIdentifier || toToken,
      amountWithSlippage.toFixed(0),
      selectedTokens.map((token) => {
        return {
          collection: token.identifier,
          nonce: 0,
          value: token.balance
        };
      })
    );
    if (res) {
      setSessionId(res.sessionId);
    }
  };

  return (
    <>
      <Button
        className='w-full gap-3'
        onClick={handleSubmit}
        disabled={!data?.amountOut}
      >
        Convert dust now with
      </Button>
    </>
  );
};

export default ConvertButton;
