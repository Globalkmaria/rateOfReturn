import { StocksCollection } from '@/features/stockList/type';

import { StockPriceRes } from '@/repository/stock/type';
import { getFixedLocaleString } from '@/utils';

import { CurrentPriceChanges } from './EditCurrentPriceModal';

export const formatPricesForStore = (changes: CurrentPriceChanges) => {
  const data = Object.entries(changes).reduce(
    (acc, [id, value]) => {
      acc[id] = getFixedLocaleString(value);
      return acc;
    },
    {} as { [key: string]: string },
  );

  return data;
};

export const getFailedSymbolsErrorMessage = (
  failedSymbols: StockPriceRes['failedSymbols'],
) => {
  return `Failed to get price for ${failedSymbols.join(', ')}. Please check the symbol and try again.`;
};

export const getCurrentPriceChanges = ({
  stocks,
  changes,
  fetchedQuotes,
}: {
  stocks: StocksCollection;
  changes: CurrentPriceChanges;
  fetchedQuotes: StockPriceRes['data']['quotes'];
}) => {
  const baseChanges = stocks.allIds.reduce((acc, id) => {
    const info = stocks.byId[id].mainInfo;
    acc[id] = acc[id] ?? info.currentPrice;
    return acc;
  }, changes);

  const quotes = fetchedQuotes.reduce(
    (acc, quote) => {
      acc[quote.symbol] = quote.previousClosePrice;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const newChanges = Object.entries(baseChanges).reduce((acc, [id]) => {
    const symbol = stocks.byId[id].mainInfo.symbol.toUpperCase().trim();
    const price = quotes[symbol];
    if (price) {
      acc[id] = getFixedLocaleString(price);
    }

    return acc;
  }, baseChanges);

  return newChanges;
};

export const getFailedSymbols = (
  stocks: StocksCollection,
  failedSymbols: StockPriceRes['failedSymbols'],
) => {
  const failedSymbolsSet = new Set(failedSymbols);
  const errorIds = new Set(
    stocks.allIds.filter(id =>
      failedSymbolsSet.has(
        stocks.byId[id].mainInfo.symbol.toUpperCase().trim(),
      ),
    ),
  );

  return errorIds;
};
