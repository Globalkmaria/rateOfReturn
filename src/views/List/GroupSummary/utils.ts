import { Group } from '../../../features/groups/type';
import { StockListState } from '../../../features/stockList/type';

export const getGroupSummary = (
  groupInfo: Group,
  stocks: StockListState['stocks'],
) => {
  let totalPurchasedPrice = 0;
  let totalCurrentValue = 0;

  for (const stockId of groupInfo.stocks.allIds) {
    const stock = stocks.byId[stockId];

    for (const purchasedId of groupInfo.stocks.byId[stockId]) {
      const purchasedItem = stock.purchasedItems.byId[purchasedId];
      totalPurchasedPrice +=
        purchasedItem.purchasedPrice * purchasedItem.purchasedQuantity;
      totalCurrentValue +=
        stock.mainInfo.currentPrice * purchasedItem.purchasedQuantity;
    }
  }

  const returnOfInvestment = totalCurrentValue - totalPurchasedPrice;
  const returnOfInvestmentRatio =
    (returnOfInvestment / totalPurchasedPrice) * 100;

  return {
    totalPurchasedPrice,
    totalCurrentValue,
    returnOfInvestment,
    returnOfInvestmentRatio,
  };
};

export const getMainGroupSummary = (stocks: StockListState['stocks']) => {
  let totalPurchasedPrice = 0;
  let totalCurrentValue = 0;

  for (const stockId of stocks.allIds) {
    const stock = stocks.byId[stockId];

    for (const purchasedId of stocks.byId[stockId].purchasedItems.allIds) {
      const purchasedItem =
        stocks.byId[stockId].purchasedItems.byId[purchasedId];
      totalPurchasedPrice +=
        purchasedItem.purchasedPrice * purchasedItem.purchasedQuantity;
      totalCurrentValue +=
        stock.mainInfo.currentPrice * purchasedItem.purchasedQuantity;
    }
  }

  const returnOfInvestment = totalCurrentValue - totalPurchasedPrice;
  const returnOfInvestmentRatio =
    (returnOfInvestment / totalPurchasedPrice) * 100;

  return {
    totalPurchasedPrice,
    totalCurrentValue,
    returnOfInvestment,
    returnOfInvestmentRatio,
  };
};
