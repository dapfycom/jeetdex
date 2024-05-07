import MainProvider from '@/providers';
import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({
  children,
  withMxProvider
}: PropsWithChildren<{
  withMxProvider?: boolean;
}>) => {
  return (
    <MainProvider providers={withMxProvider ? ['dapp', 'redux'] : ['redux']}>
      <div className='flex min-h-screen flex-col bg-slate-200'>
        <Header />
        <main className='flex flex-grow items-stretch justify-center p-6'>
          {children}
        </main>
        <Footer />
      </div>
    </MainProvider>
  );
};
