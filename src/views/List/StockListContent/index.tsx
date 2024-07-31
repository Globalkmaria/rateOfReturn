import { lazy, useDeferredValue, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import { selectStockIds } from '@/features/selectors';
import { selectStocks } from '@/features/stockList/selectors';

import StockTableMenu from './StockTableMenu';
import { filterStockByName } from './helper';
import GroupSummary from '../GroupSummary/GroupSummary';

const StockTable = lazy(() => import('../StockTable'));
const GroupButtons = lazy(() => import('../GroupButtons/GroupButtons'));

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
    <>
      <StyledControlBar>
        <StyledTopMenu>
          <GroupButtons />
          {isMainGroupSelected && (
            <StockTableMenu
              searchQuery={searchQuery}
              onSearchQueryChange={onSearchQueryChange}
            />
          )}
        </StyledTopMenu>
        <GroupSummary />
      </StyledControlBar>
      <StockTable stockIds={filteredStockIds} />
    </>
  );
}

export default StockListContent;

const StyledControlBar = styled('div')`
  padding: 20px 0 20px 0;
`;

const StyledTopMenu = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
