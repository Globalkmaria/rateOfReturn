import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

import { TagsInfo, getChartData } from './utils';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels);

interface Props {
  tagsInfo: TagsInfo;
}

const TagAllocationChart = ({ tagsInfo }: Props) => {
  // @ts-expect-error - ChartData type is not exported from ChartJS
  const chartData: ChartData<'doughnut'> = getChartData(tagsInfo);
  const options: ChartOptions<'doughnut'> = {
    layout: {
      padding: 20,
    },
    cutout: '30%',
  };

  return (
    <StyledContainer>
      <Doughnut data={chartData} options={options} />
    </StyledContainer>
  );
};

export default TagAllocationChart;

const StyledContainer = styled('div')`
  margin: auto;
  max-width: 700px;
  width: min(calc(100vw - 60px), calc(100vh - 383px));
  min-width: 300px;
`;
