import GlobalDataProvider from '@/providers/GlobalDataProvider';
import { fetchCoinsData } from '@/services/others/cache.server';
import { PropsWithChildren } from 'react';
import { MainLayout } from '../MainLayout';
import { Header } from './Header';

export const DegenLayout = async ({ children }: PropsWithChildren) => {
  const coins = await fetchCoinsData();

  const data = { coins };
  return (
    <MainLayout>
      <GlobalDataProvider data={data}>
        <div className='flex min-h-screen flex-col bg-[#18212d]'>
          <Header />
          <main className='flex flex-grow items-stretch justify-center p-6'>
            {children}
          </main>
        </div>
      </GlobalDataProvider>
    </MainLayout>
  );
};
