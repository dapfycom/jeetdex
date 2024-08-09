'use client';
import { Progress } from '@/components/ui/progress';
import { formatBalance, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { maxCap } from '../../constants';
import { useGetBoundingPair, useIsMaxCap } from '../../hooks';

const BondingProgress = () => {
  const { coin } = useGetBoundingPair();
  const { isMaxCap } = useIsMaxCap();
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
      {!isMaxCap && (
        <>
          <p className=''>bonding curve progress: {formatNumber(progress)}%</p>

          <Progress value={progress} className='h-4' />
        </>
      )}

      <p>
        when the market cap reaches $23,000 all the liquidity from the bonding
        curve will be deposited into Jeetdex and burned. progression increases
        as the price goes up.
      </p>

      <p>
        there are{' '}
        {formatBalance({
          balance: coin.firstTokenReserve,
          decimals: 18
        })}{' '}
        tokens still available for sale in the bonding curve and{' '}
        {formatNumber(
          (formatBalance(
            {
              balance: coin.secondTokenReserve,
              decimals: 18
            },
            true
          ) as number) - 150
        )}{' '}
        EGLD .
      </p>
    </div>
  );
};

export default BondingProgress;
