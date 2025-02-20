import { lazy, useCallback, useDeferredValue, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  selectGroupStockInfo,
  selectGroupsIds,
} from '@/features/groups/selectors';
import { selectStocks } from '@/features/stockList/selectors';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';

import StockTableMenu from './StockTableMenu';
import { filterStockByName } from './helper';
import GroupSummary from '../GroupSummary/GroupSummary';
import useIsMainGroup from '../hooks/useIsMainGroup';
import ListErrorPage from '../ListErrorPage';
import { validateGroupId } from '@/utils/group';

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
  if (!isValidGroupId) return <ListErrorPage />;

  const filteredStockIds = isMainGroupSelected
    ? filterStockByName(deferredQuery, stockList)
    : stockIds;

  const onSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

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

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    flex-wrap: wrap;
    row-gap: 5px;
  }
`;
