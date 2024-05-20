'use client';
import { Form } from '@/components/ui/form';
import { useAppSelector, useTrackTransactionStatus } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SelectToken from '../components/SelectToken';
import { enableTrade } from '../utils/sc.calls';
import { useGetAllowedPoolTokens, useGetPoolPair } from '../utils/swr.hooks';
import SubmitButton from './SubmitButton';

const formSchema = z.object({
  firstToken: z.string(),
  secondToken: z.string()
});

export type schemaType = z.infer<typeof formSchema>;

const EnableSwapForm = () => {
  const form = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstToken: '',
      secondToken: ''
    }
  });
  const { pair, isLoading: l4 } = useGetPoolPair(
    form.watch('firstToken'),
    form.watch('secondToken')
  );
  const { userTokens, isLoading: l1 } = useGetUserTokens();
  const address = useAppSelector(selectUserAddress);
  const { allowedPoolTokens, isLoading: l2 } = useGetAllowedPoolTokens();
  const { tokens, isLoading: l3 } = useGetMultipleElrondTokens(
    allowedPoolTokens.map((token) => token.identifier) || []
  );
  const ownedTokens = userTokens.filter((token) => token.owner === address);
  const router = useRouter();

  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSuccess = () => {
    setSessionId(null);
    router.push('/create?create-pool=true&lock-lp=true&enable-swap=true');
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const onSubmit = async () => {
    const res = await enableTrade(pair);

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
            Select the tokens of your pool. Then enable trade for pools that you
            created.
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
          </div>
          <div>
            <SubmitButton pairAddress={pair} isLoading={l1 || l2 || l3 || l4} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EnableSwapForm;
