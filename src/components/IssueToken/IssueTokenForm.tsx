'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { interactions } from '@/services/sc/interactions';
import { BigUIntValue, BytesValue } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import IssueField from './IssueField';
import IssueTokenSwitch from './IssueTokenSwich';

export const IssueTokenSchema = z.object({
  name: z.string().min(1),
  ticker: z.string().min(1),
  mintAmount: z.string().min(1),
  decimals: z.string().min(1),
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

  function onSubmit(data: z.infer<typeof IssueTokenSchema>) {
    interactions.metachain.EGLDPayment({
      value: 0.05,
      functionName: 'issue',
      gasL: 60000000,
      arg: [
        BytesValue.fromUTF8(data.name),
        BytesValue.fromUTF8(data.ticker),
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
  }

  return (
    <div className='rounded-xl bg-zinc-900 px-4 py-5 w-full'>
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

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
