import { StockInfoData, SummaryInfoData } from './StockItem';

export const getSummaryInfo = (stockList: StockInfoData[]): SummaryInfoData => {
  const summaryInfo: SummaryInfoData = {
    stockName: stockList[0].stockName,
    stockId: stockList[0].stockId,
    currentPrice: stockList[0].currentPrice,
    purchaseQuantitySum: 0,
    purchasePriceAverage: 0,
  };

  for (let i = 0; i < stockList.length; i++) {
    summaryInfo.purchaseQuantitySum += stockList[i].purchaseQuantity;
    summaryInfo.purchasePriceAverage += stockList[i].purchasePrice;
  }

  summaryInfo.purchasePriceAverage = Number(
    (summaryInfo.purchasePriceAverage / stockList.length).toFixed(2),
  );

  return summaryInfo;
};
