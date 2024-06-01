import MainProvider from '@/providers';
import { fetchCoinsData, fetchPoolsData } from '@/services/others/cache.server';
import { PropsWithChildren } from 'react';

export const MainLayout = async ({
  children
}: PropsWithChildren<{
  withMxProvider?: boolean;
}>) => {
  const coins = await fetchCoinsData();
  const pools = await fetchPoolsData();

  return <MainProvider data={{ coins, pools }}>{children}</MainProvider>;
};
