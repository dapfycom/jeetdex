import { getCoinOwner } from '@/services/rest/events/shared/coins';
import useSWR from 'swr';

const useGetCoinOwner = (identifier: string) => {
  const { data, error, isLoading, isValidating } = useSWR(
    identifier ? `/coins/owner?coinIdentifier=${identifier}` : null,
    () => getCoinOwner(identifier)
  );
  console.log(data);

  return {
    owner: data,
    error,
    isLoading,
    isValidating
  };
};

export default useGetCoinOwner;
