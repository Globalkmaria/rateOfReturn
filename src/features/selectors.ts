import { createSelector } from '@reduxjs/toolkit';
import { selectGroupInfo } from './groups/selectors';
import { selectStocks } from './stockList/selectors';
import { checkIfMainGroup } from '@/utils/group';

export const selectStockIds = (groupId: string) =>
  createSelector(
    [selectStocks, selectGroupInfo(groupId)],
    (stocks, groupInfo) => {
      const isMain = checkIfMainGroup(groupId);
      return isMain ? stocks.allIds : groupInfo.stocks.allIds;
    },
  );
