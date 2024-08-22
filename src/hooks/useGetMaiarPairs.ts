import { fetchMaiarPairs } from '@/services/rest/elrond/maiar';
import { IMexPair } from '@/types/scTypes';
import useSwr from 'swr';
const useGetMaiarPairs = () => {
  const {
    data: apiPairs,
    isLoading,
    error
  } = useSwr<IMexPair[]>('/maiar-pairs', fetchMaiarPairs);

  const pairs: IMexPair[] | undefined = apiPairs;

  return {
    pairs: pairs || [],
    isLoading,
    error
  };
};

export default useGetMaiarPairs;

export const useIsMaiarToken = (tokenId: string) => {
  const { pairs } = useGetMaiarPairs();
  const isMaiarToken = pairs.some(
    (pair) => pair.baseId === tokenId || pair.quoteId === tokenId
  );

  return isMaiarToken;
};

export const useFilterMairTokens = (tokens: string[]) => {
  const { pairs } = useGetMaiarPairs();
  const filteredTokens = tokens.filter((token) =>
    pairs.some((pair) => pair.baseId === token || pair.quoteId === token)
  );

  return filteredTokens;
};
