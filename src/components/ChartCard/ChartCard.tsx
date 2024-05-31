'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import { cn } from '@/lib/utils';
import { formatAddress, formatBalance, formatTokenI } from '@/utils/mx-utils';
import Iframe from 'react-iframe';
interface IProps {
  poolPair?: IPoolPair;
}
export default function ChartCard({ poolPair }: IProps) {
  const swapCtx = useSwapContext();
  console.log(poolPair);

  return (
    <div
      className={cn(
        'h-full  rounded-2xl overflow-hidden md:block hidden',
        !swapCtx.isOpenCharts && 'md:hidden'
      )}
    >
      <div className='w-full flex mb-3 gap-3 h-[26.8px] justify-between  items-end'>
        {poolPair && (
          <>
            <span>{formatTokenI(poolPair.firstToken.name)}</span>
            <span>{formatTokenI(poolPair.firstToken.identifier)}</span>
            <span>
              {formatBalance({
                balance: poolPair.firstTokenReserve,
                decimals: poolPair.firstToken.decimals
              })}
            </span>

            <span>150,313,215,122</span>
            <span>{formatAddress(poolPair.firstToken.owner)}</span>
          </>
        )}
      </div>
      <Iframe
        url='https://e-compass.io/embeddedChart/JEX-9040ca/USDC-c76f1f'
        className='w-full h-full'
        display='block'
        position='relative'
      />
    </div>
  );
}
