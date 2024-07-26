import { memo } from 'react';
import { useSelector } from 'react-redux';

import SummaryInfo from './SummaryInfo/SummaryInfo';
import PurchasedStock from './PurchasedStock/PurchasedStock';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/selectors';
import { selectStockInfoById } from '../../../features/stockList/selectors';

export interface StockItemProps {
  stockId: string;
}

const StockItem = ({ stockId }: StockItemProps) => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectSelectedGroupInfo);
  const purchasedItems = isMainGroupSelected
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
