import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import SoldTableSkeleton from './SoldTableSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  SOLD_DATA_INITIAL_STATE_WITH_SAMPLE,
  addSoldSampleData,
  selectSoldList,
} from '@/features/solds';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userSolds from '@/service/userSolds';
import { BorderButton } from '@/components/Button';

const SoldTable = lazy(() => import('./SoldTable'));

function SoldTableContainer() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const soldList = useSelector(selectSoldList);
  const noItem = soldList.allIds.length === 0;

  const onClick = async () => {
    if (isLoggedIn) {
      const sampleData = {
        nextId: SOLD_DATA_INITIAL_STATE_WITH_SAMPLE.nextId,
        solds: SOLD_DATA_INITIAL_STATE_WITH_SAMPLE.list.byId,
      };
      const result = await userSolds.replaceSold({ solds: sampleData });

      if (!result.success) {
        alert('Failed to add sample data.');
        return;
      }
    }

    dispatch(addSoldSampleData());
  };

  return (
    <StyledContainer>
      <StyledControl>
        {noItem && (
          <BorderButton onClick={onClick} size='m'>
            Add Sample Data
          </BorderButton>
        )}
      </StyledControl>
      <Suspense fallback={<SoldTableSkeleton />}>
        <StyledTableContainer>
          <SoldTable />
        </StyledTableContainer>
      </Suspense>
    </StyledContainer>
  );
}

export default SoldTableContainer;

const StyledContainer = styled.div``;

const StyledControl = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  min-height: 40px;
`;

const StyledTableContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 240px);
  min-height: calc(100vh - 240px);
  background-color: ${({ theme }) => theme.colors.white};
`;
