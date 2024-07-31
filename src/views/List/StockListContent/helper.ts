import { StockListState } from '@/features/stockList/type';

export const filterStockByName = (
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
