import { generateSymbol, makeApiRequest, parseFullSymbol } from './helpers';

const configurationData = {
  supported_resolutions: ['1D', '1W', '1M'],
  exchanges: [
    { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
    { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange' }
  ], // Cambiado a Binance
  symbols_types: [{ name: 'crypto', value: 'crypto' }]
};

async function getAllSymbols() {
  try {
    const data = await makeApiRequest('data/v3/all/exchanges');
    let allSymbols = [];

    console.log('Received data from API:', data);

    if (!data.Data) {
      throw new Error('Invalid data format received from API');
    }

    for (const exchange of configurationData.exchanges) {
      const pairs = data.Data[exchange.value]?.pairs;
      if (!pairs) {
        console.warn(`No pairs found for exchange ${exchange.value}`);
        continue;
      }
      for (const leftPairPart of Object.keys(pairs)) {
        const symbols = pairs[leftPairPart].map((rightPairPart) => {
          const symbol = generateSymbol(
            exchange.value,
            leftPairPart,
            rightPairPart
          );
          return {
            symbol: symbol.short,
            ticker: symbol.full,
            description: symbol.short,
            exchange: exchange.value,
            type: 'crypto'
          };
        });
        allSymbols = [...allSymbols, ...symbols];
      }
    }
    return allSymbols;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    throw error;
  }
}

const socket = new WebSocket('wss://streamer.cryptocompare.com');

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message:', message);

  // Manejar el mensaje recibido
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map();

export const customDatafeed = {
  onReady: (callback) => {
    setTimeout(() => callback(configurationData));
  },
  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    const symbols = await getAllSymbols();
    console.log(symbols);

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
  ) => {
    try {
      const symbols = await getAllSymbols();
      console.log(symbols);
      console.log(symbolName);

      const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
      if (!symbolItem) {
        throw new Error('Cannot resolve symbol');
      }
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
      onSymbolResolvedCallback(symbolInfo);
    } catch (error) {
      console.error('Error resolving symbol:', error);
      onResolveErrorCallback(error.message);
    }
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const { from, to } = periodParams;
    const parsedSymbol = parseFullSymbol(symbolInfo.ticker);
    const urlParameters = {
      e: parsedSymbol.exchange,
      fsym: parsedSymbol.fromSymbol,
      tsym: parsedSymbol.toSymbol,
      toTs: to,
      limit: 2000
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');
    try {
      const data = await makeApiRequest(`data/histoday?${query}`);
      if (
        (data.Response && data.Response === 'Error') ||
        data.Data.length === 0
      ) {
        onHistoryCallback([], { noData: true });
        return;
      }
      let bars = [];
      console.log(data.Data);

      data.Data.forEach((bar) => {
        if (bar.time >= from && bar.time < to) {
          bars = [
            ...bars,
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

      console.log(bars);

      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      onErrorCallback(error);
    }
  }
};
