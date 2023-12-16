import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { getTotalSummary } from '../../../features/groups/filters';
import { selectGroupStockInfo } from '../../../features/groups/selectors';
import { getChartData } from './utils';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels);

const PortfolioAllocationChart = ({ groupId }: { groupId: string }) => {
  const stockInfo = useSelector(selectGroupStockInfo(groupId));
  const summary = getTotalSummary(stockInfo);
  // @ts-ignore
  const chartData: ChartData<'doughnut'> = getChartData(summary);
  const options: ChartOptions<'doughnut'> = {
    layout: {
      padding: 20,
    },
    cutout: '30%',
  };

  return (
    <StyledPortfolioAllocationChart>
      <Doughnut data={chartData} options={options} />
    </StyledPortfolioAllocationChart>
  );
};

export default PortfolioAllocationChart;

const StyledPortfolioAllocationChart = styled('div')`
  margin: auto;
  max-width: 700px;
  width: min(calc(100vw - 60px), calc(100vh - 383px));
  min-width: 300px;
`;
