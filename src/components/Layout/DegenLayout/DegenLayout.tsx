import { PropsWithChildren } from 'react';
import { MainLayout } from '../MainLayout';
import { Header } from './Header';

export const DegenLayout = ({ children }: PropsWithChildren) => {
  return (
    <MainLayout>
      <div className='flex min-h-screen flex-col '>
        <Header />
        <main className='flex flex-grow items-stretch justify-center p-6'>
          {children}
        </main>
      </div>
    </MainLayout>
  );
};
