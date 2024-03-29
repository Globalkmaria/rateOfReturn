import { TotalSummary } from '../../../features/groups/filters';
import { Context } from 'chartjs-plugin-datalabels';

const repeatedColors = (base: string[], times = 17): string[] => {
  const background = [];
  for (let i = 0; i < times; i++) {
    background.push(...base);
  }
  return background;
};
const BASE_BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
];

const BACKGROUND_COLORS = repeatedColors(BASE_BACKGROUND_COLORS);

const BASE_BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];
const BORDER_COLORS = repeatedColors(BASE_BORDER_COLORS);

export const getChartData = (summary: TotalSummary) => {
  const { groupSummary, stocksSummary } = summary;
  const labels = Object.keys(stocksSummary);
  const buyData: number[] = [];
  const currentData: number[] = [];
  Object.keys(stocksSummary).forEach((stockId) => {
    buyData.push(
      Number(
        (
          (stocksSummary[stockId]['totalPurchasePrice'] /
            groupSummary.totalPurchasePrice) *
          100
        ).toFixed(3),
      ),
    );
    currentData.push(
      Number(
        (
          (stocksSummary[stockId]['totalCurrentValue'] /
            groupSummary.totalCurrentValue) *
          100
        ).toFixed(3),
      ),
    );
  });
  const buyDatalabels = {
    labels: {
      value: {
        font: { size: 15 },
        align: 'center',
        anchor: 'bottom',
        offset: 8,
        color: 'white',
        formatter: function (_: any, ctx: Context) {
          return ctx.active ? null : ctx.dataset.data[ctx.dataIndex] + '%';
        },
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 4,
      },
    },
  };
  const currnetDatalabels = {
    labels: {
      name: {
        align: 'top',
        font: { size: 18, weight: 'bold' },
        offset: 0,
        padding: 0,
        formatter: function (_: any, ctx: Context) {
          // @ts-ignore
          return ctx.active ? null : ctx.chart.data.labels[ctx.dataIndex];
        },
      },
      value: {
        color: function (ctx: Context) {
          // @ts-ignore
          return ctx.dataset.backgroundColor[ctx.dataIndex].replace('0.6', '1');
        },
        font: { size: 15, weight: 'bold' },
        align: 'bottom',
        padding: 4,
        offset: 3,
        formatter: function (_: any, ctx: Context) {
          return ctx.active ? null : ctx.dataset.data[ctx.dataIndex] + '%';
        },
        backgroundColor: 'white',
        borderRadius: 4,
      },
    },
  };

  const datasets = [
    {
      label: `current %`,
      data: currentData,
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      datalabels: currnetDatalabels,
    },
    {
      label: `buy %`,
      data: buyData,
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      datalabels: buyDatalabels,
    },
  ];

  return {
    labels,
    datasets,
  };
};
