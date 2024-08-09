'use client';
import { selectIsOpenCharts } from '@/app/normie/views/SwapView/lib/swap-slice';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import TokenInfo from './TokenInfo';

const TVChartContainer = dynamic(() => import('./index'), { ssr: false });

export default memo(function ChartCard({
  firstToken,
  firstTokenJeetdexPrice,
  mode
}: {
  firstToken: {
    name: string;
    identifier: string;
    decimals: number;
    supply: number | string;
  };
  firstTokenReserve: string;
  firstTokenJeetdexPrice: number;
  mode: 'normie' | 'degen';
}) {
  const isOpenCharts = useAppSelector(selectIsOpenCharts);
  const [isScriptReady, setIsScriptReady] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/static/datafeeds/udf/dist/bundle.js';
    script.async = true;

    script.onload = () => {
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

  const isReady = Boolean(firstToken?.identifier) && isScriptReady;
  return (
    <div
      className={cn(
        'h-full min-h-[450px]  rounded-sm  overflow-hidden md:block',
        !isOpenCharts && 'md:hidden'
      )}
    >
      <TokenInfo
        firstToken={firstToken}
        firstTokenJeetdexPrice={firstTokenJeetdexPrice}
      />
      {!isReady && <Skeleton className='h-[450px] w-full bg-[#1C243E]' />}
      {isReady && (
        <TVChartContainer
          tokenIdentifier={firstToken?.identifier}
          mode={mode}
        />
      )}
    </div>
  );
});
