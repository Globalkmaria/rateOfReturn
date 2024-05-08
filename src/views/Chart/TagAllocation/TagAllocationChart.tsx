import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { getTotalSummary } from '../../../features/groups/filters';
import { selectGroupStockInfo } from '../../../features/groups/selectors';
import { getChartData, getTagsTotal } from './utils';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels);

const TagAllocationChart = ({ groupId }: { groupId: string }) => {
  const stockInfo = useSelector(selectGroupStockInfo(groupId));
  const summary = getTotalSummary(stockInfo);
  const tagsTotal = getTagsTotal(stockInfo, summary);

  // @ts-ignore
  const chartData: ChartData<'doughnut'> = getChartData(summary, tagsTotal);
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
