import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useGetSlippage } from '@/hooks/useGetUserSettings';
import { swap } from '@/services/sc/bonding/call';
import { numericString } from '@/utils/general';
import { calculateSlippageAmount, setElrondBalance } from '@/utils/mx-utils';
import { errorToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import BigNumber from 'bignumber.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGetAmountOut, useGetBoundingPair } from '../../hooks';

const formSchema = z.object({
  amount: numericString(z.number())
});

const useSwap = (type: 'buy' | 'sell') => {
  const { coin } = useGetBoundingPair();
  const { slippage } = useGetSlippage();
  const { elrondToken: token } = useGetElrondToken(
    type === 'buy'
      ? coin?.secondTokenId === tokensID.wegld
        ? tokensID.egld
        : coin?.secondTokenId
      : coin.firstTokenId
  );
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      amount: ''
    },
    resolver: zodResolver(formSchema)
  });
  const { amountOut } = useGetAmountOut(
    coin?.address,
    setElrondBalance(form.watch('amount')),
    type === 'buy' ? coin?.secondTokenId : coin.firstTokenId
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { amount } = values;

    if (!slippage) {
      errorToast('Slippage is not set');
      return;
    }

    if (amount && new BigNumber(amount).isGreaterThan(0)) {
      swap({
        amountIn: amount,
        amountOut: calculateSlippageAmount(slippage, amountOut).toFixed(0),
        tokenIn: token?.identifier,
        contract: coin.address,
        tokenOut: type === 'buy' ? coin.firstTokenId : coin.secondTokenId
      });
    } else {
      errorToast('Invalid amount: ' + amount);
    }
  }

  function reset() {
    form.reset();
  }

  return {
    onSubmit,
    token,
    form,
    reset
  };
};

export default useSwap;
