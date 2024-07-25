import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import SoldTableSkeleton from './SoldTableSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addSoldSampleData, selectSoldList } from '@/features/solds';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userSolds from '@/service/userSolds';
import { BorderButton } from '@/components/Button';
import { getSoldServerSampleData } from '@/service/userSolds/utils';
import Icon from '@/components/Icon';

const SoldTable = lazy(() => import('./SoldTable'));

function SoldTableContainer() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const soldList = useSelector(selectSoldList);
  const noItem = soldList.allIds.length === 0;

  const onClick = async () => {
    if (isLoggedIn) {
      const data = getSoldServerSampleData();
      const result = await userSolds.replaceSold(data);

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
            <Icon icon='sampleData' />
            <StyledText>Add sample data</StyledText>
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
`;

const StyledTableContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 240px);
  min-height: calc(100vh - 240px);
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledText = styled('span')`
  margin-left: 5px;
`;
