import { Suspense, lazy, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseInput } from '../../components/Input/BaseInput';
import GroupSummary from './GroupSummary/GroupSummary';
import AddSampleData from './AddSampleData/AddSampleData';
import useSaveChangedStocksData from './hooks/useSaveChangedStocksData';
import useSaveChangedGroupsData from './hooks/useSaveChangedGroupedData';
import StockListSkeleton from './StockListSkeleton';
import useSaveChangedSoldsData from './hooks/useSaveChangedSoldData';
import EditCurrentPrice from './EditCurrentPrice';
import StockListContent from './StockListContent';

const GroupButtons = lazy(() => import('./GroupButtons/GroupButtons'));
const StockTable = lazy(() => import('./StockTable'));

const StockList = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  useSaveChangedGroupsData(firstLoad);
  useSaveChangedStocksData(firstLoad);
  useSaveChangedSoldsData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <Suspense fallback={<StockListSkeleton />}>
      <StyledStockList>
        <StyledControlBar>
          <div>
            <GroupButtons />
          </div>
          <StyledControlBarRight>
            <AddSampleData />
            <EditCurrentPrice />
          </StyledControlBarRight>
        </StyledControlBar>
        <GroupSummary />
        <StockListContent />
        <div className='container'></div>
      </StyledStockList>
    </Suspense>
  );
};

export default StockList;

const StyledStockList = styled('div')`
  ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};

    &:disabled {
      background: none;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.grey900};
      opacity: 1;
    }
  }
`;

const StyledControlBar = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const StyledControlBarRight = styled('div')`
  display: flex;
  gap: 10px;
`;
