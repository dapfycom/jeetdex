'use client';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import Iframe from 'react-iframe';

export default function ChartCard() {
  const swapCtx = useSwapContext();

  if (!swapCtx.isOpenCharts) {
    return null;
  }

  return (
    <div className='h-full mt-[40px] rounded-2xl overflow-hidden md:block hidden'>
      <Iframe
        url='https://e-compass.io/embeddedChart/JEX-9040ca/USDC-c76f1f'
        className='w-full h-full'
        display='block'
        position='relative'
      />
    </div>
  );
}
