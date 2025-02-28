import { StockListState } from '@/features/stockList/type';

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
