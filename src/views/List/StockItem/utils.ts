import { StockList } from '../../../features/stockList/stockListSlice';
import { objectToArray } from '../../../features/stockList/utils';
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

  const purchasedItemsArray = objectToArray(purchasedItems);

  for (let i = 0; i < purchasedItemsArray.length; i++) {
    summaryInfo.purchaseQuantitySum +=
      purchasedItemsArray[i].purchasedQuantity * 1;
    summaryInfo.purchasePriceAverage +=
      purchasedItemsArray[i].purchasedPrice * 1;
    summaryInfo.totalPurchasePrice +=
      purchasedItemsArray[i].purchasedQuantity *
      purchasedItemsArray[i].purchasedPrice;
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
