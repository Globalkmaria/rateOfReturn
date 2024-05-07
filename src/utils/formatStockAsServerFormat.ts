import { StockListState } from '../features/stockList/type';
import {
  Item,
  ReplaceUserDataRepReq,
  UserStock,
  UserStocks,
} from '../repository/userData/type';

const formatStockAsServerFormat = (
  stockList: StockListState,
): ReplaceUserDataRepReq['stocks'] | null => {
  if (!stockList?.stocks?.byId) return null;
  const stocks = stockList.stocks.byId;
  const formattedStocks: UserStocks = {};

  for (const stockId in stocks) {
    const stock = stocks[stockId];
    const { mainInfo, purchasedItems } = stock;
    const { stockName, currentPrice, tag } = mainInfo;
    const formattedStock: UserStock = {
      info: {
        id: stockId,
        name: stockName,
        currentPrice,
        tag: tag || '',
        createdAt: new Date(),
      },
      items: {},
    };

    for (const purchasedId in purchasedItems.byId) {
      const purchasedItem = purchasedItems.byId[purchasedId];
      const formattedPurchasedItem: Item = {
        id: purchasedItem.purchasedId,
        buyDate: new Date(purchasedItem.purchasedDate),
        buyTime: purchasedItem.purchasedTime,
        buyPrice: purchasedItem.purchasedPrice,
        quantity: purchasedItem.purchasedQuantity,
        createdAt: new Date(),
      };
      formattedStock.items[purchasedId] = formattedPurchasedItem;
    }

    formattedStocks[stockId] = formattedStock;
  }
  return {
    stocks: formattedStocks,
    nextStockId: stockList.nextStockId,
    nextItemId: stockList.nextPurchasedId,
    tags: stockList.tags,
  };
};

export default formatStockAsServerFormat;
