import MainProvider from '@/providers';
import { fetchCoinsData } from '@/services/others/global.server';
import { PropsWithChildren } from 'react';

export const MainLayout = async ({
  children
}: PropsWithChildren<{
  withMxProvider?: boolean;
}>) => {
  const coins = await fetchCoinsData();
  return <MainProvider data={{ coins }}>{children}</MainProvider>;
};
