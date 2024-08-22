'use client';
import { Button } from '@/components/ui/button';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import { integrator } from '@/services/rest/ash';
import { interactions } from '@/services/sc/interactions';
import { fetchScSimpleData } from '@/services/sc/query';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';

import { Address, AddressValue, U64Value } from '@multiversx/sdk-core/out';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import BigNumber from 'bignumber.js';
import React from 'react';
import useSWR from 'swr';

const AggregatorView = () => {
  const [sessionId, setSessionId] = React.useState<string | null>('');
  const { data, mutate } = useSWR('Claimable Aggregator Fee', () => {
    return fetchScSimpleData<{ amount: BigNumber; token: string }[]>(
      'ashSwapAggregator:getClaimabeProtocolFee',
      [
        new AddressValue(new Address(integrator)),
        new U64Value(new BigNumber(0)),
        new U64Value(new BigNumber(10))
      ]
    );
  });
  console.log(data);

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: () => {
      mutate();
    }
  });

  const { tokens } = useGetMultipleElrondTokens(
    data?.map((item) => item.token) || []
  );

  const handleClaimFee = async () => {
    const res = await interactions.ashSwapAggregator.scCall({
      functionName: 'claimProtocolFee',
      arg: [new AddressValue(new Address(integrator))],
      gasL: 100_000_000
    });
    setSessionId(res?.sessionId);
  };

  const rewards = tokens.map((token) => {
    const rewardToken = data?.find(
      (item) => item.token === token.identifier
    ) || { amount: new BigNumber(0), token: token.identifier };
    return {
      ...token,
      ...rewardToken
    };
  });
  return (
    <div className='h-full px-4 py-6 lg:px-8 '>
      <div className='border-none p-0 outline-none text-center h-full flex justify-center flex-col items-center w-full'>
        <div className='max-w-[300px]'>
          <div className='mb-1'>Accumulated rewards</div>
          <div className='mb-4'>
            {rewards.map((item) => {
              return (
                <div key={item.identifier}>
                  {formatBalance({
                    balance: item.amount,
                    decimals: item.decimals
                  })}{' '}
                  {formatTokenI(item.identifier)}
                </div>
              );
            })}
          </div>
          <Button onClick={handleClaimFee}>Claim Rewards</Button>
        </div>
      </div>
    </div>
  );
};

export default AggregatorView;
