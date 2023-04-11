import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import { useSelector } from 'react-redux';
import { selectStockInfoById } from '../../../features/stockList/stockListSlice';

export interface StockItemProps {
  stockId: string;
}

const StockItem = ({ stockId }: StockItemProps) => {
  const stockInfo = useSelector(selectStockInfoById(stockId));
  return (
    <>
      <SummaryInfo stockId={stockId} />
      {stockInfo.purchasedItems.allIds.map((purchasedId, purchasedIdx) => (
        <PurchasedStock
          stockId={stockId}
          purchasedId={purchasedId}
          key={purchasedId}
          purchasedIdx={purchasedIdx}
        />
      ))}
      <AddSameStockButton stockId={stockInfo.mainInfo.stockId} />
    </>
  );
};

export default StockItem;
