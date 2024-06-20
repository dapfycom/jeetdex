'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import TokenInfo from './TokenInfo';

const TVChartContainer = dynamic(
  () => import('./index').then((mod) => mod.TVChartContainer),
  { ssr: false }
);
interface IProps {
  poolPair?: IPoolPair;
}
export default function ChartCard({ poolPair }: IProps) {
  console.log('render');

  const [isScriptReady, setIsScriptReady] = useState(false);
  const swapCtx = useSwapContext();
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
        'h-full min-h-[450px]  rounded-sm  overflow-hidden md:block hidden',
        !swapCtx.isOpenCharts && 'md:hidden'
      )}
    >
      <TokenInfo poolPair={poolPair} />
      {isScriptReady && <TVChartContainer />}
    </div>
  );
}
