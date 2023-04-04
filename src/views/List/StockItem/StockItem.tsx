import React from 'react';
import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import { getSummaryInfo } from './utils';

export type SummaryInfoData = {
  stockName: string;
  stockId: number;
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  currentPrice: number;
};

export type StockInfoData = {
  stockName: string;
  stockId: number;
  currentPrice: number;
  purchasedId: number;
  purchaseDate: string;
  purchaseQuantity: number;
  purchasePrice: number;
};

export interface StockItemProps {
  purchasedStockList: StockInfoData[];
}

const StockItem: React.FC<StockItemProps> = ({ purchasedStockList }) => {
  const summaryInfo = getSummaryInfo(purchasedStockList);
  return (
    <>
      <SummaryInfo summaryInfoData={summaryInfo} />
      {purchasedStockList.map((stockInfo) => (
        <PurchasedStock
          key={stockInfo.purchasedId}
          purchasedStockData={stockInfo}
        />
      ))}
      <AddSameStockButton />
    </>
  );
};

export default StockItem;
