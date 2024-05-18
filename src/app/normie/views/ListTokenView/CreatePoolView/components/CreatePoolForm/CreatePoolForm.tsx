'use client';

import { Form } from '@/components/ui/form';
import {
  useAppDispatch,
  useAppSelector,
  useTrackTransactionStatus
} from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { ICoreToken } from '@/types/scTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { newPoolTx } from '../../../utils/sc.service';
import {
  useGetAllowedPoolTokens,
  useGetPoolPair
} from '../../../utils/swr.hooks';
import PoolItemContainer, { ITokenPool } from './PoolItem/PoolItemContainer';

import Divider from '@/components/Divider/Divider';
import { Input } from '@/components/ui/input';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { setActiveStep, setToke1, setToken2 } from '../../../utils/slice';
import FormNav from '../FormNav/FormNav';
import DagePicker from './DatePicker/DagePicker';
import SubmitButton from './SubmitButton/SubmitButton';
const convertToPoolItemToken = (
  tokens: (ICoreToken & {
    balance?: string;
  })[]
): ITokenPool[] => {
  return tokens.map((token) => {
    return {
      identifier: token.identifier,
      imgUrl: token.assets?.svgUrl,
      decimals: token.decimals,
      balance: token.balance
    };
  });
};

export const formSchema = z.object({
  firstToken: z.string(),
  secondToken: z.string(),
  buyFee: z.object({
    value: z.string(),
    timestamp: z.number()
  }),
  sellFee: z.object({
    value: z.string(),
    timestamp: z.number()
  })
});

export default function CreatePoolForm() {
  const { userTokens, isLoading: loadingUserTokens } = useGetUserTokens();
  const address = useAppSelector(selectUserAddress);
  const { allowedPoolTokens, isLoading } = useGetAllowedPoolTokens();
  const { tokens, isLoading: loadingAllowedTokenDetails } =
    useGetMultipleElrondTokens(
      allowedPoolTokens.map((token) => token.identifier) || []
    );
  const ownedTokens = userTokens.filter((token) => token.owner === address);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstToken: '',
      secondToken: '',
      buyFee: {
        timestamp: 0,
        value: '0'
      },
      sellFee: {
        timestamp: 0,
        value: '0'
      }
    }
  });

  const { mutate } = useGetPoolPair();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSuccess = () => {
    mutate();
    setSessionId(null);
    dispatch(setActiveStep('set-lp'));
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { firstToken, secondToken } = data;

    console.log(data);

    if (firstToken.length > 0 && secondToken.length > 0) {
      const res: SendTransactionReturnType = await newPoolTx(
        firstToken,
        secondToken,
        data.buyFee,
        data.sellFee
      );
      setSessionId(res.sessionId);
    }
  }

  useEffect(
    () => {
      console.log(form.watch('firstToken'));
      console.log(form.watch('secondToken'));

      if (form.watch('firstToken')) {
        dispatch(setToke1(form.watch('firstToken')));
      }
      if (form.watch('secondToken')) {
        dispatch(setToken2(form.watch('secondToken')));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.watch('firstToken'), form.watch('secondToken')]
  );

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='bg-zinc-900 rounded-xl px-8 py-12'>
          <h2 className='text-gray-300 text-xl'>Generate Pool Address</h2>

          <p className='text-gray-400 text-sm mb-10'>
            You must be the creator of the tokens.
          </p>

          <div className='w-full flex flex-col gap-4'>
            <PoolItemContainer
              tokensList={convertToPoolItemToken(ownedTokens)}
              isLoading={loadingUserTokens}
              tokenType='firstToken'
            />

            <PoolItemContainer
              tokensList={convertToPoolItemToken(tokens)}
              tokenType='secondToken'
              isLoading={isLoading || loadingAllowedTokenDetails}
            />

            <Divider />

            <div>Optional</div>
            <div className='flex-col flex gap-3 text-left'>
              <div>Buy Fee</div>
              <Input placeholder='Buy fee' {...form.register('buyFee.value')} />
              <DagePicker field='buyFee' label='Buy Fee finish' />
            </div>

            <div className='flex-col flex gap-3 text-left'>
              <div>Sell Fee</div>
              <Input
                placeholder='Sell fee'
                {...form.register('sellFee.value')}
              />
              <DagePicker field='sellFee' label='Sell Fee finish' />
            </div>
          </div>
          <SubmitButton />

          <FormNav currentStep='create-pool' />
        </div>
      </form>
    </Form>
  );
}
