// queries

import { fetchScSimpleData } from '@/services/sc/query';
import BigNumber from 'bignumber.js';

export const fetchNewPairFee = async () => {
  const res = await fetchScSimpleData<BigNumber>('mainRouter:getNewPairFee');

  return res.toString() || '0';
};
