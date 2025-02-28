import { lazy, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { validateGroupId } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import {
  selectGroupStockInfo,
  selectGroupsIds,
} from '@/features/groups/selectors';
import { selectStocks } from '@/features/stockList/selectors';

import { getFilteredStockIds } from './helper';
import StockTableMenu from './StockTableMenu';
import AddNewStock from '../AddNewStock/AddNewStock';
import GroupSummary from '../GroupSummary/GroupSummary';
import useIsMainGroup from '../hooks/useIsMainGroup';
import ListErrorPage from '../ListErrorPage';
import StockListEditButton from './StockListEditButton';

const StockTable = lazy(() => import('../StockTable'));
const GroupButtons = lazy(() => import('../GroupButtons/GroupButtons'));

function StockListContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroupSelected = useIsMainGroup();

  const stockList = useSelector(selectStocks);
  const stockIds = useSelector(selectGroupStockInfo(groupId)).allIds;

  const groupIds = useSelector(selectGroupsIds);

  const isValidGroupId = validateGroupId(groupId, groupIds);
  const onSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const filteredStockIds = useMemo(
    () =>
      getFilteredStockIds({
        isMainGroupSelected,
        deferredQuery,
        stockIds,
        stockList,
      }),
    [isMainGroupSelected, deferredQuery, stockIds, stockList],
  );

  if (!isValidGroupId) return <ListErrorPage />;

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
      {isMainGroupSelected && (
        <StyledStockActions>
          <StockListEditButton />
          <AddNewStock />
        </StyledStockActions>
      )}
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
  margin-bottom: 16px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    flex-wrap: wrap;
    row-gap: 5px;
  }
`;

const StyledStockActions = styled('div')`
  display: flex;
  margin-bottom: 16px;
  justify-content: flex-end;
  gap: 10px;
`;
