import { useEffect, useRef } from 'react';
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  widget
} from '../../../public/static/charting_library';
import config from './datafeed';

export const TVChartContainer = () => {
  console.log('render');

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: 'JEETDEX-fa1a41',
      interval: '1D' as ResolutionString,
      library_path: 'static/charting_library/',
      locale: 'en',
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      datafeed: config,
      container: chartContainerRef.current,

      theme: 'dark'
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!');
            }
          })
        );

        button.innerHTML = 'Check API';
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, []);

  return (
    <>
      <div ref={chartContainerRef} className={'h-[450px]'} />
    </>
  );
};
