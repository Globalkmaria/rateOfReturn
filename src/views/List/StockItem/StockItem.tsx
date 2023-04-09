import React from 'react';
import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import { StockList } from '../../../features/stockList/stockListSlice';
import { objectToArray } from '../../../features/stockList/utils';

export interface StockItemProps {
  stockInfo: StockList;
}

const StockItem: React.FC<StockItemProps> = ({ stockInfo }) => {
  return (
    <>
      <SummaryInfo stockInfo={stockInfo} />
      {objectToArray(stockInfo.purchasedItems).map(
        (purchasedItem, purchasedIdx) => (
          <PurchasedStock
            key={purchasedItem.purchasedId}
            mainInfo={stockInfo.mainInfo}
            purchasedItem={purchasedItem}
            purchasedIdx={purchasedIdx}
          />
        ),
      )}
      <AddSameStockButton stockId={stockInfo.mainInfo.stockId} />
    </>
  );
};

export default StockItem;
