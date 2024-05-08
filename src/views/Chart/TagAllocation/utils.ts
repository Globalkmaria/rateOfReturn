import { StockListState } from '@/features/stockList/type';
import { TotalSummary } from '../../../features/groups/filters';
import { Context } from 'chartjs-plugin-datalabels';

interface TagsTotal {
  buyPrice: Record<string, number>;
  currentPrice: Record<string, number>;
}

const BASE_BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
];

const getBackgroundColor = (length: number) => {
  return Array.from(
    { length },
    (_, i) => BASE_BACKGROUND_COLORS[i % BASE_BACKGROUND_COLORS.length],
  );
};

const BASE_BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];
const getBorderColor = (length: number) => {
  return Array.from(
    { length },
    (_, i) => BASE_BORDER_COLORS[i % BASE_BORDER_COLORS.length],
  );
};

export const getChartData = (summary: TotalSummary, tagsTotal: TagsTotal) => {
  const { groupSummary } = summary;

  const tags = Object.keys(tagsTotal.buyPrice);

  const labels = tags;
  if (tags.includes('Others')) {
    labels.splice(tags.indexOf('Others'), 1);
    labels.push('Others');
  }

  const buyData: number[] = [];
  const currentData: number[] = [];

  tags.forEach(tag => {
    buyData.push(
      Number(
        (
          (tagsTotal.buyPrice[tag] / groupSummary.totalPurchasePrice) *
          100
        ).toFixed(3),
      ),
    );
    currentData.push(
      Number(
        (
          (tagsTotal.currentPrice[tag] / groupSummary.totalCurrentValue) *
          100
        ).toFixed(3),
      ),
    );
  });

  const buyDataLabels = {
    labels: {
      value: {
        font: { size: 15, weight: 'bold' },
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

  const currentDataLabels = {
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

  const dataLength = currentData.length;
  const backgroundColor = getBackgroundColor(dataLength);
  const borderColor = getBorderColor(dataLength);
  const datasets = [
    {
      label: `current %`,
      data: currentData,
      backgroundColor,
      borderColor,
      datalabels: currentDataLabels,
    },
    {
      label: `buy %`,
      data: buyData,
      backgroundColor,
      borderColor,
      datalabels: buyDataLabels,
    },
  ];

  return {
    labels,
    datasets,
  };
};

export const getTagsTotal = (
  stockInfo: StockListState['stocks'],
  summary: TotalSummary,
): TagsTotal => {
  const buyPrice: Record<string, number> = {
    Others: 0,
  };
  const currentPrice: Record<string, number> = {
    Others: 0,
  };

  for (const [_, stock] of Object.entries(summary.stocksSummary)) {
    const tag = stockInfo.byId[stock.stockId].mainInfo.tag || 'Others';
    buyPrice[tag] = (buyPrice[tag] || 0) + stock.totalPurchasePrice;
    currentPrice[tag] = (currentPrice[tag] || 0) + stock.totalCurrentValue;
  }

  return {
    buyPrice,
    currentPrice,
  };
};
