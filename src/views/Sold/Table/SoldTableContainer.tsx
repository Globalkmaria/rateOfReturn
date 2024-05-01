import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import SoldTableSkeleton from './SoldTableSkeleton';

const SoldTable = lazy(() => import('./SoldTable'));

function SoldTableContainer() {
  return (
    <StyledContainer>
      <Suspense fallback={<SoldTableSkeleton />}>
        <SoldTable />
      </Suspense>
    </StyledContainer>
  );
}

export default SoldTableContainer;

const StyledContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 180px);
  min-height: calc(100vh - 180px);
  background: ${({ theme }) => theme.colors.white};
`;
