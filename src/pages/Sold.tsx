import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { validateSoldQuery } from '@/views/Sold/Table/helper';
import SoldTableContainer from '@/views/Sold/Table/SoldTableContainer';

import { StyledPage } from './style';

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
      <StyledPage>
        <SoldTableContainer />
      </StyledPage>
    </>
  );
}

export default SoldPage;
