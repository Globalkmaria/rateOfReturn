import { StockList } from '../../../features/stockList/stockListSlice';
import { SummaryInfoData } from './SummaryInfo';

export const getGroupPurchasedData = (
  originalPurchasedData: StockList['purchasedItems'],
  groupPurchasedIds: string[],
) => {
  const filteredData: StockList['purchasedItems'] = {
    byId: {},
    allIds: [],
  };

  for (const purchasedId of groupPurchasedIds) {
    filteredData.byId[purchasedId] = originalPurchasedData.byId[purchasedId];
    filteredData.allIds.push(purchasedId);
  }

  return filteredData;
};

export const getSummaryInfo = (
  mainInfo: StockList['mainInfo'],
  purchasedItems: StockList['purchasedItems'],
): SummaryInfoData => {
  const summaryInfo: SummaryInfoData = {
    purchaseQuantitySum: 0,
    purchasePriceAverage: 0,
    totalPurchasePrice: 0,
    evaluationPrice: 0,
    evaluationProfit: 0,
    profitRate: 0,
  };

  for (const purchasedItemKey of purchasedItems.allIds) {
    summaryInfo.purchaseQuantitySum +=
      purchasedItems.byId[purchasedItemKey].purchasedQuantity * 1;
    summaryInfo.totalPurchasePrice +=
      purchasedItems.byId[purchasedItemKey].purchasedQuantity *
      purchasedItems.byId[purchasedItemKey].purchasedPrice;
  }
  summaryInfo.purchasePriceAverage = summaryInfo.purchaseQuantitySum
    ? summaryInfo.totalPurchasePrice / summaryInfo.purchaseQuantitySum
    : 0;
  summaryInfo.evaluationPrice =
    summaryInfo.purchaseQuantitySum * mainInfo.currentPrice;
  summaryInfo.evaluationProfit =
    summaryInfo.evaluationPrice - summaryInfo.totalPurchasePrice;
  summaryInfo.profitRate = summaryInfo.totalPurchasePrice
    ? (summaryInfo.evaluationProfit / summaryInfo.totalPurchasePrice) * 100
    : 0;

  return summaryInfo;
};

export const getCurrentDateAndTime = () => {
  const dateTime = new Date();
  dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());
  const isoString = dateTime.toISOString();

  const date = isoString.slice(0, 10);
  const time = isoString.slice(11, 16);

  return { date, time };
};

export const wasMadeLessThanMin = (date: string, time: string) => {
  const dateTime = new Date(`${date} ${time}`);
  const now = new Date();

  const diff = now.getTime() - dateTime.getTime();
  const diffMin = diff / 1000 / 60;

  return diffMin < 1;
};
