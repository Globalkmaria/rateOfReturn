import styled from 'styled-components';

import { Skeleton } from '../../../components/Skeleton';

const GroupSummarySkeleton = () => {
  return (
    <StyledGroupSummary>
      <StyledContainer />
    </StyledGroupSummary>
  );
};

export default GroupSummarySkeleton;

const StyledGroupSummary = styled('div')`
  display: flex;
  justify-content: center;
`;
const StyledContainer = styled(Skeleton)`
  height: 63px;
  width: 600px;
  border-radius: 10px;
`;
