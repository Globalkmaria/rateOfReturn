import { KeyType } from '@/type';

export type ExtractFunction<
  SortProps,
  Id extends KeyType,
  V extends string | number,
> = (sortProps: SortProps, id: Id) => V;

export type DeepSortFunction<Id extends KeyType, SortProps> = (
  sortProps: SortProps,
  id: Id[],
) => Id[];

export const getSortedIdsCopy = <
  SortProps,
  Id extends KeyType,
  V extends string | number,
>({
  sortProps,
  ids,
  extractValue,
  compare,
}: {
  sortProps: SortProps;
  ids: Id[];
  extractValue: ExtractFunction<SortProps, Id, V>;
  compare: (a: V, b: V) => number;
}) =>
  ids.toSorted((a, b) =>
    compare(extractValue(sortProps, a), extractValue(sortProps, b)),
  );

export const createNumericSortFunction =
  <Id extends KeyType, SortProps>(
    extractValue: ExtractFunction<SortProps, Id, number>,
    ascending: boolean,
  ) =>
  (sortProps: SortProps, ids: Id[]) =>
    getSortedIdsCopy({
      sortProps,
      ids,
      extractValue,
      compare: (a, b) => (ascending ? a - b : b - a),
    });

export const createStringSortFunction =
  <Id extends KeyType, SortProps>(
    extractValue: ExtractFunction<SortProps, Id, string>,
    ascending: boolean,
  ) =>
  (sortProps: SortProps, ids: Id[]) =>
    getSortedIdsCopy({
      sortProps,
      ids,
      extractValue,
      compare: (a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)),
    });
