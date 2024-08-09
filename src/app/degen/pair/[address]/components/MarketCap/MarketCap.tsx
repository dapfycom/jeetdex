'use client';
import { formatBalance } from '@/utils/mx-utils';
import { useGetBoundingPair } from '../../hooks';

const MarketCap = () => {
  const { coin } = useGetBoundingPair();

  if (!coin) return null;
  return (
    <span className='text-primary text-left'>
      Market cap: $
      {formatBalance({
        balance: coin?.marketCap,
        decimals: 6
      })}
    </span>
  );
};

export default MarketCap;
