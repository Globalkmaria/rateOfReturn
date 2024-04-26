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

import { stockData } from './utils';
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
  stock: StockList;
}

function BarChart({ stock }: Props) {
  // @ts-ignore
  const data: ChartData<'bar'> = stockData(stock);

  return (
    <StyledContainer>
      <StyledTitle>{stock.mainInfo.stockName}</StyledTitle>
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
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;
