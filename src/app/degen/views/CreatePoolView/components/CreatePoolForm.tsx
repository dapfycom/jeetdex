'use client';

import { z } from 'zod';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

import { Button } from '@/components/ui/button';
import { tokensID } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import { useState } from 'react';
import PoolItem from './PoolItem/PoolItem';

export default function CreatePoolForm() {
  const { userTokens } = useGetUserTokens();
  const address = useAppSelector(selectUserAddress);

  const ownedTokens = userTokens.filter((token) => token.owner === address);
  const secondToken = userTokens.filter(
    (token) => token.identifier === tokensID.wegld
  );
  const [firstToken, setFirstToken] = useState();
  const handleChangePoolItem1 = (token) => {
    setFirstToken(token);
  };

  const handleGeneratePoolAddress = () => {};

  if (ownedTokens.length === 0) {
    return null;
  }
  return (
    <div className='bg-zinc-900 rounded-xl px-8 py-12'>
      <h2 className='text-gray-300 text-xl'>Generate Pool Address</h2>

      <p className='text-gray-400 text-sm mb-10'>
        You must be the creator of the tokens and also brand them.
      </p>

      <div className='w-full flex flex-col gap-4'>
        <PoolItem
          tokensList={userTokens}
          onChangePoolItem={handleChangePoolItem1}
        />
        <div className='justify-center text-center w-full'>
          <FontAwesomeIcon icon={faPlus} className='w-6 h-6' />
        </div>
        <PoolItem tokensList={secondToken} />
      </div>

      <Button onClick={handleGeneratePoolAddress} className='w-full mt-10'>
        Generate Pool Address
      </Button>
    </div>
  );
}
