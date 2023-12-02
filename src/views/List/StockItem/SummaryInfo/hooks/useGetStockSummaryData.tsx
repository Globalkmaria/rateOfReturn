import { useSelector } from 'react-redux';

import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../../../features/groups/selectors';
import { selectStockInfoById } from '../../../../../features/stockList/selectors';
import { getGroupPurchasedData, getStockSummaryInfo } from '../../utils';
import { useMemo } from 'react';

export type SummaryData = {
  evaluationProfit: string;
  profitRate: string;
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
};

export const useGetStockSummaryData = (stockId: string): SummaryData => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectSelectedGroupInfo);

  const purchasedItems = isMainGroupSelected
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(
        stockInfo.purchasedItems,
        groupInfo?.stocks.byId[stockId],
      );

  const summaryData = useMemo(
    () => getStockSummaryInfo(stockInfo.mainInfo, purchasedItems),
    [purchasedItems, stockInfo.mainInfo],
  );

  const result = useMemo(
    () => ({
      ...summaryData,
      evaluationProfit: summaryData.evaluationProfit.toLocaleString(),
      profitRate: `${summaryData.profitRate.toFixed(2).toLocaleString()} %`,
    }),
    [summaryData],
  );

  return result;
};
