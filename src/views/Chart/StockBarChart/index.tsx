import { Suspense, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Select from '@/components/Select';
import { selectStocks } from '@/features/stockList/selectors';
import { getStockOptions } from './utils';
import { Skeleton } from '@/components/Skeleton';
import { Link } from 'react-router-dom';
import { BorderAnchor } from '@/components/Anchor';

const BarChart = lazy(() => import('./BarChart'));

function StockBarChart() {
  const stockList = useSelector(selectStocks);
  const [selectedStock, setSelectedStock] = useState(stockList.allIds[0]);
  const stockOptions = getStockOptions(stockList);

  const stock = stockList.byId[selectedStock];

  return (
    <StyledContainer>
      <StyledSelect
        onChange={e => setSelectedStock(e.target.value)}
        width={140}
        initialValue='1'
        options={stockOptions}
        value={selectedStock}
        title='Choose group to show'
      />
      <p>
        Each bar represents the return percentage for the individually purchased
        stock.
      </p>
      <StyledSubText>
        Formula: ((currentPrice - purchasedPrice) / purchasedPrice) * 100
      </StyledSubText>

      {stock ? (
        <Suspense fallback={<StyledSkeleton />}>
          <BarChart stock={stock} />
        </Suspense>
      ) : (
        <StyledNoStock>
          Please add stocks in
          <BorderAnchor to='/portfolio'>Current Portfolio</BorderAnchor>
          to see this chart.
        </StyledNoStock>
      )}
    </StyledContainer>
  );
}

export default StockBarChart;

const StyledContainer = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;

const StyledSkeleton = styled(Skeleton)`
  flex: 1;
  margin: 60px 30px;
  border-radius: 10px;
`;

const StyledSubText = styled('p')`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledNoStock = styled('p')`
  display: flex;
  align-items: center;
  margin: auto;

  ${BorderAnchor} {
    margin: 0 10px;
  }
`;
