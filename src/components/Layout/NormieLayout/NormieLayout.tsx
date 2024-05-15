import { PropsWithChildren } from 'react';
import { MainLayout } from '../MainLayout';
import { Header } from './Header';

export const NormieLayout = ({ children }: PropsWithChildren) => {
  return (
    <MainLayout>
      <div className='flex min-h-screen flex-col '>
        <Header />
        <main className='flex flex-grow items-stretch justify-center pb-10'>
          {children}
        </main>
      </div>
    </MainLayout>
  );
};
