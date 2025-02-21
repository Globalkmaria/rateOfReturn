import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectGroupInfo } from '@/features/groups/selectors';
import { selectStockInfoById } from '@/features/stockList/selectors';

import PurchasedStock from './PurchasedStock/PurchasedStock';
import SummaryInfo from './SummaryInfo/SummaryInfo';
import useIsMainGroup from '../hooks/useIsMainGroup';

export interface StockItemProps {
  stockId: string;
}

const StockItem = ({ stockId }: StockItemProps) => {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroup = useIsMainGroup();

  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectGroupInfo(groupId));
  const purchasedItems = isMainGroup
    ? stockInfo.purchasedItems.allIds
    : groupInfo.stocks.byId[stockId];

  const lastIdx = purchasedItems.length - 1;
  return (
    <>
      <SummaryInfo stockId={stockId} />
      {purchasedItems.map((purchasedId, i) => (
        <PurchasedStock
          stockId={stockId}
          purchasedId={purchasedId}
          isLastIdx={lastIdx === i}
          key={purchasedId}
        />
      ))}
    </>
  );
};

export default memo(StockItem);
