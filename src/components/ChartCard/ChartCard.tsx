'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  ChartingLibraryWidgetOptions,
  ResolutionString
} from '../../../public/static/charting_library';
const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: 'AAPL',
  interval: '1D' as ResolutionString,
  library_path: 'static/charting_library/',
  locale: 'en',
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true
};

const TVChartContainer = dynamic(
  () => import('./index').then((mod) => mod.TVChartContainer),
  { ssr: false }
);
interface IProps {
  poolPair?: IPoolPair;
}
export default function ChartCard({}: IProps) {
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
      className={
        'h-full min-h-[450px]  rounded-sm  overflow-hidden md:block hidden'
      }
    >
      {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
    </div>
  );
}
