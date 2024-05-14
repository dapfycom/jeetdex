'use client';
import { PropsWithChildren } from 'react';
import MxDappProvider from './DappProvider';
import ReduxProvider from './ReduxProvider';

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <MxDappProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </MxDappProvider>
  );
};

export default MainProvider;
