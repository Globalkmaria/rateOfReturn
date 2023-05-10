import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  getInitialCheckedItemsInfo,
  updateAllCheckedItems,
  updatePurchasedCheckedItems,
  updateStockCheckedItems,
} from './utils';
import { GROUPS_MOCK_DATA } from '../groups/mockData';
import { RootState } from '../../store';

export type CheckedItemsInfo = {
  allChecked: boolean;
  stocksCheckInfo: {
    [stockId: string]: {
      allChecked: boolean;
      purchasedItems: { [purchasedId: string]: boolean };
    };
  };
};

type UpdateCheckedItemsInfoPayload =
  | {
      type: 'all';
      checked: boolean;
    }
  | { type: 'stock'; stockId: string; checked: boolean }
  | {
      type: 'purchased';
      stockId: string;
      purchasedId: string;
      checked: boolean;
    };

export type CheckedItemsState = CheckedItemsInfo;

const initialState: CheckedItemsState = getInitialCheckedItemsInfo({
  data: GROUPS_MOCK_DATA.byId[1],
  value: true,
});

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    initCheckedItems: (state) => {},
    addStockCheckInfo: (
      state,
      action: PayloadAction<{ stockId: string; purchasedId: string }>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId] = {
        allChecked: true,
        purchasedItems: { [purchasedId]: true },
      };
    },
    addPurchasedItemsCheckInfo: (
      state,
      action: PayloadAction<{ stockId: string; purchasedId: string }>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = true;
    },
    updateCheckedItems: (
      state,
      action: PayloadAction<UpdateCheckedItemsInfoPayload>,
    ) => {
      const { checked, type } = action.payload;
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
            stockId: action.payload.stockId,
            value: checked,
          });
          break;
        case 'purchased':
          state = updatePurchasedCheckedItems({
            state: state,
            stockId: action.payload.stockId,
            purchasedId: action.payload.purchasedId,
            value: checked,
          });
          break;
        default:
          break;
      }
    },
  },
});

export const checkedItems = (state: RootState) => state.checkedItems;
export const selectCheckItemsInfo = () =>
  createSelector(
    [checkedItems],
    (checkedItemsInfo) => checkedItemsInfo.stocksCheckInfo,
  );
export const selectIsAllChecked = () =>
  createSelector([checkedItems], (checkedItems) => checkedItems.allChecked);

export const selectStockCheckedInfo = (stockId: string) =>
  createSelector(
    [selectCheckItemsInfo()],
    (stocksCheckInfo) => stocksCheckInfo[stockId],
  );
export const selectIsPurchasedItemChecked = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector(
    [selectStockCheckedInfo(stockId)],
    (checkedStockInfo) => checkedStockInfo.purchasedItems[purchasedId],
  );

export const selectCheckedPurchasedItems = () =>
  createSelector([selectCheckItemsInfo()], (stocksCheckInfo) => {
    const checkedPurchasedItems: { stockId: string; purchasedId: string }[] =
      [];

    Object.keys(stocksCheckInfo).forEach((stockId) => {
      const purchasedItems = stocksCheckInfo[stockId].purchasedItems;
      Object.keys(purchasedItems).forEach((purchasedId) => {
        if (purchasedItems[purchasedId]) {
          checkedPurchasedItems.push({ stockId, purchasedId });
        }
      });
    });
    return checkedPurchasedItems;
  });

export const {
  initCheckedItems,
  updateCheckedItems,
  addStockCheckInfo,
  addPurchasedItemsCheckInfo,
} = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
