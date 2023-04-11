import { StockList } from '../../../features/stockList/stockListSlice';
import { SummaryInfoData } from './SummaryInfo';

export const getSummaryInfo = ({
  mainInfo,
  purchasedItems,
}: StockList): SummaryInfoData => {
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
    summaryInfo.purchasePriceAverage +=
      purchasedItems.byId[purchasedItemKey].purchasedPrice * 1;
    summaryInfo.totalPurchasePrice +=
      purchasedItems.byId[purchasedItemKey].purchasedQuantity *
      purchasedItems.byId[purchasedItemKey].purchasedPrice;
  }

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
