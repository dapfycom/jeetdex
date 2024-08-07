import MainProvider from '@/providers';
import { PropsWithChildren } from 'react';

export const MainLayout = async ({
  children
}: PropsWithChildren<{
  withMxProvider?: boolean;
}>) => {
  return <MainProvider>{children}</MainProvider>;
};
