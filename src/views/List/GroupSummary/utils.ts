import { localStringToNumber } from '@/utils';

import { Group } from '../../../features/groups/type';
import { StockListState } from '../../../features/stockList/type';
interface CalculateGroupSummary {
  groupData: Group | null;
  stocksData: StockListState['stocks'];
}

export interface CalculateStockSummaryResult {
  totalPurchasedPrice: number;
  totalCurrentValue: number;
  returnOfInvestment: number;
  returnOfInvestmentRatio: number;
}

const getStockIds = ({ groupData, stocksData }: CalculateGroupSummary) => {
  if (groupData) return groupData.stocks.allIds;
  return stocksData.allIds;
};

const getPurchasedIds = ({
  groupData,
  stocksData,
  stockId,
}: { stockId: string } & CalculateGroupSummary) => {
  if (groupData) return groupData.stocks.byId[stockId];
  return stocksData.byId[stockId].purchasedItems.allIds;
};

export const calculateGroupSummary = ({
  groupData,
  stocksData,
}: CalculateGroupSummary): CalculateStockSummaryResult => {
  let totalPurchasedPrice = 0;
  let totalCurrentValue = 0;

  const stockIds = getStockIds({ groupData, stocksData });

  for (const stockId of stockIds) {
    const stock = stocksData.byId[stockId];
    const purchasedIds = getPurchasedIds({ stockId, groupData, stocksData });

    for (const purchasedId of purchasedIds) {
      const purchasedItem = stock.purchasedItems.byId[purchasedId];
      const currentPrice = localStringToNumber(stock.mainInfo.currentPrice);
      const purchasedPrice = localStringToNumber(purchasedItem.purchasedPrice);
      const purchasedQuantity = localStringToNumber(
        purchasedItem.purchasedQuantity,
      );

      totalPurchasedPrice += purchasedPrice * purchasedQuantity;
      totalCurrentValue += currentPrice * purchasedQuantity;
    }
  }

  const returnOfInvestment = totalCurrentValue - totalPurchasedPrice;
  const returnOfInvestmentRatio = Number(
    ((returnOfInvestment / totalPurchasedPrice) * 100).toFixed(3),
  );

  return {
    totalPurchasedPrice,
    totalCurrentValue,
    returnOfInvestment,
    returnOfInvestmentRatio,
  };
};
