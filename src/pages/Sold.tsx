import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useSaveChangedSoldsData from '@/views/List/hooks/useSaveChangedSoldData';
import SoldTableContainer from '@/views/Sold/Table/SoldTableContainer';

function SoldPage() {
  const [firstLoad, setFirstLoad] = useState(true);
  useSaveChangedSoldsData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <>
      <title>Check Out the Stocks You Sold | ROR</title>
      <StyledContainer>
        <SoldTableContainer />
      </StyledContainer>
    </>
  );
}

export default SoldPage;

const StyledContainer = styled('div')`
  padding: 20px;
`;
