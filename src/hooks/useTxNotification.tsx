import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useGetSignedTransactions } from './sdkDappHooks';

const useTxNotification = ({
  submittedTxCallback,
  waitTx,
  sessionId // setSessionId
}: {
  submittedTxCallback?: () => void;
  onSuccess?: () => void;
  waitTx?: boolean;
  sessionId: string;
  setSessionId: (v: string | null) => void;
}) => {
  const ref = useRef<string>(null);

  const signtx = useGetSignedTransactions();
  const transactions = useMemo(
    () => signtx.signedTransactions[sessionId]?.transactions,
    [sessionId, signtx.signedTransactions]
  );

  const handleToast = useCallback(() => {
    if (
      transactions &&
      transactions[0]?.hash &&
      transactions[0]?.hash !== ref.current &&
      sessionId
    ) {
      ref.current = transactions[0]?.hash;

      if (submittedTxCallback) {
        submittedTxCallback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, transactions, waitTx]);

  useEffect(() => {
    handleToast();
  }, [handleToast]);

  return {
    toastTxNotification: handleToast,
    ref
  };
};

export default useTxNotification;
