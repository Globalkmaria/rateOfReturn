import { CheckedItemsInfo, StockList } from './stockListSlice';

export const objectToArray = (Obj: { [key: string | number]: any }) => {
  return Object.keys(Obj).map((ObjKey) => Obj[ObjKey]);
};

export const getInitialCheckedItemsInfo = ({
  data,
  value,
}: {
  data: { [key: string]: StockList };
  value: boolean;
}): CheckedItemsInfo => {
  const checkedItemsInfo: CheckedItemsInfo = {
    allChecked: value,
    selectedItems: {},
  };

  for (const stockId of Object.keys(data)) {
    checkedItemsInfo.selectedItems[stockId] = {
      allChecked: value,
      items: value ? Object.keys(data[stockId].purchasedItems) : [],
    };
  }

  return checkedItemsInfo;
};
