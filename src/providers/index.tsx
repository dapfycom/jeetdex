'use client';
import { PropsWithChildren } from 'react';
import MxDappProvider from './DappProvider';
import ReduxProvider from './ReduxProvider';
import SwrProvider from './SwrProvider';

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <MxDappProvider>{children}</MxDappProvider>
      </SwrProvider>
    </ReduxProvider>
  );
};

export default MainProvider;
