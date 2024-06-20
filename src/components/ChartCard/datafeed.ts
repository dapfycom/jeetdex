import { tokensID } from '@/config';
import { bars } from './fakeData';

const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ['1D'],
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
  return [
    {
      description: 'Token of the exchange',
      exchange: 'Jeetdex',
      symbol: 'JEETDEX-fa1a41',
      ticker: 'JEETDEX',
      type: 'crypto'
    },
    {
      description: 'Kaka memecoin 💩',
      exchange: 'Jeetdex',
      symbol: 'KAKA-88b332',
      ticker: 'KAKA',
      type: 'crypto'
    }
  ];
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
    onResultReadyCallback(newSymbols);
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
    // extension
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    console.log(symbols);

    const symbolItem = symbols.find(({ symbol }) => symbol === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.ticker,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      visible_plots_set: 'ohlc',
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming'
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
    const { from, to /* firstDataRequest */ } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    const urlParameters = {
      fsym: tokensID.jeet,
      tsym: symbolInfo.ticker,
      toTs: to,
      limit: 2000
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');

    console.log(query);

    try {
      let currentBars: {
        time: number;
        low: number;
        high: number;
        open: number;
        close: number;
        isLastBar?: boolean;
        isBarClosed?: boolean;
      }[] = bars;
      currentBars.forEach((bar) => {
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

      console.log(`[getBars]: returned ${bars.length} bar(s)`);
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
    // onResetCacheNeededCallback
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
