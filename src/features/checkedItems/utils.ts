import { Group } from '../groups/groupsSlice';
import { CheckedItemsInfo } from './checkedItemsSlice';

export const getInitialCheckedItemsInfo = ({
  data,
  value,
}: {
  data: Group;
  value: boolean;
}): CheckedItemsInfo => {
  const checkedItemsInfo: CheckedItemsInfo = {
    allChecked: value,
    stocksCheckInfo: {},
  };

  for (const stockId of data.stocks.allIds) {
    checkedItemsInfo.stocksCheckInfo[stockId] = {
      allChecked: value,
      purchasedItems: data.stocks.byId[stockId].reduce<{
        [purchasedId: string]: boolean;
      }>((acc, purchasedId) => {
        acc[purchasedId] = value;
        return acc;
      }, {}),
    };
  }

  return checkedItemsInfo;
};

export const updateAllCheckedItems = ({
  state,
  value,
}: {
  state: CheckedItemsInfo;
  value: boolean;
}) => {
  state.allChecked = value;
  for (const stockId in state.stocksCheckInfo) {
    state.stocksCheckInfo[stockId].allChecked = value;
    for (const purchasedId in state.stocksCheckInfo[stockId].purchasedItems) {
      state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = value;
    }
  }
  return state;
};

export const updateStockCheckedItems = ({
  state,
  stockId,
  value,
}: {
  state: CheckedItemsInfo;
  stockId: string;
  value: boolean;
}) => {
  state.stocksCheckInfo[stockId].allChecked = value;
  for (const purchasedId in state.stocksCheckInfo[stockId].purchasedItems) {
    state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = value;
  }
  state.allChecked = false;
  return state;
};

export const updatePurchasedCheckedItems = ({
  state,
  stockId,
  purchasedId,
  value,
}: {
  state: CheckedItemsInfo;
  stockId: string;
  purchasedId: string;
  value: boolean;
}) => {
  state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = value;
  state.stocksCheckInfo[stockId].allChecked = false;
  state.allChecked = false;
  return state;
};
