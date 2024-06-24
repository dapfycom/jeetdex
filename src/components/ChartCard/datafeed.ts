import store from '@/redux/store';
import { cachedEventsApi } from '@/services/rest/events';
import { formatTokenI } from '@/utils/mx-utils';

const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '180',
    '240',
    '1D',
    '1W',
    '1M'
  ],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    {
      value: 'Jeetdex',
      name: 'Jeetdex',
      desc: 'Simple, fast, secure – and inexpensive order book AMM. Launch a coin in just a few clicks: Get instant branding, real-time charts and chats.'
    }
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [{ name: 'crypto', value: 'crypto' }]
};
// DatafeedConfiguration implementation
// ...
// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols(): Promise<
  {
    symbol: string;
    ticker: string;
    description: string;
    exchange: 'Jeetdex';
    type: 'crypto';
  }[]
> {
  const coinsInfo = store.getState().dapp.globalData.coins;

  return store.getState().dapp.globalData.pools.map((pool) => {
    const info = coinsInfo.find(
      (coin) => coin.identifier === pool.firstToken.identifier
    );
    console.log(info);

    return {
      symbol: formatTokenI(pool.firstToken.ticker),
      ticker: pool.firstToken.identifier,
      description:
        pool.firstToken.assets?.description ||
        info?.description ||
        formatTokenI(pool.firstToken.ticker),
      exchange: 'Jeetdex',
      type: 'crypto',
      logo_urls: [info?.img || '/assets/img/coin-placeholder.svg']
    };
  });
}
const config = {
  onReady: (callback) => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    console.log('[searchSymbols]: Method call');
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === '' || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.ticker.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(
      newSymbols.map((s) => ({
        ...s
      }))
    );
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    // Symbol information object
    const symbolInfo = {
      ...symbolItem,
      name: symbolItem.symbol,
      session: '24x7',
      timezone: 'Etc/UTC',
      minmov: 0.1,
      pricescale: 100,
      has_intraday: true,
      intraday_multipliers: ['1'],
      visible_plots_set: 'ohlc',
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',

      variable_tick_size: '0.000000001'
    };
    console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const { from, to } = periodParams;
    console.log({
      from,
      to
    });
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);

    const urlParameters = {
      e: 'JEETDEX',
      fsym: 'JEET-2346a',
      tsym: symbolInfo.ticker,
      // toTs: to,
      limit: 2000
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');
    console.log({ query });
    try {
      const bars = await cachedEventsApi(`/datafeed?${query}`);
      console.log(bars);

      let currentBars = [];
      console.log(bars);

      bars.forEach((bar) => {
        if (bar.time >= from && bar.time < to) {
          currentBars = [
            ...currentBars,
            {
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close
            }
          ];
        }
      });
      console.log(`[getcurrentBars]: returned ${currentBars.length} bar(s)`);
      console.log({ currentBars });
      onHistoryCallback(currentBars, { noData: false });
    } catch (error) {
      console.log('[getBars]: Get error', error);
      onErrorCallback(error);
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID
  ) => {
    console.log(
      '[subscribeBars]: Method call with subscriberUID:',
      subscriberUID
    );
  },
  unsubscribeBars: (subscriberUID) => {
    console.log(
      '[unsubscribeBars]: Method call with subscriberUID:',
      subscriberUID
    );
  }
};

export default config;
