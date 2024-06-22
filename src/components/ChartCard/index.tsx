import { memo, useEffect, useRef } from 'react';
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
  widget
} from '../../../public/static/charting_library';
import config from './datafeed';

const TVChartContainer = ({ tokenIdentifier }: { tokenIdentifier: string }) => {
  console.log('render');

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const charWidgettRef = useRef<IChartingLibraryWidget>();
  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: tokenIdentifier,
      interval: '1' as ResolutionString,
      debug: true,

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
      enabled_features: ['show_symbol_logos'],
      theme: 'dark'
    };

    const tvWidget = new widget(widgetOptions);
    charWidgettRef.current = tvWidget;
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
  }, []);

  // useEffect(() => {
  //   if (charWidgettRef.current) {
  //   }
  //   charWidgettRef.current.setSymbol(
  //     tokenIdentifier,
  //     '1' as ResolutionString,
  //     () => {}
  //   );
  // }, [tokenIdentifier]);

  return (
    <>
      <div ref={chartContainerRef} className={'h-[450px]'} />
    </>
  );
};

export default memo(TVChartContainer);
