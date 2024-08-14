'use client';

import { z } from 'zod';

import { degenNewCoin, updateCoinIdentifier } from '@/actions/coins';
import { tokensID } from '@/config';
import useDisclosure from '@/hooks/useDisclosure';
import { fetchTransactionByHash } from '@/services/rest/elrond/transactions';
import { swap } from '@/services/sc/bonding/call';
import { fetchAmountOut } from '@/services/sc/bonding/queries';
import { newToken } from '@/services/sc/degen_master/calls';
import { fetchNewTokenFee } from '@/services/sc/degen_master/queries';
import { calculateSlippageAmount, setElrondBalance } from '@/utils/mx-utils';
import { generateRandomString } from '@/utils/strings';
import { errorToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

const formSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(
      /^[a-zA-Z0-9]*$/,
      'name must be alphanumeric and must not contain whitespace or special characters'
    ),
  ticker: z
    .string()
    .min(3)
    .max(10)
    .regex(
      /^[a-zA-Z0-9]*$/,
      'ticker must be alphanumeric and must not contain whitespace or special characters'
    ),
  description: z.string().max(1500).nullable(),
  image: z.object({
    url: z.string().url(),
    name: z.string(),
    owner: z.string()
  }),
  twitter: z.union([z.string(), z.string().length(0)]).optional(),
  telegram: z.union([z.string(), z.string().length(0)]).optional(),
  website: z.union([z.string(), z.string().length(0)]).optional()
});

const useCreateCoinForm = () => {
  const degenId = useRef(generateRandomString(10));
  const [amountToBuyFirstTime, setAmountToBuyFirstTime] = useState('');
  const firstBuyDialogState = useDisclosure();
  const { data: fee } = useSWR('degenMaster:getNewTokenFee', fetchNewTokenFee);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      description: '',
      image: null,
      telegram: '',
      twitter: '',
      website: ''
    }
  });
  const [txResultAddress, setTxResultAddress] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isUploading, setIsUploading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const router = useRouter();

  const txHandle = useRef(0);

  const coinFromDb = useRef<{
    id: string;
    identifier: string;
    img: string | null;
    ownerId: string;
    twitter: string | null;
    telegram: string | null;
    website: string | null;
    title: string | null;
    description: string | null;
    degenId: string | null;
  }>();

  const onSuccessTx = async () => {
    degenId.current = generateRandomString(10);
    if (txHandle.current === 0) {
      const tx = await fetchTransactionByHash(transactions[0].hash);
      form.reset();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operation = tx.operations.find(
        (op) => Boolean(op.identifier) && Boolean(op.ticker)
      );

      const result = tx.results.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (res) => res.function === 'setTokenIdentifier'
      );

      const identifier = operation?.identifier;

      const address = result.receiver;
      setTxResultAddress(address);

      if (amountToBuyFirstTime === '' || amountToBuyFirstTime === '0') {
        txHandle.current = 0;
        if (coinFromDb.current) {
          updateCoinIdentifier(identifier, coinFromDb.current.id);
        }
        router.push(`/pair/${address}`);
      } else {
        const amountIn = amountToBuyFirstTime;
        const amountScOut = await fetchAmountOut({
          address,
          amountIn: setElrondBalance(amountToBuyFirstTime, 18),
          tokenIn: tokensID.wegld
        });

        const amountOut = calculateSlippageAmount(5, amountScOut).toFixed(0);

        const swapRes = await swap({
          contract: address,
          amountIn: amountIn,
          amountOut: amountOut,
          tokenIn: 'EGLD',
          tokenOut: identifier,
          initialSwap: true
        });
        txHandle.current = 1;
        setAmountToBuyFirstTime('');
        setSessionId(swapRes.sessionId);
      }
    } else {
      txHandle.current = 0;
      router.push(`/pair/${txResultAddress}`);
    }
  };

  // useTxNotification({ sessionId, setSessionId, waitTx: true });
  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccessTx
  });

  // 2. Define a submit handler.
  async function onSubmit() {
    firstBuyDialogState.onOpen();
  }

  const handleCreateCoin = async (amountToBuy: string) => {
    const { name, ticker, description, image, telegram, twitter, website } =
      form.getValues();

    if (fee) {
      const data = {
        name: name,
        description: description,
        image: image.url,
        telegram: telegram,
        twitter: twitter,
        website: website,
        degenId: degenId.current
      };

      try {
        const resDb = await degenNewCoin(data);
        if (!resDb) {
          errorToast('Error creating the coin');
          return;
        }

        coinFromDb.current = resDb;
        const res = await newToken(
          name,
          ticker.toUpperCase(),
          fee,
          degenId.current,
          amountToBuy
        );
        setSessionId(res.sessionId);
        setAmountToBuyFirstTime(amountToBuy);
      } catch (error) {
        errorToast('Error creating the coin');
      }
    } else {
      errorToast('Error fetching the fee');
    }
  };

  return {
    form,
    onSubmit,
    isUploading,
    setIsUploading,
    isOpenMoreOptions: isOpen,
    firstBuyDialogState,
    fee,
    handleCreateCoin,
    onCloseMoreOptions: onClose,
    onOpenMoreOptions: onOpen
  };
};

export default useCreateCoinForm;
