'use client';
import { Form } from '@/components/ui/form';
import { useAppSelector, useTrackTransactionStatus } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodTypeAny, z } from 'zod';
import SelectToken from '../../components/SelectToken';
import { addInitialLiquidity } from '../../utils/sc.service';
import {
  useGetAllowedPoolTokens,
  useGetLpIdentifier,
  useGetPoolPair
} from '../../utils/swr.hooks';
import SubmitButton from './SubmitButton';
import TokenAmount from './TokenAmount';

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseFloat(a);
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema);

const formSchema = z.object({
  firstToken: z.string(),
  secondToken: z.string(),
  firstTokenAmount: numericString(z.number().min(0)),
  secondTokenAmount: numericString(z.number().min(0))
});

export type schemaType = z.infer<typeof formSchema>;

const LockLpForm = () => {
  const form = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstToken: '',
      secondToken: '',
      firstTokenAmount: '',
      secondTokenAmount: ''
    }
  });
  const { pair } = useGetPoolPair(
    form.watch('firstToken'),
    form.watch('secondToken')
  );
  const router = useRouter();

  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSuccess = () => {
    setSessionId(null);
    router.push('/create?create-pool=true&lock-lp=true');
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const { lpIdentifier, isLoading: lpLoading } = useGetLpIdentifier(pair);
  const { userTokens, isLoading: utLoading } = useGetUserTokens();
  const address = useAppSelector(selectUserAddress);
  const { allowedPoolTokens } = useGetAllowedPoolTokens();
  const { tokens, isLoading: tLoading } = useGetMultipleElrondTokens(
    allowedPoolTokens.map((token) => token.identifier) || []
  );
  const ownedTokens = userTokens.filter((token) => token.owner === address);

  const firstTokenDetails = ownedTokens.find(
    (token) => token.identifier === form.watch('firstToken')
  );

  const secondTokenDetails = tokens.find(
    (token) => token.identifier === form.watch('secondToken')
  );
  const onSubmit = async (data: schemaType) => {
    const res: SendTransactionReturnType = await addInitialLiquidity(
      pair,
      { ...firstTokenDetails, value: data.firstTokenAmount },
      { ...secondTokenDetails, value: data.secondTokenAmount }
    );

    if (res) {
      setSessionId(res.sessionId);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-[400px]'
      >
        <div className='bg-zinc-900 rounded-xl px-8 py-12'>
          <p className='text-gray-400 text-sm mb-10'>
            Select the tokens of your pool. Then lock a LP position from your
            pool for 180 days.
          </p>

          <div className='w-full flex flex-col gap-4 text-left'>
            {ownedTokens.length > 0 ? (
              <div>
                <div className='mb-1 text-sm text-gray-500'>First Token</div>
                <SelectToken
                  tokens={ownedTokens}
                  onChange={(value) => form.setValue('firstToken', value)}
                />
              </div>
            ) : null}

            {tokens.length > 0 ? (
              <div>
                <div className='mb-1 text-sm text-gray-500'>Second Token</div>
                <SelectToken
                  tokens={tokens}
                  onChange={(value) => form.setValue('secondToken', value)}
                />
              </div>
            ) : null}
            {form.watch('firstToken') &&
              form.watch('secondToken') &&
              lpIdentifier && (
                <div>
                  <div className='mb-4'>
                    <TokenAmount
                      label='First Token Amount'
                      token={firstTokenDetails}
                      tokenType={'firstTokenAmount'}
                    />
                    {form.formState.errors.firstTokenAmount && (
                      <div className='text-red-500 text-sm mt-1'>
                        {form.formState.errors?.firstTokenAmount?.message.toString()}
                      </div>
                    )}
                  </div>

                  <div className='mb-4'>
                    <TokenAmount
                      label={
                        <span>
                          Second Token Amount{' '}
                          <span className='font-bold text-primary'>{`(min - ${formatBalance(
                            {
                              balance:
                                allowedPoolTokens.find(
                                  (token) =>
                                    token.identifier ===
                                    form.watch('secondToken')
                                )?.minimumToLock || 0,
                              decimals: secondTokenDetails?.decimals || 0
                            }
                          )}) ${formatTokenI(
                            form.watch('secondToken')
                          )}`}</span>
                        </span>
                      }
                      token={secondTokenDetails}
                      tokenType={'secondTokenAmount'}
                    />

                    {form.formState.errors.secondToken && (
                      <div className='text-red-500 text-sm mt-1'>
                        {form.formState.errors?.secondToken?.message.toString()}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
          <SubmitButton
            lpIdentifier={lpIdentifier}
            isLoading={utLoading || lpLoading || tLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default LockLpForm;
