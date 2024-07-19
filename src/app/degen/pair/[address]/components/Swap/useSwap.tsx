import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { swap } from '@/services/sc/bonding/call';
import { calculateSlippageAmount, setElrondBalance } from '@/utils/mx-utils';
import { errorToast } from '@/utils/toast';
import BigNumber from 'bignumber.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGetAmountOut, useGetBoundingPair } from '../../hooks';

const formSchema = z.object({
  amount: z.string().min(1)
});

const useSwap = (type: 'buy' | 'sell') => {
  const { coin } = useGetBoundingPair();

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
    }
  });
  const { amountOut } = useGetAmountOut(
    coin?.address,
    setElrondBalance(form.watch('amount')),
    type === 'buy' ? coin?.secondTokenId : coin.firstTokenId
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { amount } = values;
    console.log(amount);
    console.log(parseFloat(amountOut));

    if (amount && new BigNumber(amount).isGreaterThan(0)) {
      swap({
        amountIn: amount,
        amountOut: calculateSlippageAmount(5, amountOut).toFixed(0),
        tokenIn: token?.identifier,
        contract: coin.address,
        tokenOut: type === 'buy' ? coin.firstTokenId : coin.secondTokenId
      });
    } else {
      errorToast('Invalid amount out: ' + amount);
    }
  }

  return {
    onSubmit,
    token,
    form
  };
};

export default useSwap;
