'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import { cn } from '@/lib/utils';
import Iframe from 'react-iframe';
import TokenInfo from './TokenInfo';
interface IProps {
  poolPair?: IPoolPair;
}
export default function ChartCard({ poolPair }: IProps) {
  const swapCtx = useSwapContext();

  return (
    <div
      className={cn(
        'h-full  rounded-2xl overflow-hidden md:block hidden',
        !swapCtx.isOpenCharts && 'md:hidden'
      )}
    >
      <TokenInfo poolPair={poolPair} />
      <Iframe
        url='https://e-compass.io/embeddedChart/JEX-9040ca/USDC-c76f1f'
        className='w-full h-full'
        display='block'
        position='relative'
      />
    </div>
  );
}
