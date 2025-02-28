import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import { validateSoldQuery } from '@/views/Sold/Table/helper';
import SoldTableContainer from '@/views/Sold/Table/SoldTableContainer';

function SoldPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') ?? '';

  useEffect(() => {
    if (!validateSoldQuery(sortBy)) navigate('/sold');
  }, [sortBy]);

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
  padding: 20px 40px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
