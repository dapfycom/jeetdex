'use client';
import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { SWRDevTools } from 'swr-devtools';

const SwrProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRDevTools>
      <SWRConfig
        value={{
          revalidateIfStale: false,

          onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (error.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
          }
        }}
      >
        {children}
      </SWRConfig>
    </SWRDevTools>
  );
};

export default SwrProvider;
