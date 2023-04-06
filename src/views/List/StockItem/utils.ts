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

  for (let i = 0; i < purchasedItems.length; i++) {
    summaryInfo.purchaseQuantitySum += purchasedItems[i].purchasedQuantity * 1;
    summaryInfo.purchasePriceAverage += purchasedItems[i].purchasedPrice * 1;
  }

  summaryInfo.purchasePriceAverage = Number(
    (summaryInfo.purchasePriceAverage / purchasedItems.length).toFixed(2),
  );
  summaryInfo.totalPurchasePrice =
    summaryInfo.purchaseQuantitySum * summaryInfo.purchasePriceAverage;
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
