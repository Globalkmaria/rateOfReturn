import {
  PurchasedItemInfo,
  StockMainInfo,
} from '../../../../features/stockList/type';

export const getPurchasedData = ({
  purchasedItem,
  mainInfo,
}: {
  purchasedItem: PurchasedItemInfo;
  mainInfo: StockMainInfo;
}) => {
  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const formattedEvaluationProfit = evaluationProfit.toLocaleString();
  const profitRate = totalPurchasePrice
    ? (evaluationProfit / totalPurchasePrice) * 100
    : 0;
  const formattedProfitRate = `${profitRate.toFixed(2).toLocaleString()} %`;

  return {
    totalPurchasePrice,
    evaluationPrice,
    evaluationProfit,
    formattedEvaluationProfit,
    profitRate,
    formattedProfitRate,
  };
};
