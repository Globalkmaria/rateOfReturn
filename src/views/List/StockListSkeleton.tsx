import styled from 'styled-components';

import ListTableSkeleton from './ListTableSkeleton';
import GroupButtonSkeleton from './GroupButtons/GroupButtonSkeleton';
import GroupSummarySkeleton from './GroupSummary/GroupSummarySkeleton';

const StockListSkeleton = () => {
  return (
    <div>
      <StyledControlBar>
        <GroupButtonSkeleton />
      </StyledControlBar>
      <GroupSummarySkeleton />
      <ListTableSkeleton />
      <div className='container'></div>
    </div>
  );
};

export default StockListSkeleton;

const StyledControlBar = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledControlBarRight = styled('div')`
  display: flex;
  gap: 10px;
`;
