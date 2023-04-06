import React from 'react';
import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import { StockList } from '../../../features/stockList/stockListSlice';

export interface StockItemProps {
  stockInfo: StockList;
  stockIdx: number;
}

const StockItem: React.FC<StockItemProps> = ({ stockInfo, stockIdx }) => {
  return (
    <>
      <SummaryInfo stockInfo={stockInfo} stockIdx={stockIdx} />
      {stockInfo.purchasedItems.map((purchasedItem, purchasedIdx) => (
        <PurchasedStock
          key={purchasedItem.purchasedId}
          purchasedItem={purchasedItem}
          mainInfo={stockInfo.mainInfo}
          stockIdx={stockIdx}
          purchasedIdx={purchasedIdx}
        />
      ))}
      <AddSameStockButton stockId={stockInfo.mainInfo.stockId} />
    </>
  );
};

export default StockItem;
