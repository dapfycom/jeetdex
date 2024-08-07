import GlobalDataProvider from '@/providers/GlobalDataProvider';
import { fetchCoinsData, fetchPoolsData } from '@/services/others/cache.server';
import { PropsWithChildren } from 'react';
import { MainLayout } from '../MainLayout';
import { Header } from './Header';

export const NormieLayout = async ({ children }: PropsWithChildren) => {
  const coins = await fetchCoinsData();
  const pools = await fetchPoolsData();
  console.log(pools);

  const data = { coins, pools };

  return (
    <MainLayout>
      <GlobalDataProvider data={data}>
        <div className='flex min-h-screen flex-col  bg-[#18212d] '>
          <Header />
          <main className='flex flex-grow items-stretch justify-center pb-10'>
            {children}
          </main>
        </div>
      </GlobalDataProvider>
    </MainLayout>
  );
};
