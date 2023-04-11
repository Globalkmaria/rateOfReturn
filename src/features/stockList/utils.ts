import { CheckedItemsInfo, StockListState } from './stockListSlice';

export const objectToArray = (Obj: { [key: string | number]: any }) => {
  return Object.keys(Obj).map((ObjKey) => Obj[ObjKey]);
};

export const getInitialCheckedItemsInfo = ({
  data,
  value,
}: {
  data: StockListState['stocks'];
  value: boolean;
}): CheckedItemsInfo => {
  const checkedItemsInfo: CheckedItemsInfo = {
    allChecked: value,
    stocksCheckInfo: {},
  };

  for (const stockId of data.allIds) {
    checkedItemsInfo.stocksCheckInfo[stockId] = {
      allChecked: value,
      checkedPurchasedItems: value
        ? data.byId[stockId].purchasedItems.allIds
        : [],
    };
  }

  return checkedItemsInfo;
};
