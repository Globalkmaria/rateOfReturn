import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './AddSameStockButton';
import { useSelector } from 'react-redux';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/selectors';
import { selectStockInfoById } from '../../../features/stockList/selectors';

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
