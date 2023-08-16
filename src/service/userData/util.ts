import {
  CheckedItemsInfo,
  CheckedItemsState,
  StockCheckInfo,
} from '../../features/checkedItems/type';
import { Group, Groups } from '../../features/groups/type';
import { StockList, StocksCollection } from '../../features/stockList/type';
import { UserGroups, UserStocks } from '../../repository/userData/type';

export const transformStocksDataForFrontend = (
  userStocks: UserStocks,
): StocksCollection => {
  const stocks: StocksCollection = {
    byId: {},
    allIds: [],
  };

  if (!userStocks) return stocks;
  for (const stockId in userStocks) {
    const stock = userStocks[stockId];
    const mainInfo: StockList['mainInfo'] = {
      stockId,
      stockName: stock.info.name,
      currentPrice: stock.info.currentPrice,
    };

    const purchasedItems: StockList['purchasedItems'] = {
      byId: {},
      allIds: [],
    };

    // TODO: check data, time format
    for (const itemId in stock.items) {
      const item = stock.items[itemId];
      purchasedItems.byId[itemId] = {
        purchasedId: itemId,
        purchasedDate: new Date(item.buyDate).toISOString().slice(0, 10),
        purchasedTime: item.buyTime,
        purchasedQuantity: item.quantity,
        purchasedPrice: item.buyPrice,
      };
      purchasedItems.allIds.push(itemId);
    }

    stocks.byId[stockId] = {
      mainInfo,
      purchasedItems,
    };
    stocks.allIds.push(stockId);
  }

  return stocks;
};

export const generateInitialCheckInfo = (
  userStocks: UserStocks,
): CheckedItemsState => {
  const checkedItemsInfo: CheckedItemsInfo = {
    allChecked: true,
    stocksCheckInfo: {},
  };
  if (!userStocks) return checkedItemsInfo;

  for (const stockId in userStocks) {
    const stock = userStocks[stockId];
    const stockCheckInfo: StockCheckInfo = {
      allChecked: true,
      purchasedItems: {},
    };

    for (const itemId in stock.items)
      stockCheckInfo.purchasedItems[itemId] = true;

    checkedItemsInfo.stocksCheckInfo[stockId] = stockCheckInfo;
  }

  return checkedItemsInfo;
};

export const transformUserGroupsForFrontend = (
  userGroups: UserGroups,
): Groups => {
  const groups: Groups = {
    byId: {},
    allIds: [],
  };

  if (!userGroups) return groups;

  for (const groupId in userGroups) {
    const userGroup = userGroups[groupId];

    const group: Group = {
      groupId,
      groupName: userGroup.name,
      stocks: {
        byId: userGroup.stocks,
        allIds: Object.keys(userGroup.stocks),
      },
    };

    groups.byId[groupId] = group;
    groups.allIds.push(groupId);
  }

  return groups;
};
