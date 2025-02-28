import { getEditUserItemRepData } from '@/service/userStocks/utils';

import { getAverage, getPercentage, localStringToNumber } from '@/utils/number';

import {
  PurchasedItemInfo,
  StockList,
  StockListState,
  StockMainInfo,
} from '@/features/stockList/type';
import { TemporalStockListState } from '@/features/temporalStockList/type';

import { EditUserStockRepReq } from '@/repository/userStocks/type';

import { SummaryInfoData } from './SummaryInfo/SummaryInfo';

const getPurchasedInfo = (data: StockList['purchasedItems'], id: string) =>
  data.byId[id];

export const getGroupPurchasedData = (
  originalPurchasedData: StockList['purchasedItems'],
  groupPurchasedIds: string[],
): StockList['purchasedItems'] => {
  const allIds = [...groupPurchasedIds];
  const byId = groupPurchasedIds.reduce<Record<string, PurchasedItemInfo>>(
    (acc, id) => {
      acc[id] = getPurchasedInfo(originalPurchasedData, id);
      return acc;
    },
    {},
  );

  return { allIds, byId };
};

const getQuantitySumAndTotalPrice = (
  purchasedItems: StockList['purchasedItems'],
): { purchaseQuantitySum: number; totalPurchasePrice: number } =>
  purchasedItems.allIds.reduce(
    (acc, id) => {
      const purchasedItem = purchasedItems?.byId?.[id] || {};

      const purchasedPrice = localStringToNumber(purchasedItem?.purchasedPrice);
      const purchasedQuantity = localStringToNumber(
        purchasedItem?.purchasedQuantity,
      );

      acc.purchaseQuantitySum += purchasedQuantity;
      acc.totalPurchasePrice += purchasedQuantity * purchasedPrice;
      return acc;
    },
    {
      purchaseQuantitySum: 0,
      totalPurchasePrice: 0,
    },
  );

export const getStockTotals = (
  stockInfo: StockList,
): Pick<SummaryInfoData, 'evaluationPrice' | 'totalPurchasePrice'> => {
  const { mainInfo, purchasedItems } = stockInfo;

  const { purchaseQuantitySum, totalPurchasePrice } =
    getQuantitySumAndTotalPrice(purchasedItems);

  const evaluationPrice =
    purchaseQuantitySum * localStringToNumber(mainInfo.currentPrice);

  return {
    evaluationPrice,
    totalPurchasePrice,
  };
};

export const getStockSummaryInfo = (
  stockInfo: StockList,
  isMainGroup: boolean,
  groupPurchasedIds?: string[],
): SummaryInfoData => {
  const { mainInfo } = stockInfo;
  const purchasedItems = isMainGroup
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(stockInfo.purchasedItems, groupPurchasedIds || []);

  const { purchaseQuantitySum, totalPurchasePrice } =
    getQuantitySumAndTotalPrice(purchasedItems);

  const purchasePriceAverage = getAverage(
    totalPurchasePrice,
    purchaseQuantitySum,
  );
  const evaluationPrice =
    purchaseQuantitySum * localStringToNumber(mainInfo.currentPrice);
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = getPercentage(evaluationProfit, totalPurchasePrice);

  return {
    purchaseQuantitySum,
    purchasePriceAverage,
    totalPurchasePrice,
    evaluationPrice,
    evaluationProfit,
    profitRate,
  };
};

export const getCurrentDateAndTime = () => {
  const dateTime = new Date();
  dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());
  const isoString = dateTime.toISOString();

  const date = isoString.slice(0, 10);
  const time = isoString.slice(11, 16);

  return { date, time };
};

export const checkNoChange = (values: { [key: string]: unknown }) =>
  Object.keys(values).length === 0;

export const getEditUserStockData = ({
  changedStockData,
  originalStockData,
}: {
  changedStockData: TemporalStockListState['stockList'];
  originalStockData: StockListState['stocks'];
}): EditUserStockRepReq => {
  const result: EditUserStockRepReq = {};

  for (const stockId of Object.keys(changedStockData)) {
    const changedStock = changedStockData[stockId];
    const originalStock = originalStockData.byId[stockId];
    result[stockId] = {};

    addStockInfo({ originalStock, changedStock, stockId, result });
    addItems({ originalStock, changedStock, stockId, result });
  }

  return result;
};

const addStockInfo = ({
  originalStock,
  changedStock,
  stockId,
  result,
}: {
  originalStock: StockList;
  changedStock: TemporalStockListState['stockList'][string];
  stockId: string;
  result: EditUserStockRepReq;
}) => {
  const changedMainInfo = changedStock.mainInfo;
  if (!changedMainInfo) return;
  const originalMainInfo = originalStock.mainInfo;

  const combined: StockMainInfo = {
    ...originalMainInfo,
    ...changedMainInfo,
  };
  result[stockId].info = {
    id: stockId,
    name: combined.stockName,
    currentPrice: localStringToNumber(combined.currentPrice),
    tag: combined.tag ?? '',
  };
};

const addItems = ({
  originalStock,
  changedStock,
  stockId,
  result,
}: {
  originalStock: StockList;
  changedStock: TemporalStockListState['stockList'][string];
  stockId: string;
  result: EditUserStockRepReq;
}) => {
  const purchasedIds = Object.keys(changedStock.purchasedItems ?? {});

  for (const purchasedId of purchasedIds) {
    const changedPurchased = changedStock.purchasedItems?.[purchasedId];
    const originalPurchased = originalStock.purchasedItems.byId[purchasedId];

    if (!result[stockId].items) result[stockId].items = {};
    const combinedPurchased: PurchasedItemInfo = {
      ...originalPurchased,
      ...changedPurchased,
    };

    result[stockId].items[purchasedId] =
      getEditUserItemRepData(combinedPurchased);
  }
};
