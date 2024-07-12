import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGetSignedTransactions } from './sdkDappHooks';

export const useTrackTransactionStatus = ({
  transactionId,
  onSuccess,
  onFail
}) => {
  const [isFailed, setIsFailed] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const [isSuccessful, setIsSuccessful] = useState(false);

  const signtx = useGetSignedTransactions();
  const transactions = signtx.signedTransactions[transactionId]?.transactions;

  const transactionHash = transactions?.map((tx) => tx.hash).join(',');

  useEffect(() => {
    let intervalId;

    if (transactionHash) {
      const fetchTransactionStatus = async () => {
        try {
          const response = await axios.get(
            `https://devnet-api.multiversx.com/transactions?hashes=${transactionHash}&withScResults=true`
          );
          const fetchedTransactions = response.data;

          if (fetchedTransactions && fetchedTransactions.length > 0) {
            const isAllSuccessful = fetchedTransactions.every(
              (tx) => tx.status === 'success'
            );
            const isAnyFailed = fetchedTransactions.some(
              (tx) => tx.status === 'fail'
            );

            const isAnyPending = fetchedTransactions.some(
              (tx) => tx.status === 'pending'
            );
            setIsPending(isAnyPending);

            if (isAllSuccessful) {
              setIsSuccessful(true);
              onSuccess();

              clearInterval(intervalId);
            } else if (isAnyFailed) {
              setIsFailed(true);
              onFail();
              clearInterval(intervalId);
            }
          }
        } catch (error) {
          console.error('Error fetching transaction status:', error);
        }
      };

      fetchTransactionStatus();
      intervalId = setInterval(fetchTransactionStatus, 7000);

      return () => clearInterval(intervalId);
    }
  }, [transactionHash]);

  return { transactions, isFailed, isSuccessful, isPending };
};
