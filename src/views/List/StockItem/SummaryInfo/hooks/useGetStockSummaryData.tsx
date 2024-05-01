import { useSelector } from 'react-redux';

import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../../../features/groups/selectors';
import { selectStockInfoById } from '../../../../../features/stockList/selectors';
import { getStockSummaryInfo } from '../../utils';
import { useMemo } from 'react';
import { fixedAsNumber } from '@/utils/number';

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

  const summaryData = useMemo(
    () =>
      getStockSummaryInfo(
        stockInfo,
        isMainGroupSelected,
        groupInfo?.stocks.byId[stockId],
      ),
    [isMainGroupSelected, groupInfo?.stocks.byId[stockId], stockInfo],
  );

  const result = useMemo(
    () => ({
      ...summaryData,
      purchasePriceAverage: fixedAsNumber(summaryData.purchasePriceAverage, 4),
      evaluationProfit: summaryData.evaluationProfit.toLocaleString(),
      profitRate: `${summaryData.profitRate.toFixed(2).toLocaleString()} %`,
    }),
    [summaryData],
  );

  return result;
};
