import { SOLD_SORT_OPTIONS, SoldSortOptions } from './const';

export const validateSoldQuery = (query: string): query is SoldSortOptions => {
  return SOLD_SORT_OPTIONS.includes(query as SoldSortOptions);
};
