'use client';

import { apiTimeout, environment, walletConnectV2ProjectId } from '@/config';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import dynamic from 'next/dynamic';
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from './sdk-components';

export const DappProvider = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/wrappers/DappProvider'))
      .DappProvider;
  },
  { ssr: false }
);

const MxDappProvider = ({ children }) => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={['https://tools.elrond.com']}
      >
        <DappProvider
          environment={environment}
          customNetworkConfig={{
            name: 'jeetdexConfig',
            apiTimeout,
            walletConnectV2ProjectId
          }}
          dappConfig={{
            shouldUseWebViewProvider: true
          }}
          customComponents={{
            transactionTracker: {
              props: {
                onSuccess: () => {}
              }
            }
          }}
        >
          <AxiosInterceptorContext.Listener>
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals />
            {children}
          </AxiosInterceptorContext.Listener>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};

export default MxDappProvider;
