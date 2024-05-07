import {
  DappProvider,
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@/components';
import {
  apiTimeout,
  environment,
  sampleAuthenticatedDomains,
  walletConnectV2ProjectId
} from '@/config';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import type { PropsWithChildren } from 'react';
const MxDappProvider = ({ children }: PropsWithChildren) => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={environment}
          customNetworkConfig={{
            name: 'jeetdexConfig',
            apiTimeout,
            walletConnectV2ProjectId
          }}
          dappConfig={{
            isSSR: true,
            shouldUseWebViewProvider: true
          }}
          customComponents={{
            transactionTracker: {
              // uncomment this to use the custom transaction tracker
              // component: TransactionsTracker,
              props: {
                onSuccess: (sessionId: string) => {
                  console.log(`Session ${sessionId} successfully completed`);
                },
                onFail: (sessionId: string, errorMessage: string) => {
                  console.log(
                    `Session ${sessionId} failed. ${errorMessage ?? ''}`
                  );
                }
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
