import useSaveChangedSoldsData from '@/views/List/hooks/useSaveChangedSoldData';
import SoldTable from '@/views/Sold/Table/SoldTable';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function SoldPage() {
  const [firstLoad, setFirstLoad] = useState(true);
  useSaveChangedSoldsData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);
  return (
    <StyledContainer>
      <SoldTable />
    </StyledContainer>
  );
}

export default SoldPage;

const StyledContainer = styled('div')`
  padding: 20px;
  background: ${({ theme }) => theme.colors.greyBackground};
`;
