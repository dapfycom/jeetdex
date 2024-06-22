'use client';

import { useAuthentication } from '@/hooks';
import { redirect } from 'next/navigation';
import { PropsWithChildren, createContext, useEffect } from 'react';

export const ProfileCtx = createContext<any>(null);

const PublicProfileContext = ({
  children,
  ctxValue
}: PropsWithChildren<{
  ctxValue: any;
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
