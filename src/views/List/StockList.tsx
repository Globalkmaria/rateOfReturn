import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseInput } from '../../components/Input/BaseInput';
import useSaveChangedStocksData from './hooks/useSaveChangedStocksData';
import useSaveChangedGroupsData from './hooks/useSaveChangedGroupedData';
import StockListSkeleton from './StockListSkeleton';
import useSaveChangedSoldsData from './hooks/useSaveChangedSoldData';
import StockListContent from './StockListContent';

const StockList = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  useSaveChangedGroupsData(firstLoad);
  useSaveChangedStocksData(firstLoad);
  useSaveChangedSoldsData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <Suspense fallback={<StockListSkeleton />}>
      <StyledStockList>
        <StockListContent />
        <div className='container'></div>
      </StyledStockList>
    </Suspense>
  );
};

export default StockList;

const StyledStockList = styled('div')`
  ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};

    &:disabled {
      background: none;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.grey900};
      opacity: 1;
    }
  }
`;
