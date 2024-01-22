import { StocksCollection } from '../../features/stockList/type';

export const getListTableSkeletonHeight = (stocks: StocksCollection) => {
  const TABLE_HEADER = 48;
  const ADD_STOCK_BUTTON = 46;
  const ADD_PURCHASED_ITEM_BUTTON = 46;
  const STOCK_SUMMARY = 46;
  const PURCHASE_ITEM = 46;

  const height =
    TABLE_HEADER +
    ADD_STOCK_BUTTON +
    stocks.allIds.reduce(
      (acc, stockId) =>
        acc +
        ADD_PURCHASED_ITEM_BUTTON +
        STOCK_SUMMARY +
        stocks.byId[stockId].purchasedItems.allIds.length * PURCHASE_ITEM,
      0,
    );

  return height;
};
