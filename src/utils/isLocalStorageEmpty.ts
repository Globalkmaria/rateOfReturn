import { GroupsState } from '../features/groups/type';
import { StockListState } from '../features/stockList/type';

export const isLocalStorageEmpty = (): boolean => {
  const stocks = localStorage.getItem('stockList');
  const groups = localStorage.getItem('groups');
  const solds = localStorage.getItem('sold');

  const parsedStock = stocks ? (JSON.parse(stocks) as StockListState) : null;
  const parsedGroup = groups ? (JSON.parse(groups) as GroupsState) : null;

  if (
    !parsedStock?.stocks.allIds?.length &&
    !parsedGroup?.groups?.allIds.length
  )
    return true;

  return false;
};
