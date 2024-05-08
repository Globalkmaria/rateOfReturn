import { Suspense, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Select from '@/components/Select';
import { selectStocks } from '@/features/stockList/selectors';
import { getStockBarChartInfos, getStockOptions } from './utils';
import { Skeleton } from '@/components/Skeleton';
import { BorderAnchor } from '@/components/Anchor';
import NoStockMessage from '../NoStockMessage';
import BarChartTable from './BarChartTable';

const BarChart = lazy(() => import('./BarChart'));

function StockBarChart() {
  const stockList = useSelector(selectStocks);
  const [selectedStock, setSelectedStock] = useState(stockList.allIds[0]);
  const stockOptions = getStockOptions(stockList);

  const stock = stockList.byId[selectedStock];

  const stockBarChartInfos = getStockBarChartInfos(stock);

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
        Each bar represents the rate of return for the individually purchased
        stock.
      </p>
      <StyledSubText>
        Formula: ((current price - buy price) / buy price) * 100
      </StyledSubText>

      {stock ? (
        <Suspense fallback={<StyledSkeleton />}>
          <BarChart
            stockBarChartInfos={stockBarChartInfos}
            stockName={stock.mainInfo.stockName}
          />
          <BarChartTable stockBarChartInfos={stockBarChartInfos} />
        </Suspense>
      ) : (
        <NoStockMessage />
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
