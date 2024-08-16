import { Collections } from '@/typeUtils/typeGenerators';

export const getSortedIdsCopy = <T1, T2>(
  collection: Collections<T1>,
  ids: string[],
  extractSortValue: (item: T1) => T2,
  compareValues: (a: T2, b: T2) => number,
) =>
  ids.toSorted((a, b) =>
    compareValues(
      extractSortValue(collection.byId[a]),
      extractSortValue(collection.byId[b]),
    ),
  );

export const createNumericSortFunction =
  <T1>(getter: (item: T1) => number, ascending: boolean) =>
  (list: Collections<T1>, ids = list.allIds) =>
    getSortedIdsCopy(list, ids, getter, (a, b) => (ascending ? a - b : b - a));

export const createStringSortFunction =
  <T1>(getter: (item: T1) => string, ascending: boolean) =>
  (list: Collections<T1>, ids = list.allIds) =>
    getSortedIdsCopy(list, ids, getter, (a, b) =>
      ascending ? a.localeCompare(b) : b.localeCompare(a),
    );
