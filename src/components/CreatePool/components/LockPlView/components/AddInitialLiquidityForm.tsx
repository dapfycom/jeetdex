'use client';
import { Form } from '@/components/ui/form';
import { useAppSelector, useTrackTransactionStatus } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { cn } from '@/lib/utils';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { numericString } from '@/utils/general';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addInitialLiquidity } from '../../../utils/sc.calls';
import {
  useGetAllowedPoolTokens,
  useGetLpIdentifier,
  useGetPoolPair,
  usePoolHaveLocalRoles
} from '../../../utils/swr.hooks';
import SubmitButton from './SubmitButton';
import TokenAmount from './TokenAmount';

const AddInitialLiquidityForm = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { pair, tokens: tokensSelected } = useGetPoolPair();

    const address = useAppSelector(selectUserAddress);
    const { userTokens, isLoading: utLoading } = useGetUserTokens();
    const ownedTokens = userTokens.filter((token) => token.owner === address);

    const firstTokenAccountDetails = ownedTokens.find(
      (token) => token.identifier === tokensSelected.token1
    );

    const secondTokenAccountDetails = userTokens.find(
      (token) => token.identifier === tokensSelected.token2
    );

    const formSchema = z.object({
      firstTokenAmount: numericString(
        z
          .number()
          .min(0)
          .max(formatBalance(firstTokenAccountDetails, true) as number)
      ),
      secondTokenAmount: numericString(z.number().min(2))
    });
    type schemaType = z.infer<typeof formSchema>;

    const form = useForm<schemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstTokenAmount: '',
        secondTokenAmount: ''
      }
    });

    const { haveLocales } = usePoolHaveLocalRoles(pair);

    const onSuccess = () => {
      setSessionId(null);
      // router.push('/create?create-pool=true&lock-lp=true');
    };
    const [sessionId, setSessionId] = useState<string | null>(null);

    // useTxNotification({ onSuccess, sessionId, setSessionId, waitTx: true });
    useTrackTransactionStatus({
      transactionId: sessionId,
      onSuccess,

      onFail: (transactionId: string | null, errorMessage?: string) => {
        console.error('transactionId', transactionId);
        console.error('errorMessage', errorMessage);
      }
    });
    const { lpIdentifier, isLoading: lpLoading } = useGetLpIdentifier(pair);

    const { allowedPoolTokens } = useGetAllowedPoolTokens();
    const { tokens, isLoading: tLoading } = useGetMultipleElrondTokens(
      allowedPoolTokens.map((token) => token.identifier) || []
    );

    const secondTokenDetails = tokens.find(
      (token) => token.identifier === tokensSelected.token2
    );
    const onSubmit = async (data: schemaType) => {
      const res: SendTransactionReturnType = await addInitialLiquidity(
        pair,
        { ...firstTokenAccountDetails, value: data.firstTokenAmount },
        { ...secondTokenDetails, value: data.secondTokenAmount }
      );

      if (res) {
        setSessionId(res.sessionId);
      }
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'w-full'}>
          <div className='bg-card rounded-sm p-4' ref={ref}>
            <h2 className='text-gray-300 text-left mb-3'>
              5. Add initial liquidity
            </h2>
            <div className={cn(!haveLocales && 'hidden')}>
              <div className='w-full flex flex-col gap-4 text-left'>
                <div>
                  <div className='mb-4'>
                    <TokenAmount
                      label='First Token Amount'
                      token={firstTokenAccountDetails}
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
                                    token.identifier === tokensSelected.token2
                                )?.minimumToLock || 0,
                              decimals: secondTokenDetails?.decimals || 0
                            }
                          )}) ${formatTokenI(tokensSelected.token2)}`}</span>
                        </span>
                      }
                      token={secondTokenAccountDetails}
                      tokenType={'secondTokenAmount'}
                    />
                    {form.formState.errors.secondTokenAmount && (
                      <div className='text-red-500 text-sm mt-1'>
                        {form.formState.errors?.secondTokenAmount?.message.toString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <SubmitButton
                lpIdentifier={lpIdentifier}
                isLoading={utLoading || lpLoading || tLoading}
              />
            </div>
          </div>
        </form>
      </Form>
    );
  }
);

AddInitialLiquidityForm.displayName = 'LockLpForm';

export default AddInitialLiquidityForm;
