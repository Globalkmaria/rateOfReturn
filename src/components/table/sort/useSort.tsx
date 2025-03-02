import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Collections } from '@/typeUtils/typeGenerators';

function useSort<T extends string, V>({
  list,
  sortOptions,
  sortFunctions,
}: {
  list: Collections<V>;
  sortOptions: readonly T[];
  sortFunctions: Record<T, (list: Collections<V>) => Collections<V>['allIds']>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') ?? '') as T;

  const isValidSortBy = useMemo(
    () => sortOptions.includes(sortBy),
    [sortOptions, sortBy],
  );

  const sortedList = useMemo(
    () => (isValidSortBy ? sortFunctions[sortBy](list) : list.allIds),
    [isValidSortBy, list, sortBy, sortFunctions],
  );

  const onSortChange = useCallback(
    (sortBy: T) => setSearchParams({ sortBy }),
    [],
  );

  return { sortBy, isValidSortBy, sortedList, onSortChange };
}

export default useSort;
