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

const getSortedIdsCopy = <
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

type SortLogic<V extends string | number> = (a: V, b: V) => number;

export const createSortFunction =
  <V extends string | number>(asc: SortLogic<V>, desc: SortLogic<V>) =>
  <SortProps, Id extends KeyType>(
    extractValue: ExtractFunction<SortProps, Id, V>,
    ascending: boolean,
  ) =>
  (sortProps: SortProps, ids: Id[]) =>
    getSortedIdsCopy({
      sortProps,
      ids,
      extractValue,
      compare: (a, b) => (ascending ? asc : desc)(a, b),
    });

export const createNumericSortFunction = createSortFunction<number>(
  (a, b) => a - b,
  (a, b) => b - a,
);

export const createStringSortFunction = createSortFunction<string>(
  (a, b) => a.localeCompare(b),
  (a, b) => b.localeCompare(a),
);
