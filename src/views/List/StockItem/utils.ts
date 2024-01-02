import { PurchasedItemInfo, StockList, StockMainInfo } from '../../../features/stockList/type';
import { SummaryInfoData } from './SummaryInfo/SummaryInfo';
import { ChangedSummaryInputs } from './SummaryInfo/hooks/useStockSummaryInputChange';

const getPurchasedInfo = (data: StockList['purchasedItems'], id: string) => data.byId[id];

export const getGroupPurchasedData = (
  originalPurchasedData: StockList['purchasedItems'],
  groupPurchasedIds: string[],
): StockList['purchasedItems'] => {
  const allIds = [...groupPurchasedIds];
  const byId = groupPurchasedIds.reduce<Record<string, PurchasedItemInfo>>((acc, id) => {
    acc[id] = getPurchasedInfo(originalPurchasedData, id);
    return acc;
  }, {});

  return { allIds, byId };
};

const getPurchasedQuantity = (purchasedItems: StockList['purchasedItems'], id: string): number => {
  const purchasedItem = purchasedItems.byId[id];
  return purchasedItem ? purchasedItem.purchasedQuantity * 1 : 0;
};

const getTotalPurchasedPrice = (purchasedItems: StockList['purchasedItems'], id: string): number => {
  const purchasedItem = purchasedItems.byId[id];
  return purchasedItem ? purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice : 0;
};

const getAverage = (numerator: number, denominator: number): number => (denominator ? numerator / denominator : 0);

const getPercentage = (numerator: number, denominator: number): number => getAverage(numerator, denominator) * 100;

export const getStockSummaryInfo = (
  stockInfo: StockList,
  isMainGroup: boolean,
  groupPurchasedIds?: string[],
): SummaryInfoData => {
  const { mainInfo } = stockInfo;
  const purchasedItems = isMainGroup
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(stockInfo.purchasedItems, groupPurchasedIds || []);

  const purchaseQuantitySum = purchasedItems.allIds.reduce(
    (acc, id) => acc + getPurchasedQuantity(purchasedItems, id),
    0,
  );

  const totalPurchasePrice = purchasedItems.allIds.reduce(
    (acc, id) => acc + getTotalPurchasedPrice(purchasedItems, id),
    0,
  );

  const purchasePriceAverage = getAverage(totalPurchasePrice, purchaseQuantitySum);
  const evaluationPrice = purchaseQuantitySum * mainInfo.currentPrice;
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

export const checkNoChange = (values: { [key: string]: any }) => Object.keys(values).length === 0;

export const getChangedStockData = (changedInputs: ChangedSummaryInputs, stockInfo: StockMainInfo): StockMainInfo => ({
  ...stockInfo,
  ...changedInputs,
  needInit: false,
});
