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
  summaryInfo.purchasePriceAverage =
    summaryInfo.totalPurchasePrice / summaryInfo.purchaseQuantitySum;
  summaryInfo.evaluationPrice =
    summaryInfo.purchaseQuantitySum * mainInfo.currentPrice;
  summaryInfo.evaluationProfit =
    summaryInfo.evaluationPrice - summaryInfo.totalPurchasePrice;
  summaryInfo.profitRate =
    (summaryInfo.evaluationProfit / summaryInfo.totalPurchasePrice) * 100;

  return summaryInfo;
};

export const toDateInputValue = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now;
};
