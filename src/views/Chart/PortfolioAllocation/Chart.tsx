import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { getChartData } from './utils';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels);

const PortfolioAllocationChart = () => {
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
  width: 700px;
`;
