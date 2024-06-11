'use client';
import { Form } from '@/components/ui/form';
import { useAppSelector } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import useTxNotification from '@/hooks/useTxNotification';
import { cn } from '@/lib/utils';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { ForwardedRef, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { ZodTypeAny, z } from 'zod';
import { addInitialLiquidity } from '../../../utils/sc.calls';
import {
  useGetAllowedPoolTokens,
  useGetLpIdentifier,
  useGetPoolPair,
  usePoolHaveLocalRoles
} from '../../../utils/swr.hooks';
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
  firstTokenAmount: numericString(z.number().min(0)),
  secondTokenAmount: numericString(z.number().min(0))
});

export type schemaType = z.infer<typeof formSchema>;

const AddInitialLiquidityForm = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const form = useForm<schemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstTokenAmount: '',
        secondTokenAmount: ''
      }
    });

    const { pair, tokens: tokensSelected } = useGetPoolPair();
    const { haveLocales } = usePoolHaveLocalRoles(pair);

    const onSuccess = () => {
      setSessionId(null);
      // router.push('/create?create-pool=true&lock-lp=true');
    };

    const { setSessionId } = useTxNotification({ onSuccess });

    const { lpIdentifier, isLoading: lpLoading } = useGetLpIdentifier(pair);

    const { userTokens, isLoading: utLoading } = useGetUserTokens();
    const address = useAppSelector(selectUserAddress);
    const { allowedPoolTokens } = useGetAllowedPoolTokens();
    const { tokens, isLoading: tLoading } = useGetMultipleElrondTokens(
      allowedPoolTokens.map((token) => token.identifier) || []
    );
    const ownedTokens = userTokens.filter((token) => token.owner === address);

    const firstTokenAccountDetails = ownedTokens.find(
      (token) => token.identifier === tokensSelected.token1
    );

    const secondTokenAccountDetails = userTokens.find(
      (token) => token.identifier === tokensSelected.token2
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
