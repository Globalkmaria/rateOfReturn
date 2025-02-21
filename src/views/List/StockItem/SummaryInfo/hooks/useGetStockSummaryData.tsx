import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fixedAsNumber } from '@/utils/number';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectGroupInfo } from '@/features/groups/selectors';
import { selectStockInfoById } from '@/features/stockList/selectors';

import useIsMainGroup from '@/views/List/hooks/useIsMainGroup';

import { getStockSummaryInfo } from '../../utils';

export type SummaryData = {
  evaluationProfit: string;
  profitRate: string;
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
};

export const useGetStockSummaryData = (stockId: string): SummaryData => {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroupSelected = useIsMainGroup();
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectGroupInfo(groupId));

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
