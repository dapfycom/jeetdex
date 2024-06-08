import { formatTokenI } from '@/utils/mx-utils';

export const generateLpName = (token1: string, token2: string) => {
  const lpName = formatTokenI(token1) + formatTokenI(token2) + 'LP';

  return lpName;
};

export const generateLpTicker = (token1: string, token2: string) => {
  const lpTicker =
    formatTokenI(token1).slice(0, 10 - formatTokenI(token2).length) +
    formatTokenI(token2);

  return lpTicker;
};
