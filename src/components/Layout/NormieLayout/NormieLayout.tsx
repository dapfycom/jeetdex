import GlobalDataProvider from '@/providers/GlobalDataProvider';
import { fetchCoinsData, fetchPoolsData } from '@/services/others/cache.server';
import { PropsWithChildren } from 'react';
import { Header } from './Header';

export const NormieLayout = async ({ children }: PropsWithChildren) => {
  const coins = await fetchCoinsData();
  const pools = await fetchPoolsData();

  const data = { coins, pools };

  return (
    <GlobalDataProvider data={data}>
      <div className='flex min-h-screen flex-col  bg-[#18212d] '>
        <Header />
        <main className='flex flex-grow items-stretch justify-center pb-10'>
          {children}
        </main>
      </div>
    </GlobalDataProvider>
  );
};
