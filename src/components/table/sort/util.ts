import { Collections } from '@/typeUtils/typeGenerators';

export const getSortedIdsCopy = <T, V>(
  list: Collections<T>,
  extractSortValue: (item: T) => V,
  compareValues: (a: V, b: V) => number,
) =>
  list.allIds.toSorted((a, b) =>
    compareValues(
      extractSortValue(list.byId[a]),
      extractSortValue(list.byId[b]),
    ),
  );

export const createNumericSortFunction =
  <T>(getter: (item: T) => number, ascending: boolean) =>
  (list: Collections<T>) =>
    getSortedIdsCopy(list, getter, (a, b) => (ascending ? a - b : b - a));

export const createStringSortFunction =
  <T>(getter: (item: T) => string, ascending: boolean) =>
  (list: Collections<T>) =>
    getSortedIdsCopy(list, getter, (a, b) =>
      ascending ? a.localeCompare(b) : b.localeCompare(a),
    );
