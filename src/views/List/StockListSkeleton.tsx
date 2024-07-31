import styled from 'styled-components';

import ListTableSkeleton from './ListTableSkeleton';
import GroupButtonSkeleton from './GroupButtons/GroupButtonSkeleton';
import GroupSummarySkeleton from './GroupSummary/GroupSummarySkeleton';
import EditCurrentPriceSkeleton from './StockListContent/StockTableMenu/EditCurrentPrice/EditCurrentPriceSkeleton';
import Search from '@/components/Search';

const StockListSkeleton = () => {
  return (
    <div>
      <StyledMenuWrapper>
        <StyledControlBar>
          <GroupButtonSkeleton />
          <StyledStockTableMenu>
            <EditCurrentPriceSkeleton />
            <Search disabled value={''} height='m' onChange={() => {}} />
          </StyledStockTableMenu>
        </StyledControlBar>
        <GroupSummarySkeleton />
      </StyledMenuWrapper>
      <ListTableSkeleton />
      <div className='container'></div>
    </div>
  );
};

export default StockListSkeleton;

const StyledMenuWrapper = styled('div')`
  padding: 20px 0 20px 0;
`;

const StyledControlBar = styled('div')`
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledStockTableMenu = styled('div')`
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`;
