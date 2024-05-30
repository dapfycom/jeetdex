'use client';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import { cn } from '@/lib/utils';
import Iframe from 'react-iframe';

export default function ChartCard() {
  const swapCtx = useSwapContext();

  return (
    <div
      className={cn(
        'h-full mt-[40px] rounded-2xl overflow-hidden md:block hidden',
        !swapCtx.isOpenCharts && 'md:hidden'
      )}
    >
      <Iframe
        url='https://e-compass.io/embeddedChart/JEX-9040ca/USDC-c76f1f'
        className='w-full h-full'
        display='block'
        position='relative'
      />
    </div>
  );
}
