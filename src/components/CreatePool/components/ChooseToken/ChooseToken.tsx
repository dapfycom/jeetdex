import { useAppDispatch, useAppSelector } from '@/hooks';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { ICoreToken } from '@/types/scTypes';
import PoolItemContainer, { ITokenPool } from './PoolItem/PoolItemContainer';

import { Form } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { setToke1 } from '../../utils/slice';

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
  firstToken: z.string()
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChooseToken = ({ onNextStep }) => {
  const { userTokens, isLoading: loadingUserTokens } = useGetUserTokens();
  const address = useAppSelector(selectUserAddress);
  const dispatch = useAppDispatch();

  const ownedTokens = userTokens.filter((token) => token.owner === address);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstToken: ''
    }
  });

  useEffect(
    () => {
      if (form.watch('firstToken')) {
        dispatch(setToke1(form.watch('firstToken')));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.watch('firstToken')]
  );

  const loading = loadingUserTokens;
  return (
    <div className='rounded-sm bg-card p-4 '>
      <h2 className='text-gray-300 text-left mb-4'>Choose your coin</h2>

      <div className='w-full flex flex-col gap-4 text-sm'>
        <Form {...form}>
          <div>
            {loading ? (
              <div className='flex  flex-col gap-4'>
                <Skeleton className='h-9 w-full bg-zinc-600' />
              </div>
            ) : (
              <>
                <div className='w-full flex flex-col gap-4 text-sm'>
                  <PoolItemContainer
                    tokensList={convertToPoolItemToken(ownedTokens)}
                    isLoading={loadingUserTokens}
                    tokenType='firstToken'
                  />
                </div>
                {/* <SubmitButton onNextStep={onNextStep} /> */}
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChooseToken;
