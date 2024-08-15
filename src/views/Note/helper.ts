import { RadioSelectProps } from '@/components/RadioSelect';
import { NotesState } from '@/features/notes';
import { StocksCollection } from '@/features/stockList/type';

const createOptionList = (ids: Set<string>): RadioSelectProps['options'] =>
  [...ids].map(id => ({ value: id, label: id }));

export const getNoteFilterOptions = (notes: NotesState['collection']) => {
  const stockNames: RadioSelectProps['options'] = [];
  const stockIds = new Set<string>();

  const purchasedIds = new Set<string>();
  const soldIds = new Set<string>();
  const tags = new Set<string>();

  for (const note of notes.allIds) {
    const { stockId, purchasedId, soldId, tag, stockName } = notes.byId[note];
    if (stockId && stockName && !stockIds.has(stockId)) {
      stockIds.add(stockId);
      stockNames.push({ value: stockId, label: stockName });
    }

    purchasedId && purchasedIds.add(purchasedId);
    soldId && soldIds.add(soldId);
    tag && tags.add(tag);
  }

  return {
    stockNames,
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
): RadioSelectProps['options'] => {
  let ids = new Set<string>();

  for (const stockId of stockInfo.allIds) {
    const { purchasedItems } = stockInfo.byId[stockId];

    ids = ids.union(new Set(purchasedItems.allIds));
  }

  for (const note of notes.allIds) {
    const { purchasedId } = notes.byId[note];
    if (purchasedId) ids.add(purchasedId);
  }

  return [...ids].map(id => ({ value: id, label: id }));
};

export const getSoldIdOptionList = (
  sold: string[],
  notes: NotesState['collection'],
): RadioSelectProps['options'] => {
  const ids = new Set<string>(sold);

  for (const note of notes.allIds) {
    const { soldId } = notes.byId[note];
    soldId && ids.add(soldId);
  }

  return [...ids].map(id => ({ value: id, label: id }));
};

export const getTagOptionList = (
  stockTags: string[],
  notes: NotesState['collection'],
): RadioSelectProps['options'] => {
  const tags = new Set<string>(stockTags);

  for (const note of notes.allIds) {
    const { tag } = notes.byId[note];
    if (tag && !tags.has(tag)) tags.add(note);
  }

  return [...tags].map(tag => ({ value: tag, label: tag }));
};
