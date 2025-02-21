import { Group } from '../groups/type';
import { StockListState } from '../stockList/type';
import {
  CheckedItemsInfo,
  StockCheckInfo,
  UpdateCheckedItemsInfoPayload,
  getCheckedItemsInfoProps,
} from './type';

const getCheckItemPurchasedInfos = (items: string[], value: boolean) =>
  items.reduce(
    (info, purchasedId) => {
      info[purchasedId] = value;
      return info;
    },
    {} as StockCheckInfo['purchasedItems'],
  );

const getCheckedItemsInfo = <T>({
  value,
  data,
  getStockIds,
  getPurchasedIds,
}: getCheckedItemsInfoProps<T>) => {
  const init: CheckedItemsInfo = {
    allChecked: value,
    stocksCheckInfo: {},
  };

  return getStockIds(data).reduce((info, stockId) => {
    const purchasedIds = getPurchasedIds(data, stockId);

    info.stocksCheckInfo[stockId] = {
      allChecked: value,
      purchasedItems: getCheckItemPurchasedInfos(purchasedIds, value),
    };

    return info;
  }, init);
};

export const getInitialCheckedItemsInfo = ({
  data,
  value,
}: {
  data: StockListState['stocks'];
  value: boolean;
}): CheckedItemsInfo => {
  return getCheckedItemsInfo({
    value,
    data,
    getStockIds: data => data.allIds,
    getPurchasedIds: (data, stockId) =>
      data.byId[stockId].purchasedItems.allIds,
  });
};

export const getInitialCheckedItemsInfoFromGroupFormat = ({
  data,
  value,
}: {
  data: Group['stocks'];
  value: boolean;
}): CheckedItemsInfo => {
  return getCheckedItemsInfo({
    value,
    data,
    getStockIds: data => data.allIds,
    getPurchasedIds: (data, stockId) => data.byId[stockId],
  });
};

const updateAllCheckedItems = ({
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

const updateStockCheckedItems = ({
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

const updatePurchasedCheckedItems = ({
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

export const updateCheckedItemsState = (
  state: CheckedItemsInfo,
  payload: UpdateCheckedItemsInfoPayload,
) => {
  const { checked, type } = payload;
  switch (type) {
    case 'all':
      state = updateAllCheckedItems({
        state: state,
        value: checked,
      });
      break;
    case 'stock':
      state = updateStockCheckedItems({
        state: state,
        stockId: payload.stockId,
        value: checked,
      });
      break;
    case 'purchased':
      state = updatePurchasedCheckedItems({
        state: state,
        stockId: payload.stockId,
        purchasedId: payload.purchasedId,
        value: checked,
      });
      break;
    default:
      break;
  }
  return state;
};
