'use client';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import DisconnectComponent from './DisconnectComponent';

import { createAuthTokenCookie } from '@/actions/cookies';
import { createProfile } from '@/actions/user';
import { useAppDispatch } from '@/hooks';
import { setShard, setUserAddress } from '@/redux/dapp/dapp-slice';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

const ConnectComponent = dynamic(() => import('./ConnectComponent'), {
  ssr: false
});

const Login = () => {
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();
  const dispatch = useAppDispatch();

  const { address, shard, account } = useGetAccountInfo();
  useEffect(() => {
    dispatch(
      setUserAddress(process.env.NEXT_PUBLIC_CONNECTED_ADDRESS || address)
    );
    dispatch(setShard(shard || 1));
  }, [address, dispatch, shard]);

  useEffect(() => {
    createProfile({ address, herotag: account?.username });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (tokenLogin?.nativeAuthToken) {
      createAuthTokenCookie(tokenLogin.nativeAuthToken);
    }
  }, [tokenLogin?.nativeAuthToken]);

  return (
    <>
      {isLoggedIn ? (
        <DisconnectComponent />
      ) : (
        <Suspense fallback={<Skeleton className='w-[230px] h-[24px]' />}>
          <ConnectComponent />
        </Suspense>
      )}
    </>
  );
};

export default Login;
