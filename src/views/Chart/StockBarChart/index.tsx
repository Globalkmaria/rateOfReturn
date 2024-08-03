import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectStocks } from '@/features/stockList/selectors';
import { Skeleton } from '@/components/Skeleton';

import { getStockBarChartInfos, getStockOptions } from './utils';
import NoStockMessage from '../NoStockMessage';
import BarChartTable from './BarChartTable';
import { useNavigate, useParams } from 'react-router-dom';
import ChartErrorPage from '../PortfolioAllocation/ChartErrorPage';
import RadioSelect from '@/components/RadioSelect';

const BarChart = lazy(() => import('./BarChart'));

function StockBarChart() {
  const navigate = useNavigate();
  const stockList = useSelector(selectStocks);
  const stockIds = stockList.allIds;

  const firstStockId = stockIds[0];
  const { stockId = firstStockId } = useParams();
  const stockOptions = getStockOptions(stockList);

  const isValidStockId = stockId === firstStockId || stockIds.includes(stockId);

  if (!isValidStockId)
    return (
      <ChartErrorPage
        defaultUrl={'/chart/individual-stock-bar'}
        title='stock id'
        id={stockId}
        buttonName='Go to first stock'
      />
    );

  const stock = stockList.byId[stockId];

  const stockBarChartInfos = getStockBarChartInfos(stock);

  const onClick = (value: string) => navigate(`stocks/${value}`);

  return (
    <StyledContainer>
      <RadioSelect
        onClick={onClick}
        options={stockOptions}
        value={stockId}
        title='Switch stocks'
        size='m'
      />
      <StyledDescription>
        Each bar represents the rate of return for the individually purchased
        stock.
      </StyledDescription>
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

const StyledDescription = styled('p')`
  margin-top: 10px;
`;

const StyledSubText = styled('p')`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledSkeleton = styled(Skeleton)`
  flex: 1;
  margin: 60px 30px;
  border-radius: 10px;
`;
