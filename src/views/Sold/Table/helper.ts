import { SORT_OPTIONS, SoldSortOptions } from './const';

export const validateSoldQuery = (query: string): query is SoldSortOptions => {
  return SORT_OPTIONS.includes(query as SoldSortOptions);
};
