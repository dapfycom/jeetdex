'use client';
import { PropsWithChildren } from 'react';
import MxDappProvider from './DappProvider';
import ReduxProvider from './ReduxProvider';
import SwrProvider from './SwrProvider';

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <MxDappProvider>
      <ReduxProvider>
        <SwrProvider>{children}</SwrProvider>
      </ReduxProvider>
    </MxDappProvider>
  );
};

export default MainProvider;
