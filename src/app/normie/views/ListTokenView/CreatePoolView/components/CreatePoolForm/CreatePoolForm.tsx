'use client';

import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { ICoreToken } from '@/types/scTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { newPoolTx } from '../../../utils/sc.calls';
import {
  useGetAllowedPoolTokens,
  useGetNewPairFee,
  useGetPoolPair
} from '../../../utils/swr.hooks';
import PoolItemContainer, { ITokenPool } from './PoolItem/PoolItemContainer';

import Collapse from '@/components/Collapse/Collapse';
import Divider from '@/components/Divider/Divider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useDisclosure from '@/hooks/useDisclosure';
import useTxNotification from '@/hooks/useTxNotification';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useEffect } from 'react';
import { z } from 'zod';
import { setToke1, setToken2 } from '../../../utils/slice';
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

interface ICreatePoolFormProps {
  onNextStep: () => void;
}

export default function CreatePoolForm({ onNextStep }: ICreatePoolFormProps) {
  const { newPairFee, isLoading: loadingFee } = useGetNewPairFee();

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
        value: ''
      },
      sellFee: {
        timestamp: 0,
        value: ''
      }
    }
  });

  const { mutate } = useGetPoolPair();

  const onSuccess = () => {
    mutate();
    setSessionId(null);
    // dispatch(setActiveStep('set-lp'));
  };
  const { setSessionId } = useTxNotification({
    onSuccess,
    waitTx: true
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { firstToken, secondToken } = data;

    if (firstToken.length > 0 && secondToken.length > 0) {
      const res: SendTransactionReturnType = await newPoolTx(
        newPairFee,
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

  const { isOpen, onToggle } = useDisclosure();

  const loading = loadingUserTokens || loadingAllowedTokenDetails || loadingFee;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='rounded-sm bg-card p-4 '>
          <h2 className='text-gray-300 text-left mb-4'>
            Generate Pool Address
          </h2>

          {loading ? (
            <div className='flex  flex-col gap-4'>
              <Skeleton className='h-9 w-full bg-zinc-600' />
              <Skeleton className='h-9 w-full bg-zinc-600' />
              <div className='mt-8'>
                <Skeleton className='h-9 w-full bg-primary opacity-70' />
              </div>
            </div>
          ) : (
            <>
              <div className='w-full flex flex-col gap-4 text-sm'>
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

                <Button
                  variant='ghost'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle();
                  }}
                >
                  {isOpen ? 'Less info' : 'More info'}{' '}
                </Button>
                <Collapse isOpen={isOpen}>
                  <div className='flex-col flex gap-3 text-left mb-3'>
                    <Input
                      placeholder='Buy fee'
                      className='bg-[#1C243E]'
                      {...form.register('buyFee.value')}
                    />
                    <DagePicker field='buyFee' label='Buy Fee finish' />
                  </div>

                  <div className='flex-col flex gap-3 text-left'>
                    <Input
                      placeholder='Sell fee'
                      className='bg-[#1C243E]'
                      {...form.register('sellFee.value')}
                    />
                    <DagePicker field='sellFee' label='Sell Fee finish' />
                  </div>
                </Collapse>
              </div>
              <SubmitButton onNextStep={onNextStep} />
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
