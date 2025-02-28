import userStocksService from '@/service/userStocks/userStocks';

import { StockListState } from '@/features/stockList/type';
import {
  TemporalPurchaseItems,
  TemporalStockListState,
} from '@/features/temporalStockList/type';

import { getFixedLocaleString } from '@/utils';

import { getEditUserStockData } from '../StockItem/utils';

const filterStockByName = (
  name: string,
  stockList: StockListState['stocks'],
): string[] => {
  if (!stockList.allIds.length) return [];

  name = name.trim().toLowerCase();
  if (!name) return stockList.allIds;

  return stockList.allIds.reduce<string[]>((acc, stockId) => {
    const stock = stockList.byId[stockId];
    if (stock.mainInfo.stockName.toLowerCase().includes(name))
      acc.push(stockId);

    return acc;
  }, []);
};

export const getFilteredStockIds = ({
  isMainGroupSelected,
  deferredQuery,
  stockIds,
  stockList,
}: {
  isMainGroupSelected: boolean;
  deferredQuery: string;
  stockIds: string[];
  stockList: StockListState['stocks'];
}) => {
  const filtered = isMainGroupSelected
    ? filterStockByName(deferredQuery, stockList)
    : stockIds;

  const sorted = filtered?.toSorted((a, b) => Number(b) - Number(a));
  return sorted ?? [];
};

export const logInSaveStock = async ({
  changedStockData,
  originalStockData,
}: {
  changedStockData: TemporalStockListState['stockList'];
  originalStockData: StockListState['stocks'];
}) => {
  const formattedStockData = getEditUserStockData({
    changedStockData,
    originalStockData,
  });

  const result = await userStocksService.editUserStockData(formattedStockData);

  return result;
};

const formatMainInfo = (
  mainInfo: TemporalStockListState['stockList'][string]['mainInfo'],
) => {
  const formattedMainInfo = { ...mainInfo };
  if (formattedMainInfo.currentPrice) {
    formattedMainInfo.currentPrice = getFixedLocaleString(
      formattedMainInfo.currentPrice,
    );
  }
  return formattedMainInfo;
};

const formatPurchasedItems = (purchasedItems: TemporalPurchaseItems) => {
  const formattedItems: typeof purchasedItems = {};

  Object.entries(purchasedItems).forEach(([itemKey, itemData]) => {
    const formattedItem = { ...itemData };
    if (formattedItem.purchasedPrice) {
      formattedItem.purchasedPrice = getFixedLocaleString(
        formattedItem.purchasedPrice,
      );
    }
    formattedItems[itemKey] = formattedItem;
  });

  return formattedItems;
};

export const formatTempStockList = (
  temporalStockList: TemporalStockListState['stockList'],
): TemporalStockListState['stockList'] => {
  return Object.entries(temporalStockList).reduce(
    (formattedList, [stockId, stockData]) => {
      const formattedStock: TemporalStockListState['stockList'][string] = {};

      if (stockData.mainInfo) {
        formattedStock.mainInfo = formatMainInfo(stockData.mainInfo);
      }

      if (stockData.purchasedItems) {
        formattedStock.purchasedItems = formatPurchasedItems(
          stockData.purchasedItems,
        );
      }

      formattedList[stockId] = formattedStock;
      return formattedList;
    },
    {} as TemporalStockListState['stockList'],
  );
};
