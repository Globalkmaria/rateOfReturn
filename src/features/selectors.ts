import { createSelector } from '@reduxjs/toolkit';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from './groups/selectors';
import { selectStocks } from './stockList/selectors';

export const selectStockIds = () =>
  createSelector(
    [selectIsMainGroupSelected(), selectStocks, selectSelectedGroupInfo()],
    (isMain, stocks, groupInfo) =>
      isMain ? stocks.allIds : groupInfo.stocks.allIds,
  );
