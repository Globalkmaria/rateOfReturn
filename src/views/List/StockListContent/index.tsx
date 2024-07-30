import { lazy, useDeferredValue, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import { selectStockIds } from '@/features/selectors';
import { selectStocks } from '@/features/stockList/selectors';

const StockTable = lazy(() => import('../StockTable'));
import StockTableMenu from './StockTableMenu';
import { filterStockByName } from './helper';

function StockListContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const stockList = useSelector(selectStocks);
  const stockIds = useSelector(selectStockIds);

  const filteredStockIds = isMainGroupSelected
    ? filterStockByName(deferredQuery, stockList)
    : stockIds;

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  return (
    <StyledStockListContent>
      {isMainGroupSelected && (
        <StockTableMenu
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
        />
      )}
      <StockTable stockIds={filteredStockIds} />
    </StyledStockListContent>
  );
}

export default StockListContent;

const StyledStockListContent = styled('div')``;
