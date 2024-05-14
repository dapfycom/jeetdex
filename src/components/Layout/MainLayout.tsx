import MainProvider from '@/providers';
import { PropsWithChildren } from 'react';

export const MainLayout = ({
  children
}: PropsWithChildren<{
  withMxProvider?: boolean;
}>) => {
  return <MainProvider>{children}</MainProvider>;
};
