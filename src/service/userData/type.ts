import { CheckedItemsState } from '../../features/checkedItems/type';
import { Groups } from '../../features/groups/type';
import { StocksCollection } from '../../features/stockList/type';

export type UserDataServiceRes = {
  stocks: StocksCollection;
  checkedItems: CheckedItemsState;
  groups: Groups;
};
