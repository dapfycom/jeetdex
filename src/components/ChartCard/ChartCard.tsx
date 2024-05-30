'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import {
  ChartingLibraryWidgetOptions,
  ResolutionString
} from '../../../public/static/charting_library/charting_library';

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: 'Bitfinex:TRX/EUR',
  interval: '1D' as ResolutionString,
  library_path: '/static/charting_library/',
  locale: 'en',
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
  custom_css_url: 'http://localhost:3000/static/custom.css'
};

const TVChartContainer = dynamic(
  () => import('./TVChartContainer').then((mod) => mod.TVChartContainer),
  { ssr: false }
);

export default function ChartCard() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const swapCtx = useSwapContext();
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

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!swapCtx.isOpenCharts) {
    return null;
  }

  return (
    <div className='h-full mt-[40px] rounded-2xl overflow-hidden md:block hidden'>
      {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
    </div>
  );
}
