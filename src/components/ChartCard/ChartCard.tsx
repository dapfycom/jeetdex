'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { selectIsOpenCharts } from '@/app/normie/views/SwapView/lib/swap-slice';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import TokenInfo from './TokenInfo';

const TVChartContainer = dynamic(() => import('./index'), { ssr: false });
interface IProps {
  poolPair?: IPoolPair;
}
export default memo(function ChartCard({ poolPair }: IProps) {
  console.log(poolPair);

  console.log('render');
  const isOpenCharts = useAppSelector(selectIsOpenCharts);
  const [isScriptReady, setIsScriptReady] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/static/datafeeds/udf/dist/bundle.js';
    script.async = true;

    script.onload = () => {
      console.log('Is ready');
      setIsScriptReady(true);
    };

    script.onerror = (e: ErrorEvent) => {
      console.error('Script failed to load', e.error);
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <div
      className={cn(
        'h-full min-h-[450px]  rounded-sm  overflow-hidden md:block',
        !isOpenCharts && 'md:hidden'
      )}
    >
      <TokenInfo poolPair={poolPair} />
      {!(isScriptReady && poolPair) && (
        <Skeleton className='h-[450px] w-full bg-[#1C243E]' />
      )}
      {isScriptReady && poolPair && (
        <TVChartContainer
          tokenIdentifier={poolPair?.firstTokenId}
          key={poolPair?.firstTokenId}
        />
      )}
    </div>
  );
});
