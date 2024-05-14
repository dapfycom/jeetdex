'use client';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import DisconnectComponent from './DisconnectComponent';

import { useAppDispatch } from '@/hooks';
import { setShard, setUserAddress } from '@/redux/dapp/dapp-slice';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ConnectComponent = dynamic(() => import('./ConnectComponent'), {
  ssr: false
});

const Login = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const dispatch = useAppDispatch();

  const { address, shard } = useGetAccountInfo();
  useEffect(() => {
    dispatch(
      setUserAddress(process.env.NEXT_PUBLIC_CONNECTED_ADDRESS || address)
    );
    dispatch(setShard(shard || 1));
  }, [address, dispatch, shard]);

  return <>{isLoggedIn ? <DisconnectComponent /> : <ConnectComponent />}</>;
};

export default Login;
