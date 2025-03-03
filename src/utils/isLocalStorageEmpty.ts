import { NotesState } from '@/features/notes';
import { SoldsState } from '@/features/solds';

import { GroupsState } from '../features/groups/type';
import { StockListState } from '../features/stockList/type';

export const isLocalStorageEmpty = (): boolean => {
  const stocks = localStorage.getItem('stockList');
  const groups = localStorage.getItem('groups');
  const solds = localStorage.getItem('solds');
  const notes = localStorage.getItem('notes');

  const parsedStock = stocks ? (JSON.parse(stocks) as StockListState) : null;
  const parsedGroup = groups ? (JSON.parse(groups) as GroupsState) : null;
  const parsedSold = solds ? (JSON.parse(solds) as SoldsState) : null;
  const parsedNotes = notes ? (JSON.parse(notes) as NotesState) : null;

  if (
    !parsedStock?.stocks.allIds?.length &&
    !parsedGroup?.groups?.allIds.length &&
    !parsedSold?.list?.allIds.length &&
    !parsedNotes?.collection?.allIds?.length
  )
    return true;

  return false;
};
