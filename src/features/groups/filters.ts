import { RootState } from '../../store';
import { getStockTotals } from '../../views/List/StockItem/utils';
import { StockList, StockListState } from '../stockList/type';
import { MAIN_GROUP_ID } from './groupsSlice';

export type SummaryInfo = {
  totalPurchasePrice: number;
  totalCurrentValue: number;
};

type StockSummaryInfo = SummaryInfo & {
  stockName: string;
  stockId: string;
};

type StocksTotal = {
  [stockId: string]: StockSummaryInfo;
};

export type TotalSummary = {
  groupSummary: SummaryInfo;
  stocksSummary: StocksTotal;
};

const getPurchasedInfos = (
  purchasedIds: string[],
  mainPurchasedInfo: StockList['purchasedItems']['byId'],
) =>
  purchasedIds.reduce<StockList['purchasedItems']['byId']>(
    (purchasedInfo, purchasedId) => {
      purchasedInfo[purchasedId] = mainPurchasedInfo[purchasedId];
      return purchasedInfo;
    },
    {},
  );

export const getGroupStockInfo = (
  mainStocks: RootState['stockList']['stocks'],
  groups: RootState['groups'],
  groupId: string,
): StockListState['stocks'] => {
  const isMainSelected = MAIN_GROUP_ID === groupId;
  if (isMainSelected) return mainStocks;

  const groupInfo = groups.groups.byId[groupId];
  if (!groupInfo) return mainStocks;

  const initialState: StockListState['stocks'] = {
    byId: {},
    allIds: [...groupInfo.stocks.allIds],
  };

  return groupInfo.stocks.allIds.reduce((filteredStocks, stockId) => {
    const purchasedIds = groupInfo.stocks.byId[stockId];
    const mainStockInfo = mainStocks.byId[stockId];
    const mainPurchasedInfo = mainStockInfo.purchasedItems.byId;

    filteredStocks.byId[stockId] = {
      mainInfo: mainStockInfo.mainInfo,
      purchasedItems: {
        byId: getPurchasedInfos(purchasedIds, mainPurchasedInfo),
        allIds: [...purchasedIds],
      },
    };

    return filteredStocks;
  }, initialState);
};

const getGroupTotal = (stockInfo: StockListState['stocks']) => {
  const init: SummaryInfo = {
    totalPurchasePrice: 0,
    totalCurrentValue: 0,
  };

  return stockInfo.allIds.reduce((summary, stockId) => {
    const stock = stockInfo.byId[stockId];
    const { totalPurchasePrice, evaluationPrice: totalCurrentValue } =
      getStockTotals(stock);

    summary.totalPurchasePrice += totalPurchasePrice;
    summary.totalCurrentValue += totalCurrentValue;

    return summary;
  }, init);
};

const getStocksTotal = (stockInfo: StockListState['stocks']): StocksTotal => {
  const result: {
    [stockId: string]: StockSummaryInfo;
  } = {};

  return stockInfo.allIds.reduce((summary, stockId) => {
    const stock = stockInfo.byId[stockId];
    const { totalPurchasePrice, evaluationPrice: totalCurrentValue } =
      getStockTotals(stock);
    const stockName = stock.mainInfo.stockName;

    summary[stockId] = {
      totalPurchasePrice,
      totalCurrentValue,
      stockName,
      stockId,
    };

    return summary;
  }, result);
};

export const getTotalSummary = (stockInfo: StockListState['stocks']) => {
  const groupSummary = getGroupTotal(stockInfo);
  const stocksSummary = getStocksTotal(stockInfo);

  return {
    groupSummary,
    stocksSummary,
  };
};
