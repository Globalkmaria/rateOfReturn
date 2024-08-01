import { SoldsState } from '@/features/solds';
import { CheckedItemsState } from '../../features/checkedItems/type';
import { GroupsState } from '../../features/groups/type';
import { StockListState } from '../../features/stockList/type';

export type UserDataServiceRes = {
  stocks: StockListState;
  checkedItems: CheckedItemsState;
  groups: GroupsState;
  solds: SoldsState;
};
