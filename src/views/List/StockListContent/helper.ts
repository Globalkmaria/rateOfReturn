import userStocksService from '@/service/userStocks/userStocks';

import { StockListState } from '@/features/stockList/type';
import { TemporalStockListState } from '@/features/temporalStockList/type';

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
