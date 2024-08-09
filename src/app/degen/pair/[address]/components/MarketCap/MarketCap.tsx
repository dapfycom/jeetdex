'use client';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalanceDollar } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useGetBoundingPair } from '../../hooks';

const MarketCap = () => {
  const { coin } = useGetBoundingPair();
  const { elrondToken: firstToken } = useGetElrondToken(coin?.identifier);
  const { elrondToken: secondToken } = useGetElrondToken(coin?.secondTokenId);

  const firstTokenJeetdexPrice = new BigNumber(coin?.secondTokenReserve)
    .dividedBy(coin?.firstTokenReserve)
    .multipliedBy(secondToken?.price)
    .toNumber();

  if (!firstToken || !firstTokenJeetdexPrice || !coin) return null;
  return (
    <span className='text-primary text-left'>
      Market cap: $
      {formatBalanceDollar(
        {
          balance: firstToken?.supply,
          decimals: 0
        },
        firstTokenJeetdexPrice,
        true
      )}
    </span>
  );
};

export default MarketCap;
