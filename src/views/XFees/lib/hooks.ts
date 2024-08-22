import { fetchTransactions } from '@/services/rest/elrond/transactions';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

const calculateXFees = async (address: string) => {
  try {
    const transactions = await fetchTransactions({
      sender: address,
      size: 10000
    });

    const xfees = transactions.reduce((acc, tx) => {
      return new BigNumber(acc).plus(tx.fee || 0);
    }, new BigNumber(0));

    return {
      xfees: xfees.dividedBy(new BigNumber(10).pow(18)).toString(),
      transactions: transactions.length
    };
  } catch (error) {
    throw new Error('Failed to calculate X-Fees');
  }
};

export const useGetXFees = (address: string) => {
  const [data, setData] = useState<{
    xfees: string;
    transactions: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await calculateXFees(address);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return {
    xfees: data,
    isLoading,
    error
  };
};
