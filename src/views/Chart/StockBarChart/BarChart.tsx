import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { StockBarChartInfos, stockData } from './utils';
import { StockList } from '@/features/stockList/type';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const CHART_OPTIONS: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface Props {
  stockBarChartInfos: StockBarChartInfos;
  stockName: StockList['mainInfo']['stockName'];
}

function BarChart({ stockBarChartInfos, stockName }: Props) {
  // @ts-expect-error - ChartData type is not exported from ChartJS
  const data: ChartData<'bar'> = stockData(stockName, stockBarChartInfos);

  return (
    <StyledContainer>
      <StyledTitle>{stockName}</StyledTitle>
      <Bar data={data} options={CHART_OPTIONS} />
    </StyledContainer>
  );
}

export default BarChart;

const StyledContainer = styled('div')`
  margin: auto;
  max-width: 1000px;
  width: calc(100vw - 60px);
  min-width: 300px;
`;

const StyledTitle = styled('h1')`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;
