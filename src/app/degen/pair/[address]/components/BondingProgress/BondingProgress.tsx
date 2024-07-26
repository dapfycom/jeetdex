'use client';
import { Progress } from '@/components/ui/progress';
import { formatBalance, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { maxCap } from '../../constants';
import { useGetBoundingPair } from '../../hooks';

const BondingProgress = () => {
  const { coin } = useGetBoundingPair();
  console.log(coin);

  if (!coin) {
    return <div className='text-left'>Loading...</div>;
  }

  const progress = new BigNumber(
    formatBalance({ balance: coin.marketCap, decimals: 6 }, true)
  )
    .multipliedBy(100)
    .dividedBy(maxCap)
    .toNumber();

  return (
    <div className='text-left flex flex-col gap-3 text-sm text-gray-400'>
      <p className=''>bonding curve progress: {formatNumber(progress)}%</p>

      <Progress value={progress} className='h-4' />

      <p>
        when the market cap reaches $73,297 all the liquidity from the bonding
        curve will be deposited into Raydium and burned. progression increases
        as the price goes up.
      </p>

      <p>
        there are 750,302,471 tokens still available for sale in the bonding
        curve and there is 1.246 SOL in the bonding curve.
      </p>

      <p>king of the hill progress: 6%</p>
      <Progress
        value={progress}
        className='h-4'
        indicatorClassName='bg-yellow-500'
      />
    </div>
  );
};

export default BondingProgress;
