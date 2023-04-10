import SummaryInfo from './SummaryInfo';
import PurchasedStock from './PurchasedStock';
import { AddSameStockButton } from './components';
import {
  CheckedItemsInfo,
  StockList,
} from '../../../features/stockList/stockListSlice';
import { objectToArray } from '../../../features/stockList/utils';

export interface StockItemProps {
  stockInfo: StockList;
  checkedItemsInfo: CheckedItemsInfo;
}

const StockItem = ({ stockInfo, checkedItemsInfo }: StockItemProps) => {
  return (
    <>
      <SummaryInfo stockInfo={stockInfo} checkedItemsInfo={checkedItemsInfo} />
      {objectToArray(stockInfo.purchasedItems).map(
        (purchasedItem, purchasedIdx) => (
          <PurchasedStock
            checkedItemsInfo={checkedItemsInfo}
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
