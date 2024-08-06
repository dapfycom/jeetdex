import { updateCoinIdentifier } from '@/actions/coins';
import { submitSwap } from '@/app/normie/views/SwapView/lib/calls';
import { useGetSwapbleTokens } from '@/app/normie/views/SwapView/lib/hooks';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useGetSlippage } from '@/hooks/useGetUserSettings';
import { pairContractAbi } from '@/localConstants/globals';
import { swap } from '@/services/sc/bonding/call';
import { fetchScSimpleDataWithContract } from '@/services/sc/query';
import { numericString } from '@/utils/general';
import { calculateSlippageAmount, setElrondBalance } from '@/utils/mx-utils';
import { errorToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BigUIntValue, TokenIdentifierValue } from '@multiversx/sdk-core/out';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGetAmountOut, useGetBoundingPair, useIsMaxCap } from '../../hooks';

const formSchema = z.object({
  amount: numericString(z.number())
});

const useSwap = (type: 'buy' | 'sell') => {
  const [transactionId, setTransactionId] = useState<string>('');
  const lastIdentifier = useRef('');
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

  const onSuccess = () => {
    form.reset();
    setTransactionId('');
  };

  useTrackTransactionStatus({
    transactionId: transactionId,
    onSuccess: onSuccess
  });

  const { tokensPairs } = useGetSwapbleTokens();

  const { isMaxCap } = useIsMaxCap();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit');

    const { amount } = values;

    if (!slippage) {
      errorToast('Slippage is not set');
      return;
    }

    const sendTokenIdentifier = token?.identifier;
    const sendAmountBigUIntValue = setElrondBalance(amount, 18);

    const receiveTokenIdentifier =
      type === 'buy' ? coin.firstTokenId : coin.secondTokenId;

    if (!isMaxCap) {
      if (amount && new BigNumber(amount).isGreaterThan(0)) {
        const res = await swap({
          amountIn: amount,
          amountOut: calculateSlippageAmount(slippage, amountOut).toFixed(0),
          tokenIn: token?.identifier,
          contract: coin.address,
          tokenOut: type === 'buy' ? coin.firstTokenId : coin.secondTokenId,
          initialSwap: coin.state === 'Inactive'
        });
        setTransactionId(res.sessionId);
      } else {
        errorToast('Invalid amount: ' + amount);
      }
    } else {
      console.log('normie');

      const normieToken = tokensPairs.find(
        (token) => token.firstToken === coin.firstTokenId
      );

      if (normieToken) {
        const { data } = await fetchScSimpleDataWithContract(
          `${normieToken.address}:getAmountOut`,
          pairContractAbi,
          [
            new TokenIdentifierValue(
              sendTokenIdentifier === tokensID.egld
                ? tokensID.wegld
                : sendTokenIdentifier
            ),
            new BigUIntValue(sendAmountBigUIntValue)
          ]
        );

        const receiveAmount = data?.toString();

        if (receiveAmount) {
          const res = await submitSwap(
            normieToken.address,
            sendTokenIdentifier,
            sendAmountBigUIntValue,
            receiveTokenIdentifier,
            receiveAmount,
            slippage
          );
          setTransactionId(res.sessionId);
        } else {
          errorToast('Invalid amount: ' + amount);
        }
      } else {
        errorToast('Token not found on normie dex');
      }
    }
  }

  function reset() {
    form.reset();
  }

  useEffect(() => {
    if (coin?.identifier) {
      const isNorme = coin?.identifier.includes('-');

      if (!isNorme) {
        if (lastIdentifier.current !== coin.identifier) {
          console.log('update');

          lastIdentifier.current = coin.identifier;
          updateCoinIdentifier(coin.firstTokenId, coin.id);
        }
      }
    }
  }, [coin?.firstTokenId, coin?.id, coin?.identifier]);

  return {
    onSubmit,
    token,
    form,
    reset
  };
};

export default useSwap;
