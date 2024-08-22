//hook for getting the price of LP tokens in USD

import useGetMaiarPairs from './useGetMaiarPairs';

export const useGetFarmsLpPrices = () => {
  const { pairs, isLoading, error } = useGetMaiarPairs();
  const finalData = pairs?.map((item) => {
    return {
      token: item.id,
      price: item.price
    };
  });
  return {
    prices: finalData || [],
    isLoading,
    error: error
  };
};
