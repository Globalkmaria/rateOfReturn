import { RadioSelectProps } from '@/components/RadioSelect';

import { Note, NotesState } from '@/features/notes';
import { SoldsState } from '@/features/solds';
import { StocksCollection } from '@/features/stockList/type';

import {
  NOTE_FILTERS,
  NOTE_SORT,
  NOTE_SORT_OPTIONS_FUNCTIONS,
  NOTE_SORT_OPTIONS_KEYS,
  NoteSortOptionsKeys,
} from './const';

const createOptionList = (ids: Set<string>): RadioSelectProps['options'] =>
  [...ids].map(id => ({ value: id, label: id }));

export const getNoteFilterOptions = (notes: NotesState['collection']) => {
  const stockNames = new Set<string>();
  const purchasedIds = new Set<string>();
  const soldIds = new Set<string>();
  const tags = new Set<string>();

  for (const note of notes.allIds) {
    const { purchasedId, soldId, tag, stockName } = notes.byId[note];

    if (stockName) stockNames.add(stockName);
    if (purchasedId) purchasedIds.add(purchasedId);
    if (soldId) soldIds.add(soldId);
    if (tag) tags.add(tag);
  }

  return {
    stockNames: createOptionList(stockNames),
    purchasedIds: createOptionList(purchasedIds),
    soldIds: createOptionList(soldIds),
    tags: createOptionList(tags),
  };
};

export const getStockNameOptionList = (
  stockInfo: StocksCollection,
  notes: NotesState['collection'],
): RadioSelectProps['options'] => {
  const result: RadioSelectProps['options'] = [];
  const ids = new Set<string>();

  for (const stockId of stockInfo.allIds) {
    const stock = stockInfo.byId[stockId];
    const { stockName } = stock.mainInfo;

    if (stockName && !ids.has(stockName)) {
      result.push({ value: stockId, label: stockName });
      ids.add(stockName);
    }
  }

  for (const note of notes.allIds) {
    const { stockName, stockId } = notes.byId[note];
    if (stockName && stockId && !ids.has(stockName)) {
      result.push({ value: stockId, label: stockName });
      ids.add(stockName);
    }
  }

  return result;
};

export const getPurchasedIdOptionList = (
  stockInfo: StocksCollection,
  notes: NotesState['collection'],
): string[] => {
  let ids = new Set<string>();

  for (const stockId of stockInfo.allIds) {
    const { purchasedItems } = stockInfo.byId[stockId];

    ids = new Set([...ids, ...new Set(purchasedItems.allIds)]);
  }

  for (const note of notes.allIds) {
    const { purchasedId } = notes.byId[note];
    if (purchasedId) ids.add(purchasedId);
  }

  return [...ids];
};

export const getSoldIdOptionList = (
  sold: string[],
  notes: NotesState['collection'],
): string[] => {
  const ids = new Set<string>(sold);

  for (const note of notes.allIds) {
    const { soldId } = notes.byId[note];
    if (soldId) ids.add(soldId);
  }

  return [...ids];
};

export const getTagOptionList = (
  stockTags: string[],
  notes: NotesState['collection'],
  solds: SoldsState['list'],
): string[] => {
  const tags = new Set<string>(stockTags);

  for (const note of notes.allIds) {
    const { tag } = notes.byId[note];
    if (tag) tags.add(tag);
  }

  for (const soldId of solds.allIds) {
    const sold = solds.byId[soldId];
    const { tag } = sold;
    if (tag) tags.add(tag);
  }

  return [...tags];
};

export const getFilteredNoteIdsByTitle = (
  title: string,
  notes: NotesState['collection'],
  ids: string[],
) => {
  if (title.trim() === '') return ids;

  return ids.filter(id =>
    notes.byId[id].title.toLowerCase().includes(title.toLowerCase()),
  );
};

export const getFilteredNoteIdsBySearchParams = (
  searchParams: URLSearchParams,
  notes: NotesState['collection'],
) => {
  if (!notes.allIds.length) return [];

  const filters = new Set([...searchParams.keys()]);

  filters.delete(NOTE_SORT);
  if (!filters.size) return notes.allIds;

  const filter = [...filters][0] as keyof Note;
  if (!NOTE_FILTERS.includes(filter)) return notes.allIds;

  const filterValue = searchParams.get(filter);
  if (filterValue === null) return notes.allIds;

  const filteredNoteIds = notes.allIds.filter(id => {
    const note = notes.byId[id];
    const noteValue = note[filter];
    if (noteValue && noteValue === filterValue) return true;

    return false;
  });

  return filteredNoteIds;
};

export const getSortedNoteIds = (
  searchParams: URLSearchParams,
  filteredNoteIds: string[],
  notes: NotesState['collection'],
) => {
  if (!notes.allIds.length) return [];
  const sort = searchParams.get(NOTE_SORT) as NoteSortOptionsKeys;
  if (!sort) return filteredNoteIds;
  if (!NOTE_SORT_OPTIONS_KEYS.includes(sort)) return filteredNoteIds;

  return NOTE_SORT_OPTIONS_FUNCTIONS[sort](notes, filteredNoteIds);
};
