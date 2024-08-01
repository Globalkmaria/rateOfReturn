import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useSaveChangedSoldsData from '@/views/List/hooks/useSaveChangedSoldData';
import SoldTableContainer from '@/views/Sold/Table/SoldTableContainer';
import { validateSoldQuery } from '@/views/Sold/Table/helper';

function SoldPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') ?? '';
  const [firstLoad, setFirstLoad] = useState(true);
  useSaveChangedSoldsData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!validateSoldQuery(sortBy)) return navigate('/sold');
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
