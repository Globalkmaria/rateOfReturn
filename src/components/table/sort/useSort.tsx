import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { KeyType } from '@/type';

import { DeepSortFunction } from './utils';

type SortFunctions<Id extends KeyType, SID extends string, Props> = Record<
  SID,
  DeepSortFunction<Id, Props>
>;

interface SortProps<
  Id extends KeyType,
  Item,
  SId extends string,
  SortFunctionProps,
> {
  ids: Id[];
  items: Record<Id, Item>;
  sortOptions: readonly SId[];
  sortFunctions: SortFunctions<Id, SId, SortFunctionProps>;
  sortFunctionProps: SortFunctionProps;
}

function useSort<
  Id extends KeyType,
  Item,
  SId extends string,
  SortFunctionProps,
>({
  ids,
  sortOptions,
  sortFunctions,
  sortFunctionProps,
}: SortProps<Id, Item, SId, SortFunctionProps>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') ?? '') as SId;

  const isValidSortBy = useMemo(
    () => sortOptions.includes(sortBy),
    [sortOptions, sortBy],
  );

  const sortedList = useMemo(
    () => (isValidSortBy ? sortFunctions[sortBy](sortFunctionProps, ids) : ids),
    [ids, isValidSortBy, sortFunctions, sortFunctionProps, sortBy],
  );

  const onSortChange = useCallback(
    (sortBy: SId) => setSearchParams({ sortBy }),
    [],
  );

  return { sortBy, isValidSortBy, sortedList, onSortChange };
}

export default useSort;
