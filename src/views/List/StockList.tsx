import { Suspense } from 'react';
import styled from 'styled-components';

import { BaseInput } from '../../components/Input/BaseInput';
import StockListSkeleton from './StockListSkeleton';
import StockListContent from './StockListContent';

const StockList = () => {
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
