import { generateLpName, generateLpTicker } from './functions';
import { useGetPoolPair } from './swr.hooks';

export const useGenerateLPStrings = () => {
  const { tokens } = useGetPoolPair();

  const lpName = generateLpName(tokens.token1, tokens.token2);
  const lpTicker = generateLpTicker(tokens.token1, tokens.token2);

  return { lpName, lpTicker };
};
