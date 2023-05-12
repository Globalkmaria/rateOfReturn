import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import { useSelector } from 'react-redux';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/groupsSlice';
import { selectStockInfoById } from '../../../features/stockList/stockListSlice';

export interface StockItemProps {
  stockId: string;
}

const StockItem = ({ stockId }: StockItemProps) => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const purchasedItems = isMainGroupSelected
    ? stockInfo.purchasedItems.allIds
    : groupInfo.stocks.byId[stockId];

  return (
    <>
      <SummaryInfo stockId={stockId} />
      {purchasedItems.map((purchasedId) => (
        <PurchasedStock
          stockId={stockId}
          purchasedId={purchasedId}
          key={purchasedId}
        />
      ))}
      {isMainGroupSelected && <AddSameStockButton stockId={stockId} />}
    </>
  );
};

export default StockItem;
