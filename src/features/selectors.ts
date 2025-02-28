import { createSelector } from '@reduxjs/toolkit';

import { checkIfMainGroup } from '@/utils/group';

import { selectGroupInfo } from './groups/selectors';
import { selectStocks } from './stockList/selectors';

export const selectStockIds = (groupId: string) =>
  createSelector(
    [selectStocks, selectGroupInfo(groupId)],
    (stocks, groupInfo) => {
      const isMain = checkIfMainGroup(groupId);
      return isMain ? stocks.allIds : groupInfo.stocks.allIds;
    },
  );
