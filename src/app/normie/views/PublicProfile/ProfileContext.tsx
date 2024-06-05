'use client';

import { useAuthentication } from '@/hooks';
import { redirect } from 'next/navigation';
import { PropsWithChildren, createContext, useEffect } from 'react';
type user = {
  id: string;
  username: string;
  address: string;
  img: string;
  bio: string;
};
type ContextType = {
  followed: ({
    id: string;
    followedId: string;
    followingId: string;
  } & { following: user })[];
  following: ({
    id: string;
    followedId: string;
    followingId: string;
  } & { followed: user })[];
  _count: {
    likesReceived: number;
  };
} & user;

export const ProfileCtx = createContext<ContextType>(null);

const PublicProfileContext = ({
  children,
  ctxValue
}: PropsWithChildren<{
  ctxValue: ContextType;
}>) => {
  const { address } = useAuthentication();
  useEffect(() => {
    if (address === ctxValue.address) {
      redirect('/profile');
    }
  }, [address, ctxValue.address]);
  return <ProfileCtx.Provider value={ctxValue}>{children}</ProfileCtx.Provider>;
};

export default PublicProfileContext;
