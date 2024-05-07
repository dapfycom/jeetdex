import { egldStaticData } from '@/localConstants/egldData';
import { fetchElrondEconomics } from '@/services/rest/elrond/network';
import { fetchTokenById } from '@/services/rest/elrond/tokens';
import { IElrondToken } from '@/types/scTypes';
import useSWR from 'swr';

const useGetElrondToken = (tokenI: string | null) => {
  const { data: elrondToken, isLoading: isLoadingElrondToken } = useSWR(
    tokenI === 'EGLD' ? null : tokenI,
    fetchTokenById,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      }
    }
  );

  const { data: economics, isLoading: isLoadingEconomics } = useSWR(
    tokenI === 'EGLD' ? '/economics' : null,
    fetchElrondEconomics
  );

  let finalData;

  if (tokenI === 'EGLD') {
    finalData = { ...egldStaticData, ...economics };
  } else {
    finalData = elrondToken;
  }

  return {
    elrondToken: finalData as IElrondToken,
    isLoading: isLoadingEconomics || isLoadingElrondToken
  };
};

export default useGetElrondToken;
