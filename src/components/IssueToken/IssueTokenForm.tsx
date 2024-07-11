'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { admins } from '@/localConstants/admin';
import { SmartContractInteraction } from '@/services/sc/call';
import { interactions } from '@/services/sc/interactions';
import { BigUIntValue, BytesValue } from '@multiversx/sdk-core/out';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import IssueField from './IssueField';
import IssueTokenSwitch from './IssueTokenSwich';

export const IssueTokenSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^\S*$/, 'name must not contain whitespace'),
  ticker: z
    .string()
    .min(3)
    .max(10)
    .regex(/^\S*$/, 'ticker must not contain whitespace'),
  mintAmount: z
    .string()
    .min(1)
    .refine((val) => !isNaN(Number(val)), {
      message: 'mintAmount must be a number'
    }),
  decimals: z
    .string()
    .min(1)
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 18,
      {
        message: 'decimals must be a number between 0 and 18'
      }
    ),
  properties: z.object({
    canFreeze: z.boolean(),
    canWipe: z.boolean(),
    canPause: z.boolean(),
    canChangeOwner: z.boolean(),
    canUpgrade: z.boolean(),
    canAddSpecialRoles: z.boolean()
  })
});

export default function IssueTokenForm() {
  const form = useForm<z.infer<typeof IssueTokenSchema>>({
    resolver: zodResolver(IssueTokenSchema),
    defaultValues: {
      name: '',
      ticker: '',
      mintAmount: '',
      decimals: '18',
      properties: {
        canFreeze: false,
        canWipe: false,
        canPause: false,
        canChangeOwner: false,
        canUpgrade: true,
        canAddSpecialRoles: true
      }
    }
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // useTxNotification({ waitTx: true, sessionId, setSessionId });
  useTrackTransactionStatus({
    transactionId: sessionId
  });
  async function onSubmit(data: z.infer<typeof IssueTokenSchema>) {
    const tx1 = interactions.metachain.EGLDPaymentOnlyTx({
      value: 0.05,
      functionName: 'issue',
      gasL: 60000000,
      arg: [
        BytesValue.fromUTF8(data.name),
        BytesValue.fromUTF8(data.ticker.toUpperCase()),
        new BigUIntValue(
          new BigNumber(data.mintAmount).multipliedBy(
            10 ** Number(data.decimals)
          )
        ),
        new BigUIntValue(data.decimals),

        // properties
        BytesValue.fromUTF8('canFreeze'),
        BytesValue.fromUTF8(data.properties.canFreeze ? 'true' : 'false'),

        BytesValue.fromUTF8('canWipe'),
        BytesValue.fromUTF8(data.properties.canWipe ? 'true' : 'false'),

        BytesValue.fromUTF8('canPause'),
        BytesValue.fromUTF8(data.properties.canPause ? 'true' : 'false'),

        BytesValue.fromUTF8('canChangeOwner'),
        BytesValue.fromUTF8(data.properties.canChangeOwner ? 'true' : 'false'),

        BytesValue.fromUTF8('canUpgrade'),
        BytesValue.fromUTF8(data.properties.canUpgrade ? 'true' : 'false'),

        BytesValue.fromUTF8('canAddSpecialRoles'),
        BytesValue.fromUTF8(
          data.properties.canAddSpecialRoles ? 'true' : 'false'
        )
      ]
    });

    const interaction = new SmartContractInteraction(admins[1]);
    const tx2 = interaction.EGLDPaymentOnlyTx({
      functionName: 'fee',
      value: 0.019
    });

    const res: SendTransactionReturnType = await sendTransactions({
      transactions: [tx1, tx2]
    });

    setSessionId(res.sessionId);
  }

  return (
    <div className='rounded-sm bg-card  px-4 py-5 w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <IssueField name='name' label='Name' />

          <IssueField name='ticker' label='Ticker' />

          <IssueField name='mintAmount' label='Mint Amount' />

          <IssueField name='decimals' label='Decimals' />

          <div className='grid grid-cols-2 gap-x-6 gap-y-2'>
            <IssueTokenSwitch label='Freezable' name='properties.canFreeze' />
            <IssueTokenSwitch label='Wipeable' name='properties.canWipe' />
            <IssueTokenSwitch label='Pauseable' name='properties.canPause' />
            <IssueTokenSwitch
              label='Upgradeable'
              name='properties.canUpgrade'
            />
            <IssueTokenSwitch
              label='Changeable Owner'
              name='properties.canChangeOwner'
            />
            <IssueTokenSwitch
              label='Can Add Special Roles'
              name='properties.canAddSpecialRoles'
            />
          </div>
          <div className='flex w-full justify-center'>
            <Button type='submit' className='!mt-6 mx-auto'>
              Create coin this second
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
