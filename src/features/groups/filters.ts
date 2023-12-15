import { RootState } from '../../store';
import { StockList, StockListState } from '../stockList/type';
import { MAIN_GROUP_ID } from './groupsSlice';
import { getStockSummaryInfo } from '../../views/List/StockItem/utils';
import { createSelector } from '@reduxjs/toolkit';
import { selectStocks } from '../stockList/selectors';
import { selectGroups } from './selectors';

export type SummaryInfo = {
  totalPurchasePrice: number;
  totalCurrentValue: number;
};

type StockSummaryInfo = SummaryInfo & {
  stockName: string;
  stockId: string;
};

export type TotalSummary = {
  groupSummary: SummaryInfo;
  stocksSummary: { [stockName: string]: StockSummaryInfo };
};

const getGroupStockInfo = (
  stocks: RootState['stockList']['stocks'],
  groups: RootState['groups'],
  groupId: string,
): StockListState['stocks'] => {
  const isMainSelected = MAIN_GROUP_ID === groupId;

  if (isMainSelected) return stocks;

  const groupInfo = groups.groups.byId[groupId];
  if (!groupInfo) return stocks;

  const initialState: StockListState['stocks'] = {
    byId: {},
    allIds: [...groupInfo.stocks.allIds],
  };

  const filteredStocks = groupInfo.stocks.allIds.reduce((acc, stockId) => {
    acc.byId[stockId] = {
      mainInfo: stocks.byId[stockId].mainInfo,
      purchasedItems: {
        byId: groupInfo.stocks.byId[stockId].reduce((acc, purchasedId) => {
          acc[purchasedId] = stocks.byId[stockId].purchasedItems.byId[purchasedId];
          return acc;
        }, {} as StockList['purchasedItems']['byId']),
        allIds: [...groupInfo.stocks.byId[stockId]],
      },
    };
    return acc;
  }, initialState);

  return filteredStocks;
};

export const getTotalSummary = (filteredStockInfo: StockListState['stocks']) => {
  const groupSummary: TotalSummary['groupSummary'] = {
    totalPurchasePrice: 0,
    totalCurrentValue: 0,
  };

  const stocksSummary: TotalSummary['stocksSummary'] = {};

  filteredStockInfo.allIds.forEach(stockId => {
    const stock = filteredStockInfo.byId[stockId];
    const { totalPurchasePrice, evaluationPrice } = getStockSummaryInfo(stock, true);
    groupSummary.totalPurchasePrice += totalPurchasePrice;
    groupSummary.totalCurrentValue += evaluationPrice;
    stocksSummary[stock.mainInfo.stockName] = {
      totalPurchasePrice,
      totalCurrentValue: evaluationPrice,
      stockName: stock.mainInfo.stockName,
      stockId: stock.mainInfo.stockId,
    };
  });

  return {
    groupSummary,
    stocksSummary,
  };
};

export const selectGroupStockInfo = (groupId: string) =>
  createSelector([selectStocks, selectGroups], (stock, group) => getGroupStockInfo(stock, group, groupId));
