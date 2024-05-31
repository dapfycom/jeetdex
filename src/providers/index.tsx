'use client';
import { PropsWithChildren } from 'react';
import MxDappProvider from './DappProvider';
import GlobalDataProvider from './GlobalDataProvider';
import ReduxProvider from './ReduxProvider';
import SwrProvider from './SwrProvider';

const MainProvider = ({ children, data }: PropsWithChildren<{ data: any }>) => {
  return (
    <MxDappProvider>
      <ReduxProvider>
        <SwrProvider>
          <GlobalDataProvider data={data}>{children}</GlobalDataProvider>
        </SwrProvider>
      </ReduxProvider>
    </MxDappProvider>
  );
};

export default MainProvider;
