'use client';

import { Form } from '@/components/ui/form';
import { useAppSelector, useTrackTransactionStatus } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { newPoolTx } from '../../utils/sc.calls';
import { useGetNewPairFee, useGetPoolPair } from '../../utils/swr.hooks';

import { cn } from '@/lib/utils';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useState } from 'react';
import { z } from 'zod';
import { selectToken1, selectToken2 } from '../../utils/slice';
import SubmitButton from './SubmitButton/SubmitButton';

export const formSchema = z.object({
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
  const { newPairFee } = useGetNewPairFee();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const firstToken = useAppSelector(selectToken1);
  const secondToken = useAppSelector(selectToken2);

  const { mutate } = useGetPoolPair();

  const onSuccess = () => {
    mutate();
  };
  const [sessionId, setSessionId] = useState<string | null>(null);

  // useTxNotification({
  //   onSuccess,
  //   waitTx: true,
  //   sessionId,
  //   setSessionId
  // });

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,

    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error('transactionId', transactionId);
      console.error('errorMessage', errorMessage);
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('w-full')}>
        <div className='rounded-sm bg-card p-4 '>
          <h2 className='text-gray-300 text-left mb-4'>
            2. Generate Pool Address
          </h2>

          {/* <div className='w-full flex flex-col gap-4 text-sm'>
            <Divider />

            <div className='flex-col flex gap-3 text-left mb-3'>
              <Input
                placeholder='Buy fee (Optional)'
                className='bg-[#1C243E]'
                {...form.register('buyFee.value')}
              />
              <DagePicker field='buyFee' label='Buy Fee finish (Optional)' />
            </div>

            <div className='flex-col flex gap-3 text-left'>
              <Input
                placeholder='Sell fee (Optional)'
                className='bg-[#1C243E]'
                {...form.register('sellFee.value')}
              />
              <DagePicker field='sellFee' label='Sell Fee finish (Optional)' />
            </div>
          </div> */}
          <SubmitButton onNextStep={onNextStep} />
        </div>
      </form>
    </Form>
  );
}
