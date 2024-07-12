'use client';

import { useBatchTransactionsTracker } from '@/hooks/sdkDappHooks';
import { useTransactionsTracker } from '@multiversx/sdk-dapp/hooks/transactions/useTransactionsTracker';

export const TransactionsTracker = () => {
  useTransactionsTracker({
    onSuccess: () => {},
    onFail: (sessionId: string, errorMessage?: string) => {
      if (errorMessage) {
        return;
      }
    }
  });
  // We do this in order to have full control of the implementation
  // Default tracker sends signedTransactions automatically and we don't want to do that
  // By doing this it will enable the tracker but without the sendTransactions logic
  useBatchTransactionsTracker({
    onSuccess: () => {},
    onFail: (sessionId, errorMessage) => {
      if (errorMessage) {
        return;
      }
    }
  });

  return null;
};
