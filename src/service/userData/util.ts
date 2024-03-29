import { CheckedItemsInfo, CheckedItemsState, StockCheckInfo } from '../../features/checkedItems/type';
import { Group, Groups } from '../../features/groups/type';
import { StockList, StocksCollection } from '../../features/stockList/type';
import { Item, UserDataRepRes, UserGroup, UserGroups, UserStock, UserStocks } from '../../repository/userData/type';
import { UserDataServiceRes } from './type';

const getMainInfo = (stockId: string, stock: UserStock['info']): StockList['mainInfo'] => ({
  stockId,
  stockName: stock.name,
  currentPrice: stock.currentPrice,
});

const transformToStocksState = (userStocks: UserStocks): StocksCollection => {
  const stocksInit: StocksCollection = { byId: {}, allIds: [] };
  if (!userStocks) return stocksInit;

  return Object.entries(userStocks).reduce((stocks, [stockId, stock]) => {
    const mainInfo = getMainInfo(stockId, stock.info);
    const purchasedItems = getPurchasedItems(stock.items);

    stocks.byId[stockId] = { mainInfo, purchasedItems };
    stocks.allIds.push(stockId);

    return stocks;
  }, stocksInit);
};

const getStocks = (stockData: UserDataRepRes['stocks']): UserDataServiceRes['stocks'] => ({
  stocks: transformToStocksState(stockData.stocks),
  nextStockId: stockData.nextStockId,
  nextPurchasedId: stockData.nextItemId,
});

const getPurchasedInfo = (purchasedId: string, item: Item) => ({
  purchasedId,
  purchasedDate: new Date(item.buyDate).toISOString().slice(0, 10),
  purchasedTime: item.buyTime,
  purchasedQuantity: item.quantity,
  purchasedPrice: item.buyPrice,
});

const getPurchasedItems = (items: UserStock['items']): StockList['purchasedItems'] => {
  const init: StockList['purchasedItems'] = { byId: {}, allIds: [] };

  return Object.entries(items).reduce((purchasedItems, [id, item]) => {
    purchasedItems.byId[id] = getPurchasedInfo(id, item);
    purchasedItems.allIds.push(id);
    return purchasedItems;
  }, init);
};

const getCheckInfoPurchaseItems = (items: UserStock['items']): StockCheckInfo['purchasedItems'] => {
  return Object.keys(items).reduce((purchasedItems, id) => {
    purchasedItems[id] = true;
    return purchasedItems;
  }, {} as StockCheckInfo['purchasedItems']);
};

const generateInitialCheckInfo = (userStocks: UserStocks): CheckedItemsState => {
  const checkedItemsInit: CheckedItemsInfo = { allChecked: true, stocksCheckInfo: {} };
  if (!userStocks) return checkedItemsInit;

  return Object.entries(userStocks).reduce((checkedItems, [stockId, stock]) => {
    checkedItems.stocksCheckInfo[stockId] = {
      allChecked: true,
      purchasedItems: getCheckInfoPurchaseItems(stock.items),
    };

    return checkedItems;
  }, checkedItemsInit);
};

const getGroup = (groupData: UserGroup): Group => ({
  groupId: groupData.id,
  groupName: groupData.name,
  stocks: {
    byId: groupData.stocks,
    allIds: Object.keys(groupData.stocks),
  },
});

const transformToGroupsState = (userGroups: UserGroups): Groups => {
  const groupsInit: Groups = {
    byId: {},
    allIds: [],
  };

  if (!userGroups) return groupsInit;

  return Object.entries(userGroups).reduce((groups, [groupId, userGroup]) => {
    groups.byId[groupId] = getGroup(userGroup);
    groups.allIds.push(groupId);

    return groups;
  }, groupsInit);
};

const getGroups = (userGroups: UserDataRepRes['groups']): UserDataServiceRes['groups'] => {
  const groups = transformToGroupsState(userGroups.groups);
  return {
    groups,
    nextGroupId: userGroups.nextGroupId,
  };
};

export const transformUserDataForFrontend = (userData: UserDataRepRes): UserDataServiceRes => {
  const stocks = getStocks(userData.stocks);
  const checkedItems = generateInitialCheckInfo(userData.stocks.stocks);
  const groups = getGroups(userData.groups);

  return {
    stocks,
    checkedItems,
    groups,
  };
};
