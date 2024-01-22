import styled from 'styled-components';

import { Skeleton } from '../../../components/Skeleton';
import { SUMMARY_CONTENTS } from './GroupSummary';

const GroupSummarySkeleton = () => {
  return (
    <StyledGroupSummary>
      {SUMMARY_CONTENTS.map(({ key }) => (
        <StyleItem key={key}></StyleItem>
      ))}
    </StyledGroupSummary>
  );
};

export default GroupSummarySkeleton;

const StyledGroupSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
  gap: 30px;

  @media ${({ theme }) => theme.devices.mobile} {
    margin: 0px;
    margin-bottom: 20px;
    gap: 10px;
  }
`;

const StyleItem = styled(Skeleton)`
  width: 170px;
  height: 76px;
  border-radius: 10px;
`;
